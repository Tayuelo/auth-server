const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
    name: { type: String, required: [true, 'Name is mandatory']},
    details: { type: String, required: false },
    partnerId: { type: String, required: [true, 'Branch needs to be associated with a Partner ID']},
    address: { type: String, required: [true, 'Address is mandatory']},
})

BranchSchema.methods.toJSON = function() {
    const { __v, ...branch } = this.toObject();
    return branch;
}

module.exports = mongoose.model("Branch", BranchSchema);