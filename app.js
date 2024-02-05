const express = require('express');
const Product = require('./model/Product');

const server = express();
const PORT = 3000;

let products = [];

server.use(express.json());

server.get('/products', (request, response) => {
    response.json(products);
});

server.get('/products/:id', (request, response) => {
    const productId = request.params.id;
    const product = products.find(
        p => p.id === productId
    );

    if (!product) {
        response.status(404).json({error: 'Product not found'});
    }
    response.json(product);
});

server.post('/products', (request, response) => {
    const {name, description} = request.body;
    const newProduct = new Product(name, description);
    products.push(newProduct);
    response.status(201).json(newProduct);
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});