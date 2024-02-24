import ProductPersistence from "../persistence/ProductPersistence.js";
import OrderPersistence from "../persistence/OrderPersistence.js";
import IllegalArgumentError from "./IllegalArgumentError.js";

const EMPTY_ARGUMENT_ERR = "Body contains an empty argument!";
const INVALID_TIMESTAMP_ERR = "Timestamp create should be now!";

class OrderService {
    #orderPersistence;

    constructor() {
        this.#orderPersistence = new OrderPersistence();
    }

    async createOrder(order) {
        this.#assertNoEmptyArgs(order);
        this.#assertValidTimestamp(order.timestampCreated);
        return await this.#orderPersistence.create(
            this.#buildOrderObject(order));
    }

    async getOrderById(orderId) {
        return await this.#orderPersistence.getById(orderId);
    }

    async getOrderByProductId(productId) {
        return await this.#orderPersistence.getByProductId(orderId);
    }

    async getAllOrders() {
        return await this.#orderPersistence.getAll();
    }

    async updateOrder(orderId, updatedOrder) {
        this.#assertNoEmptyArgs(order);
        return await this.#orderPersistence.update(orderId, updatedOrder);
    }

    async deleteOrder(orderId) {
        await this.#orderPersistence.delete(orderId);
    }

    #buildOrderObject(order) {
        return {
            isAutomated: order.isAutomated,
            warehouseName: order.warehouseName,
            wareHouseLocation: order.wareHouseLocation,
            productId: order.productId
        };
    }

    #assertNoEmptyArgs(order) {
        const { productId, isAutomated, warehouseName, wareHouseLocation} = order;
        const args = [productId, isAutomated, warehouseName, wareHouseLocation];
        if (args.some((value) => !value)) {
            throw new IllegalArgumentError(EMPTY_ARGUMENT_ERR);
        }
    }

    #assertValidTimestamp(timestampCreated) {
        if (timestampCreated != Date.now() / 1000) {
            throw new IllegalArgumentError(INVALID_TIMESTAMP_ERR);
        }
    } 
}

export default OrderService;
