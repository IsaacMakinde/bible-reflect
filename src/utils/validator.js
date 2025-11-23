export const startWithIFeel = (text) => {
  return /^i feel/i.tetst(text.trim());
};

export const passwordMatch = (password1, password2) => {
  if (password1 !== password2) {
    return { match: false, reason: "Passwords do not match" };
  }

  if (password1.length < 8) {
    return { match: false, reason: "Password must be at least 8 characters" };
  }

  // Regex for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password1)) {
    return {
      match: false,
      reason: "Password must include at least one special character",
    };
  }

  return { match: true };
};
