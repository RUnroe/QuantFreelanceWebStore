import { requestGet, requestUpdate } from "./requests";

export const getUserByUsername = async (username) => {
  return await requestGet(`user/info/${username}`);
};

export const updateCurrentUser = async (userData) => {
  return await requestUpdate('user', userData)
}
