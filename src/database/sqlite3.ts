require('dotenv').config()
import * as Knex from "knex";
import sqlite3 from 'sqlite3';

function createDB(dbURL = process.env.DATABASE_URL) : Promise<Knex> {
    sqlite3.verbose();
    return Knex({
        client: "sqlite3",
        connection: {
          filename: dbURL
        },
    })
}

export { createDB };