import React, { useEffect, useState } from "react";
import { useParams, Redirect, Link } from 'react-router-dom';
import "../styles/account.css";
import ProductCard from "../partials/productCard";

export default function AccountPage({currUser, authLevel, checkAuth}) {
    const { username } = useParams();
    const [user, setUser] = useState();
    const [products, setProducts] = useState();
    const [productListJSX, setProductListJSX] = useState();
    const [redirect, setRedirect] = useState(false);

    const getUserData = async () => {
        fetch(`/api/user/info/${username}`)
        .then(response => response.json())
        .then(data => {
            setUser(data);
        }).catch(error => {
            setRedirect("/");
        });
    }
    useEffect(() => {
        getUserData();
    }, []);

    const getUsersProducts = async () => {
        fetch(`/api/product/seller/${user.user_id}`)
        .then(response => response.json())
        .then(data => {
            setProducts(data);
        });
    }
    useEffect(() => {
        if(user) getUsersProducts();
    }, [user])

    const convertListToJSX = () => {
        const jsx = [];
        products.forEach(result => {
            if(user && user.user_id === currUser.user_id) jsx.push(<ProductCard productData={result} mode={"edit"}/>);
            else jsx.push(<ProductCard productData={result} />);
        });
        setProductListJSX(jsx);
    }

    useEffect(() => {
        if(products) convertListToJSX();
    }, [products]);

    const getTitle = () => {
        let name = user ? `${user.first_name} ${user.last_name}'` : " ";
        if(name[name.length-1].toLowerCase() !== "s") name += "s";
        return `${name} Services`;
    }
    const makeAccountSeller = () => {
        const data = {
            is_seller: true
        }
        fetch("/api/user", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
        })
        .then(response => {
            if(response.ok) {
                checkAuth();
            }
        });


    }


    if(redirect) return < Redirect to={redirect}/>;
    return(
        <div className="container">
            <div className="section account-page">
                <div className="account-container container gradient">
                    <div className="top-section">
                        <div className="round-img-container"><img src={user ? user.icon_id : ""} /></div>
                        <h3 className="name">{user ? `${user.first_name} ${user.last_name}` : ""}</h3>
                        <h3 className="username">{user ? `@${user.username}` : ""}</h3>
                        <p className="email">{user ? user.email : ""}</p>
                    </div>
                    <div className="bottom-section">
                        {user ? user.user_id === currUser.user_id && authLevel === "buyer" ? <p className="seller-link" onClick={makeAccountSeller}>Become a seller</p> : "" : ""}
                        {user ? user.user_id === currUser.user_id ? <Link to="/account/settings" className="btn blue center">Edit Account</Link> : "" : ""}
                    </div>
                </div>
                <div className="service-side container">
                    <h1 className="title">{getTitle()}</h1>
                    <div className="service-list">
                        {productListJSX}
                    </div>
                </div>
            </div>
        </div>
    );

}