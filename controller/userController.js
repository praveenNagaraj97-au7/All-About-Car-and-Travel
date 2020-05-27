import User from "./../model/userModel";
import { createDocx, login } from "./../handlers/factoryHandler";

exports.signUp = createDocx(User);
exports.login = login(User, "/");

exports.deleteAll = async (req, res) => {
  await User.deleteMany();
  res.send("Deleted");
};
