import express from "express";
import ProductService from "./ProductService.js";
import { handleError } from "./ResponseUtil.js";

const router = express.Router().use(express.json());
const productService = new ProductService();

router.post("/products", async (request, response) => {
    try {
        response.status(201).json(await productService.createProduct(request.body));
    } catch (error) {
        handleError(error, response);
    }
});

router.get("/products/:productId", async (request, response) => {
    try {
        response.status(200).json(await productService.getProductById(request.params.productId));
    } catch (error) {
        handleError(error, response);
    }
});

router.get("/products", async (request, response) => {
    try {
        response.status(200).json(await productService.getAllProducts());
    } catch (error) {
        handleError(error, response);
    }
});

router.put("/products/:productId", async (request, response) => {
    try {
        response.status(200).json(await productService.updateProduct(request.params.productId, request.body));
    } catch (error) {
        handleError(error, response);
    }
});

router.delete("/products/:productId", async (request, response) => {
    try {
        await productService.deleteProduct(request.params.productId);
        response.status(204).send();
    } catch (error) {
        handleError(error, response);
    }
});

export default router;
