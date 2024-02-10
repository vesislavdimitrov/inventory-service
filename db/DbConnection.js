import { Sequelize } from "sequelize";

class DbConnection {

/**
 *  This class holds the instance of the only Sequelize object
 *  which is used for all the ORM operations
 * @returns {Sequelize} 
 */
    constructor() {
        if (!DbConnection.instance) {
            this._sequelize = new Sequelize({
                database: "inventorydb",
                username: "root",
                password: "<From the file>",
                host: "db",
                dialect: "mysql",
            });
            DbConnection.instance = this;
        }
        return DbConnection.instance;
    }

    get sequelize() {
        return this._sequelize;
    }
}

const database = new DbConnection();
export default database.sequelize;

