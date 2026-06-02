"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoints = void 0;
const express_1 = require("express");
const controllers_1 = require("./controllers");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Endpoints {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Documentation Route (Root /api/)
        this.router.get('/', (req, res) => {
            try {
                // Adjust path resolution based on standard TS dist vs src setups format
                const docPath = path_1.default.resolve(process.cwd(), 'API-DOCUMENTATION.md');
                const markdown = fs_1.default.readFileSync(docPath, 'utf8');
                res.send(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Mallika Mock Server API Docs</title>
                        <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
                        <style>
                            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 900px; margin: 0 auto; color: #333; display: none; }
                            pre { background: #1e1e1e; color: #d4d4d4; padding: 15px; border-radius: 5px; overflow-x: auto; }
                            code { font-family: monospace; background: #eee; color: #d00; padding: 2px 5px; border-radius: 3px; }
                            pre code { background: none; color: inherit; padding: 0; }
                            h1, h2, h3 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
                        </style>
                    </head>
                    <body>
                        <div id="content"></div>
                        <script>
                            const rawMarkdown = \`\n\${${JSON.stringify(markdown).replace(/`/g, "\\`")}}\`;
                            document.getElementById('content').innerHTML = marked.parse(rawMarkdown);
                            document.body.style.display = 'block';
                        </script>
                    </body>
                    </html>
                `);
            }
            catch (error) {
                res.status(500).send('API Documentation could not be loaded.');
            }
        });
        this.router.get('/health', controllers_1.Controllers.getHealthStatus);
        this.router.get('/generate-id', controllers_1.Controllers.getNewId);
        // Auth API Routes
        this.router.post('/auth/create-user', controllers_1.Controllers.createUser);
        this.router.post('/auth/send-otp', controllers_1.Controllers.sendOtp);
        this.router.post('/auth/verify-otp', controllers_1.Controllers.verifyOtp);
        // Recipe API Routes
        this.router.get('/recipes/get-featured-recipes', controllers_1.Controllers.getFeaturedRecipes);
        this.router.get('/recipes/get-cookbooks', controllers_1.Controllers.getAllCookbooks);
        this.router.get('/recipes/get-cookbook/:id', controllers_1.Controllers.getCookbookById);
        this.router.get('/recipes/get-recipes', controllers_1.Controllers.getRecipes);
        this.router.post('/recipes/create-recipe', controllers_1.Controllers.createRecipe);
    }
}
exports.Endpoints = Endpoints;
