sap.ui.jsview("inventory.view.Home", {
    getControllerName: function () {
        return "inventory.controller.Home";
    },

    createContent: function (oController) {
        const oButton = new sap.m.Button({
            text: "Click for pain",
            type: sap.m.ButtonType.Accept,
            width: "8rem",
            press: [oController.onClick, oController],
        });

        const oTable = new sap.m.Table({
            columns: [
                new sap.m.Column({ header: new sap.m.Label({ text: "ID" }) }),
                new sap.m.Column({header: new sap.m.Label({ text: "Serial Number" }),}),
                new sap.m.Column({ header: new sap.m.Label({ text: "Name" }) }),

            ],
        }).bindItems(
            "productModel>/",
            new sap.m.ColumnListItem({
                cells: [
                    new sap.m.Text({ text: "{productModel>id}" }),
                    new sap.m.Text({ text: "{productModel>serialNumber}" }),
                    new sap.m.Text({ text: "{productModel>name}" }),
                ],
            })
        );

        const oPage = new sap.m.Page({
            title: "Inventory Service",
            titleAlignment: sap.m.TitleAlignment.Center,
            content: [
                new sap.m.FlexBox({
                    alignItems: "Center",
                    justifyContent: "Start",
                    height: "100%",
                    width: "100%",
                    direction: "Column",
                    items: [oButton, oTable],
                }),
            ],
        });

        return oPage;
    },
});
