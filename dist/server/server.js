"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const infrastructure_1 = require("./routes/infrastructure");
const market_1 = __importDefault(require("./routes/market"));
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use('/infrastructure', infrastructure_1.infrastructureRouter);
app.use('/markets', market_1.default);
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=server.js.map