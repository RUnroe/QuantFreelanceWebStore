import React, { useEffect, useState } from "react";
import { useParams, Redirect } from 'react-router-dom';
import "../styles/category.css";
import ProductCard from "../partials/productCard";
import SearchBar from "../partials/searchBar";
import { requestGet } from "../partials/requests";
import { getCategoryDescription, formatCategoryName, isCategoryValid } from "../shared";

export default function CategoryPage({ }) {
    const { category_name: currentCategoryName } = useParams();
    const [resultList, setResultList] = useState();
    const [resultListJSX, setResultListJSX] = useState(<></>);
    

    const convertCategoryName = (category) => {
        const parts = category.split("-");
        return `${parts[0][0].toUpperCase() + parts[0].substring(1)}${parts[1][0].toUpperCase() + parts[1].substring(1)}`;
    }
    useEffect(() => {
        //fetch results by category name
        // fetch(`/api/product/category/${convertCategoryName(category_name)}`)
        // .then(result => result.json())
        requestGet(`api/product/category/${convertCategoryName(currentCategoryName)}`)
        .then(data => (setResultList(data)))
        .catch(error => console.log(error));
    }, []);

    //Convert list to jsx when data comes in and is stored
    useEffect(() => {
        if(resultList) convertListToJSX();
    }, [resultList]);

    const convertListToJSX = () => {
        const jsx = [];
        resultList.forEach(result => {
            jsx.push(<ProductCard productData={result} />);
        });
        setResultListJSX(jsx);
    }
    const getTrueLength = () => {
        let count = 0;
        resultList.forEach(result => {
            if(result.title) count++;
        });
        return count;
    }
    return(
        <div className="category-page">
        <div className="container gradient category-header">
            <CategoryHeader categoryName={currentCategoryName}/>
        </div>
        <div className="container">
            <div className="section result-area">
                {resultListJSX.length ? 
                <><h2 className="results-header">Results ({getTrueLength()})</h2><div className="list">{resultListJSX}</div></> : 
                <h2 className="no-results-header">No Results</h2>}
            </div>
        </div>
        </div>
    );

}



const CategoryHeader = ({categoryName}) => {
    if(isCategoryValid(categoryName)) {
        const description = getCategoryDescription(categoryName);
        return (
            <div className="split section">
                <div className="left-side">
                    <h1 className="category-name">{formatCategoryName(categoryName)}</h1>
                    <p className="text-white description">{description}</p>
                    <SearchBar />
                </div>
                <img src={`/images/categoryHeader/${categoryName}.svg`} />
                {/* <img src={`https://via.placeholder.com/450x250`} /> */}
                
            </div>
        );
    }
    return (<Redirect to={{pathname: '/'}} />);
}