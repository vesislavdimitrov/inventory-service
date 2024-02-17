import NotFoundError from "./NotFoundError.js";

class Persistence {

    assertExists(entity, id, entityType) {
        if (!entity) {
            throw new NotFoundError(entityType, id);
        }
    }
}

export default Persistence;