import { DataTypes } from "sequelize";
import sequelize from "../db/DbConnection.js";
import Product from "./Product.js";

const OBJECT_NAME = "Order";
const TABLE_NAME = "order";

const Order = sequelize.define(
    OBJECT_NAME,
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Product,
                key: "id",
            },
        },
        isAutomated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        timestampCreated: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: () => Date.now(),
        },
        warehouseName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        wareHouseLocation: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: TABLE_NAME,
        timestamps: false,
    }
);
Order.entityName = OBJECT_NAME;

export default Order;
