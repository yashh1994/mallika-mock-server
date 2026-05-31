"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookbooksDB = exports.recipesDB = exports.featureRecipesDB = exports.otpDB = exports.usersDB = void 0;
const utility_1 = require("./utility");
// In-memory global arrays/objects for state
exports.usersDB = [];
exports.otpDB = {};
// Mock database for featured recipes
exports.featureRecipesDB = Array.from({ length: 25 }).map((_, index) => ({
    id: utility_1.Utility.generateId(),
    thumbnailUrl: 'https://via.placeholder.com/400x300.png?text=Ayam+Kuah+Santan',
    title: `Resep Ayam Kuah Santan Pedas Lezat ${index + 1}`,
    authorProfileUrl: 'https://via.placeholder.com/50x50.png?text=NP',
    authorName: 'Nadia Putri',
    likes: 130 + index * 5,
    reviews: 103 + index * 2
}));
// Mock database for recipe details
exports.recipesDB = Array.from({ length: 25 }).map((_, index) => ({
    id: utility_1.Utility.generateId(),
    recipeTitle: `Gourmet Dish ${index + 1}`,
    difficulty: index % 3 === 0 ? 'Hard' : index % 2 === 0 ? 'Medium' : 'Easy',
    serveCount: 2 + (index % 4),
    cookBookTitle: `Cookbook ${index % 5 + 1}`,
    timeToCookInMinutes: 15 + index * 5,
    introText: `An amazing introduction for gourmet dish ${index + 1}.`,
    recipeSteps: ['Step 1: Prep the ingredients', 'Step 2: Cook thoroughly', 'Step 3: Serve hot and enjoy!'],
    sourceLink: 'https://example.com/recipe',
    thumbnailImageUrl: 'https://via.placeholder.com/400x300.png?text=Gourmet+Dish',
    subIngredientData: [{
            id: utility_1.Utility.generateId(),
            label: 'Main Ingredients',
            ingredientsList: ['Ingredient A', 'Ingredient B', 'Ingredient C']
        }],
    isPublished: true,
    reviews: [{
            id: utility_1.Utility.generateId(),
            authorName: 'John Doe',
            reviewText: 'Absolutely delicious!',
            timeSinceReview: '2 days ago',
            authorImageUrl: 'https://via.placeholder.com/50x50.png?text=JD'
        }],
    reviewsCount: 10 + index,
    likesCount: 100 + index * 10,
    visitedCount: 500 + index * 20,
    isLiked: index % 2 === 0
}));
// Mock database for cookbooks
exports.cookbooksDB = Array.from({ length: 5 }).map((_, index) => {
    // Slice 5 distinct recipes per cookbook
    const linkedRecipes = exports.recipesDB.slice(index * 5, index * 5 + 5);
    return {
        id: utility_1.Utility.generateId(),
        title: `Delicious Indonesian Cuisine ${index + 1}`,
        description: `Discover the authentic taste of Indonesia with this amazing cookbook. Volume ${index + 1}.`,
        likes: 85 + index * 12,
        recipes: 5,
        bannerImageUrl: 'https://via.placeholder.com/600x300.png?text=Cookbook+Banner',
        isVideo: index % 2 === 0,
        ratings: 4.2 + (index * 0.1),
        recipesList: linkedRecipes,
        popularRecipeId: linkedRecipes[0].id,
        popularRecipeVisitedCount: linkedRecipes[0].visitedCount
    };
});
