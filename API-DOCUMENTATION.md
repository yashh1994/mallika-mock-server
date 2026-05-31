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