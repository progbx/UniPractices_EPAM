// kiss.js
export function calculateDiscountedPrice({ basePrice, discountPercentage, taxPercentage, shippingCost, couponCode }) {
    let discountAmount = (basePrice * discountPercentage) / 100;
    let subTotal = basePrice - discountAmount;
    let taxAmount = (subTotal * taxPercentage) / 100;
    let total = subTotal + taxAmount + shippingCost;

    if (couponCode) {
        total = getTotalWithCoupon({ couponCode, total });
    }

    return total.toFixed(2);
}

function getTotalWithCoupon({ couponCode, total }) {
    if (couponCode.length !== 6) {
        throw new Error('Invalid coupon code');
    }
    let discountAmount = total * 0.1;
    return total - discountAmount;
}
