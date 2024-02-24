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
            LOADING_TEXT: "Please wait..",
            DELETE_CONFIRMATION_MSG:
                "Are you sure you want to delete this item?",
        };
    },
    true // exports the module
);
