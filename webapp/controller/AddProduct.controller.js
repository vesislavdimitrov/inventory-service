sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/UIComponent",
        "inventory/utils/Constants",
        "inventory/utils/Http",
        "inventory/utils/Dialogs",
    ],
    function (Controller, MessageToast, JSONModel, UIComponent, Constants, Http, Dialogs) {
        "use strict";

        return Controller.extend("inventory.controller.AddProduct", {
            onInit: function () {
                this.getView().setModel(new JSONModel({}));
            },

            onAddProductPress: function () {
                const oProduct = this.getModelData();
                this.postProduct(
                    JSON.stringify({
                        name: oProduct.name,
                        serialNumber: oProduct.serialNumber,
                        mahName: oProduct.mahName,
                        quantity: oProduct.quantity,
                        expiryDate: this.dateToEpoch(oProduct.expiryDate),
                        isActive: oProduct.isActive,
                    })
                );
            },

            dateToEpoch: function (sDate) {
                return Date.parse(sDate) / 1000;
            },

            getModelData: function () {
                return this.getView().getModel().getData();
            },

            postProduct: function (oProduct) {
                const that = this;
                Http.sendAjaxRequestWith(
                    Constants.PRODUCTS_URL,
                    "POST",
                    oProduct,
                    function () {
                        MessageToast.show("Product added successfully!");
                        that.navigateToHome();
                    },
                    function (error) {
                        Dialogs.createErrorDialog(error.error);
                    }
                );
            },

            navigateToHome: function () {
                this.getView().getModel().setData({});
                UIComponent.getRouterFor(this).navTo("home");
            },
        });
    }
);
