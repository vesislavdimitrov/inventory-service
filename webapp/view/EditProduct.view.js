const EDIT_PAGE_NAME_TXT = "Edit an existing product";
const SAVE_BUTTON_TXT = "Save Changes";
const CANCEL_BUTTON_TXT_EDIT = "Cancel";
const LABEL_MANUFACTURER_EDIT = "Manufacturer";
const LABEL_ACTIVITY_STATE_EDIT = "Active State";
const INPUT_WIDTH_EDIT = "33rem";

sap.ui.jsview("inventory.view.EditProduct", {
    getControllerName: function () {
        return "inventory.controller.EditProduct";
    },

    createContent: function (oController) {
        return this.createPage(
            this.createForm(),
            this.createButton(
                oController,
                SAVE_BUTTON_TXT,
                oController.onSaveChangesPress,
                sap.m.ButtonType.Emphasized
            ),
            this.createButton(oController, CANCEL_BUTTON_TXT_EDIT, oController.navigateToHome, sap.m.ButtonType.Up)
        );
    },

    createPage: function (oForm, oSaveButton, oCancelButton) {
        return new sap.m.Page({
            title: EDIT_PAGE_NAME_TXT,
            titleAlignment: sap.m.TitleAlignment.Center,
            content: [
                new sap.m.FlexBox({
                    alignItems: "Center",
                    justifyContent: "Start",
                    height: "100%",
                    width: "100%",
                    direction: "Column",
                    items: [oForm, oSaveButton, oCancelButton],
                }),
            ],
        });
    },

    createForm: function (
        oInputEditedName,
        oInputEditedSerialNumber,
        oInputEditedMahName,
        oInputEditedQuantity,
        oInputEditedExpiryDate,
        oInputEditedIsActive
    ) {
        return new sap.ui.layout.form.SimpleForm({
            content: [],
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

    createDatePicker: function (sValue, sWidth, sFormat, bRequired, sLabel) {
        return new sap.m.DatePicker({
            value: sValue,
            width: sWidth,
            required: bRequired,
            displayFormat: sFormat,
            ariaLabelledBy: sLabel,
        });
    },

    createSwitch: function (sValue, sLabel) {
        return new sap.m.Switch({
            state: sValue,
            customTextOn: "✔️",
            customTextOff: "❌",
            ariaLabelledBy: sLabel,
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
