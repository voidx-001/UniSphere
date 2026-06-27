export function isValidUsername(username) {
  return /^[a-zA-Z0-9._]{3,30}$/.test(username);
}

export function validateRegisterStep(step, values) {
  const errors = {};

  if (step === 1) {
    if (!values.fullname || values.fullname.trim().length < 2) {
      errors.fullname = 'Name too short, make it at least 2 chars.';
    }

    if (!values.username || !isValidUsername(values.username.trim())) {
      errors.username = 'Use only letters, numbers, dots, and underscores.';
    }

    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errors.email = 'Use a real email, no cap.';
    }

    if (!values.password || values.password.length < 8) {
      errors.password = 'Password gotta be 8+ chars.';
    } else if (values.password.length < 12 && !/[A-Z]/.test(values.password)) {
      errors.password = 'Make it stronger: mix caps, lowercase, and numbers.';
    }

    if (values.password !== values.confirmPassword) {
      errors['confirm-password'] = 'Passwords gotta match, fam.';
    }
  }

  if (step === 2) {
    if (!values.university) {
      errors.university = 'Choose your uni so we know where you rep.';
    }

    if (!values.department) {
      errors.department = 'Pick your department, don’t leave it blank.';
    }

    if (!values.semester) {
      errors.semester = 'Pick your semester so we can match your vibe.';
    }

    if (!values.terms) {
      errors.terms = 'You gotta accept the terms to join.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
