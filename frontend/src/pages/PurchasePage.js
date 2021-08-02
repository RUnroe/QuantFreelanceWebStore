import React, { useEffect, useState } from "react";
import { useParams, Redirect } from 'react-router-dom';
import "../styles/purchase.css";
import ProductCard from "../partials/productCard";

export default function PurchasePage() {
    const { product_id } = useParams();
    const [redirect, setRedirect] = useState(false);
    const [productData, setProductData] = useState({
        title: "",
        price: 0,
        description: "...",
        user: {
            icon_id: "https://ui-avatars.com/api/?background=45B69C",
            username: "User"
        }
    });

    useEffect(() => {
        //get product info
        fetch(`/api/product/${product_id}`)
        .then(response => response.json())
        .then(productData => {
            fetch(`/api/user/${productData.seller}`)
            .then(result => result.json())
            .then(userData => {
                const data = Object.assign(productData, {user: userData});
                setProductData(data);
            });
        })
        .catch(err => setRedirect("/"));
    }, []);


    if(redirect) return < Redirect to={redirect}/>;
    return(
        <div className="section">
            <div className="container">
                <h1>Purchase</h1>
                <div className="column">
                    <ProductCard productData={productData} />
                    <div className="purchase-section">
                        <h2>Billing Address</h2>
                    </div>
                    <div className="purchase-section">
                        <h2>Card Information</h2>
                    </div>
                    <div className="purchase-section">
                        <h2>Comments</h2>
                        <textarea> </textarea>
                    </div>
                    <hr/>
                    <div className="final-section">
                        <h2>Purchase "{productData.title}" for ${productData.price}?</h2>
                        <div className="btn-group">
                            <button className="btn green-outline">Cancel</button>
                            <button className="btn green">Purchase</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}