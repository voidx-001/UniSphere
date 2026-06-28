export function getSignupErrorMessage(error) {
  const message = error?.message || '';

  if (!message) {
    return 'Unable to create your account right now. Please try again in a moment.';
  }

  if (/email.*rate limit|rate limit.*email|too many.*signup|signup.*rate/i.test(message)) {
    return 'Signup is temporarily rate-limited by Supabase. Please wait a few minutes and try again.';
  }

  if (/already registered.*email|email.*already registered|duplicate.*email|already.*in use.*email|email.*already.*in use|account.*already exists/i.test(message)) {
    return 'That email is already registered. Use a different email or sign in instead.';
  }

  return message;
}
