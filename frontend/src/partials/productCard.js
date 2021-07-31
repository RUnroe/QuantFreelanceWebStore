import { Link } from "react-router-dom";
import "../styles/productCard.css";


export default function ProductCard({productData}) {
    const formatPrice = (price) => {
        let fprice = Math.floor(price * 100);
        fprice = fprice + "";
        fprice= fprice.slice(0, fprice.length-2) + "." + fprice.slice(fprice.length-2);
        return fprice;
    }

    return (
        <Link to={`/store/${productData.product_id}`} >
            <div className="product-card">
                <div className="top img-container">
                    <img src={productData.icon_id} alt="Product"/>
                </div>
                <div className="bottom">
                    <h3 className="title">{productData.title}</h3>
                    <div class="profile-section">
                        <div><img src={productData.user.icon_id} alt="user"/></div>
                        <p>{productData.description}</p>
                        <span className="price">{`$${formatPrice(productData.price)}`}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}