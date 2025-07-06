const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const countryRoutes = require('./routes/country.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
// Set security-related HTTP headers
app.use(helmet()); 
// Enable Cross-Origin Resource Sharing
app.use(cors());
// To parse JSON request bodies
app.use(express.json());

// --- Routes ---
app.use('/api/v1/countries', countryRoutes);

// --- Global Error Handler (Must be after routes) ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// --- MongoDB Connection & Server Start ---
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/countriesDB';
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });