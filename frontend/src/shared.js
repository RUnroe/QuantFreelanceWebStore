import { categoriesKeyValue } from "./settings";

export const getCategoryDescription = (categoryName) => {
  return categoriesKeyValue[categoryName] || "";
};

export const formatCategoryName = (categoryName) => {
  return categoryName.replace("-", " & ");
};

export const getCategoryNames = () => {
  return Object.keys(categoriesKeyValue);
};

export const isCategoryValid = (categoryName) => {
  let categoryNames = getCategoryNames();
  return (categoryNames).includes(categoryName);
};

export const formatPrice = (price) => {
  if (!price) return "0.00";
  let formattedPrice = Math.floor(price * 100);
  formattedPrice = String(formattedPrice);
  formattedPrice =
    formattedPrice.slice(0, formattedPrice.length - 2) +
    "." +
    formattedPrice.slice(formattedPrice.length - 2);
  return `$${formattedPrice}`;
};

// Format category name from design-art to DesignArt for backend
export const convertCategoryName = (category) => {
  const parts = category.split("-");
  return `${parts[0][0].toUpperCase() + parts[0].substring(1)}${
    parts[1][0].toUpperCase() + parts[1].substring(1)
  }`;
};