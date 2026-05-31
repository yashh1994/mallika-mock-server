"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
const utility_1 = require("./utility");
const store_1 = require("./store");
class Controllers {
    static getHealthStatus = (req, res) => {
        res.json(utility_1.Utility.buildResponse(true, 'Server is running smoothly.'));
    };
    static getNewId = (req, res) => {
        res.json(utility_1.Utility.buildResponse(true, 'Generated new ID successfully', { id: utility_1.Utility.generateId() }));
    };
    static createUser = (req, res) => {
        const { username, number } = req.body;
        if (!username || !number) {
            return res.status(400).json(utility_1.Utility.buildResponse(false, 'Username and number are required.'));
        }
        const existingUser = store_1.usersDB.find(u => u.number === number);
        if (existingUser) {
            return res.status(400).json(utility_1.Utility.buildResponse(false, 'User with this number already exists.'));
        }
        const newUser = {
            id: utility_1.Utility.generateId(),
            username,
            number
        };
        store_1.usersDB.push(newUser);
        res.json(utility_1.Utility.buildResponse(true, 'User created successfully.', newUser));
    };
    static sendOtp = (req, res) => {
        const { number } = req.body;
        if (!number) {
            return res.status(400).json(utility_1.Utility.buildResponse(false, 'Number is required to send OTP.'));
        }
        const existingUser = store_1.usersDB.find(u => u.number === number);
        if (!existingUser) {
            return res.status(404).json(utility_1.Utility.buildResponse(false, 'User not found. Please create an account first.'));
        }
        const otp = utility_1.Utility.generateOtp();
        store_1.otpDB[number] = otp; // Store in RAM map
        res.json(utility_1.Utility.buildResponse(true, 'OTP generated and sent successfully.', { otp }));
    };
    static verifyOtp = (req, res) => {
        const { number, otp } = req.body;
        if (!number || !otp) {
            return res.status(400).json(utility_1.Utility.buildResponse(false, 'Number and OTP are required for verification.'));
        }
        const storedOtp = store_1.otpDB[number];
        if (storedOtp && storedOtp === otp) {
            delete store_1.otpDB[number]; // consume OTP on successful validation
            res.json(utility_1.Utility.buildResponse(true, 'OTP verified successfully.'));
        }
        else {
            res.status(400).json(utility_1.Utility.buildResponse(false, 'Invalid or expired OTP.'));
        }
    };
    static getFeaturedRecipes = (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        // Calculate pagination indices
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedRecipes = store_1.featureRecipesDB.slice(startIndex, endIndex);
        const totalPages = Math.ceil(store_1.featureRecipesDB.length / limit);
        const hasMore = page < totalPages;
        const responseData = {
            recipes: paginatedRecipes,
            pagination: {
                totalItems: store_1.featureRecipesDB.length,
                currentPage: page,
                totalPages: totalPages,
                limit: limit,
                hasMore: hasMore
            }
        };
        const message = paginatedRecipes.length === 0
            ? 'No more featured recipes available.'
            : 'Featured recipes fetched successfully.';
        res.json(utility_1.Utility.buildResponse(true, message, responseData));
    };
    static getAllCookbooks = (req, res) => {
        res.json(utility_1.Utility.buildResponse(true, 'Cookbooks fetched successfully.', { cookbooks: store_1.cookbooksDB }));
    };
    static getCookbookById = (req, res) => {
        const { id } = req.params;
        const cookbook = store_1.cookbooksDB.find(c => c.id === id);
        if (!cookbook) {
            return res.status(404).json(utility_1.Utility.buildResponse(false, 'Cookbook not found.'));
        }
        res.json(utility_1.Utility.buildResponse(true, 'Cookbook fetched successfully.', cookbook));
    };
    static getRecipes = (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedRecipes = store_1.recipesDB.slice(startIndex, endIndex);
        const totalPages = Math.ceil(store_1.recipesDB.length / limit);
        const hasMore = page < totalPages;
        const responseData = {
            recipes: paginatedRecipes,
            pagination: {
                totalItems: store_1.recipesDB.length,
                currentPage: page,
                totalPages: totalPages,
                limit: limit,
                hasMore: hasMore
            }
        };
        const message = paginatedRecipes.length === 0
            ? 'No more recipes available.'
            : 'Recipes fetched successfully.';
        res.json(utility_1.Utility.buildResponse(true, message, responseData));
    };
    static createRecipe = (req, res) => {
        const { recipeTitle, difficulty, serveCount, cookBookTitle, timeToCookInMinutes, introText, recipeSteps, sourceLink, thumbnailImageUrl, subIngredientData } = req.body;
        // Validation for required fields
        if (!recipeTitle || !difficulty || serveCount === undefined || !cookBookTitle ||
            timeToCookInMinutes === undefined || !introText || !recipeSteps || !sourceLink ||
            !thumbnailImageUrl || !subIngredientData) {
            return res.status(400).json(utility_1.Utility.buildResponse(false, 'Missing one or more required data fields for creating a recipe.'));
        }
        const newRecipe = {
            id: utility_1.Utility.generateId(),
            recipeTitle,
            difficulty,
            serveCount,
            cookBookTitle,
            timeToCookInMinutes,
            introText,
            recipeSteps,
            sourceLink,
            thumbnailImageUrl,
            subIngredientData,
            isPublished: req.body.isPublished ?? false,
            reviews: req.body.reviews ?? [],
            reviewsCount: req.body.reviewsCount ?? 0,
            likesCount: req.body.likesCount ?? 0,
            visitedCount: req.body.visitedCount ?? 0,
            isLiked: req.body.isLiked ?? false
        };
        // Save to in-memory pseudo-DB
        store_1.recipesDB.push(newRecipe);
        res.json(utility_1.Utility.buildResponse(true, 'Recipe created successfully.', newRecipe));
    };
}
exports.Controllers = Controllers;
