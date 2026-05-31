"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const endpoints_1 = require("./endpoints");
class Server {
    app;
    port;
    endpoints;
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.endpoints = new endpoints_1.Endpoints();
        this.configureMiddleware();
        this.setupRoutes();
    }
    configureMiddleware() {
        this.app.use(express_1.default.json());
    }
    setupRoutes() {
        // Mount all endpoints under /api
        this.app.use('/api', this.endpoints.router);
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server is running successfully on http://localhost:${this.port}`);
        });
    }
}
// Start the server
// Use string or number for IIS/Plesk named pipes, fallback to 3000 locally
const port = process.env.PORT || 3000;
const server = new Server(port);
server.start();
