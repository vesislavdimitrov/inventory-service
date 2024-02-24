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
                        console.error("Error fetching data:", error); //no
                    }
                );
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
                        that.refreshProductsModel(oView, sProductId),
                        function (error) {
                            console.error("Error ", error);
                        }
                    );
                });
            },

            refreshProductsModel: function (oView, sProductId) {
                return function () {
                    const oProductModel = oView.getModel("productModel");
                    oProductModel.setData(
                        oProductModel.getData().filter(function (product) {
                            return product.id !== sProductId;
                        })
                    );
                    sap.ui.getCore().byId("table").getBinding("items").refresh();
                };
            },
        });
    }
);
