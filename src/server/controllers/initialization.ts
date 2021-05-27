import { createDB } from '../../database/sqlite3';

const initializeOpportunityDB = async (req, res) => {
    createDB();
}

export {initializeOpportunityDB};