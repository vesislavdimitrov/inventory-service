import Product from "../model/Product.js";
import ProductNotFoundError from "./ProductNotFoundError.js";

class ProductPersistence {

    async create(product) {
        return await Product.create(product);
    }

    async getAll() {
        return await Product.findAll();
    }

    async getById(productId) {
        const product = await Product.findByPk(productId);
        this.#assertExists(product, productId);
        return product;
    }

    async update(productId, updatedProductData) {
        const product = await Product.findByPk(productId);
        this.#assertExists(product, productId);
        return await product.update(updatedProductData);
    }

    async delete(productId) {
        const product = await Product.findByPk(productId);
        this.#assertExists(product, productId);
        await product.destroy();
    }

    #assertExists(product, id) {
        if (!product) {
            throw new ProductNotFoundError(id);
        }
    }
}

export default ProductPersistence;
