sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/UIComponent",
        "inventory/utils/Constants",
        "inventory/utils/Http",
    ],
    function (Controller, MessageToast, JSONModel, UIComponent, Constants, Http) {
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
                const [day, month, year] = sDate.split("/");
                return new Date(`${year}-${month}-${day}`).getTime();
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
                        MessageToast.show("Failed to add product. Please try again.");
                        console.error("Error:", error); //no
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
