const Country = require('../models/country.model');
const asyncHandler = require('../lib/asyncHandler');
const Fuse = require('fuse.js');

/**
 * @desc    Get all countries with filtering, sorting, and pagination
 * @route   GET /api/v1/countries
 */
exports.getCountries = asyncHandler(async (req, res) => {
  const { name, continent, sort, page = 1, limit = 12 } = req.query;
  const query = {};

  if (continent) {
    query.continents = { $regex: continent, $options: 'i' };
  }

  if (name) {
    query.$text = { $search: name };
  }

  const limitNum = parseInt(limit);
  const skip = (parseInt(page) - 1) * limitNum;
  
  const totalResults = await Country.countDocuments(query);

  let sortOption = {};
  // Handle all sorting options
  switch (sort) {
    case 'name_asc':
      sortOption['name.common'] = 1;
      break;
    case 'name_desc':
      sortOption['name.common'] = -1;
      break;
    case 'population_asc':
      sortOption.population = 1;
      break;
    case 'population_desc':
      sortOption.population = -1;
      break;
    case 'capital_asc':
      sortOption['capital.0'] = 1; // Sorts by the first capital in the array
      break;
    case 'capital_desc':
      sortOption['capital.0'] = -1;
      break;
    case 'currency_asc':
      sortOption['currencies'] = 1; // Sorts by currency code (e.g., AUD, EUR, USD)
      break;
    case 'currency_desc':
      sortOption['currencies'] = -1;
      break;
    default:
      sortOption['name.common'] = 1; // Default sort
  }

  const countries = await Country.find(query)
    .select('name capital flags population currencies cca3')
    .sort(sortOption)
    .skip(skip)
    .limit(limitNum);

  res.status(200).json({
    success: true,
    data: countries,
    pagination: {
      total: totalResults,
      limit: limitNum,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalResults / limitNum),
    },
  });
});


/**
 * @desc    Get country suggestions for search type-ahead
 * @route   GET /api/v1/countries/suggestions
 * @query   q - The search query string
 */
exports.getCountrySuggestions = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || q.length < 2) {
      return res.status(200).json({ success: true, data: [] });
  }

  // 1. Fetch a broader set of potential results from the database.
  // Here, we find any country that *contains* the first two letters.
  const potentialMatches = await Country.find({
      'name.common': { $regex: `^${q.substring(0, 2)}`, $options: 'i' }
  }).select('name.common cca3').lean(); // .lean() makes it faster

  // 2. Use Fuse.js to perform the fuzzy search on this smaller list.
  const fuse = new Fuse(potentialMatches, {
      keys: ['name.common'],
      includeScore: true,
      threshold: 0.4, // Adjust this to control how "fuzzy" the search is
  });

  const fuseResults = fuse.search(q);

  // 3. Format the results and send them back.
  const suggestions = fuseResults
      .slice(0, 7) // Take the top 7 results
      .map(result => result.item);

  res.status(200).json({
      success: true,
      data: suggestions,
  });
});


/**
 * @desc    Get a single country by its cca3 code
 * @route   GET /api/v1/countries/:cca3
 */
exports.getCountryByCca3 = asyncHandler(async (req, res) => {
  const country = await Country.findOne({ cca3: req.params.cca3.toUpperCase() });

  if (!country) {
    return res.status(404).json({ success: false, error: 'Country not found' });
  }
  res.status(200).json({ success: true, data: country });
});


/**
 * @desc    Get a unique list of all continents
 * @route   GET /api/v1/countries/continents
 */
exports.getContinents = asyncHandler(async (req, res) => {
  const continents = await Country.distinct('continents');
  // Filter out any null/undefined values and sort alphabetically
  const sortedContinents = continents.filter(c => c).sort();

  res.status(200).json({ success: true, data: sortedContinents });
});