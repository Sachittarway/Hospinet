const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const presSchema = new Schema({
    patient_id:{
        type: String,
        required: true
    },
    days:{
        type: Number,
        required: true
    },
    note:{
        type: String,
        required: true
    },
    inputs : [{
        value: String
    }]
},{timestamps: true})

exports.prescriptionss = mongoose.model("Prescriptions",presSchema);