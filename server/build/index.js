"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const globals_1 = require("./globals");
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/", routes_1.default);
const port = Number(globals_1.env_variables.PORT) || 8000;
app.listen(port, () => {
    console.info("[+]Listening on port:", port);
});
