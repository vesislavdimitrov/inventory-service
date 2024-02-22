jQuery.sap.require("inventory.utils.Constants");

const MANUFACTURER_COLUMN_TXT = "Manufacturer";
const SERIAL_NUMBER_COLUMN_TXT = "Serial Number";
const PRODUCT_NAME_COLUMN_TXT = "Product";
const QUANTITY_COLUMN_TXT = "Quantity";

sap.ui.jsview("inventory.view.Home", {
    getControllerName: function () {
        return "inventory.controller.Home";
    },

    createContent: function (oController) {
        return this.createPage(
            this.createToolbar(oController),
            this.createTable(oController)
        );
    },

    createPage: function (oToolbar, oTable) {
        return new sap.m.Page({
            title: inventory.utils.Constants.APP_TITLE,
            titleAlignment: sap.m.TitleAlignment.Center,
            content: [
                new sap.m.FlexBox({
                    alignItems: "Center",
                    justifyContent: "Start",
                    height: "100%",
                    width: "100%",
                    direction: "Column",
                    items: [oToolbar, oTable],
                }),
            ],
        });
    },

    createToolbar: function (oController) {
        return new sap.m.Toolbar({
            content: [
                new sap.m.ToolbarSpacer({}),
                this.createButton(
                    oController,
                    "Products",
                    oController.onClick,
                    "sap-icon://product",
                    "30rem"
                ),
                this.createButton(
                    oController,
                    "Orders",
                    oController.onClick,
                    "sap-icon://shipping-status",
                    "30rem"
                ),
            ],
        });
    },

    createTable: function (oController) {
        return new sap.m.Table({
            id: "table",
            growing: true,
            growingScrollToLoad: true,
            growingThreshold: 20,
            items: {
                path: "productModel>/",
                template: new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({ text: "{productModel>name}" }),
                        new sap.m.Text({ text: "{productModel>serialNumber}" }),
                        new sap.m.Text({ text: "{productModel>mahName}" }),
                        new sap.m.Text({ text: "{productModel>quantity}" }),
                        new sap.m.FlexBox({
                            items: [
                                this.createButton(
                                    oController,
                                    undefined,
                                    oController.onClick,
                                    "sap-icon://display",
                                    "3rem"
                                ),
                                this.createGap("0.3rem"),
                                this.createButton(
                                    oController,
                                    undefined,
                                    oController.onClick,
                                    "sap-icon://edit",
                                    "3rem",
                                    sap.m.ButtonType.Attention
                                ),
                                this.createGap("0.3rem"),
                                this.createButton(
                                    oController,
                                    undefined,
                                    oController.onClick,
                                    "sap-icon://delete",
                                    "3rem",
                                    sap.m.ButtonType.Reject
                                ),
                            ],
                        }),
                    ],
                }),
            },
            columns: [
                new sap.m.Column({
                    header: new sap.m.Label({ text: PRODUCT_NAME_COLUMN_TXT }),
                    width: "3rem",
                }),
                new sap.m.Column({
                    header: new sap.m.Label({ text: SERIAL_NUMBER_COLUMN_TXT }),
                    width: "5rem",
                }),
                new sap.m.Column({
                    header: new sap.m.Label({ text: MANUFACTURER_COLUMN_TXT }),
                    width: "8rem",
                }),
                new sap.m.Column({
                    header: new sap.m.Label({ text: QUANTITY_COLUMN_TXT }),
                    width: "2rem",
                }),
                new sap.m.Column({
                    width: "4rem",
                }),
            ],
        });
    },

    createButton: function (
        oController,
        sTitle,
        fOnPress,
        sIcon,
        sSize,
        oType
    ) {
        return new sap.m.Button({
            icon: sIcon,
            text: sTitle,
            type: oType,
            width: sSize,
            press: [fOnPress, oController],
        });
    },

    createGap: function (sDimensions) {
        return new sap.ui.core.Icon({
            width: sDimensions,
            height: sDimensions,
        });
    },
});
