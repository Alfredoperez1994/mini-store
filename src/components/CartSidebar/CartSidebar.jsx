import React from "react";
import "./CartSidebar.css";
import { getGlobalDiscountRate } from "../../utils/discounts";

const CartSidebar = ({ cartItems, onAddToCart, onRemoveFromCart, onClearCart, isOpen, onClose }) => {
    //  Cantidad total de unidades
    const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    //  Descuento global (según total de unidades)
    const discountRate = getGlobalDiscountRate(totalUnits);

    //  Totales
    const totalOriginal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const totalDiscounted = totalOriginal - totalOriginal * discountRate;

    return (
        <aside className={`cart-sidebar ${isOpen ? "open" : ""}`}>


            <div className="cart-header">
                <h2>Detalle de tu compra</h2>
                <button className="close-btn" onClick={onClose}>✖</button>
            </div>

            {/* Listado de productos */}

            <div className="cart-items">
                {cartItems.length === 0 ? (
                    <p className="empty-cart">El carrito está vacío</p>
                ) : (
                    cartItems.map((item) => {
                        const itemOriginal = item.price * item.quantity;
                        const itemDiscounted =
                            itemOriginal - itemOriginal * discountRate;

                        return (
                            <div className="cart-item" key={item.id}>

                                <div className="cart-item-info">
                                    <h3>{item.category}</h3>
                                    <h4>{item.name}</h4>

                                    {/* Precios */}
                                    {discountRate > 0 && (
                                        <p className="original-price">
                                            ${itemOriginal.toFixed(2)}
                                        </p>
                                    )}
                                    <p className="discounted-price">
                                        ${itemDiscounted.toFixed(2)}
                                    </p>

                                    <div className="quantity-controls">
                                        <button
                                            className="qty-btn"
                                            onClick={() => onRemoveFromCart(item.id)}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="qty-btn"
                                            onClick={() => onAddToCart(item)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => onRemoveFromCart(item.id)}
                                        className="remove-btn"
                                    >
                                        Quitar
                                    </button>
                                </div>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="cart-item-img"
                                />
                            </div>
                        );
                    })
                )}
            </div>

            {/* Total siempre visible */}
            {cartItems.length > 0 && (
                <div className="cart-total">
                    {discountRate > 0 ? (
                        <>
                            <p className="original-price">
                                Total: ${totalOriginal.toFixed(2)}
                            </p>
                            <p className="discounted-price">
                                Total con descuento: ${totalDiscounted.toFixed(2)}
                            </p>
                        </>
                    ) : (
                        <p>Total: ${totalOriginal.toFixed(2)}</p>
                    )}

                    {/* Botón Vaciar carrito */}
                    <button className="clear-cart-btn" onClick={onClearCart}>
                        Vaciar carrito
                    </button>

                    {/* Botón de WhatsApp */}
                    <a
                        className="whatsapp-btn"
                        href={`https://wa.me/5493518104942?text=${encodeURIComponent(
                            `¡Hola! Quiero hacer el siguiente pedido:\n\n${cartItems
                                .map((item) => {
                                    const itemOriginal = item.price * item.quantity;
                                    const itemDiscounted =
                                        itemOriginal - itemOriginal * discountRate;
                                    return `• ${item.name} x${item.quantity} - $${itemDiscounted.toFixed(2)}`;
                                })
                                .join("\n")}\n\nTotal final: $${totalDiscounted.toFixed(
                                    2
                                )}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Enviar pedido por WhatsApp
                    </a>
                </div>
            )}
        </aside>
    );
};

export default CartSidebar;
