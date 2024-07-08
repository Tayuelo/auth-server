const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: [true, 'Email is mandatory'] },
  password: { type: String, required: [true, 'Password is mandatory'] }
});

UserSchema.methods.toJSON = function() {
  const { __v, password, ...user  } = this.toObject();
  return user;
}

module.exports = mongoose.model("User", UserSchema);
