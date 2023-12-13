const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: [true, 'Username is mandatory'] },
  email: { type: String, required: [true, 'Email is mandatory'] },
  password: { type: String, required: [true, 'Password is mandatory'] }
});

UserSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user  } = this.toObject();
  user.uid = _id;
  return user;
}

module.exports = mongoose.model("User", UserSchema);
