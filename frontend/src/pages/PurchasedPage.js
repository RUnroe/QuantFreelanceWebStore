import React, { useEffect, useState } from "react";
import { useParams, Redirect, Link } from 'react-router-dom';
import "../styles/purchased.css";

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
                <h1>Order Confirmation</h1>
                <p>You have sucessfully purchased { product  && product.title ? product.title : "the product"}! Please wait for the seller to accept your order.</p>
                

                <Link class="btn blue-outline center" to="/">Continue Browsing</Link>
            </div>
        </div>

    );
}