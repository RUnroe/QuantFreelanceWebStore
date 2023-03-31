import { Link } from "react-router-dom";
import { formatPrice } from "../shared";
import "../styles/productCard.css";
import { getIconUrl } from "./requests";

export default function ProductCard({ productData, mode, setDeleteModal }) {
  

  const openDeleteModal = (evt) => {
    evt.preventDefault();
    setDeleteModal(productData);
  };

  if (productData.title.trim() === "") {
    if (mode === "edit") {
      productData.title = "Untitled";
    } else return <></>;
  }
  return (
    <Link className="product-card" to={`/store/${productData.product_id}`}>
      {mode === "edit" && (
        <>
          <Link
            className="edit-btn"
            to={`/store/${productData.product_id}/edit`}
            title="Edit service"
          >
            <i className="far fa-edit"></i>
          </Link>
          <button
            className="delete-btn"
            onClick={(evt) => openDeleteModal(evt)}
          >
            <i className="far fa-trash"></i>
          </button>
        </>
      )}
      <div className="top img-container">
        <img src={getIconUrl(productData.icon_id)} alt="Product" />
      </div>
      <div className="bottom">
        <div>
          <h3 className="title">{productData.title}</h3>
          <div class="profile-section">
            <div>
              <img src={getIconUrl(productData.user.icon_id)} />
            </div>
            <p>{productData.user.username}</p>
          </div>
          <p className="description">{productData.description}</p>
        </div>
        <p className="price">{formatPrice(productData.price)}</p>
      </div>
    </Link>
  );
}
