import express from "express";
import ProductService from "./ProductService.js";

const router = express.Router().use(express.json());
const productService = new ProductService();

const INTERNAL_SERVER_ERROR = "Internal Server Error";
const NOT_FOUND_ERR_ID = "product_not_found";
const ILLEGAL_ARG_ERR_ID = "illegal_argument_error";

router.post("/products", async (request, response) => {
    try {
        response
            .status(201)
            .json(await productService.createProduct(request.body));
    } catch (error) {
        handleError(error, response);
    }
});

router.get("/products/:productId", async (request, response) => {
    try {
        response
            .status(200)
            .json(
                await productService.getProductById(request.params.productId)
            );
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
        response
            .status(200)
            .json(
                await productService.updateProduct(
                    request.params.productId,
                    request.body
                )
            );
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

function handleError(error, response) {
    let statusCode;
    let errorMessage;

    switch (error.id) {
        case NOT_FOUND_ERR_ID:
            statusCode = 404;
            errorMessage = error.message;
            break;
        case ILLEGAL_ARG_ERR_ID:
            statusCode = 400;
            errorMessage = error.message;
            break;
        default:
            statusCode = 500;
            errorMessage = INTERNAL_SERVER_ERROR;
    }

    console.error(error);
    response.status(statusCode).json({ error: errorMessage });
}

export default router;
