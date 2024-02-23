const PAGE_NAME_TXT = "Add a new product";

sap.ui.jsview("inventory.view.AddProduct", {
    getControllerName: function () {
        return "inventory.controller.AddProduct";
    },

    createContent: function (oController) {
        return this.createPage(
            this.createForm(
                this.createInput("{/name}", "19rem", true),
                this.createInput("{/serialNumber}", "19rem", true),
                this.createInput("{/mahName}", "19rem", true),
                this.createInput("{/quantity}", "19rem", true),
                this.createDatePicker(
                    "{/expiryDate}",
                    "19rem",
                    "yyyy-MM-dd",
                    true
                ),
                this.createSwitch("{/isActive}")
            ),
            new sap.m.Button({
                text: "Add Product",
                press: [oController.onAddProduct, oController], // Add event handler for button click
            })
        );
    },

    createPage: function (oForm, oAddButton) {
        return new sap.m.Page({
            title: PAGE_NAME_TXT,
            titleAlignment: sap.m.TitleAlignment.Center,
            content: [
                new sap.m.FlexBox({
                    alignItems: "Center",
                    justifyContent: "Start",
                    height: "100%",
                    width: "100%",
                    direction: "Column",
                    items: [oForm, oAddButton],
                }),
            ],
        });
    },

    createForm: function (
        oInputName,
        oInputSerialNumber,
        oInputMahName,
        oInputQuantity,
        oInputExpiryDate,
        oInputIsActive
    ) {
        return new sap.ui.layout.form.SimpleForm({
            content: [
                new sap.m.Label({ text: "Name" }),
                oInputName,
                new sap.m.Label({ text: "Serial number" }),
                oInputSerialNumber,
                new sap.m.Label({ text: "Manufacturer" }),
                oInputMahName,
                new sap.m.Label({ text: "Quantity" }),
                oInputQuantity,
                new sap.m.Label({ text: "Expiry date" }),
                oInputExpiryDate,
                new sap.m.Label({ text: "Activity state" }),
                oInputIsActive,
            ],
        });
    },

    createInput: function (oValue, sWidth, bRequired) {
        return new sap.m.Input({
            value: oValue,
            width: sWidth,
            required: bRequired,
        });
    },

    createDatePicker: function (sValue, sWidth, sFormat, bRequired) {
        return new sap.m.DatePicker({
            value: sValue,
            width: sWidth,
            required: bRequired,
            displayFormat: sFormat,
        });
    },

    createSwitch: function (sValue) {
        return new sap.m.Switch({
            state: sValue,
            // THE EMOJI CODE DREAM ?!
            customTextOn: "✔️",
            customTextOff: "❌",
        });
    },
});
