const {v4: uuidv4} = require('uuid');

class Product {

    #id;
    #name;
    #description;

    constructor(name, description, id) {
        this.#name = name;
        this.#description = description;
        this.#id = id || uuidv4();
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description
        };
    }
}

module.exports = Product;