const PRODUCT_NOT_FOUND_ERR = (productId) =>
    `Product with ID ${productId} not found.`;

class ProductNotFound extends Error {

    constructor(productId) {
        super(PRODUCT_NOT_FOUND_ERR(productId));
        this.id = "product_not_found";
    }
}

export default ProductNotFound;
