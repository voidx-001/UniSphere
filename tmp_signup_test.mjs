const url = 'https://clbjktgdpwdyzozigrej.supabase.co/auth/v1/signup?redirect_to=http://localhost:5188/login';
const headers = {
  'Content-Type': 'application/json',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsYmprdGdkcHdkeXpvemlncmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzA5MjEsImV4cCI6MjA5ODE0NjkyMX0.tP_yR9LaPbPFhnJ-cgHKfSE_mJ3VoXD9wN3hGKTp800'
};
const body = JSON.stringify({
  email: 'simpletestuser124@example.com',
  password: 'TestPass123!'
});

const res = await fetch(url, {method: 'POST', headers, body});
console.log('status', res.status);
console.log('ok', res.ok);
const text = await res.text();
console.log('text', text);
