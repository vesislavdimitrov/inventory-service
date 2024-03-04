sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/UIComponent",
        "inventory/utils/Constants",
        "inventory/utils/Http",
        "inventory/utils/Dialogs",
    ],
    function (Controller, JSONModel, UIComponent, Constants, Http, Dialogs) {
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
                        expiryDate: this.dateToTimestamp(oProduct.expiryDate),
                        isActive: oProduct.isActive,
                    })
                );
            },

            dateToTimestamp: function (sDate) {
                if (!sDate) return;

                const parts = sDate.split("/");
                return new Date(
                    parseInt(parts[2], 10) + 2000,
                    parseInt(parts[0], 10) - 1,
                    parseInt(parts[1], 10)
                ).getTime();
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
