"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const ipfs_operations_1 = __importDefault(require("./ipfs-operations"));
const StorageProvider = function () {
    this.provider.currentProvider = null;
    this.provider.interface = null;
    this.provider.changeStorageProvider = function (newProvider) {
        switch (newProvider) {
            case constants_1.StorageProviders.IPFS:
                this.currentProvider = constants_1.StorageProviders.IPFS;
                this.provider.interface = ipfs_operations_1.default;
                break;
            default:
        }
    };
    this.provider.getCurrentProvider = function () {
        return this.provider.currentProvider;
    };
    return this;
};
const storageProvider = new StorageProvider();
exports.default = storageProvider;
//# sourceMappingURL=index.js.map