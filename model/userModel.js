import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = Schema({
  username: {
    type: String,
    required: [true, "Name Field Cannot be Empty"],
  },
  email: {
    type: String,
    validate: validator.isEmail,
  },
  phone: {
    type: Number,
    required: true,
    min: 6666666666,
    max: 9999999999,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: function (this, val) {
      return this.password === val;
    },
  },
});

const User = model("User", userSchema);

module.exports = User;
