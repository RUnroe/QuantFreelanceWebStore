import React, { useEffect, useState } from "react";
import "../styles/purchaseHistory.css";

export default function PurchaseHistoryPage() {
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [purchaseHistoryJSX, setPurchaseHistoryJSX] = useState();

    useEffect(() => {
        setPurchaseHistory([1,1,1,1,1]);
    }, []);

    useEffect(() => {
        renderPurchaseHistoryJSX();
    }, [purchaseHistory]);
    
    const renderPurchaseHistoryJSX = () => {
        const jsx = [];
        purchaseHistory.forEach(element => {
            jsx.push(
            <label className="order-module">
                <input type="checkbox"/>
                <div className="order">
                    <div className="left-side">
                        <span className="title">Title</span>
                    </div>
                    <div className="right-side">
                        <span className="date">06/26/2021</span>
                        <span className="price negative">-$33</span>
                        <i className="fas fa-chevron-down"></i> 
                    </div>
                </div>
                <div className="message">
                    <p className="seller-name">Seller: {element.sellerName ? element.sellerName: ""}</p>
                    <p className="message-desc">{element.message ? `\"${element.message}\"`: `\"\"`}</p>
                    </div>
            </label>
            );
        });
        setPurchaseHistoryJSX(jsx);
    }
    
    return(
        <div className="section">
            <div className="container purchase-history-page">
                <h1>Your Purchase History</h1>
                <div className="purchase-list">
                    {purchaseHistoryJSX}
                </div>
            </div>
        </div>
    );

}