import { getUserProfile } from '../main.js';
import { supabase } from '../lib/supabase.js';
import { router } from '../lib/router.js';
import { renderSidebar, setupSidebarHandlers } from '../components/sidebar.js';
import { renderHeader, setupHeaderHandlers } from '../components/header.js';
import { showToast } from '../utils/toast.js';
import { escapeHtml, safeImageUrl } from '../utils/html.js';

let conversations = [];
let currentChat = null;
let messagesInterval = null;
let lastMessageAt = null;
let lastMessageId = null;

export async function renderMessages() {
  const app = document.getElementById('app');
  const profile = getUserProfile();

  if (!profile) {
    router.navigate('/login');
    return;
  }

  window.cleanupCurrentPage = closeChat;

  // Get user ID from URL if opening a specific conversation
  const urlParams = new URLSearchParams(window.location.search);
  const targetUserId = urlParams.get('user');

  // Fetch conversations
  conversations = await fetchConversations(profile.id);

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}

      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${renderHeader('Messages')}

        <main class="messages-main">
          <div class="messages-container">
            <!-- Conversations List -->
            <div class="conversations-panel" id="conversations-panel">
              <div class="conversations-header">
                <h3>Chats</h3>
              </div>
              <div class="conversations-list" id="conversations-list">
                ${conversations.length > 0
                  ? conversations.map(conv => renderConversationItem(conv, profile.id, targetUserId)).join('')
                  : renderEmptyConversations()
                }
              </div>
            </div>

            <!-- Chat Window -->
            <div class="chat-panel" id="chat-panel">
              <div class="chat-placeholder" id="chat-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <h4>Select a conversation</h4>
                <p>Choose a conversation from the list to start messaging</p>
              </div>
              <div class="chat-active hidden" id="chat-active">
                <div class="chat-header" id="chat-header"></div>
                <div class="chat-messages" id="chat-messages"></div>
                <div class="chat-input" id="chat-input-area"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <style>
      .sidebar-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
      }

      .messages-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 65px);
      }

      .messages-container {
        display: flex;
        flex: 1;
        overflow: hidden;
        background: var(--bg-secondary);
      }

      .conversations-panel {
        width: 320px;
        background: var(--bg-primary);
        border-right: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        transition: all var(--transition-base);
      }

      @media (max-width: 767px) {
        .conversations-panel {
          width: 100%;
          position: absolute;
          left: 0;
          top: 65px;
          bottom: 0;
          z-index: 10;
        }

        .conversations-panel.hidden-mobile {
          transform: translateX(-100%);
        }
      }

      .conversations-header {
        padding: var(--space-4);
        border-bottom: 1px solid var(--border-color);
      }

      .conversations-header h3 {
        font-size: var(--font-size-lg);
        font-weight: 600;
      }

      .conversations-list {
        flex: 1;
        overflow-y: auto;
      }

      .conversation-item {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-3) var(--space-4);
        cursor: pointer;
        transition: background var(--transition-fast);
        border-bottom: 1px solid var(--border-color);
      }

      .conversation-item:hover {
        background: var(--bg-tertiary);
      }

      .conversation-item.active {
        background: var(--primary-50);
      }

      [data-theme="dark"] .conversation-item.active {
        background: rgba(59, 130, 246, 0.1);
      }

      .conversation-avatar {
        position: relative;
        flex-shrink: 0;
      }

      .conversation-avatar .online-indicator {
        position: absolute;
        bottom: 0;
        right: 0;
      }

      .conversation-info {
        flex: 1;
        min-width: 0;
      }

      .conversation-name {
        font-weight: 600;
        color: var(--text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .conversation-preview {
        font-size: var(--font-size-sm);
        color: var(--text-tertiary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .conversation-meta {
        text-align: right;
        flex-shrink: 0;
      }

      .conversation-time {
        font-size: var(--font-size-xs);
        color: var(--text-muted);
        margin-bottom: var(--space-1);
      }

      .unread-badge {
        background: var(--primary-500);
        color: white;
        font-size: var(--font-size-xs);
        font-weight: 600;
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-full);
        min-width: 20px;
        text-align: center;
      }

      .empty-conversations {
        padding: var(--space-8);
        text-align: center;
        color: var(--text-tertiary);
      }

      .empty-conversations svg {
        width: 48px;
        height: 48px;
        margin-bottom: var(--space-4);
        opacity: 0.5;
      }

      /* Chat Panel */
      .chat-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: var(--bg-primary);
      }

      @media (max-width: 767px) {
        .chat-panel {
          position: absolute;
          left: 0;
          top: 65px;
          right: 0;
          bottom: 0;
          z-index: 5;
          transform: translateX(100%);
          transition: transform var(--transition-base);
        }

        .chat-panel.active {
          transform: translateX(0);
        }
      }

      .chat-placeholder {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
        padding: var(--space-8);
        text-align: center;
      }

      .chat-placeholder svg {
        width: 64px;
        height: 64px;
        margin-bottom: var(--space-4);
        opacity: 0.5;
      }

      .chat-placeholder h4 {
        color: var(--text-secondary);
        margin-bottom: var(--space-2);
      }

      .chat-active {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .chat-header {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-4);
        border-bottom: 1px solid var(--border-color);
        background: var(--bg-primary);
      }

      .chat-back-btn {
        display: none;
        color: var(--text-secondary);
        padding: var(--space-2);
        margin: calc(var(--space-2) * -1);
      }

      @media (max-width: 767px) {
        .chat-back-btn {
          display: block;
        }
      }

      .chat-user-info {
        flex: 1;
      }

      .chat-user-name {
        font-weight: 600;
        color: var(--text-primary);
      }

      .chat-user-status {
        font-size: var(--font-size-sm);
        color: var(--text-tertiary);
      }

      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: var(--space-4);
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        background: var(--bg-secondary);
      }

      .message {
        max-width: 70%;
        padding: var(--space-3) var(--space-4);
        border-radius: var(--radius-xl);
        position: relative;
      }

      .message-sent {
        background: var(--primary-500);
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: var(--radius-sm);
      }

      .message-received {
        background: var(--bg-primary);
        align-self: flex-start;
        border-bottom-left-radius: var(--radius-sm);
        box-shadow: var(--shadow-sm);
      }

      .message-text {
        line-height: var(--line-height-normal);
        word-wrap: break-word;
      }

      .message-time {
        font-size: var(--font-size-xs);
        margin-top: var(--space-1);
        opacity: 0.7;
      }

      .message-sent .message-time {
        text-align: right;
      }

      .messages-date-separator {
        text-align: center;
        color: var(--text-muted);
        font-size: var(--font-size-xs);
        padding: var(--space-2) 0;
      }

      .chat-input {
        padding: var(--space-4);
        border-top: 1px solid var(--border-color);
        background: var(--bg-primary);
      }

      .input-wrapper {
        display: flex;
        gap: var(--space-3);
        align-items: flex-end;
      }

      .input-wrapper textarea {
        flex: 1;
        padding: var(--space-3) var(--space-4);
        background: var(--bg-tertiary);
        border: none;
        border-radius: var(--radius-xl);
        resize: none;
        max-height: 120px;
        color: var(--text-primary);
        font-family: inherit;
      }

      .input-wrapper textarea:focus {
        outline: none;
        background: var(--bg-secondary);
      }

      .input-wrapper textarea::placeholder {
        color: var(--text-muted);
      }

      .send-btn {
        width: 44px;
        height: 44px;
        background: var(--gradient-primary);
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
        transition: transform var(--transition-fast);
      }

      .send-btn:hover {
        transform: scale(1.05);
      }

      .send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    </style>
  `;

  setupSidebarHandlers();
  setupHeaderHandlers();

  // Open specific conversation if user ID provided
  if (targetUserId) {
    const targetUser = await fetchUserProfile(targetUserId);
    if (targetUser) {
      openConversation(profile, targetUser);
    }
  }

  // Setup global functions
  window.selectConversation = (userId) => {
    const conv = conversations.find(c => c.other_user?.id === userId);
    if (conv && profile) {
      openConversation(profile, conv.other_user);
    }
  };

  window.backToList = () => {
    const convPanel = document.getElementById('conversations-panel');
    const chatPanel = document.getElementById('chat-panel');
    convPanel?.classList.remove('hidden-mobile');
    chatPanel?.classList.remove('active');
    closeChat();
  };
}

async function fetchConversations(userId) {
  try {
    // Get all messages where user is sender or receiver
    const { data: messages, error } = await supabase
      .from('messages')
      .select(`
        id,
        sender_id,
        receiver_id,
        message,
        created_at,
        read
      `)
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error || !messages) return [];

    // Group by conversation partner
    const conversationMap = new Map();

    for (const msg of messages) {
      const partnerId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;

      if (!conversationMap.has(partnerId)) {
        conversationMap.set(partnerId, {
          other_user_id: partnerId,
          last_message: msg,
          unread_count: 0
        });
      }

      // Count unread messages
      if (msg.receiver_id === userId && !msg.read) {
        const conv = conversationMap.get(partnerId);
        conv.unread_count++;
      }
    }

    // Fetch user profiles for conversation partners
    const partnerIds = Array.from(conversationMap.keys());
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .in('id', partnerIds);

    // Combine data
    const result = [];
    for (const [partnerId, conv] of conversationMap) {
      const profile = profiles?.find(p => p.id === partnerId);
      result.push({
        ...conv,
        other_user: profile
      });
    }

    return result;
  } catch (e) {
    return [];
  }
}

async function fetchUserProfile(userId) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  return data;
}

function renderConversationItem(conv, currentUserId, targetUserId) {
  const user = conv.other_user;
  if (!user) return '';

  const initials = user.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'S';

  const isActive = user.id === targetUserId;
  const time = formatMessageTime(conv.last_message.created_at);
  const preview = conv.last_message.message.substring(0, 50);

  return `
    <div class="conversation-item ${isActive ? 'active' : ''}" onclick="selectConversation('${user.id}')">
      <div class="conversation-avatar">
        <div class="avatar">
          ${safeImageUrl(user.profile_image)
            ? `<img src="${safeImageUrl(user.profile_image)}" alt="${escapeHtml(user.full_name)}">`
            : `<span>${initials}</span>`
          }
        </div>
      </div>
      <div class="conversation-info">
        <div class="conversation-name">${escapeHtml(user.full_name)}</div>
        <div class="conversation-preview">${escapeHtml(preview)}${preview.length >= 50 ? '...' : ''}</div>
      </div>
      <div class="conversation-meta">
        <div class="conversation-time">${time}</div>
        ${conv.unread_count > 0 ? `<div class="unread-badge">${conv.unread_count}</div>` : ''}
      </div>
    </div>
  `;
}

function renderEmptyConversations() {
  return `
    <div class="empty-conversations">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <p>No conversations yet</p>
      <p style="font-size: var(--font-size-sm); margin-top: var(--space-2);">
        Start by connecting with other students
      </p>
    </div>
  `;
}

async function openConversation(currentUser, otherUser) {
  currentChat = { currentUser, otherUser };
  lastMessageAt = null;
  lastMessageId = null;

  // Update UI
  const placeholder = document.getElementById('chat-placeholder');
  const chatActive = document.getElementById('chat-active');
  const convPanel = document.getElementById('conversations-panel');
  const chatPanel = document.getElementById('chat-panel');

  placeholder?.classList.add('hidden');
  chatActive?.classList.remove('hidden');

  // Mobile handling
  if (window.innerWidth < 768) {
    convPanel?.classList.add('hidden-mobile');
    chatPanel?.classList.add('active');
  }

  // Render header
  const chatHeader = document.getElementById('chat-header');
  const initials = otherUser.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'S';

  chatHeader.innerHTML = `
    <button class="chat-back-btn" onclick="backToList()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
    <div class="avatar">
      ${safeImageUrl(otherUser.profile_image)
        ? `<img src="${safeImageUrl(otherUser.profile_image)}" alt="${escapeHtml(otherUser.full_name)}">`
        : `<span>${initials}</span>`
      }
    </div>
    <div class="chat-user-info">
      <div class="chat-user-name">${escapeHtml(otherUser.full_name)}</div>
      <div class="chat-user-status">${escapeHtml(otherUser.university)}</div>
    </div>
  `;

  // Render input
  const chatInput = document.getElementById('chat-input-area');
  chatInput.innerHTML = `
    <div class="input-wrapper">
      <textarea id="message-input" placeholder="Type a message..." rows="1" maxlength="2000" onkeydown="handleMessageKeydown(event)"></textarea>
      <button class="send-btn" onclick="sendMessage()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  `;

  // Load messages
  await loadMessages(currentUser.id, otherUser.id, { reset: true });

  // Start polling for new messages
  startMessagePolling(currentUser.id, otherUser.id);
}

async function loadMessages(currentUserId, otherUserId, { reset = false } = {}) {
  const messagesContainer = document.getElementById('chat-messages');
  if (!messagesContainer) return;

  let query = supabase
    .from('messages')
    .select('*')
    .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${currentUserId})`)
    .order('created_at', { ascending: true });

  if (!reset && lastMessageAt) {
    query = query.gt('created_at', lastMessageAt);
  }

  const { data, error } = await query.limit(100);

  if (error) {
    console.error('Failed to load messages', error);
    return;
  }

  if (!data || data.length === 0) {
    if (reset) {
      messagesContainer.innerHTML = `
        <div class="messages-date-separator">Start of conversation</div>
      `;
    }
    return;
  }

  if (reset) {
    messagesContainer.innerHTML = data.map(msg => renderMessage(msg, currentUserId)).join('');
  } else {
    const newMessages = data.map(msg => renderMessage(msg, currentUserId)).join('');
    messagesContainer.insertAdjacentHTML('beforeend', newMessages);
  }

  const latestMessage = data[data.length - 1];
  lastMessageAt = latestMessage.created_at;
  lastMessageId = latestMessage.id;

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Mark messages as read
  await markMessagesAsRead(currentUserId, otherUserId);
}

function renderMessage(msg, currentUserId) {
  const isSent = msg.sender_id === currentUserId;
  const time = formatTime(msg.created_at);

  return `
    <div class="message ${isSent ? 'message-sent' : 'message-received'}">
      <div class="message-text">${escapeHtml(msg.message)}</div>
      <div class="message-time">${time}</div>
    </div>
  `;
}

function startMessagePolling(currentUserId, otherUserId) {
  if (messagesInterval) clearInterval(messagesInterval);

  messagesInterval = setInterval(async () => {
    if (!currentChat) return;
    await loadMessages(currentUserId, otherUserId);
  }, 5000);
}

function closeChat() {
  currentChat = null;
  lastMessageAt = null;
  lastMessageId = null;
  if (messagesInterval) {
    clearInterval(messagesInterval);
    messagesInterval = null;
  }
}

async function markMessagesAsRead(currentUserId, otherUserId) {
  await supabase
    .from('messages')
    .update({ read: true })
    .eq('receiver_id', currentUserId)
    .eq('sender_id', otherUserId)
    .eq('read', false);
}

if (typeof window !== 'undefined') {
  window.sendMessage = async () => {
    const input = document.getElementById('message-input');
    const message = input.value.trim();

    if (!message || !currentChat) return;

    input.value = '';

    const { error } = await supabase
      .from('messages')
      .insert({
        sender_id: currentChat.currentUser.id,
        receiver_id: currentChat.otherUser.id,
        message
      });

    if (error) {
      showToast('Failed to send message', 'error');
      return;
    }

    await loadMessages(currentChat.currentUser.id, currentChat.otherUser.id);
  };

  window.handleMessageKeydown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      window.sendMessage();
    }
  };
}

function formatTime(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

function formatMessageTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return formatTime(dateStr);
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}
