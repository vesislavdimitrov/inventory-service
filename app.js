import { join } from "path";
import express from "express";
import sequelize from "./db/DbConnection.js";
import { readFile } from "./utils/FsUtils.js";
import productResource from "./rest/ProductResource.js";
import orderResource from "./rest/OrderResource.js"

const app = express();
const port = 3000;

initializeDatabase().then(() => {
    app.use(productResource);
    app.use(orderResource);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        if (!_necessaryTablesExist) {
            await _executeInitScript();
            console.log("Initialization complete");
        }
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}

/**
 * Uses the Sequelize instance to perform the inital
 * setup of the database created from the compose file.
 * Only has effect before the first volume is created.
 */
async function _executeInitScript() {
    const initScript = readFile(join("", "db", "init.sql"), "utf-8");
    const queries = initScript
        .split(";")
        .filter((query) => query.trim() !== "");

    for (const query of queries) {
        try {
            await sequelize.query(query);
        } catch (error) {
            console.error("Error executing query:", query);
            throw error;
        }
    }
}

async function _necessaryTablesExist() {
    const allTables = await sequelize.getQueryInterface().showAllTables();
    if (!allTables.includes("product") || !allTables.includes("order")) {
        return false;
    }
    return true;
}

export default app;
