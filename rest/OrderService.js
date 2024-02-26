import ProductPersistence from "../persistence/ProductPersistence.js";
import OrderPersistence from "../persistence/OrderPersistence.js";
import IllegalArgumentError from "./IllegalArgumentError.js";

const EMPTY_ARGUMENT_ERR = "Body contains an empty argument!";
const PRODUCT_NOT_ACTIVE_ERR = "Product is not active!";
const INVALID_DELETE_AUTOMATED_ERR = "Order cannot be deleted if is automated";
const INVALID_PRODUCT_EXIST = "Оrder cannot be created because product does not exists"

class OrderService {
    #orderPersistence;

    constructor() {
        this.#orderPersistence = new OrderPersistence();
    }

    async createOrder(order) {
        this.#assertProductExist(order.productId);
        this.#assertNoEmptyArgs(order);
        this.#checkProductIsActive(order.productId);
        return await this.#orderPersistence.create(
            this.#buildOrderObject(order));
    }

    async getOrderById(orderId) {
        return await this.#orderPersistence.getById(orderId);
    }

    async getOrdersByProductId(productId) {
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
        this.#assertIsNotAutomated(orderId);
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
    
    #checkProductIsActive(productId) {
        const product =  ProductPersistence.getById(productId);
        if (!product || !product.isActive) {
            throw new IllegalArgumentError(PRODUCT_NOT_ACTIVE_ERR);
        }
    }

    #assertIsNotAutomated(orderId) {
        const order = this.#orderPersistence.getById(orderId);
        if (!order.isAutomated) {
            throw new IllegalArgumentError(INVALID_DELETE_AUTOMATED_ERR);
        }
    }

    #assertProductExist(productId){
        const product =  ProductPersistence.getById(productId);
        if (product == null){
            throw new IllegalArgumentError(INVALID_PRODUCT_EXIST);   
        }
    }
}

export default OrderService;
