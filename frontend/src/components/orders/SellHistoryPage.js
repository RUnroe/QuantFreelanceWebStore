import React, { useEffect, useState } from "react";
import "../../styles/order.css";
import "../../styles/sellHistory.css";
import { Link, Redirect } from 'react-router-dom';

export default function SellHistoryPage() {
    const [sellHistory, setSellHistory] = useState([]);
    const [sellHistoryJSX, setSellHistoryJSX] = useState([]);
    const [redirect, setRedirect] = useState();

    useEffect(() => {
        fetch("/api/order/seller/past", {credentials: "include"})
        .then(response => response.json())
        .then(data => {
            setSellHistory(data);
        })
        .catch(err => setRedirect("/"))
    }, []);

    useEffect(() => {
        renderSellHistoryJSX();
    }, [sellHistory]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());
    }


    const renderSellHistoryJSX = () => {
        const jsx = [];
        sellHistory.forEach(element => {
            jsx.push(
            <label className="order-module">
                <input type="checkbox"/>
                <div className="order">
                    <div className="left-side">
                        <span className="title">{element.title ? element.title: "Service Title"}</span>
                    </div>
                    <div className="right-side">
                        <span className="date">{element.timestamp ? formatDate(element.timestamp): "mm/dd/yyyy"}</span>
                        <span className="price positive">${element.price ? element.price: "0"}</span>
                        <i className="fas fa-chevron-down"></i> 
                    </div>
                </div>
                <div className="message">
                    <p className="buyer-name">From {element.user && element.user.name ?  <Link to={`/account/${element.user.username}`}>{element.user.name} (@{element.user.username})</Link>: ""}</p>
                    <p className="message-desc">{element.message ? `\"${element.message}\"`: `\" \"`}</p>
                    </div>
            </label>
            );
        });
        setSellHistoryJSX(jsx);
    }
    if(redirect && redirect === "/") return < Redirect to={redirect}/>;
    else if(redirect) return < Redirect push to={redirect}/>;
    return(
        <div className="section">
            <div className="container sell-history-page">
                <h1>Your Sell History</h1>
                <div className="sell-list">
                    {sellHistoryJSX}
                </div>
                {!sellHistoryJSX.length ? <h2 class="empty-page-header">You don't have any completed sales yet</h2> : <></>}
            </div>
        </div>
    );

}