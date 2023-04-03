import { requestCreate } from "./requests";


export const uploadIcon = async (imageData) => {
  return await requestCreate('icons', imageData, true, false);
}
