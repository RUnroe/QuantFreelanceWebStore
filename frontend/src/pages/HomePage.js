import React, { useEffect, createRef } from "react";
//import {ImageInput, SignupForm} from "./../partials/form";
import "../styles/index.css";
import SearchBar from "../partials/searchBar";
import AOS from "aos";
import "aos/dist/aos.css";

function CtaButton({currAuthLevel, username}) {
    // console.log(currAuthLevel);
    if (currAuthLevel === "seller") return  (<a href={`/account/${username}`} className="btn blue center"> Sell a Service</a>);
    if(currAuthLevel === "buyer") return (<a href="/account/settings" className="btn blue center"> Become a Seller</a>);

    return (<a href="/signup" className="btn blue center"> Become a Seller</a>);
}


export default function HomePage({currAuthLevel, username}) {
    const firstName = createRef();
    useEffect(() => {
        AOS.init({
            offset: 120,
            duration: 350,
            easing: 'ease-in-sine',
          });
        AOS.refresh();
      }, []);

    // const logIn = () => {
    //     const data = {
    //         identifier: "RUnroe",
    //         password: "1234aaAb"
    //     }
    //     fetch("/api/auth", {
    //         method: 'POST', 
    //         headers: {
    //         'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then( response => console.log(response));
    // }
    // const updateUser = () => {
    //     const data = {first_name: firstName.current.value};
    //     console.log(data);
    //     fetch("/api/user", {
    //         method: 'PUT',
    //         credentials: 'include', 
    //         headers: {
    //         'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then( response => console.log(response));
    // }

    const categories = [{name:"Design & Art", src:"design-art"}, {name:"Sales & Marketing", src:"https://via.placeholder.com/100"}, {name: "Business & Finance", src:"https://via.placeholder.com/100"}, {name: "Writing & Translation", src:"https://via.placeholder.com/100"}, {name: "Video & Animation", src:"https://via.placeholder.com/100"}, {name: "Audio & Music", src:"https://via.placeholder.com/100"}, {name: "Programming & Tech", src:"https://via.placeholder.com/100"}, {name: "Engineering & Architecture", src:"https://via.placeholder.com/100"}, {name: "Education & Training", src:"https://via.placeholder.com/100"}];
    const marketplaceJsxElements = [];
    categories.forEach(value => {
        marketplaceJsxElements.push(
            <a data-aos={"fade-up"} href={`/store/category/${value.name.replace(" & ", "-").toLowerCase()}`} className="category-box" key={value.name}>
                <img src={`/images/categoryIcon/${value.name.toLowerCase().replace(" & ", "-")}.svg`} alt={value.name + " item"} />
                <hr />
                <p>{value.name}</p>
            </a>
        );
    });

    const usages = [{title: "Find what you need", src:"/images/usage/findIcon.svg", desc: "Find services by searching or exploring the nine different categories."}, {title: "Hire freelancers", src:"/images/usage/freelancerIcon.svg", desc: "Once you have found a service, hire the freelancer and send them a custom message."}, {title: "Sell services", src:"/images/usage/sellIcon.svg", desc: "Become a seller by upgrading your account for free. Then start listing any services you wish to sell."}];
    const usageJsxElements = [];
    usages.forEach(value => {
        usageJsxElements.push(
            <div data-aos={"zoom-in"} className="info-box">
                <div className="img-container"><img src={value.src} alt={value.title}/></div>
                <h4>{value.title}</h4>
                <hr />
                <p>{value.desc}</p>
            </div>
        );
    });

    return(
        <>
        <div className="container gradient search-section">
            <div className="section">
                <div>
                    <h1 className="text-white">Find the freelance services that you need</h1>
                    <div className="search-container">
                        <SearchBar classList={"center"} />
                        <p className="text-center text-white"> or</p>
                        {/* <a href="/signup" className="btn blue center"> Become a Seller</a> */}
                        <CtaButton currAuthLevel={currAuthLevel} username={username} />
                    </div>
                </div>
                <div className="image-half">
                    <img src="/images/handshake.svg" alt="handshake" />
                </div>
            </div>
        </div>

        <div className="container explore-section">
            <div className="section">
                <h2>Explore the marketplace</h2>
                <div className="category-box-container">
                    {marketplaceJsxElements}
                </div>
            </div>
        </div>

        <div className="container light-grey learn-section">
            <div className="section">
                <h2 data-aos={"fade-up"}>Using Quant is easy</h2>
                <div className="info-container">
                    {usageJsxElements}
                </div>
            </div>
        </div>

        <CtaSection authLevel={currAuthLevel}/>
        </>
    );

}

function CtaSection({authLevel}) {
    if(authLevel === "seller") {
        return (
            <></>
        );
    }
    else if(authLevel === "buyer") {
        return (
            <div className="container dark cta-section">
                <div className="section">
                    <h1 className="text-white">Want to start selling?</h1>
                    <p className="text-white">Upgrade your account to start selling services.</p>
                    <a href="/account/settings" className="btn blue">Account Settings</a>
                </div>
            </div>
        );
    }
    return (
        <div className="container dark cta-section">
            <div className="section">
                <h1 className="text-white">Want to join the fun?</h1>
                <p className="text-white">Sign up now to purchase or sell services.</p>
                <a href="signup" className="btn blue">Sign Up</a>
            </div>
        </div>
    );
}