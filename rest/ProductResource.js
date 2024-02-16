import express from "express";
import ProductPersistence from "../persistence/ProductPersistence.js";

const router = express.Router().use(express.json());
const productPersistence = new ProductPersistence();
const INTERNAL_SERVER_ERROR = "Internal Server Error";

router.post("/products", async (request, response) => {
    try {
        response
            .status(201)
            .json(await productPersistence.create(request.body));
    } catch (error) {
        handleError(error, response);
    }
});

router.get("/products/:productId", async (request, response) => {
    try {
        response.json(
            await productPersistence.getById(request.params.productId)
        );
    } catch (error) {
        handleError(error, response);
    }
});

router.get("/products", async (request, response) => {
    try {
        response.json(await productPersistence.getAll());
    } catch (error) {
        handleError(error, response);
    }
});

router.put("/products/:productId", async (request, response) => {
    try {
        response
            .status(200)
            .json(
                await productPersistence.update(
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
        await productPersistence.delete(request.params.productId);
        response.status(204).send();
    } catch (error) {
        handleError(error, response);
    }
});

function handleError(error, response) {
    if (error.id == "product_not_found") {
        console.error(error);
        response.status(404).json({ error: error.message });
        return;
    }
    console.error(error);
    response.status(500).json({ error: INTERNAL_SERVER_ERROR });
}

export default router;