import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/productCard.css";


export default function ProductCard({productData}) {
    return (
        <Link to={`/store/${productData.product_id}`} >
            <div className="product-card">
                <div className="top img-container">
                    <img src={productData.icon_id} alt="Product"/>
                </div>
                <div className="bottom">
                    <h3 className="title">{productData.title}</h3>
                    <div class="profile-section">
                        <div><img src={productData.user.icon_id}/></div>
                    </div>
                </div>
            </div>
        </Link>
    )
}