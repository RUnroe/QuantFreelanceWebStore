import React, { useEffect, useState } from "react";
import "../../styles/order.css";
import "../../styles/purchaseHistory.css";
import { Link, Redirect } from 'react-router-dom';
export default function PurchaseHistoryPage() {
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [purchaseHistoryJSX, setPurchaseHistoryJSX] = useState([]);
    const [redirect, setRedirect] = useState();

    useEffect(() => {
        fetch("/api/order/customer/past", {credentials: "include"})
        .then(response => response.json())
        .then(data => {
            setPurchaseHistory(data);
        })
        .catch(err => setRedirect("/"))
    }, []);

    useEffect(() => {
        renderPurchaseHistoryJSX();
    }, [purchaseHistory]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());
    }


    const renderPurchaseHistoryJSX = () => {
        const jsx = [];
        purchaseHistory.forEach(element => {
            jsx.push(
            <label className="order-module">
                <input type="checkbox"/>
                <div className="order">
                    <div className="left-side">
                        <span className="title">{element.title ? element.title: "Service Title"}</span>
                    </div>
                    <div className="right-side">
                        <span className="date">{element.timestamp ? formatDate(element.timestamp): "mm/dd/yyyy"}</span>
                        <span className="price negative">-${element.price ? element.price: "0"}</span>
                        <i className="fas fa-chevron-down"></i> 
                    </div>
                </div>
                <div className="message">
                    <p className="seller-name">Seller:{element.user && element.user.name ?  <Link to={`/account/${element.user.username}`}>{element.user.name} (@{element.user.username})</Link>: ""}</p>
                    <p className="message-desc">{element.message ? `\"${element.message}\"`: `\" \"`}</p>
                    </div>
            </label>
            );
        });
        setPurchaseHistoryJSX(jsx);
    }
    if(redirect && redirect === "/") return < Redirect to={redirect}/>;
    else if(redirect) return < Redirect push to={redirect}/>;
    return(
        <div className="section">
            <div className="container purchase-history-page">
                <h1>Your Purchase History</h1>
                <div className="purchase-list">
                    {purchaseHistoryJSX}
                </div>
                {!purchaseHistoryJSX.length ? <h2 class="empty-page-header">You don't have any completed purchases yet</h2> : <></>}
            </div>
        </div>
    );

}