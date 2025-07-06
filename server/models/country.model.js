const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  name: {
    common: { type: String, required: true },
    official: { type: String, required: true },
  },
  capital: [String],
  // Use 'continents' as it's more accurate than region for the requirement
  continents: [String],
  population: Number,
  flags: {
    png: String,
    svg: String, // Also store the SVG version
  },
  currencies: mongoose.Schema.Types.Mixed,
  languages: mongoose.Schema.Types.Mixed,
  latlng: [Number],
  // cca3 is the standard unique identifier for countries
  cca3: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate countries
    index: true,   // Improves lookup performance by this field
  },
  region: {
    type: String
  }
});

// Create a text index on the common name for efficient text searching
CountrySchema.index({ 'name.common': 'text' });

module.exports = mongoose.model('Country', CountrySchema);