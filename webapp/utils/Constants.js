sap.ui.define(
    function () {
        "use strict";

        return {
            /* HTTP */
            PRODUCTS_URL: "http://localhost:3000/products",
            ORDERS_URL: "http://localhost:3000/orders",

            /* Messages and titles */
            APP_TITLE: "Inventory Service",
            LOADING_TITLE: "Loading",
            ERROR_DIALOG_TITLE: "An error has ocurred",
            LOADING_TEXT: "Please wait..",
            DELETE_CONFIRMATION_MSG: "Are you sure you want to delete this item?",
            PRODUCT_DELETED_SUCCESS_MSG: "Product deleted successfully!",
            CHECKMARK_EMOJI: "✅", //the emoji code dream??
            CROSS_EMOJI: "❌",
            LABEL_PRODUCT_ID: "Product ID",
            LABEL_PRODUCT_NAME: "Name",
            LABEL_SERIAL_NUMBER: "Serial number",
            LABEL_MANUFACTURER: "Manufacturer",
            LABEL_QUANTITY: "Quantity",
            LABEL_EXPIRY_DATE: "Expiry date",
            LABEL_ACTIVITY_STATE: "Active",
        };
    },
    true // exports the module
);
