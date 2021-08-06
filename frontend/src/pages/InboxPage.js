import React, { useEffect, useState } from "react";
import "../styles/order.css";
import "../styles/inbox.css";
import { Link, Redirect } from 'react-router-dom';

export default function InboxPage() {
    const [orders, setOrders] = useState([]);
    const [pendingJSX, setPendingJSX] = useState();
    const [inProgressJSX, setInProgressJSX] = useState();
    const [redirect, setRedirect] = useState();
    const [statusBar, setStatusBar] = useState();


    useEffect(() => {
        setTimeout(() => setStatusBar(""), 2500);
    }, [statusBar]);


    useEffect(() => {
        fetch("/api/order/seller/current", {credentials: "include"})
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

    const acceptOrder = (order_id) => {
        //send fetch request
        fetch(`/api/order/${order_id}`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({"status": "accepted"})
        });
        setStatusBar("Accepted order");
        //delete order from list in ORDERS
        //add order to in-progress
        const newOrders = orders.map(order => {
            if(order.order_id === order_id) order.status = "accepted";
            return order;
        });
        setOrders(newOrders);
    }

    const declineOrder = (order_id) => {
        //send fetch request
        fetch(`/api/order/${order_id}`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({"status": "declined"})
        });
        setStatusBar("Declined order");
        //delete order from list in ORDERS
        const newOrders = orders.filter(order => {
            return order.order_id !== order_id;
        });
        setOrders(newOrders);

    }

    const markAsCompleted = (order_id) => {
        //send fetch request
        fetch(`/api/order/${order_id}`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({"status": "completed"})
        });
        setStatusBar("Order has been marked as complete");
        //delete order from list in ORDERS 
        const newOrders = orders.filter(order => {
            return order.order_id !== order_id;
        }); 
        setOrders(newOrders);

    }


    const renderHistoryJSX = () => {
        const jsx = {"pending": [], "inProgress": []};
        orders.forEach(element => {
            
            if(element.status === "pending") {
                jsx["pending"].push(
                <label className="order-module">
                    <input type="checkbox"/>
                    <div className="order">
                        <div className="left-side">
                            <span className="title">{element.title ? element.title: "Service Title"}</span>
                        </div>
                        <div className="right-side">
                            <span className="date">{element.timestamp ? formatDate(element.timestamp): "mm/dd/yyyy"}</span>
                            <button className="btn green circle text-white" title="Accept Order" onClick={() => acceptOrder(element.order_id)}> <i className="fas fa-check"></i> </button>
                            <button className="btn danger-outline circle" title="Decline Order" onClick={() => declineOrder(element.order_id)}> <i className="fas fa-times"></i> </button>
                            <i className="fas fa-chevron-down"></i> 
                        </div>
                    </div>
                    <div className="message">
                        <p className="buyer-name">From {element.user && element.user.name ?  <Link to={`/account/${element.user.username}`}>{element.user.name} (@{element.user.username})</Link>: ""}</p>
                        <p className="message-desc">{element.message ? `\"${element.message}\"`: `\" \"`}</p>
                        </div>
                </label>
                );
            }
            else if (element.status === "accepted") {
                jsx["inProgress"].push(
                <label className="order-module">
                    <input type="checkbox"/>
                    <div className="order">
                        <div className="left-side">
                            <span className="title">{element.title ? element.title: "Service Title"}</span>
                        </div>
                        <div className="right-side">
                            <span className="date">{element.timestamp ? formatDate(element.timestamp): "mm/dd/yyyy"}</span>
                            <button className="btn green-outline" onClick={() => markAsCompleted(element.order_id)}>Mark as Complete</button>
                            <i className="fas fa-chevron-down"></i> 
                        </div>
                    </div>
                    <div className="message">
                        <p className="buyer-name">From {element.user && element.user.name ?  <Link to={`/account/${element.user.username}`}>{element.user.name} (@{element.user.username})</Link>: ""}</p>
                        <p className="message-desc">{element.message ? `\"${element.message}\"`: `\" \"`}</p>
                        </div>
                </label>
                );
            }
        });
        setPendingJSX(jsx.pending);
        setInProgressJSX(jsx.inProgress);
    }
    if(redirect && redirect === "/") return < Redirect to={redirect}/>;
    else if(redirect) return < Redirect push to={redirect}/>;
    return(
        <>
        <div className={statusBar ? "status-bar open" : "status-bar"}><p>{statusBar}</p></div>
        <div className="section">
            <div className="container order-page">
                <h1>Your Inbox </h1>
                {pendingJSX.length ? <div className="order-page-section">
                    <h2>Pending</h2>
                    <div className="purchase-list">
                        {pendingJSX}
                    </div>
                </div>: <></>}
                {inProgressJSX.length ? <div className="order-page-section">
                    <h2>In-Progress</h2>
                    <div className="purchase-list">
                        {inProgressJSX}
                    </div>
                </div>: <></>}
                {!pendingJSX.length && !inProgressJSX.length ? <h2 class="empty-page-header">Nothing in your inbox</h2> : <></>}
            </div>
        </div>
        </>
    );

}