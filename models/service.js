const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: { type: String, required: [true, 'Name is mandatory']},
    details: { type: String, required: [false]},
    price: { type: Number, required: [true, 'Price is mandatory'] }
});

ServiceSchema.methods.toJSON = function() {
    const { __v, _id, ...service } = this.toObject();
    service.uid = _id;
    return service
};

module.exports = mongoose.model("Service", ServiceSchema);