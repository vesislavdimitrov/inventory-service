jQuery.sap.require("inventory.utils.Constants");

const EDIT_PAGE_NAME_TXT = "Edit an existing product";
const EDIT_SAVE_BUTTON_TXT = "Save Changes";
const EDIT_CANCEL_BUTTON_TXT = "Cancel";
const EDIT_INPUT_WIDTH = "33rem";

sap.ui.jsview("inventory.view.EditProduct", {
    getControllerName: function () {
        return "inventory.controller.EditProduct";
    },

    createContent: function (oController) {
        return this.createPage(
            this.createForm(
                this.createInput("{/id}", EDIT_INPUT_WIDTH, false, null, null, false),
                this.createInput("{/name}", EDIT_INPUT_WIDTH, false),
                this.createInput("{/serialNumber}", EDIT_INPUT_WIDTH),
                this.createInput("{/mahName}", EDIT_INPUT_WIDTH),
                this.createInput("{/quantity}", EDIT_INPUT_WIDTH),
                this.createSwitch("{/isActive}", inventory.utils.Constants.ACTIVITY_STATE)
            ),
            this.createButton(
                oController,
                EDIT_SAVE_BUTTON_TXT,
                oController.onSaveChangesPress,
                sap.m.ButtonType.Emphasized
            ),
            this.createButton(oController, EDIT_CANCEL_BUTTON_TXT, oController.navigateToHome, sap.m.ButtonType.Up)
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
        oInputEditedId,
        oInputEditedName,
        oInputEditedSerialNumber,
        oInputEditedMahName,
        oInputEditedQuantity,
        oInputEditedIsActive
    ) {
        return new sap.ui.layout.form.SimpleForm({
            content: [
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_PRODUCT_ID }),
                oInputEditedId,
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_PRODUCT_NAME }),
                oInputEditedName,
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_SERIAL_NUMBER }),
                oInputEditedSerialNumber,
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_MANUFACTURER }),
                oInputEditedMahName,
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_QUANTITY }),
                oInputEditedQuantity,
                new sap.m.Label({ text: inventory.utils.Constants.LABEL_ACTIVITY_STATE }),
                oInputEditedIsActive,
            ],
        });
    },

    createInput: function (oValue, sWidth, bRequired, oPlaceholder, oType, bEditable) {
        return new sap.m.Input({
            value: oValue,
            width: sWidth,
            required: bRequired,
            placeholder: oPlaceholder,
            type: oType,
            enabled: bEditable,
        });
    },

    createSwitch: function (sValue, sLabel) {
        return new sap.m.Switch({
            state: sValue,
            customTextOn: inventory.utils.Constants.CHECKMARK_EMOJI,
            customTextOff: inventory.utils.Constants.CROSS_EMOJI,
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
