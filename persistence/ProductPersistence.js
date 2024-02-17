import Product from "../model/Product.js";
import Persistence from "./Persistence.js";

class ProductPersistence extends Persistence {

    async create(product) {
        return await Product.create(product);
    }

    async getAll() {
        return await Product.findAll();
    }

    async getById(productId) {
        const product = await Product.findByPk(productId);
        this.assertExists(product, productId, Product.entityName);
        return product;
    }

    async update(productId, updatedProductData) {
        const product = await Product.findByPk(productId);
        this.assertExists(product, productId, Product.entityName);
        return await product.update(updatedProductData);
    }

    async delete(productId) {
        const product = await Product.findByPk(productId);
        this.assertExists(product, productId, Product.entityName);
        await product.destroy();
    }
}

export default ProductPersistence;
