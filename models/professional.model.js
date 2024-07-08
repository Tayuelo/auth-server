const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfessionalSchema = new Schema({
    name: { type: String, required: [true, 'Name is mandatory']},
    details: { type: String, required: [false]},
    price: { type: Number, required: [true, 'Price is mandatory'] },
    email: { type: String, required: [false]},
    branchId: { type: String, required: [true, 'Branch ID is required.']}
});

ProfessionalSchema.methods.toJSON = function() {
    const { __v, ...professional } = this.toObject();
    return professional
};

module.exports = mongoose.model("Professional", ProfessionalSchema);