import { requestCreate, requestDelete, requestGet } from "./requests";
import { convertCategoryName } from "../shared";
import { newDefaultProduct } from "../settings";


export const getProductsByCategory = async (categoryName) => {
  return await requestGet(`product/category/${convertCategoryName(categoryName)}`);
};

export const getProductsByUser = async (userId) => {
  return await requestGet(`product/seller/${userId}`);
}

export const createProduct = async () => {
  const result = await requestCreate(`product`, newDefaultProduct);
  const newProductId = await result.json();
  return newProductId;
} 

export const deleteProduct = async (productId) => {
  return await requestDelete('product', {productId});
}