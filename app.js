const express = require('express');
const connectDB = require('./server/db');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const cors = require('cors');
const router = express.Router();
const multer = require("multer");
const authRoutes = require('./routes/auth'); // Adjust the path as necessary
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/users'); // Path to user route file

dotenv.config();

const app = express();

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/listings', require('./server/routes/listings'));
app.use('/api/messages', require('./server/routes/messages'));

// Email route
app.post('/send-email', async (req, res) => {
  const { email, carName } = req.body;

  if (!email || !carName) {
    return res.status(400).json({ error: 'Email and carName are required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    debug: true,
    logger: true,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Car Purchase Confirmation: ${carName}`,
    text: `Thank you for your interest in buying the ${carName}. We will contact you soon!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send('Failed to send email.');
  }
});

// Default Route
app.get('/', (req, res) => {
  res.send('Car Marketplace API is running!');
});

// Handle POST request for car listings without image
app.post("/api/cars", async (req, res) => {
  const { carName, price, description, contactInfo, email } = req.body;

  try {
    const newCar = new Car({
      make: carName.split(" ")[0],
      model: carName.split(" ")[1],
      price: price,
      description: description,
      email: email,
      image: null, // No image to save
    });

    await newCar.save();
    res.status(200).send("Car listed successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to list car");
  }
});

module.exports = router;

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
