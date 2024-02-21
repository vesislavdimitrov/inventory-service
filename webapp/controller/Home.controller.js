sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/UIComponent",
    ],
    function (Controller, MessageToast, JSONModel, UIComponent) {
        "use strict";

        return Controller.extend("inventory.controller.Home", {
            onInit: function () {

            },

            onClick: function () {
              $.ajax({
                  url: "http://localhost:3000/products",
                  method: "GET",
                  dataType: "json",
                  success: function (data) {
                      var oModel = new JSONModel(data);
                      this.getView().setModel(oModel, "productModel");
                  }.bind(this),
                  error: function (error) {
                      console.error("Error fetching data:", error);
                  }
              });
          },
        });
    }
);
