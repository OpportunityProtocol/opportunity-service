import { createMarket } from "../../controllers/market/create-market";
import { getAllMarkets } from "../../controllers/market/get-all-markets";

// Import express
const express = require('express')

// Create router
const marketRouter = express.Router()

// Routes
marketRouter.get('/', getAllMarkets);
marketRouter.put('/add/:marketData', createMarket);

export default marketRouter;