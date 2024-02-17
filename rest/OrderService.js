import ProductPersistence from "../persistence/ProductPersistence.js";
import OrderPersistence from "../persistence/OrderPersistence.js";
import IllegalArgumentError from "./IllegalArgumentError.js";

class OrderService {
    #productPersistence;
    #orderPersistence;

    constructor() {
        this.#productPersistence = new ProductPersistence();
        this.#orderPersistence = new OrderPersistence();
    }

    async createOrder(order) {
        return await this.#orderPersistence.create(order);
    }

    async getOrderById(orderId) {
        return await this.#orderPersistence.getById(orderId);
    }

    async getAllOrders() {
        return await this.#orderPersistence.getAll();
    }

    async updateOrder(orderId, updatedOrder) {
        return await this.#productPersistence.update(orderId, updatedOrder);
    }

    async deleteOrder(orderId) {
        await this.#productPersistence.delete(orderId);
    }

}

export default OrderService;
