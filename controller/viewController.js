import { view } from "./../handlers/factoryHandler";

exports.main = view("main", {
  title: "Good Life",
  websiteName: "Cars And Travel",
});

exports.login = view("user/login");

exports.signUp = view("user/signUp");
