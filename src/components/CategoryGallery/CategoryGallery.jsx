import React from "react";
import "./CategoryGallery.css";

const CategoryGallery = ({ category, products, onClose, onAddToCart }) => {
  const categoryProducts = products.filter((p) => p.category === category);

  return (
    <div className="category-gallery">
      <div className="gallery-header">
        <h2>{category}</h2>
        <button onClick={onClose} className="close-btn" aria-label="Cerrar categoría">
          ✕
        </button>
      </div>

      <div className="gallery-products">
        {categoryProducts.map((product) => (
          <div key={product.id} className="gallery-product-card">
            {/* Badge de categoría */}
            <span className="product-badge">{product.category}</span>

            <img src={product.image} alt={product.name} />
            <div className="product-details">
              <p className="product-name">{product.name}</p>
              <p className="product-price">${product.price}</p>
              <button
                className="add-btn"
                onClick={() => onAddToCart(product)}
              >
                AGREGAR
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGallery;
