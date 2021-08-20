import React, { useEffect, useState } from "react";
import { useParams, Redirect, Link } from 'react-router-dom';
import "../styles/account.css";
import ProductCard from "../partials/productCard";

export default function AccountPage({currUser, authLevel, checkAuth, setCurrAuthLevel}) {
    const { username } = useParams();
    const [user, setUser] = useState();
    const [products, setProducts] = useState();
    const [productListJSX, setProductListJSX] = useState();
    const [redirect, setRedirect] = useState(false);

    const [deleteModal, setDeleteModal] = useState(false);

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
    }, [user]);

    const convertListToJSX = () => {
        const jsx = [];
        products.forEach(result => {
            if(user && user.user_id === currUser.user_id && authLevel === "seller") jsx.push(<ProductCard productData={result} mode={"edit"} setDeleteModal={setDeleteModal}/>);
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
                setCurrAuthLevel("seller");
            }
        });


    }
    const createProduct = () => {
        const emptyProduct = {
            price: 0,
            title: "",
            description: "",
            category: "DesignArt",
            page_structure: "[]",
            icon_id: ""
        }
        fetch("/api/product", {
            method: "POST",
            credentials:"include",
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(emptyProduct)
        }).then(result => result.json())
        .then(data => {
            setRedirect(`/store/${data}/edit`);
        })
    }

    const closeModal = () => {
        setDeleteModal(false);
    }
    const deleteProduct = () => {
        console.log("delete", deleteModal.id);
        fetch("/api/product", {
            method: "DELETE",
            credentials:"include",
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({"product_id": deleteModal.product_id})
        })
        .then(data => {
            console.log(data);
            if(data.status == "204") closeModal();
        })
        
    }


    if(redirect) return < Redirect to={redirect}/>;
    return(
        <>
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
                    <div className="title-bar">
                        <h1 className="title">{getTitle()}</h1>
                        {user ? user.user_id === currUser.user_id && authLevel === "seller" ? <button title="Create new service" className="btn blue" onClick={createProduct}>+</button>: <></> :<></>}
                    </div>
                    <div className="service-list">
                        {productListJSX}
                    </div>
                </div>
            </div>
        </div>


        <div className={`modal ${ deleteModal ? "visible" : ""}`} id="deleteModal">
            <div className="modal-header">
                <h2>Delete '{deleteModal ? deleteModal.title : ""}'?</h2>
                <button onClick={closeModal}><i className="fas fa-times"></i></button>
            </div>
            <div className="modal-body">
                <div className="btn-group">
                    <button className="btn danger-outline" onClick={closeModal}>Cancel</button>
                    <button className="btn danger" onClick={deleteProduct}>Delete</button>
                </div>
            </div>
        </div>
        <div className={`screen ${ deleteModal ? "visible" : ""}`} id="deleteModalScreen" onClick={closeModal}></div>
        </>
    );

}