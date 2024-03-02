sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/UIComponent",
        "inventory/utils/Constants",
        "inventory/utils/Http",
        "inventory/utils/Dialogs",
        "sap/m/MessageToast",
    ],
    function (Controller, JSONModel, UIComponent, Constants, Http, Dialogs, MessageToast) {
        "use strict";

        return Controller.extend("inventory.controller.Home", {
            onInit: function () {},

            onAddProductPress: function () {
                UIComponent.getRouterFor(this).navTo("addProduct");
            },

            onLoadProducts: function () {
                Http.sendAjaxRequestWith(
                    Constants.PRODUCTS_URL,
                    "GET",
                    null,
                    function (data) {
                        this.getView().setModel(new JSONModel(data), "productModel");
                    }.bind(this),
                    function (error) {
                        Dialogs.createErrorDialog(error.error);
                    }
                );
            },

            onShowProductDetailsPress: function (oEvent) {
                const oSelectedItem = oEvent.getSource().getBindingContext("productModel").getObject();
                Dialogs.createProductDetailsDialog(oSelectedItem);
            },

            onDeleteProductPress: function (oEvent) {
                const that = this;
                const oView = this.getView();
                const sProductId = oEvent.getSource().getBindingContext("productModel").getProperty("id");
                Dialogs.createConfirmationDialog(Constants.DELETE_CONFIRMATION_MSG, function () {
                    Http.sendAjaxRequestWith(
                        `${Constants.PRODUCTS_URL}/${sProductId}`,
                        "DELETE",
                        null,
                        function () {
                            that.onSuccessfulDelete(oView, sProductId);
                        },
                        function (error) {
                            Dialogs.createErrorDialog(error.error);
                        }
                    );
                });
            },
            
            onSuccessfulDelete: function (oView, sProductId) {
                this.refreshProductsModel(oView, sProductId);
                this.showSuccessToast(Constants.PRODUCT_DELETED_SUCCESS_MSG);
            },
            
            refreshProductsModel: function (oView, sProductId) {
                const oProductModel = oView.getModel("productModel");
                oProductModel.setData(
                    oProductModel.getData().filter(function (product) {
                        return product.id !== sProductId;
                    })
                );
                sap.ui.getCore().byId("table").getBinding("items").refresh();
            },
            
            showSuccessToast: function (message) {
                sap.m.MessageToast.show(message);
            },
        });
    }
);
