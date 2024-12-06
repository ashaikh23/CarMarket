# **Car Market**

A Node.js-based messaging system that tracks users, their conversations, and messages, using MongoDB.

---

## **Features**
- User registration and authentication using JWT.
- Messaging functionality between users.
- Fetch message history between two users.
- List all users a user has conversations with.
- Built with `Node.js` and `MongoDB`.

---

## **Setup and Installation**

### **Prerequisites**
Ensure you have the following installed:
1. [Node.js](https://nodejs.org/) (v14+)
2. [MongoDB](https://www.mongodb.com/) or MongoDB Atlas (cloud-hosted MongoDB)

---

### **Clone the Repository**
Clone the project to your local machine:
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### **Install Dependencies**
Install all necessary packages:
```bash
npm install
```

---

### **Environment Variables**
Create a `.env` file in the project root and add the following environment variables:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
PORT=3000
```

Replace:
- `<username>` and `<password>` with your MongoDB credentials.
- `<database>` with the name of your MongoDB database.
- `your_secret_key` with a random secret key for JWT.

---

### **Start the Server**
To start the server, run:
```bash
node app.js
```

If you want to auto-restart the server when making code changes, use **Nodemon**:
```bash
npm install -g nodemon
nodemon app.js
```

---

### **Verify the Server**
Once the server is running, you should see the following in the terminal:
```
Server running on http://localhost:3000
Connected to MongoDB
```

---

## **Project Structure**
```
CarMarket/
├── app.js                 # Main application file
├── server/
│   ├── db.js              # MongoDB connection setup
│   ├── middleware/
│   │   └── authMiddleware.js  # Authentication middleware
│   ├── models/
│   │   ├── message.js     # Message schema and model
│   │   └── user.js        # User schema and model
│   ├── routes/
│   │   ├── auth.js        # Routes for user authentication
│   │   └── messages.js    # Routes for messaging
├── package.json           # Dependencies
├── .env                   # Environment variables
└── README.md              # Project documentation
```
