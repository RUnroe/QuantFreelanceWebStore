import React, { useEffect, useState } from "react";
import { useParams, Redirect } from 'react-router-dom';
import "../styles/category.css";
import ProductCard from "../partials/productCard";

export default function CategoryPage({ }) {
    const { category_name } = useParams();
    const [resultList, setResultList] = useState();
    const [resultListJSX, setResultListJSX] = useState(<></>);
    

    const convertCategoryName = (category) => {
        const parts = category.split("-");
        return `${parts[0][0].toUpperCase() + parts[0].substring(1)}${parts[1][0].toUpperCase() + parts[1].substring(1)}`;
    }
    useEffect(() => {
        //fetch results by category name
        fetch(`/api/product/category/${convertCategoryName(category_name)}`)
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
        <div className="container gradient category-header">
            <CategoryHeader category={category_name}/>
        </div>
        <div className="container">
            <div className="section result-area">
                {resultListJSX.length ? 
                <><h2 className="results-header">Results ({resultListJSX.length})</h2><div className="list">{resultListJSX}</div></> : 
                <h2 className="no-results-header">No Results</h2>}
            </div>
        </div>
        </>
    );

}



const validateCategory = (acceptedCategoryList, category) => {
    let valid = false;
    acceptedCategoryList.forEach(acceptedCategory => {
        if(acceptedCategory === category) valid = true;
    });
    return valid;
}


const getDescription = (category) => {
    switch(category) {
        case "design-art":
            return "Art commissions, company logos, website wireframes and much more!";
        case "sales-marketing":
            return "All of your 'smarketing' needs from advertisements to branding!";
        case "business-finance":
            return "Your business is your passion. Outsource smaller tasks so you can focus on growth!";
        case "writing-translation":
            return "Have your way with words. Get copy, translation & editorial work from freelancers!";
        case "video-animation":
            return "Tell your story however you like with custom video & animation services!";
        case "audio-music":
            return "Let the world hear your message through music, audio & voice services!";
        case "programming-tech":
            return "Get all of your techical needs from website and app development to automation!";
        case "engineering-architecture":
            return "Drafting, 3D models, floorplans, interior design, and much more!";
        case "education-training":
            return "Want some help learning? Get training videos and one-on-one help for whatever you need!";
        default:
            return "You shouldn't be here";
    }
}

function CategoryHeader({category}) {
    if(validateCategory(["design-art", "sales-marketing", "business-finance", "writing-translation", "video-animation",
        "audio-music", "programming-tech", "engineering-architecture", "education-training" ], category)) {
        const description = getDescription(category);
        return (
            <div className="split section">
                <div className="left-side">
                    <h1 className="category-name">{category.replace("-", " & ")}</h1>
                    <p className="text-white description">{description}</p>
                    <input type="text" placeholder="What service are you looking for?" className="input search" id="searchField" />
                </div>
                {/* <img src={`images/categoryHeader/${category}`} /> */}
                <img src={`https://via.placeholder.com/450x250`} />
                
            </div>
        );
    }
    return (<Redirect to={{pathname: '/'}} />);
}