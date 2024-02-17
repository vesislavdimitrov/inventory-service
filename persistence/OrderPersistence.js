import Order from "../model/Order.js";
import Persistence from "./Persistence.js";

class OrderPersistence extends Persistence {

    async create(order) {
        return await Order.create(order);
    }

    async getAll() {
        return await Order.findAll();
    }

    async getById(orderId) {
        const order = await Order.findByPk(orderId);
        this.assertExists(order, orderId, Order.entityName);
        return order;
    }

    async update(orderId, updatedOrderData) {
        const order = await Order.findByPk(orderId);
        this.assertExists(order, orderId, Order.entityName);
        return await order.update(updatedOrderData);
    }

    async delete(orderId) {
        const order = await Order.findByPk(orderId);
        this.assertExists(order, orderId, Order.entityName);
        await order.destroy();
    }
}

export default OrderPersistence;
