const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const CatwaysSchema = new Schema({
        catwayNumber: {
        type: String,


        
    },

    catwayType: {
        type: String,
        trim: true,
         enum: ['long', 'short'],
        required: [true, 'Le Type est requis'],

    },
    catwayState: {
        type: String,
        trim: true,
    },

}, 
{
    timestamps: true
});

module.exports = mongoose.model('catway', CatwaysSchema);

//////
