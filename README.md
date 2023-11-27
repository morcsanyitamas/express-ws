# Introduction to Web/Express.js

The story of this project is that we store various information about programming languages in a JSON file. Users can vote ('like' or 'dislike') for individual programming languages. To retrieve this information and implement the voting functionality, we will create an Express server to assist us.

## Install dependencies
### Install dependencies for Express server
```bash
cd backend
npm install
```

## Launch the backend server
```bash
cd backend
npm run devStart
```

## TASKS: Implementation of an Express server
- Feel free to use the implementations in the `./queries/` directory while working on your solution!
- You can easily test the correctness of your solutions by launching the requests found in the test files in the `test` directory. To initiate the requests, you'll need the `REST Client` Visual Studio Code extension.

### TASK 1: Minimum environment for Express server
Setting up the minimum environment for a functional Express server (package imports, defining a port number, etc.). Currently, it runs without errors but lacks any functionality.

### TASK 2: Send response to client "Popular programming languages API 2.0"
Implement an endpoint at the '/' URL that, upon a `GET` request, returns the following string: 'Popular programming languages API 2.0.' 

### TASK 3: Middleware implementation
The `express.json()` function is a built-in middleware function in Express. It parses incoming requests with JSON payloads. Add this middleware to your Express server, and you'll also find a custom middleware implementation: `logger`. Examine what this function does and how it could be used in the Express server as middleware.

### TASK 4: Get all programming languages
Implement an endpoint that can return the IDs and names of all programming languages!

### TASK 5: Get programming language by ID
Write an endpoint that can return all properties of a specific programming language!

### TASK 6: Create new programming language
Write an endpoint that can create a new programming language!

### TASK 7: Delete programming language
Write an endpoint that can delete a specific programming language!

### TASK 8: PUT programming language
Write an endpoint that can replace all the data of an existing programming language!

### TASK 9: PATCH programming language
Write an endpoint that can modify one or more (but not all) properties of an existing programming language!

### TASK 10: Get all the votes for programming languages
Write an endpoint that can return all the votes for programming languages!

### TASK 11: Get the votes for a specific programming language
Write an endpoint that can return the votes for a specific programming language in the following format:
```javascript
{
    upvotes: x,
    downvotes: y
}
```

### TASK 12: Implement the voting functionality
Write an endpoint that can submit a vote for a specific programming language. The server endpoint expects the following information: `vote: x`, where `x` can be `+1` (corresponding to an upvote) or `-1` (corresponding to a downvote).

### TASK 13: Implement the filtering functionality
Modify your existing endpoint to implement filtering based on the following criteria. The endpoint should be capable of returning programming languages whose names, designers, or maintainers contain the search expression!

### TASK 14: Implement the sorting functionality
Modify your existing *Get all programming languages* endpoint to be able to sort the returned programming languages by name, creation date, or GitHub stars in either ascending or descending order!

### (EXTRA) TASK 15: Implement an Express router
By now, you've created many endpoints that might make your server.js file less organized and harder to navigate. Use an `Express Router` and logically organize your endpoints into separate files. You can find a starting directory at `./routes` !