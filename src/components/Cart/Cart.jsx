import React from "react";
import "./Cart.css";
import { getGlobalDiscountRate } from "../../utils/discounts";

const Cart = ({ cartItems, onRemoveFromCart }) => {
    const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    //  descuento global según total de unidades
    const discountRate = getGlobalDiscountRate(totalUnits);

    const totalOriginal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const totalDiscounted = totalOriginal - totalOriginal * discountRate;

    let benefitMessage = "";
    if (totalUnits < 6) {
        benefitMessage = `Comprá ${6 - totalUnits} unidades más y obtené 10% OFF`;
    } else if (totalUnits < 20) {
        benefitMessage = `Comprá ${20 - totalUnits} unidades obtené envio gratis!!`;
    } else if (totalUnits < 24) {
        benefitMessage = `Comprá ${24 - totalUnits} unidades más y obtené 15% OFF`;
    } else if (totalUnits < 60) {
        benefitMessage = `Comprá ${60 - totalUnits} unidades más y obtené 25% OFF`;
    } else {
        benefitMessage = "¡Ya tenés 25% OFF + envío gratis en tu compra!";
    }

    const generateWhatsAppMessage = () => {
        let message = "¡Hola! Quiero hacer el siguiente pedido:\n\n";
        cartItems.forEach((item) => {
            const itemOriginal = item.price * item.quantity;
            const itemDiscounted = itemOriginal - itemOriginal * discountRate;

            message += `• ${item.name} x${item.quantity} - $${itemDiscounted.toFixed(
                2
            )}\n`;
        });

        message += `\nTotal final: $${totalDiscounted.toFixed(2)}`;
        return `https://wa.me/5493518104942?text=${encodeURIComponent(message)}`;
    };

    return (
        <section className="cart">
            <h2 className="cart-title">Detalle de tu compra</h2>

            {cartItems.length === 0 ? (
                <p className="empty-cart">Todavía no agregaste productos.</p>
            ) : (
                <>
                    <ul className="cart-list">
                        {cartItems.map((item) => {
                            const itemOriginal = item.price * item.quantity;
                            const itemDiscounted =
                                itemOriginal - itemOriginal * discountRate;

                            return (
                                <li key={item.id} className="cart-item">
                                    <div className="item-info">
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-quantity">x{item.quantity}</span>

                                        {discountRate > 0 && (
                                            <span className="item-price-original">
                                                ${itemOriginal.toFixed(2)}
                                            </span>
                                        )}

                                        <span className="item-price">
                                            ${itemDiscounted.toFixed(2)}
                                        </span>
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => onRemoveFromCart(item.id)}
                                    >
                                        Quitar
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <p className="benefit-message">{benefitMessage}</p>

                    <div className="cart-total">
                        {discountRate > 0 ? (
                            <>
                                <p className="item-price-original">
                                    Total: ${totalOriginal.toFixed(2)}
                                </p>
                                <p className="item-price">
                                    Total con descuento: ${totalDiscounted.toFixed(2)}
                                </p>
                            </>
                        ) : (
                            <p>Total: ${totalOriginal.toFixed(2)}</p>
                        )}
                    </div>

                    <a
                        className="whatsapp-btn"
                        href={generateWhatsAppMessage()}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Enviar pedido por WhatsApp
                    </a>
                </>
            )}
        </section>
    );
};

export default Cart;
