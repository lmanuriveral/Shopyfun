/**
 * This function calculates totalPrice of a new order
 * @param {Array} products cartProducts: Array of Objects
 * @returns {number} TotalPrice
 */
export const totalPrice = (product) => {
    let sum = 0
    product.forEach(products => sum += products.price)
    return sum 
}