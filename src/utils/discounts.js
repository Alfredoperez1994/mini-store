

// Retorna el % de descuento global según las unidades totales
export const getGlobalDiscountRate = (totalUnits) => {
    if (totalUnits >= 60) return 0.25; // 25% OFF
    if (totalUnits >= 24) return 0.15; // 15% OFF + envío gratis
    if (totalUnits >= 6) return 0.10;  // 10% OFF
    return 0; // sin descuento
};
