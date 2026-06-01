# 📘 Mallika Mock Server API Documentation

All responses wrap data inside a generalized response structure indicating success status and messages:

```json
{
  "success": true, // boolean
  "message": "...", // string summary
  "data": { ... }, // varies per API
  "timestamp": "2026-05-31T09:00:00.000Z"
}
```

---

## 1. Create a Recipe
Endpoint to push a brand new complete recipe object to the global arrays.
- **URL**: `/api/recipes/create-recipe`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`

### Required Payload (Body JSON)
All properties from the base model level must be provided, or it returns `400 Bad Request`.
```json
{
  "recipeTitle": "Indonesian Nasi Goreng",
  "difficulty": "Medium",
  "serveCount": 4,
  "cookBookTitle": "My First Cookbook",
  "timeToCookInMinutes": 45,
  "introText": "Classic fried rice...",
  "recipeSteps": [
    "Prepare rice.",
    "Fry with spices."
  ],
  "sourceLink": "https://example.com",
  "thumbnailImageUrl": "https://via.placeholder.com/400x300",
  "subIngredientData": [
    {
      "id": "ing-1",
      "label": "Vegetables",
      "ingredientsList": ["Carrots", "Peas"]
    }
  ],
  "reviews": [
    {
      "authorName": "Jane Doe",
      "reviewText": "Awesome taste!",
      "timeSinceReview": "Just now",
      "authorImageUrl": "https://via.placeholder.com/50x50"
    }
  ]
}
```

### Potential Responses
**✅ 200 OK (Success)**
```json
{
  "success": true,
  "message": "Recipe created successfully.",
  "data": {
    "id": "x1k2j34",
    "recipeTitle": "Indonesian Nasi Goreng",
    "difficulty": "Medium",
    "serveCount": 4,
    // ... Returns the deeply nested valid Recipe model
  },
  "timestamp": "2026-05-31T09:05:00.000Z"
}
```

**❌ 400 Bad Request (Missing fields)**
```json
{
  "success": false,
  "message": "Missing one or more required data fields for creating a recipe.",
  "data": null,
  "timestamp": "2026-05-31T09:06:00.000Z"
}
```

---

## 2. Get Recipes (Paginated)
Fetch from the cataloged collection of generated recipes using offsets.
- **URL**: `/api/recipes/get-recipes?page=1&limit=10`
- **Method**: `GET`
- **Query Params**:
  - `page` (optional, default `1`)
  - `limit` (optional, default `10`)

### Success Response
```json
{
  "success": true,
  "message": "Recipes fetched successfully.",
  "data": {
    "recipes": [
      {
        "id": "1mab2xd",
        "recipeTitle": "Gourmet Dish 1",
        "difficulty": "Hard", // ... (Full Recipe Details Model)
        "subIngredientData": [
          {
            "id": "xyz1",
            "label": "Main Ingredients",
            "ingredientsList": ["Ingredient A", "Ingredient B"]
          }
        ],
        "reviews": [
            {
               "id": "zay456",
               "authorName": "John Doe",
               "timeSinceReview": "2 days ago",
               "reviewText": "Absolutely delicious!"
            }
        ]
      }
    ],
    "pagination": {
      "totalItems": 25,
      "currentPage": 1,
      "totalPages": 3,
      "limit": 10,
      "hasMore": true
    }
  },
  "timestamp": "2026-05-31T09:00:00.000Z"
}
```

---

## 3. Send OTP
Generates and sends a 4-digit OTP to a registered phone number.
- **URL**: `/api/auth/send-otp`
- **Method**: `POST`

### Required Payload
```json
{
  "phoneNumber": "+1234567890"
}
```

### Potential Responses
**✅ 200 OK (Success)**
```json
{
  "success": true,
  "message": "OTP sent successfully to +1234567890",
  "data": {
    "otp": "1234"
  },
  "timestamp": "2026-06-01T10:00:00.000Z"
}
```

**❌ 404 Not Found (User not registered)**
```json
{
  "success": false,
  "message": "User with this phone number not found.",
  "data": null,
  "timestamp": "2026-06-01T10:00:00.000Z"
}
```

---

## 4. Validate OTP
Validates the OTP for a given phone number and returns user details if successful.
- **URL**: `/api/auth/validate-otp`
- **Method**: `POST`

### Required Payload
```json
{
  "phoneNumber": "+1234567890",
  "otp": "1234"
}
```

### Potential Responses
**✅ 200 OK (Success)**
```json
{
  "success": true,
  "message": "OTP validated successfully.",
  "data": {
    "user": {
      "id": "u123",
      "phoneNumber": "+1234567890",
      "name": "John Doe",
      "profileImageUrl": "https://via.placeholder.com/150"
    }
  },
  "timestamp": "2026-06-01T10:05:00.000Z"
}
```

**❌ 400 Bad Request (Invalid OTP)**
```json
{
  "success": false,
  "message": "Invalid OTP provided.",
  "data": null,
  "timestamp": "2026-06-01T10:05:00.000Z"
}
```

---

## 5. Get Featured Recipes (Paginated)
Fetch from the cataloged collection of featured recipes using offsets.
- **URL**: `/api/recipes/get-featured-recipes?page=1&limit=10`
- **Method**: `GET`
- **Query Params**:
  - `page` (optional, default `1`)
  - `limit` (optional, default `10`)

### Success Response
```json
{
  "success": true,
  "message": "Featured recipes fetched successfully.",
  "data": {
    "recipes": [
      {
        "id": "feat1x",
        "recipeTitle": "Featured Dish 1",
        "difficulty": "Medium",
        "timeToCookInMinutes": 30,
        "thumbnailImageUrl": "https://via.placeholder.com/300"
      }
    ],
    "pagination": {
      "totalItems": 15,
      "currentPage": 1,
      "totalPages": 2,
      "limit": 10,
      "hasMore": true
    }
  },
  "timestamp": "2026-06-01T10:10:00.000Z"
}
```

---

## 6. Get All Cookbooks
Fetch all available cookbooks in the database.
- **URL**: `/api/recipes/get-cookbooks`
- **Method**: `GET`

### Success Response
```json
{
  "success": true,
  "message": "Cookbooks fetched successfully.",
  "data": [
    {
      "id": "cb1",
      "title": "Healthy Living",
      "author": "Chef Jane",
      "coverImageUrl": "https://via.placeholder.com/200",
      "recipesCount": 12,
      "popularRecipeId": "1mab2xd"
    }
  ],
  "timestamp": "2026-06-01T10:15:00.000Z"
}
```

---

## 7. Get Cookbook by ID
Fetch details of a single specific cookbook.
- **URL**: `/api/recipes/get-cookbook/:id`
- **Method**: `GET`
- **Path Params**:
  - `id`: The string ID of the cookbook.

### Potential Responses
**✅ 200 OK (Success)**
```json
{
  "success": true,
  "message": "Cookbook details fetched successfully.",
  "data": {
    "id": "cb1",
    "title": "Healthy Living",
    "author": "Chef Jane",
    "coverImageUrl": "https://via.placeholder.com/200",
    "recipesCount": 12,
    "popularRecipeId": "1mab2xd"
  },
  "timestamp": "2026-06-01T10:20:00.000Z"
}
```

**❌ 404 Not Found (Invalid ID)**
```json
{
  "success": false,
  "message": "Cookbook not found.",
  "data": null,
  "timestamp": "2026-06-01T10:20:00.000Z"
}
```