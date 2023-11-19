const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const emailValidator = (email: string) => {
  if (!validateEmail(email)) {
    return "Email is invalid";
  }
  return null;
};

export const passwordValidator = (password: string) => {
  if (password.trim().length === 0) {
    return "Password is invalid";
  }
  return null;
};

export const otpValidator = (otp: string) => {
  if (otp.trim().length < 6) {
    return "Enter 6 digit OTP";
  }
  return null;
};

export const urlValidator = (url: string) => {
  try {
    new URL(url);
    return null;
  } catch (err) {
    return "URL is invalid";
  }
};

export const siteNameValidator = (siteName: string) => {
  if (siteName.trim().length === 0) {
    return "Enter site name";
  }
  return null;
};

export const siteCategoryValidator = (category: string) => {
  if (category.trim().length === 0) {
    return "Select a category";
  }
  return null;
};

export const usernameValidator = (username: string) => {
  if (username.trim().length === 0) {
    return "Username is invalid";
  }
  return null;
};

export const sitePasswordValidator = (password: string) => {
  if (password.trim().length === 0) {
    return "Password is invalid";
  }
  return null;
};

export const sitePasswordStrength = (password: string) => {
  var strength = 0;

  if (/[A-Z]/.test(password)) {
    strength += 20;
  }
  if (/[a-z]/.test(password)) {
    strength += 20;
  }
  if (/[0-9]/.test(password)) {
    strength += 20;
  }
  if (password.length >= 8) {
    strength += 20;
  }
  if (/[!@#$%^&*()]/.test(password)) {
    strength += 20;
  }
  return strength;
};
