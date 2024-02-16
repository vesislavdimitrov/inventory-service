import { Sequelize } from "sequelize";
import { join } from "path";
import { readFile } from "../utils/FsUtils.js";

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
                password: readFile(join(process.cwd(), 'db', 'password.txt'), 'utf-8').trim(),
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