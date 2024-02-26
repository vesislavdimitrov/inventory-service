sap.ui.define(
    ["inventory/utils/Constants"],
    function (Constants) {
        "use strict";

        return {
            createBusyDialog: function () {
                return new sap.m.BusyDialog({
                    title: Constants.LOADING_TITLE,
                    titleAlignment: sap.m.TitleAlignment.Center,
                    text: Constants.LOADING_TEXT,
                    showCancelButton: false,
                });
            },

            createConfirmationDialog: function (sMessage, fCallback) {
                const oDialog = new sap.m.Dialog({
                    title: "Confirmation",
                    icon: "sap-icon://question-mark",
                    titleAlignment: sap.m.TitleAlignment.Center,
                    type: "Message",
                    content: new sap.m.Text({ text: sMessage }),
                    beginButton: new sap.m.Button({
                        text: "Cancel",
                        press: function () {
                            oDialog.close();
                        },
                    }),
                    endButton: new sap.m.Button({
                        text: "Yes",
                        type: sap.m.ButtonType.Emphasized,
                        press: function () {
                            oDialog.close();
                            fCallback();
                        },
                    }),
                    afterClose: function () {
                        oDialog.destroy();
                    },
                }).open();
            },

            createErrorDialog: function (error) {
                let oDialog = new sap.m.Dialog({
                    title: Constants.ERROR_DIALOG_TITLE,
                    titleAlignment: sap.m.TitleAlignment.Center,
                    content: [
                        new sap.m.FlexBox({
                            alignItems: "Center",
                            justifyContent: "Start",
                            direction: "Column",
                            height: "8rem",
                            items: [
                                new sap.ui.core.Icon({ height: "1rem" }),
                                new sap.m.Text({ text: error }),
                                new sap.ui.core.Icon({ height: "2rem" }),
                                new sap.m.Button({
                                    text: "Close",
                                    type: sap.m.ButtonType.Emphasized,
                                    press: function () {
                                        oDialog.close();
                                    },
                                }),
                            ],
                        }),
                    ],
                    afterClose: function () {
                        oDialog.destroy();
                    },
                }).open();
            },

            createProductDetailsDialog: function (oData) {
                const oDateFormat = {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                };
                const oDialog = new sap.m.Dialog({
                    title: "Product Details",
                    content: [
                        new sap.m.VBox({
                            items: [
                                new sap.m.Text({ text: `ID: ${oData.id}` }),
                                new sap.m.Text({ text: `Serial Number: ${oData.serialNumber}` }),
                                new sap.m.Text({ text: `Manufacturer: ${oData.mahName}` }),
                                new sap.m.Text({
                                    text: `Expiry Date: ${new Date(oData.expiryDate).toLocaleString(
                                        "en-US",
                                        oDateFormat
                                    )}`,
                                }),
                                new sap.m.Text({ text: `Quantity: ${oData.quantity}` }),
                                new sap.m.Text({ text: `Active: ${oData.isActive}` }),
                                new sap.m.Text({
                                    text: `Created On: ${new Date(oData.timestampCreated).toLocaleString(
                                        "en-US",
                                        oDateFormat
                                    )}`,
                                }),
                            ],
                        }),
                    ],
                    beginButton: new sap.m.Button({
                        text: "Close",
                        type: sap.m.ButtonType.Emphasized,
                        press: function () {
                            oDialog.close();
                        },
                    }),
                }).open();
            },
        };
    },
    true // exports the module
);
