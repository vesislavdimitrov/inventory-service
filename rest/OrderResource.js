import express from "express";
import OrderPersistence from "../persistence/OrderPersistence.js";
import { handleError } from "./ResponseUtil.js";

const router = express.Router().use(express.json());
const orderPersistence = new OrderPersistence();

router.post("/orders", async (request, response) => {
    try {
        response.status(201).json(await orderPersistence.create(request.body));
    } catch (error) {
        handleError(error, response);
    }
});

router.get("/orders/:orderId", async (request, response) => {
    try {
        response
            .status(200)
            .json(await orderPersistence.getById(request.params.orderId));
    } catch (error) {
        handleError(error, response);
    }
});

router.get("/orders", async (request, response) => {
    try {
        response.status(200).json(await orderPersistence.getAll());
    } catch (error) {
        handleError(error, response);
    }
});

router.put("/orders/:orderId", async (request, response) => {
    try {
        response
            .status(200)
            .json(
                await orderPersistence.update(
                    request.params.orderId,
                    request.body
                )
            );
    } catch (error) {
        handleError(error, response);
    }
});

router.delete("/orders/:orderId", async (request, response) => {
    try {
        await orderPersistence.delete(request.params.orderId);
        response.status(204).send();
    } catch (error) {
        handleError(error, response);
    }
});

export default router;
