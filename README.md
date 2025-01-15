# My Book Search Library

My Book Search Library is a full-stack web application that allows users to search for books, save their favorite ones, and manage their reading list. The app is built using the **MERN stack** and integrates with the **Google Books API** for book search functionality.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [GraphQL Queries and Mutations](#graphql-queries-and-mutations)
- [Deployment](#deployment)
- [License](#license)

---

## Features
- Search for books using the Google Books API.
- View book details, including title, author(s), description, and links to purchase.
- User authentication via JWT (JSON Web Tokens).
- Save favorite books to a personal account.
- View and manage saved books in a personalized library.
- GraphQL API for seamless data querying and mutations.

---

## Technologies
### Front-End
- **React** with TypeScript
- **Bootstrap** and **React-Bootstrap** for styling
- **Apollo Client** for GraphQL integration

### Back-End
- **Node.js** and **Express**
- **MongoDB** with **Mongoose**
- **Apollo Server Express** for GraphQL
- **JWT** for authentication
- **Google Books API** for book search

---

## Installation
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) or MongoDB Atlas for database hosting

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/My-Book-Search-Library.git
   cd My-Book-Search-Library

2. Install dependencies for the server:
   ```bash
   cd server
   npm install

3. Install dependencies for the client:
   ```bash
   cd ../client
   npm install

4. Create a .env file in the server directory:
   ```bash
   PORT=3001
   JWT_SECRET=your_jwt_secret
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mydatabase

5. Build the client:
   ```bash
   cd ../client
   npm run build

6. Start the server:
   ```bash
   cd ../server
   npm start

### Usage

1. Open your browser and navigate to:

 - App: http://localhost:3001
 - GraphQL Playground: http://localhost:3001/graphql

2. Search for books using the search bar on the homepage.

3. Log in or sign up to save books to your library.

4. Manage your saved books from your account dashboard.

### API Endpoints
REST API (Deprecated in favor of GraphQL)
 - POST /api/users/login - User login
 - GET /api/users/me - Get logged-in user details
 - GET /api/books/search - Search for books (Google Books API)

### GraphQL API
See GraphQL Queries and Mutations for more details.

### Deployment
The application can be deployed using:

 - Render for the server
 - MongoDB Atlas for the database
