"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_market_1 = require("../../controllers/market/create-market");
const get_all_markets_1 = require("../../controllers/market/get-all-markets");
// Import express
const express = require('express');
// Create router
const marketRouter = express.Router();
// Routes
marketRouter.get('/', get_all_markets_1.getAllMarkets);
marketRouter.put('/add/:marketData', create_market_1.createMarket);
exports.default = marketRouter;
//# sourceMappingURL=index.js.map