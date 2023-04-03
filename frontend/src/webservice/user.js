import { requestCreate, requestGet, requestUpdate } from "./requests";

export const getUserByUsername = async (username) => {
  return await requestGet(`user/info/${username}`);
};

export const updateCurrentUser = async (userData) => {
  return await requestUpdate('user', userData);
}

export const logInUser = async (userData) => {
  return await requestCreate('auth', userData);
}

export const doesUserExist = async (userData) => {
  return await requestCreate('user/check', userData, false, true)
}

export const createUser = async (userData) => {
  return await requestCreate('user', userData);
}