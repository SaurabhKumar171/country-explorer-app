const express = require('express');
const router = express.Router();
const controller = require('../controllers/country.controller');

// GET /api/v1/countries
// Main endpoint to search, filter, sort, and paginate countries
router.get('/', controller.getCountries);

// GET /api/v1/countries/suggestions?q=...
// A lightweight endpoint specifically for search suggestions.
router.get('/suggestions', controller.getCountrySuggestions);

// GET /api/v1/countries/continents
// Gets a unique, sorted list of all continents for the search dropdown
router.get('/continents', controller.getContinents);

// GET /api/v1/countries/USA (or any other cca3 code)
// Fetches a single country by its unique cca3 code
router.get('/:cca3', controller.getCountryByCca3);

// The manual seeding POST route is removed as seeding should be a controlled script, not a public API endpoint.

module.exports = router;