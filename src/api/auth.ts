import { apiEndpoint, defaultHeaders } from "../constants";
import { getToken } from "../utils/storage";

export const signInApi = (email: string, password: string) => {
  return fetch(apiEndpoint + "sign-in", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      ...defaultHeaders,
    },
  });
};

export const signUpApi = (email: string, password: string) => {
  return fetch(apiEndpoint + "sign-up", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      ...defaultHeaders,
    },
    credentials: "include",
  });
};

export const generateOtpForRegisterApi = (email: string) => {
  return generateOtpApi(email, "register");
};

export const generateOtpForResetPasswordApi = (email: string) => {
  return generateOtpApi(email, "reset");
};

const generateOtpApi = (email: string, type: string) => {
  return fetch(apiEndpoint + "generate-otp", {
    method: "POST",
    body: JSON.stringify({
      email,
      type,
    }),
    headers: {
      ...defaultHeaders,
    },
  });
};

export const verifyOtpApi = (email: string, otp: string) => {
  return fetch(apiEndpoint + "verify-otp", {
    method: "POST",
    body: JSON.stringify({
      email,
      otp,
    }),
    headers: {
      ...defaultHeaders,
    },
    credentials: "include",
  });
};

export const forgotPasswordApi = (email: string, password: string) => {
  return fetch(apiEndpoint + "forgot-password", {
    method: "PUT",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      ...defaultHeaders,
    },
    credentials: "include",
  });
};

export const resetPasswordApi = (
  oldPassword: string,
  newPassword: string
) => {
  return fetch(apiEndpoint + "reset-password", {
    method: "PUT",
    body: JSON.stringify({
      oldPassword,
      newPassword,
    }),
    headers: {
      ...defaultHeaders,
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const signoutApi = () => {
  return fetch(apiEndpoint + "sign-out", {
    method: "GET",
    headers: {
      ...defaultHeaders,
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const checkTokenApi = () => {
  return fetch(apiEndpoint + "check-token", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};
