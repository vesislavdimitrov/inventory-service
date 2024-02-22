sap.ui.jsview("inventory.view.App", {
    createContent: function () {
        return new sap.m.Shell({
            backgroundImage: "utils/background.jpg",
        }).setApp(new sap.m.App("rootApp"));
    },
});
