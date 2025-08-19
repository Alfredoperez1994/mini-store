import React, { useState, useEffect } from "react";
import ProductGallery from "../ProductGallery/ProductGallery";
import CategoryGallery from "../CategoryGallery/CategoryGallery";
import Cart from "../Cart/Cart";
import CartSidebar from "../CartSidebar/CartSidebar";
import ProgressStepper from "../ProgressStepper/ProgressStepper";
import products from "../../data/products";
import "./MiniStore.css";

const MiniStore = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("cartItems");
        return saved ? JSON.parse(saved) : [];
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Guardar carrito en localStorage cada vez que cambia
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Agregar producto
    const handleAddToCart = (product) => {
        setCartItems((prevCart) => {
            const found = prevCart.find((item) => item.id === product.id);
            if (found) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Quitar producto
    const handleRemoveFromCart = (productId) => {
        setCartItems((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    // Total de productos para el contador
    const totalQuantity = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    return (
        <section className="mini-store">
            {/* Barra de progreso */}
            <div className="progress-container">
                <ProgressStepper cartItems={cartItems} />
            </div>

            {/* Galerías */}
            {!activeCategory ? (
                <ProductGallery
                    products={products}
                    onViewMore={setActiveCategory}
                    onAddToCart={handleAddToCart}
                />
            ) : (
                <CategoryGallery
                    category={activeCategory}
                    products={products}
                    onClose={() => setActiveCategory(null)}
                    onAddToCart={handleAddToCart}
                />
            )}

            {/* Botón fijo con contador */}
            <button
                className="open-cart-btn"
                onClick={() => setIsSidebarOpen(true)}
            >
                🛒
                {totalQuantity > 0 && (
                    <span className="cart-badge">{totalQuantity}</span>
                )}
            </button>

            {/* Carrito fijo abajo */}
            <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />

            {/* Sidebar */}
            <CartSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
            />
        </section>
    );
};

export default MiniStore;
