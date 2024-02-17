const INTERNAL_SERVER_ERROR = "Internal Server Error";
const NOT_FOUND_ERR_ID = "not_found_err";
const ILLEGAL_ARG_ERR_ID = "illegal_argument_error";

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

export { handleError };
