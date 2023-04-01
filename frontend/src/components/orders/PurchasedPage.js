import React, { useEffect, useState } from "react";
import { useParams, Redirect, Link } from 'react-router-dom';
import "../../styles/purchased.css";

export default function PurchasePage() {
    const {order_id} = useParams();
    const [order, setOrder] = useState();
    const [product, setProduct] = useState();

    useEffect(() => {
        fetch(`/api/order/${order_id}`, {credentials: "include"})
        .then(response => response.json())
        .then(orderData => {
            setOrder(orderData);
            fetch(`/api/product/${orderData.product_id}`, {credentials: "include"})
            .then(response => response.json())
            .then(productData => {
                setProduct(productData);
            });
        });
    }, []);
    return (
        <div className="section purchased-page">
            <div className="container">
                <div class="top-section">
                    <h2>You have sucessfully ordered "{ product  && product.title ? product.title : "???"}"!</h2>
                    <div className="check-container">
                        <hr />
                        <div className="check"><i className="fas fa-check"></i></div>
                    </div>
                    
                    <p>Please wait for the seller to accept your order.</p>
                </div>

                <Link class="btn blue-outline center" to="/">Continue Browsing</Link>
            </div>
        </div>

    );
}