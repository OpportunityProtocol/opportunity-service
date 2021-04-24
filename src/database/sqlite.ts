import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
require('dotenv').config();

import { Database } from 'sqlite3/index';

// this is a top-level await
const initializeAndOpenDb = async (db: Database, databaseUrl : string) => {
    // open the database
    db = await open({
        filename: databaseUrl,
        drive: sqlite3.Database
    })

    return db;
}

const closeDb = (db : Database) => {
    db.close();
}

export  { initializeAndOpenDb, closeDb };