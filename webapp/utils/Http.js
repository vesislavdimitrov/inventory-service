sap.ui.define(
    ["inventory/utils/Constants", "inventory/utils/Dialogs"],
    function (Constants, Dialogs) {
        "use strict";

        return {
            sendAjaxRequestWith: function (
                url,
                method,
                jsonData,
                successCallback,
                errorCallback
            ) {
                const busyDialog = Dialogs.createBusyDialog();
                busyDialog.open();

                jQuery.ajax({
                    url: url,
                    data: jsonData,
                    method: method,
                    contentType: "application/json",
                    success: function (data) {
                        busyDialog.close();
                        successCallback(data);
                    },
                    error: function (xhr) {
                        busyDialog.close();
                        errorCallback(xhr.responseJSON);
                    },
                });
            },
        };
    },
    true // exports the module
);
