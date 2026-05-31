"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoints = void 0;
const express_1 = require("express");
const controllers_1 = require("./controllers");
class Endpoints {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
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
