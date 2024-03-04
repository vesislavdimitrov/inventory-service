jQuery.sap.require("inventory.utils.Constants");

const ADD_PAGE_NAME_TXT = "Add a new product";
const ADD_BUTTON_TXT = "Add product";
const ADD_CANCEL_BUTTON_TXT = "Cancel";
const ADD_INPUT_WIDTH = "33rem";
const ADD_PLACEHOLDER_QUANTITY = "Number";

sap.ui.jsview("inventory.view.AddProduct", {
    getControllerName: function () {
        return "inventory.controller.AddProduct";
    },

    createContent: function (oController) {
        return this.createPage(
            this.createForm(
                this.createInput("{/name}", ADD_INPUT_WIDTH, true),
                this.createInput("{/serialNumber}", ADD_INPUT_WIDTH, true),
                this.createInput("{/mahName}", ADD_INPUT_WIDTH, true),
                this.createInput(
                    "{/quantity}",
                    ADD_INPUT_WIDTH,
                    true,
                    ADD_PLACEHOLDER_QUANTITY,
                    sap.m.InputType.Number
                ),
                this.createDatePicker(
                    "{/expiryDate}",
                    ADD_INPUT_WIDTH,
                    "yyyy-MM-dd",
                    true,
                    inventory.utils.Constants.EXPIRY_DATE
                ),
                this.createSwitch("{/isActive}", inventory.utils.Constants.ACTIVITY_STATE)
            ),
            this.createButton(oController, ADD_BUTTON_TXT, oController.onAddProductPress, sap.m.ButtonType.Emphasized),
            this.createButton(oController, ADD_CANCEL_BUTTON_TXT, oController.navigateToHome, sap.m.ButtonType.Up)
        );
    },

    createPage: function (oForm, oAddButton, oCancelButton) {
        return new sap.m.Page({
            title: ADD_PAGE_NAME_TXT,
            titleAlignment: sap.m.TitleAlignment.Center,
            content: [
                new sap.m.FlexBox({
                    alignItems: "Center",
                    justifyContent: "Start",
                    height: "100%",
                    width: "100%",
                    direction: "Column",
                    items: [oForm, oAddButton, oCancelButton],
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
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_PRODUCT_NAME }),
                oInputName,
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_SERIAL_NUMBER }),
                oInputSerialNumber,
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_MANUFACTURER }),
                oInputMahName,
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_QUANTITY }),
                oInputQuantity,
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_EXPIRY_DATE }),
                oInputExpiryDate,
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_ACTIVITY_STATE }),
                oInputIsActive,
            ],
        });
    },

    createInput: function (oValue, sWidth, bRequired, oPlaceholder, oType) {
        return new sap.m.Input({
            value: oValue,
            width: sWidth,
            required: bRequired,
            placeholder: oPlaceholder,
            type: oType,
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
            customTextOn: inventory.utils.Constants.CHECKMARK_EMOJI,
            customTextOff: inventory.utils.Constants.CROSS_EMOJI,
        });
    },

    createButton: function (oController, sText, fOnPress, oType) {
        return new sap.m.Button({
            width: "10rem",
            text: sText,
            press: [fOnPress, oController],
            type: oType,
        });
    },
});
