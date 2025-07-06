const axios = require('axios');
const mongoose = require('mongoose');
const Country = require('../models/country.model');
require('dotenv').config();

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,capital,continents,population,flags,currencies,languages,latlng,cca3,region';

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // 1. Clear all existing data
    console.log('Clearing existing country data...');
    await Country.deleteMany({});
    console.log('Data cleared.');

    // 2. Fetch fresh data from the API
    console.log('Fetching data from REST Countries API...');
    const { data } = await axios.get(API_URL);
    console.log(`Fetched ${data.length} countries.`);

    // 3. Insert all data in a single, efficient operation
    console.log('Seeding database...');
    await Country.insertMany(data);
    console.log('✅ Database seeded successfully!');

  } catch (err) {
    console.error('❌ Error seeding the database:', err);
  } finally {
    // 4. Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

seedDatabase();