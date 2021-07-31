import React from "react";
import { useParams, Redirect } from 'react-router-dom';
import "../styles/category.css";
export default function CategoryPage({ }) {

    const { category_name } = useParams();
    return(
        <>
        <div className="container gradient category-header">
            <CategoryHeader category={category_name}/>
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
            return "";
        case "business-finance":
            return "";
        case "writing-translation":
            return "";
        case "video-animation":
            return "";
        case "audio-music":
            return "";
        case "programming-tech":
            return "";
        case "engineering-architecture":
            return "";
        case "education-training":
            return "";
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
                    <p className="text-white">{description}</p>
                    <input type="text" placeholder="What service are you looking for?" className="input search" id="searchField" />
                </div>
                {/* <img src={`images/categoryHeader/${category}`} /> */}
                <img src={`https://via.placeholder.com/450x250`} />
                
            </div>
        );
    }
    return (<Redirect to={{pathname: '/'}} />);
}