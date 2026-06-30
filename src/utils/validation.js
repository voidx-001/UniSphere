export function isValidUsername(username) {
  return /^[a-zA-Z0-9._]{3,30}$/.test(username);
}

export function validateRegisterStep(step, values) {
  const errors = {};

  if (step === 1) {
    if (!values.fullname || values.fullname.trim().length < 2) {
      errors.fullname = 'Name must be at least 2 characters.';
    }

    if (!values.username || !isValidUsername(values.username.trim())) {
      errors.username = 'Use only letters, numbers, dots, and underscores.';
    }

    if (!values.email || !/^[^\s@]+@[^\s@]+\.edu(\.[^\s@]+)?$/.test(values.email.trim())) {
      errors.email = 'Please use your university .edu or .edu.pk email address.';
    }

    if (!values.password || values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    } else if (values.password.length < 12 && !/[A-Z]/.test(values.password)) {
      errors.password = 'Add uppercase, lowercase, and numbers for a stronger password.';
    }

    if (values.password !== values.confirmPassword) {
      errors['confirm-password'] = 'Passwords do not match.';
    }
  }

  if (step === 2) {
    if (!values.university) {
      errors.university = 'Please select your university.';
    }

    if (!values.department) {
      errors.department = 'Please select your department.';
    }

    if (!values.semester) {
      errors.semester = 'Please select your semester.';
    }

    if (!values.terms) {
      errors.terms = 'Please accept the terms to continue.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
