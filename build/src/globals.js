"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env_variables = void 0;
const dotenv = __importStar(require("dotenv"));
const result = dotenv.config({ path: __dirname + "\\..\\.env" });
if (result.error && process.env.GMAIL == undefined) {
    console.error("Failed to parse env variables!");
}
else {
    console.info("Successfully parsed env variables 😀");
}
const variables = {
    PORT: 8080 || ((_a = result.parsed) === null || _a === void 0 ? void 0 : _a.PORT),
    GMAIL: process.env.GMAIL || ((_b = result.parsed) === null || _b === void 0 ? void 0 : _b.GMAIL),
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || ((_c = result.parsed) === null || _c === void 0 ? void 0 : _c.GMAIL_PASSWORD),
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY || ((_d = result.parsed) === null || _d === void 0 ? void 0 : _d.FIREBASE_PRIVATE_KEY),
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || ((_e = result.parsed) === null || _e === void 0 ? void 0 : _e.FIREBASE_PROJECT_ID),
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL || ((_f = result.parsed) === null || _f === void 0 ? void 0 : _f.FIREBASE_CLIENT_EMAIL),
};
exports.env_variables = variables;
