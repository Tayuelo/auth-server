const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: { type: String, required: [true, 'Name is mandatory']},
    details: { type: String, required: [false]},
    price: { type: Number, required: [true, 'Price is mandatory'] },
    branchId: { type: String, required: [true, 'Branch ID is required.']}
});

ServiceSchema.methods.toJSON = function() {
    const { __v, ...service } = this.toObject();
    return service
};

module.exports = mongoose.model("Service", ServiceSchema);