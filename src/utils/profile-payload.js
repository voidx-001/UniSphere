export function buildProfilePayload({ userId, fullName, username }) {
  return {
    id: userId,
    full_name: fullName,
    username,
    university: '',
    department: '',
    semester: 1,
    bio: '',
    profile_image: ''
  };
}
