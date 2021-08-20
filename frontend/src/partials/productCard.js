import { Link } from "react-router-dom";
import "../styles/productCard.css";


export default function ProductCard({productData, mode, setDeleteModal}) {
    const formatPrice = (price) => {
        if (price === 0) return "0.00";
        let fprice = Math.floor(price * 100);
        fprice = fprice + "";
        fprice= fprice.slice(0, fprice.length-2) + "." + fprice.slice(fprice.length-2);
        return fprice;
    }

    const openDeleteModal = () => {
        setDeleteModal(productData.product_id);
    }


    if(productData.title.trim() === "") return <></>;
    return (
        <Link className="product-card" to={`/store/${productData.product_id}`} >
            {mode === "edit" ? <><Link className="edit-btn" to={`/store/${productData.product_id}/edit`} title="Edit service">
                <i className="far fa-edit"></i>
            </Link>
            <div className="delete-btn" onClick={openDeleteModal}><i className="far fa-trash"></i></div>
            </>
            : <></>}
            <div className="top img-container">
                <img src={productData.icon_id} alt="Product"/>
            </div>
            <div className="bottom">
                <div>
                    <h3 className="title">{productData.title}</h3>
                    <div class="profile-section">
                        <div><img src={productData.user.icon_id.includes("/api/") ? productData.user.icon_id : `/api/icon/${productData.user.icon_id}`} /></div>
                        <p>{productData.user.username}</p>
                    </div>
                    <p className="description">{productData.description}</p>
                </div>
                <p className="price">{`$${formatPrice(productData.price)}`}</p>
            </div>
        </Link>
    )
}