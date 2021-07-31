import React, { useEffect, useState } from "react";
import { useParams, Redirect } from 'react-router-dom';
import "../styles/search.css";
import ProductCard from "../partials/productCard";

export default function SearchPage() {
    const { search_term } = useParams();
    const [resultList, setResultList] = useState();
    const [resultListJSX, setResultListJSX] = useState(<></>);


    useEffect(() => {
        //fetch results by search term
        fetch(`/api/product/search/${convertCategoryName(search_term)}`)
        .then(result => result.json())
        .then(data => (setResultList(data)))
        .catch(error => console.log(error));
    }, []);

    //Convert list to jsx when data comes in and is stored
    useEffect(() => {
        console.log(resultList);
        if(resultList) convertListToJSX();
    }, [resultList]);

    const convertListToJSX = () => {
        const jsx = [];
        resultList.forEach(result => {
            jsx.push(<ProductCard productData={result} />);
        });
        setResultListJSX(jsx);
    }

    
    return(
        <>
        <div className="container gradient search-header">
            <input type="text" placeholder="What service are you looking for?" className="input search center" id="searchField" />
        </div>
        <div className="container">
            <div className="section result-area">
                {resultListJSX.length ? 
                <><h2 className="results-header">Results for "{search_term}"</h2><div className="list">{resultListJSX}</div></> : 
                <h2 className="no-results-header">No Results for "{search_term}"</h2>}
            </div>
        </div>
        </>
    );

}