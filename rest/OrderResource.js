import express from "express";
import OrderService from "./OrderService.js";
import { handleError } from "./ResponseUtil.js";

const router = express.Router().use(express.json());
const orderService = new OrderService();

router.post("/orders", async (request, response) => {
    try {
        response.status(201).json(await orderService.createOrder(request.body));
    } catch (error) {
        handleError(error, response);
    }
});

router.get("/orders/:orderId", async (request, response) => {
    try {
        response.status(200).json(await orderService.getOrderById(request.params.orderId));
    } catch (error) {
        handleError(error, response);
    }
});

router.get("/orders", async (request, response) => {
    try {
        response.status(200).json(await orderService.getAllOrders());
    } catch (error) {
        handleError(error, response);
    }
});

router.put("/orders/:orderId", async (request, response) => {
    try {
        response.status(200).json(await orderService.updateOrder(request.params.orderId, request.body));
    } catch (error) {
        handleError(error, response);
    }
});

router.delete("/orders/:orderId", async (request, response) => {
    try {
        await orderService.deleteOrder(request.params.orderId);
        response.status(204).send();
    } catch (error) {
        handleError(error, response);
    }
});

export default router;
