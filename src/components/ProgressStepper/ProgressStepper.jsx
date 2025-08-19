// src/components/ProgressStepper/ProgressStepper.jsx
import React from "react";
import "./ProgressStepper.css";

const ProgressStepper = ({ cartItems }) => {
    const milestones = [
        { amount: 6, label: "+6 unidades 10% de descuento" },
        { amount: 20, label: "+20 unidades Envío gratis" },
        { amount: 24, label: "+24 unidades 15% de descuento" },
        { amount: 60, label: "+60 unidades 25% de descuento" }
    ];

    const totalQuantity = (cartItems || []).reduce(
        (acc, item) => acc + (item.quantity || 0),
        0
    );

    const maxGoal = milestones[milestones.length - 1].amount;
    const progressPercent = Math.min((totalQuantity / maxGoal) * 100, 100);

    // ---------- lógica para texto dinámico ----------
    let dynamicLabel = "¡Mientras más compras, más descuento!";

    for (let i = milestones.length - 1; i >= 0; i--) {
        if (totalQuantity >= milestones[i].amount) {
            dynamicLabel = `✅ ${milestones[i].label}`;
            break;
        } else if (totalQuantity >= milestones[i].amount * 0.8) {
            const diff = milestones[i].amount - totalQuantity;
            dynamicLabel = `🔥 Te faltan ${diff} para ${milestones[i].label}`;
        }
    }

    return (
        <section className="progress-stepper sticky-progress">
            {/* Barra de progreso */}
            <div className="progress-bar-container">
                <div
                    className={`progress-bar-fill ${totalQuantity > 0 ? "active" : ""
                        }`}
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            {/* Milestones */}
            <div className="milestones">
                {milestones.map((milestone, index) => {
                    const reached = totalQuantity >= milestone.amount;
                    const closeToGoal =
                        totalQuantity >= milestone.amount * 0.8 && !reached;

                    return (
                        <div
                            key={index}
                            className={`milestone ${reached ? "reached" : ""} ${closeToGoal ? "near-goal" : ""
                                }`}
                        >
                            <div className="dot" />
                            <span className="label">{milestone.label}</span>
                        </div>
                    );
                })}
            </div>
            {/* Texto dinámico (visible en móvil) */}
            <p className="dynamic-label">{dynamicLabel}</p>
        </section>
    );
};

export default ProgressStepper;
