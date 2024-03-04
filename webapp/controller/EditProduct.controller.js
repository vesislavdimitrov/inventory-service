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

        return Controller.extend("inventory.controller.EditProduct", {
            onInit: function () {
                const oRouter = UIComponent.getRouterFor(this);
                oRouter.getRoute("editProduct").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                const sProductId = oEvent.getParameter("arguments").productId;
                const oView = this.getView();

                Http.sendAjaxRequestWith(
                    `${Constants.PRODUCTS_URL}/${sProductId}`,
                    "GET",
                    null,
                    function (data) {
                        oView.setModel(new JSONModel(data));
                    },
                    function (error) {
                        Dialogs.createErrorDialog(error);
                    }
                );
            },

            onSaveChangesPress: function () {
                this.putProduct(this.getView().getModel().getData());
            },

            putProduct: function (oProduct) {
                const that = this;
                Http.sendAjaxRequestWith(
                    `${Constants.PRODUCTS_URL}/${oProduct.id}`,
                    "PUT",
                    JSON.stringify(oProduct),
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
