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

            createConfirmationDialog: function (message, callback) {
                const dialog = new sap.m.Dialog({
                    title: "Confirmation",
                    titleAlignment: sap.m.TitleAlignment.Center,
                    type: "Message",
                    content: new sap.m.Text({
                        text: message,
                    }),
                    beginButton: new sap.m.Button({
                        text: "Yes",
                        type: sap.m.ButtonType.Emphasized,
                        press: function () {
                            dialog.close();
                            callback();
                        },
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancel",
                        press: function () {
                            dialog.close();
                        },
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    },
                });

                dialog.open();
            },
        };
    },
    true // exports the module
);
