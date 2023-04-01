import React, { useEffect, useState } from "react";
import { useParams, Redirect, Link } from 'react-router-dom';
import "../styles/account.css";
import ProductCard from "../partials/productCard";
import { getUserByUsername, updateCurrentUser } from "../webservice/user";
import { deleteProduct, getProductsByUser } from "../webservice/product";

const AccountPage = ({currUser, authLevel, checkAuth, setCurrAuthLevel}) => {
    const { username } = useParams();
    const [user, setUser] = useState();
    const [products, setProducts] = useState();
    const [redirect, setRedirect] = useState(false);

    const [productToDelete, setProductToDelete] = useState(false);

    const getUserData = () => {
        getUserByUsername(username)
        .then(data => {
            setUser(data);
        }).catch( () => {
            setRedirect("/");
        });
    }
    useEffect(() => {
        getUserData();
    }, []);

    const getUsersProducts = async () => {
        getProductsByUser(user.user_id)
        .then(data => {
            setProducts(data);
        });
    }
    useEffect(() => {
        if(user) getUsersProducts();
    }, [user]);



    const getTitle = () => {
        let title = "";
        if(user) {
            let name = `${user.first_name} ${user.last_name}'`;
            if(name[name.length-1].toLowerCase() !== "s") name += "s";
            title = `${name} Services`;
        }
        return title;
    }
    const convertToSellerAccount = () => {
        const userData = {
            is_seller: true
        }
        updateCurrentUser(userData)
        .then(response => {
            if(response.ok) {
                setCurrAuthLevel("seller");
            }
        });


    }
    const createProduct = () => {
        createProduct()
        .then(newProductId => {
            setRedirect(`/store/${newProductId}/edit`);
        })
    }

    const closeModal = () => {
        setProductToDelete(false);
    }
    const handleDelete = () => {
        deleteProduct(productToDelete.product_id)
        .then(data => {
            if(data.status == "204") {
                //Delete local instance
                const newProducts = products.filter(product => product.product_id !== productToDelete.product_id);
                setProducts(newProducts);
                closeModal();
            }
        })
        
    }


    if(redirect) return < Redirect to={redirect}/>;
    return (
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
                        {user && user.user_id === currUser.user_id && authLevel === "buyer" ? <p className="seller-link" onClick={convertToSellerAccount}>Become a seller</p> : ""}
                        {user && user.user_id === currUser.user_id ? <Link to="/account/settings" className="btn blue center">Edit Account</Link> : ""}
                    </div>
                </div>
                <div className="service-side container">
                    <div className="title-bar">
                        <h1 className="title">{getTitle()}</h1>
                        {user ? user.user_id === currUser.user_id && authLevel === "seller" ? <button title="Create new service" className="btn blue" onClick={createProduct}>+</button>: <></> :<></>}
                    </div>
                    <div className="service-list">
                        {
                            products?.map(product => {
                                return (user && user.user_id === currUser.user_id && authLevel === "seller") ?
                                <ProductCard productData={product} mode={"edit"} setDeleteModal={setProductToDelete}/> :
                                <ProductCard productData={product} />;
                            })
                        }
                    </div>
                </div>
            </div>
        </div>


        <div className={`modal ${ productToDelete ? "visible" : ""}`} id="deleteModal">
            <div className="modal-header">
                <h2>Delete '{productToDelete ? productToDelete.title : ""}'?</h2>
                <button onClick={closeModal}><i className="fas fa-times"></i></button>
            </div>
            <div className="modal-body">
                <div className="btn-group">
                    <button className="btn danger-outline" onClick={closeModal}>Cancel</button>
                    <button className="btn danger" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
        <div className={`screen ${ productToDelete ? "visible" : ""}`} id="deleteModalScreen" onClick={closeModal}></div>
        </>
    );

}

export default AccountPage;