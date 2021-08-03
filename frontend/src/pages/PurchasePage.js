import React, { useEffect, useState } from "react";
import { useParams, Redirect } from 'react-router-dom';
import "../styles/purchase.css";
import ProductCard from "../partials/productCard";

export default function PurchasePage({userId}) {
    const { product_id } = useParams();
    const [redirect, setRedirect] = useState(false);

    const [comment, setComment] = useState("");

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
                if(userData.user_id === userId) setRedirect("/");
                setProductData(data);
            });
        })
        .catch(err => setRedirect("/"));
    }, []);

    const purchaseProduct = () => {
        //send request to record order
        //on response, redirect
        const orderData = {
            seller: productData.user.user_id,
            message: comment,
            product_id: productData.product_id
        }
        fetch("/api/order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(orderData)
        })
        .then(response => {
            if(response.ok) {
                setRedirect("/purchased");
            }
        });
    }


    if(redirect && redirect === "/purchased") return < Redirect push to={redirect}/>;
    if(redirect) return < Redirect to={redirect}/>;
    return(
        <div className="section purchase-page">
            <div className="container split">
                <div className="left-side">
                    <h1>Purchase</h1>
                    <div className="column">
                        <div className="purchase-section">
                            <h2>Billing Address</h2>
                            <div className="input-block">
                                <input className="input" type="text" placeholder="Address 1" />
                            </div>
                            <div className="input-block">
                                <input className="input" type="text" placeholder="Address 2" />
                            </div>
                            <div className="input-block flex">
                                <input className="input" type="text" placeholder="City" />
                                <input className="input" type="text" placeholder="State" />
                                <input className="input" type="text" placeholder="Zip" />
                            </div>
                        </div>
                        <div className="purchase-section">
                            <h2>Card Information</h2>
                            <div className="input-block">
                                <input className="input" type="text" placeholder="Card Number" autocomplete="off" />
                            </div>
                            <div className="input-block flex">
                                <input className="input" type="text" placeholder="MM / YY" autocomplete="off" />
                                <input className="input" type="text" placeholder="CVV" autocomplete="off" />
                            </div>

                        </div>
                        <div className="purchase-section">
                            <h2>Comments</h2>
                            <div className="input-block">
                                <textarea className="input" value={comment} onInput={(event) => setComment(event.target.value)}> </textarea>
                            </div>
                        </div>
                        <hr/>
                        <div className="final-section">
                            <h2>Purchase "{productData.title}" for ${productData.price}?</h2>
                            <div className="btn-group">
                                <button className="btn green-outline" onClick={() => setRedirect(`/store/${product_id}`)}>Cancel</button>
                                <button className="btn green" onClick={purchaseProduct}>Purchase</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-card-container">
                    <ProductCard productData={productData} />
                </div>
            </div>
        </div>
    );

}