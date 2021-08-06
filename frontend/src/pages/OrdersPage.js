import React, { useEffect, useState } from "react";
import "../styles/order.css";
import { Link, Redirect } from 'react-router-dom';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [pendingJSX, setPendingJSX] = useState();
    const [inProgressJSX, setInProgressJSX] = useState();
    const [declinedJSX, setDeclinedJSX] = useState();
    const [redirect, setRedirect] = useState();

    useEffect(() => {
        fetch("/api/order/customer/current", {credentials: "include"})
        .then(response => response.json())
        .then(data => {
            setOrders(data);
        })
        .catch(err => setRedirect("/"))
    }, []);

    useEffect(() => {
        renderHistoryJSX();
    }, [orders]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());
    }


    const renderHistoryJSX = () => {
        const jsx = {pending: [], inProgress: [], declined: []};
        orders.forEach(element => {
            let orderType;
            if (element.status === "pending")  orderType = "pending";
            else if (element.status === "accepted")  orderType = "inProgress";
            else if (element.status === "declined")  orderType = "declined";
            jsx[orderType].push(
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
        setPendingJSX(jsx.pending);
        setInProgressJSX(jsx.inProgress);
        setDeclinedJSX(jsx.declined);
    }
    if(redirect && redirect === "/") return < Redirect to={redirect}/>;
    else if(redirect) return < Redirect push to={redirect}/>;
    return(
        <div className="section">
            <div className="container order-page">
                <h1>Your Purchase History</h1>
                <div className="order-page-section">
                    <h2>Pending</h2>
                    <div className="purchase-list">
                        {pendingJSX}
                    </div>
                </div>
                <div className="order-page-section">
                    <h2>In-Progress</h2>
                    <div className="purchase-list">
                        {inProgressJSX}
                    </div>
                </div>
                <div className="order-page-section">
                    <h2>Declined</h2>
                    <div className="purchase-list">
                        {declinedJSX}
                    </div>
                </div>
            </div>
        </div>
    );

}