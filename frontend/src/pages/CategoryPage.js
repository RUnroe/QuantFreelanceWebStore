import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import "../styles/category.css";
import ProductCard from "../partials/productCard";
import SearchBar from "../partials/searchBar";
import {
  getCategoryDescription,
  formatCategoryName,
  isCategoryValid,
} from "../shared";
import { getProductsByCategory } from "../webservice/product";

export default function CategoryPage({}) {
  const { category_name: currentCategoryName } = useParams();
  const [resultList, setResultList] = useState();

  useEffect(() => {
    //fetch results by category name
    getProductsByCategory(currentCategoryName)
      .then((data) => setResultList(data))
      .catch((error) => console.error(error));
  }, []);

  // Products that are in progress might come without a title. Only count products with titles to get an accurate count
  const getTrueLength = () => {
    let count = 0;
    resultList?.forEach((result) => {
      if (result.title) count++;
    });
    return count;
  };
  // Only need to update when resultsList updates. resultsList causes a rerender, so no need to make this state.
  const trueResultCount = getTrueLength();

  return (
    <div className="category-page">
      <div className="container gradient category-header">
        <CategoryHeader categoryName={currentCategoryName} />
      </div>
      <div className="container">
        <div className="section result-area">
          {trueResultCount ? (
            <>
              <h2 className="results-header">Results ({trueResultCount})</h2>
              <div className="list">
                {resultList.map((product) => (
                  <ProductCard productData={product} />
                ))}
              </div>
            </>
          ) : (
            <h2 className="no-results-header">No Results</h2>
          )}
        </div>
      </div>
    </div>
  );
}

const CategoryHeader = ({ categoryName }) => {
  if (isCategoryValid(categoryName)) {
    const description = getCategoryDescription(categoryName);
    return (
      <div className="split section">
        <div className="left-side">
          <h1 className="category-name">{formatCategoryName(categoryName)}</h1>
          <p className="text-white description">{description}</p>
          <SearchBar />
        </div>
        <img src={`/images/categoryHeader/${categoryName}.svg`} />
      </div>
    );
  }
  return <Redirect to={{ pathname: "/" }} />;
};
