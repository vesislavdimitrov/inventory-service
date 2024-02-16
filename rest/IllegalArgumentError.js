class IllegalArgument extends Error {

    constructor(errorMessage) {
        super(errorMessage);
        this.id = "illegal_argument_error";
    }
}

export default IllegalArgument;