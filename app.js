import { readFileSync } from 'fs';
import { join } from 'path';
import express from 'express';
import sequelize from './db/DbConnection.js';

const app = express();
const port = 3000;

initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    await _executeInitScript();
    console.log('Initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

/**
 * Uses the Sequelize instance to perform the inital
 * setup of the database created from the compose file.
 * Only has effect before the first volume is created.
 */
async function _executeInitScript() {
  const initScriptPath = join('', 'db', 'init.sql');
  const initScript = readFileSync(initScriptPath, 'utf8');
  const queries = initScript.split(';').filter(query => query.trim() !== '');

  for (const query of queries) {
    try {
      await sequelize.query(query);
    } catch (error) {
      console.error('Error executing query:', query);
      throw error;
    }
  }
}

export default app;