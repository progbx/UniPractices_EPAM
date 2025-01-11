export function calculateTotalCost(totalPrice, discountPercentage, isPremiumMember) {
    const isInvalidPrice = typeof totalPrice !== 'number' || totalPrice <= 0;
    const isInvalidDiscount = typeof discountPercentage !== 'number' || discountPercentage < 0 || discountPercentage > 100;

    if (isInvalidPrice || isInvalidDiscount) {
        return null;
    }

    let discount = 0;

    if (isPremiumMember) {
        discount = (discountPercentage / 100) * totalPrice;
    } else {
        discount = (discountPercentage / 2 / 100) * totalPrice;
    }

    const finalTotal = totalPrice - discount;

    return finalTotal.toFixed(2);
}