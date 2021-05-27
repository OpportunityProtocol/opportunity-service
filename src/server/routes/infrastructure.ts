import { initializeOpportunityDB } from "../controllers/initialization";

const express = require('express');
const infrastructureRouter = express.Router();

infrastructureRouter.post('/initializeDB', initializeOpportunityDB);

export { infrastructureRouter };