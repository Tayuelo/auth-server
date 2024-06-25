const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: [true, 'Name is mandatory']},
    details: { type: String, required: [false]},
    price: { type: Number, required: [true, 'Price is mandatory'] },
    branchId: { type: String, required: [true, 'Branch ID is required.']}
});

ProductSchema.methods.toJSON = function() {
    const { __v, _id, ...product } = this.toObject();
    product.uid = _id;
    return product
};

module.exports = mongoose.model("Product", ProductSchema);