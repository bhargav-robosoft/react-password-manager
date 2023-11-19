import { accessTokenStorageKey } from "../constants";

export const setToken = (bearerString: string) => {
  const token = bearerString.split(" ")[1];
  localStorage.setItem(accessTokenStorageKey, token);
};

export const getToken = () => {
  return localStorage.getItem(accessTokenStorageKey) ?? "";
};

export const deleteToken = () => {
  localStorage.removeItem(accessTokenStorageKey);
};
