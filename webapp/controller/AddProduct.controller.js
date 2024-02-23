sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/UIComponent",
    ],
    function (Controller, MessageToast, JSONModel, UIComponent) {
        "use strict";

        return Controller.extend("inventory.controller.AddProduct", {
            onInit: function () {
                this.getView().setModel(
                    new JSONModel({
                        name: "",
                        serialNumber: "",
                        mahName: "",
                        quantity: 0,
                        expiryDate: "",
                        isActive: false,
                    })
                );
            },

            onAddProduct: function () {
                const oProduct = this.getView().getModel().getData();
                // TODO make actual API call
            },
        });
    }
);
