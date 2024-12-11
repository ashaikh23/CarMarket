# CarMarket

A modern web application for buying and selling cars, built with Node.js, Express.js, and MongoDB. CarMarket provides users with a platform to list their cars for sale, browse available cars, and communicate securely through an integrated messaging system.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [Usage](#usage)
  - [User Authentication](#user-authentication)
  - [Car Listings](#car-listings)
  - [Messaging System](#messaging-system)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Troubleshooting](#troubleshooting)

---

## Features

- **User Registration and Authentication**
  - Secure signup and login using JSON Web Tokens (JWT).
- **Car Listings**
  - Create, view, edit, and delete car listings with details like make, model, year, price, mileage, and condition.
- **Browse and Search**
  - Browse all available car listings and search using filters.
- **Messaging Functionality**
  - Send messages between users.
  - View message history between two users.
  - List all users a user has conversations with.
- **Built with Modern Technologies**
  - Uses Node.js, Express.js for the backend, and MongoDB for the database.

---

## Video
Video: https://youtu.be/4yJpLEcyAtA

---

## Slides
Slides: https://docs.google.com/presentation/d/1ldgNKpmf21U2AadLi0X_2iO4OqcrkyvaSQ0gs17Z6KE/edit#slide=id.g31d7fa6a2cd_0_40

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or later): [Download Node.js](https://nodejs.org/)
2. **MongoDB**: Install locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
3. **Git**: For cloning the repository

---

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ashaikh23/CarMarket
   cd carmarket
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

---

### Environment Variables

Create a `.env` file in the project root directory and add the following:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=3000
```

Replace:

- `<username>` and `<password>` with your MongoDB credentials.
- `<database>` with your MongoDB database name.
- `your_jwt_secret` with a secure random string.

---

### Running the Server

To start the server, run:

```bash
node app.js
```

Or, if you prefer automatic restarts on code changes:

1. Install **nodemon** globally if you haven't:

   ```bash
   npm install -g nodemon
   ```

2. Run the server with nodemon:

   ```bash
   nodemon app.js
   ```

Alternatively, use the default npm script:

```bash
npm start
```

The server should be running at `http://localhost:3000`.

---

## Project Structure

```
CarMarket/
├── assets/                  # Static assets like CSS, images, and JavaScript
│   ├── css/                 # CSS files for styling
│   │   ├── landing.css      # Styles for the landing page
│   │   ├── sell.css         # Styles for the sell page
│   │   ├── styles.css       # Global styles
│   ├── images/              # Static images
│   │   ├── car-in-clouds-blur.png
│   │   ├── car-in-clouds-clear.jpg
│   ├── js/                  # Client-side JavaScript
│       ├── landing.js       # Landing page functionality
│       ├── script.js        # General functionality
├── carmarket/               # Frontend React application
│   ├── node_modules/        # Node.js dependencies
│   ├── public/              # Public folder for React
│   │   ├── favicon.ico
│   │   ├── index.html       # Main HTML file for the React app
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── robots.txt
│   ├── src/                 # Source files for the React app
│   │   ├── components/      # React components
│   │   │   ├── Header.js    # Header component
│   │   │   ├── Footer.js    # Footer component
│   │   │   ├── LandingPage.js # Landing page
│   │   │   ├── SellPage.js  # Sell page
│   │   │   ├── BuyPage.js   # Buy page
│   │   │   ├── MessagingPage.js # Messaging page
│   │   │   ├── LoginPage.js # Login page
│   │   │   ├── SignUpPage.js # Signup page
│   │   │   ├── LogOutPage.js # Logout page
│   │   ├── styles/          # Component-specific styles
│   │   │   ├── buy.css
│   │   │   ├── global.css
│   │   │   ├── landing.css
│   │   │   ├── login.css
│   │   │   ├── sell.css
│   │   ├── App.js           # Main React app entry point
│   │   ├── App.test.js      # Tests for the app
│   │   ├── index.js         # React DOM rendering
│   │   ├── index.css        # Global CSS
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js    # Test setup
├── server/                  # Backend code
│   ├── middleware/          # Middleware
│   │   ├── authMiddleware.js # JWT authentication middleware
│   ├── models/              # Mongoose models
│   │   ├── car.js           # Car model
│   │   ├── listings.js      # Listings model
│   │   ├── message.js       # Message model
│   │   ├── chat.js          # Chat model
│   │   ├── user.js          # User model
│   ├── routes/              # API routes
│   │   ├── auth.js          # Authentication routes
│   │   ├── cars.js          # Car listing routes
│   │   ├── messages.js      # Messaging routes
│   │   ├── listings.js      # Listings-related routes
│   │   ├── ratings.js       # Ratings routes
│   │   ├── users.js         # User routes
│   ├── db.js                # MongoDB connection setup
│   ├── app.js               # Main server entry point
│   ├── .env                 # Environment variables
├── .gitignore               # Files and directories to ignore in Git
├── package.json             # Node.js dependencies and scripts
├── package-lock.json        # Lock file for Node.js dependencies
├── README.md                # Project documentation
├── CONTRIBUTING.md          # Contribution guidelines

```

---

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [React.js](https://reactjs.org/)

---

## Future Enhancements

- **Real-time Messaging**: Implement WebSockets for instant messaging.
- **Image Uploads**: Allow users to upload images of cars.
- **Advanced Search Filters**: Filter car listings by price range, mileage, location, etc.
- **User Profiles**: Enhance user profiles with additional information.
- **Notifications**: Implement email or in-app notifications for new messages or listings.

---

## Troubleshooting

If you encounter issues:

- **Environment Variables**: Ensure all required environment variables are set correctly.
- **MongoDB Connection**: Verify your MongoDB URI and that your database is accessible.
- **Server Errors**: Check the terminal output for any error messages.
- **Dependencies**: Ensure all dependencies are installed by running `npm install`.
- **Ports**: Make sure no other application is using the port specified in `.env`.