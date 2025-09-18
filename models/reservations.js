const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const reservationsSchema = new Schema({
//        _id: { type: String }, // L'ID sera une chaîne
        catwayNumber: {
        type: String
        
    },

    clientName: {
        type: String,
        trim: true

    },
    boatName: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true

}
}, {
    timestamps: true
});
module.exports = mongoose.model('reservation', reservationsSchema);

//////
