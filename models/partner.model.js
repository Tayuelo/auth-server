const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartnerSchema = new Schema({
    name: { type: String, required: [true, 'Name is mandatory']},
    details: { type: String, required: false },
    branches: { type: Object },
    rating: { type: Number },
    description: { type: String }
})

PartnerSchema.methods.toJSON = function() {
    const { __v, ...partner } = this.toObject();
    return partner;
}

module.exports = mongoose.model("Partner", PartnerSchema);