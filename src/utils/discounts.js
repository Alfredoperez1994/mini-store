

// Retorna el % de descuento global según las unidades totales
export const getGlobalDiscountRate = (totalUnits) => {
    if (totalUnits >= 48) return 0.25; // 25%
    if (totalUnits >= 25) return 0.15; // 15% + envío gratis
    if (totalUnits >= 24) return 0.15; // 15%
    if (totalUnits >= 6) return 0.10;  // 10%
    return 0; // sin descuento
};
