import { Schema, model } from "mongoose";
import validator from "validator";
import { hash, genSalt, compare } from "bcryptjs";

const userSchema = Schema({
  username: {
    type: String,
    required: [true, "Name Field Cannot be Empty"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Enter Correct Email"],
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    min: 6666666666,
    max: 9999999999,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password Didn't Match",
    },
  },
});

userSchema.pre(`save`, async function () {
  const salt = await genSalt(12);
  const hashed = await hash(this.password, salt);
  this.password = hashed;
  this.confirmPassword = undefined;
});

userSchema.methods.comparePassword = async (
  userInputPassword,
  DataBasePassword
) => await compare(userInputPassword, DataBasePassword);

const User = model("User", userSchema);

module.exports = User;
