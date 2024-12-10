const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const Cars = require('./server/models/Cars');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Serve buyForm.html
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'buyForm.html'));
  res.sendFile(path.join(__dirname, 'carMarket', 'src', 'components', 'buyForm_.html'));
});

// Handle form submission
app.post('/submit-car-data', async (req, res) => {
  const { make, model, year, price, miles, condition, email } = req.body;

  try {
    const newCar = new Cars({
      make,
      model,
      year,
      price,
      description: `${year} ${make} ${model} in ${condition} condition with ${miles} miles.`,
      email: email || 'default@example.com',
    });

    await newCar.save();
    res.status(201).send('Car data saved successfully!');
  } catch (err) {
    console.error('Error saving car data:', err);
    res.status(500).send('An error occurred while saving car data.');
  }
});

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
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).send('Failed to send email.');
  }
});

// Routes for additional functionalities
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/listings', require('./server/routes/listings'));
app.use('/api/messages', require('./server/routes/messages'));

// Handle POST request for car listings without image
app.post('/api/cars', async (req, res) => {
  const { carName, price, description, email } = req.body;

  try {
    const newCar = new Cars({
      make: carName.split(' ')[0],
      model: carName.split(' ')[1],
      price,
      description,
      email,
      image: null, // No image provided
    });

    await newCar.save();
    res.status(200).send('Car listed successfully!');
  } catch (err) {
    console.error('Error listing car:', err);
    res.status(500).send('Failed to list car');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});