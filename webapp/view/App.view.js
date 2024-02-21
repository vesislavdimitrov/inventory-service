sap.ui.jsview("inventory.view.App", {
    createContent: function () {
        return new sap.m.Shell({}).setApp(new sap.m.App("rootApp"));
    },
});
