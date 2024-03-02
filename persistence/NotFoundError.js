const NOT_FOUND_ERR = (entityType, id) => `${entityType} with ID ${id} not found.`;

class NotFound extends Error {
    constructor(entityType, id) {
        super(NOT_FOUND_ERR(entityType, id));
        this.id = "not_found_err";
    }
}

export default NotFound;
