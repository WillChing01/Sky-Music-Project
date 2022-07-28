const mongoose = require('mongoose'); 

const favouritesSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true, 
    },
    favourites: {
        type: [String],
        required: true, 
    }
});

const Favourites = mongoose.model('Favourites', favouritesSchema);
module.exports = Favourites;
