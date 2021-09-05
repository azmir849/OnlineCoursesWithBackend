const NodeGeocoder = require('node-geocoder');
const dotenv =  require('dotenv').config();

const options = {
    // provider : process.env.GEOCODER_PROVIDER,
    // httpAdapter: 'https',
    // apiKey:process.env.GEOCODER_API_KEY,
    // formatter: null

    provider : 'mapquest',
    httpAdapter: 'https',
    apiKey:'HFSqXG0TUGOVKRrmn6Zdl3n34mfeg29c',
    formatter: null
}

const geocoder = NodeGeocoder(options);

module.exports = geocoder;