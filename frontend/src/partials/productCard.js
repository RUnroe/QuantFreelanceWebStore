import { Link } from "react-router-dom";
import "../styles/productCard.css";


export default function ProductCard({productData, mode}) {
    const formatPrice = (price) => {
        let fprice = Math.floor(price * 100);
        fprice = fprice + "";
        fprice= fprice.slice(0, fprice.length-2) + "." + fprice.slice(fprice.length-2);
        return fprice;
    }

    return (
        <Link className="product-card" to={`/store/${productData.product_id}`} >
            {mode === "edit" ? <Link className="edit-btn" to={`/store/${productData.product_id}/edit`}>
                <i className="far fa-edit"></i>
            </Link>
            : <></>}
            <div className="top img-container">
                <img src={productData.icon_id} alt="Product"/>
            </div>
            <div className="bottom">
                <h3 className="title">{productData.title}</h3>
                <div class="profile-section">
                    <div><img src={productData.user.icon_id.includes("/api/") ? productData.user.icon_id : `/api/icon/${productData.user.icon_id}`} /></div>
                    <p>{productData.user.username}</p>
                </div>
                <p className="description">{productData.description}</p>
                <p className="price">{`$${formatPrice(productData.price)}`}</p>
            </div>
        </Link>
    )
}