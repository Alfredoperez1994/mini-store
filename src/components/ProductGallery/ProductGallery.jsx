import React from "react";
import "./ProductGallery.css";

// Función auxiliar para agrupar productos por categoría y tomar uno destacado
const getFeaturedByCategory = (products) => {
    const grouped = {};
    products.forEach((product) => {
        if (!grouped[product.category]) {
            grouped[product.category] = product;
        }
    });
    return Object.values(grouped);
};

const ProductGallery = ({ products, onViewMore, onAddToCart }) => {
    const featuredProducts = getFeaturedByCategory(products);

    return (
        <div className="product-gallery">
            {featuredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                    />
                    <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-category">{product.category}</p>
                        <p className="product-price">${product.price}</p>
                        <div className="product-buttons">
                            <button onClick={() => onViewMore(product.category)}>
                                FRAGANCIAS DISPONIBLES
                            </button>
                            <button onClick={() => onAddToCart(product)}>AGREGAR AL CARRITO</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGallery;
