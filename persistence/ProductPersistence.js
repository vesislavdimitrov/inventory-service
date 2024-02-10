import Product from '../model/Product.js';

class ProductPersistence {

    create(product) {
        try {
            console.log(product);
            const createdProduct = Product.create(product);
            return createdProduct;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    }

    getById(productId) {
        try {
            const product = Product.findByPk(productId);
            return product;
        } catch (error) {
            console.error("Error reading product by ID:", error);
            throw error;
        }
    }

    /**
     * TODO
     *  Probably gonna need to be able to update and delete ;)
     */
}

export default ProductPersistence;
