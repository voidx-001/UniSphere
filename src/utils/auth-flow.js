/**
 * Resolve the post-authentication destination.
 * A valid session is sufficient — profiles are created by the DB trigger on signup.
 */
export function getPostAuthRoute({ hasSession }) {
  if (hasSession) {
    return '/dashboard';
  }

  return '/login';
}
