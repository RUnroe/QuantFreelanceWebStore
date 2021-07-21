import React, { createRef, useState } from "react";
import {ImageInput, SignupForm} from "./../partials/form";
import "../styles/index.css";

export default function HomePage() {
    const firstName = createRef();
    const logIn = () => {
        const data = {
            identifier: "RUnroe",
            password: "1234aaAb"
        }
        fetch("/api/auth", {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( response => console.log(response));
    }
    const updateUser = () => {
        const data = {first_name: firstName.current.value};
        console.log(data);
        fetch("/api/user", {
            method: 'PUT',
            credentials: 'include', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( response => console.log(response));
    }

    const categories = [{name:"Design & Art", src:"https://via.placeholder.com/100"}, {name:"Sales & Marketing", src:"https://via.placeholder.com/100"}, {name: "Business & Finance", src:"https://via.placeholder.com/100"}, {name: "Writing & Translation", src:"https://via.placeholder.com/100"}, {name: "Video & Animation", src:"https://via.placeholder.com/100"}, {name: "Audio & Music", src:"https://via.placeholder.com/100"}, {name: "Programming & Tech", src:"https://via.placeholder.com/100"}, {name: "Engineering & Architecture", src:"https://via.placeholder.com/100"}, {name: "Education & Training", src:"https://via.placeholder.com/100"}];
    const marketplaceJsxElements = [];
    categories.forEach(value => {
        marketplaceJsxElements.push(
            <a href={`/store/category/${value.name.replace(" & ", "-").toLowerCase()}`} className="category-box" key={value.name}>
                <img src={value.src} />
                <hr />
                <p>{value.name}</p>
            </a>
        );
    });

    const usages = [{title: "Find what you need", src:"https://via.placeholder.com/100", desc: "Find services by searching or exploring the nine different categories."}, {title: "Hire freelancers", src:"https://via.placeholder.com/100", desc: "Once you have found a service, hire the freelancer and send them a custom message."}, {title: "Sell services", src:"https://via.placeholder.com/100", desc: "Become a seller by upgrading your account for free. Then start listing any services you wish to sell."}];
    const usageJsxElements = [];
    usages.forEach(value => {
        usageJsxElements.push(
            <div className="info-box">
                <img src={value.src} className="round" />
                <h4>{value.title}</h4>
                <hr />
                <p>{value.desc}</p>
            </div>
        );
    });

    // div.container.gradient.search-section
    //     div.section
    //         div
    //             h1.text-white Find the freelance services that you need
    //             div.search-container
    //                 input(type="text" placeholder="What service are you looking for?").input.search#searchField
    //                 p.text-center.text-white or
    //                 a(href="signup").btn.blue.center Become a Seller
    //         div.image-half
    //             img(src="https://via.placeholder.com/275x275", alt="people")
    // div.container.explore-section
    //     div.section
    //         h2 Explore the marketplace
    //         div.category-box-container
    //             each val in [{name:"Design & Art", src:"https://via.placeholder.com/100"}, {name:"Sales & Marketing", src:"https://via.placeholder.com/100"}, {name: "Business & Finance", src:"https://via.placeholder.com/100"}, {name: "Writing & Translation", src:"https://via.placeholder.com/100"}, {name: "Video & Animation", src:"https://via.placeholder.com/100"}, {name: "Audio & Music", src:"https://via.placeholder.com/100"}, {name: "Programming & Tech", src:"https://via.placeholder.com/100"}, {name: "Engineering & Architecture", src:"https://via.placeholder.com/100"}, {name: "Education & Training", src:"https://via.placeholder.com/100"}]
    //                 a(href=val.name.replace(" & ", "-").toLowerCase()).category-box
    //                     img(src=val.src)
    //                     hr
    //                     p= val.name
    // div.container.light-grey.learn-section
    //     div.section
    //         h2 Using Quant is easy
    //         div.info-container
    //             each data in [{title: "Find what you need", src:"https://via.placeholder.com/100", desc: "Find services by searching or exploring the nine different categories."}, {title: "Hire freelancers", src:"https://via.placeholder.com/100", desc: "Once you have found a service, hire the freelancer and send them a custom message."}, {title: "Sell services", src:"https://via.placeholder.com/100", desc: "Become a seller by upgrading your account for free. Then start listing any services you wish to sell."}]
    //                 div.info-box
    //                     img(src=data.src).round
    //                     h4= data.title
    //                     hr
    //                     p= data.desc

    // div.container.dark.cta-section
    //     div.section
    //         h1.text-white Want to join the fun?
    //         p.text-white Sign up now to purchase or sell services.
    //         a(href="signup").btn.blue Sign Up

    return(
        <>
        <div className="container gradient search-section">
            <div className="section">
                <div>
                    <h1 className="text-white">Find the freelance services that you need</h1>
                    <div className="search-container">
                        <input type="text" placeholder="What service are you looking for?" className="input search" id="searchField" />
                        <p className="text-center text-white"> or</p>
                        <a href="signup" className="btn blue center"> Become a Seller</a>
                    </div>
                </div>
                <div className="image-half">
                    <img src="https://via.placeholder.com/275x275" alt="people" />
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
                <h2>Using Quant is easy</h2>
                <div className="info-container">
                    {usageJsxElements}
                </div>
            </div>
        </div>

        <div className="container dark cta-section">
            <div className="section">
                <h1 className="text-white">Want to join the fun?</h1>
                <p className="text-white">Sign up now to purchase or sell services.</p>
                <a href="signup" className="btn blue">Sign Up</a>
            </div>
        </div>
        </>
    );

}