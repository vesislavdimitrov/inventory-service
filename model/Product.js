import { DataTypes } from "sequelize";
import sequelize from "../db/DbConnection.js";

const OBJECT_NAME = "Product";
const TABLE_NAME = "product";

const Product = sequelize.define(
    OBJECT_NAME,
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        serialNumber: {
            type: DataTypes.STRING(14),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        timestampCreated: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        mahName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiryDate: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
    },
    {
        tableName: TABLE_NAME,
        timestamps: false,
    }
);

export default Product;
