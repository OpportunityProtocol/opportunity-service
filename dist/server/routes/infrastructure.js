"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infrastructureRouter = void 0;
const initialization_1 = require("../controllers/initialization");
const express = require('express');
const infrastructureRouter = express.Router();
exports.infrastructureRouter = infrastructureRouter;
infrastructureRouter.post('/initializeDB', initialization_1.initializeOpportunityDB);
//# sourceMappingURL=infrastructure.js.map