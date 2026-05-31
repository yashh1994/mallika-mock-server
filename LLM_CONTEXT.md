# 🤖 LLM Context - Mallika Mock Server

## 🎯 Project Overview
This project is a mock backend server built for a mobile frontend (Dart/Flutter). Its primary goal is to simulate database operations efficiently, map strictly to the external app's Dart models, handle complex nested data (e.g., Cookbooks containing Recipes), support pagination, and handle basic authentication.

## 🛠 Tech Stack
- **Runtime & Framework**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: In-memory (Variables storing arrays/objects for fast mock responses)

## 📁 Architecture
The project strictly follows a clean MVC-style folder structure to separate concerns:

1. **`src/server.ts`**: The entry point. Initializes the Express app, sets up middleware (CORS, JSON parsing), and mounts the main router.
2. **`src/endpoints.ts`**: Contains the routing logic. It strips away all business logic and solely maps HTTP requests (e.g., `POST /auth/create-user`) to specific Controller methods.
3. **`src/controllers.ts`**: The business logic and validation layer. It intercepts the HTTP requests, validates payloads, enforces pagination logic, and constructs the standard API responses.
4. **`src/store.ts`**: The simulated database and Model definition layer. Defines TypeScript interfaces (mapped from Dart) and exports seeded arrays like `recipesDB`, `cookbooksDB`, and `usersDB`.
5. **`src/utility.ts`**: Holds generic helper functions (e.g., timestamp generators, ID generators, OTP generators, and the `buildResponse` formatter).

## 🗃 Standard API Response
Every single API response, whether successful or an error, follows a strict uniform layout wrapper:
```json
{
  "success": boolean,
  "message": string,
  "data": any | null,
  "timestamp": string (ISO 8601)
}
```

## 📊 Data Models (Located in `store.ts`)
Dart models have been meticulously converted to TS interfaces. Key models include:
- `User`
- `RecipeDetailsModel` (Contains nested `SubIngredientModel[]` and `ReviewModel[]`)
- `FeatureRecipe`
- `CookbookModel`

## 🚀 Implemented Endpoints
### Authentication
- `POST /auth/send-otp`: Sends a 4-digit OTP.
- `POST /auth/validate-otp`: Validates the generated OTP against registered users.

### Recipes & Cookbooks
- `GET /recipes/get-featured-recipes`: Returns a paginated list of featured recipes.
- `GET /recipes/get-cookbooks`: Returns a list of cookbooks.
- `GET /recipes/get-cookbook/:id`: Returns specific cookbook details.
- `GET /recipes/get-recipes`: Returns a paginated list of recipes. Computes `hasMore` logic for infinite scrolling.
- `POST /recipes/create-recipe`: Validates and pushes a brand new detailed recipe to the global store array.

## 📝 Documentation
- API Docs are available in `API-DOCUMENTATION.md` outlining the request payloads and response definitions in detail.

## 📌 Current Focus & State
- **State**: The architectural refactoring from a single file to a decoupled `endpoints` -> `controllers` -> `store` pattern is complete.
- **Focus**: Integrating self-generating/human-readable API docs (Swagger UI may be explicitly configured in the future if requested, but Markdown docs currently exist).