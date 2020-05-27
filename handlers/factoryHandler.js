import { catchAsyncError } from "./../utils/catchAsyncError";
import { AppError } from "../utils/appError";

import { promisify } from "util";

import { sign } from "jsonwebtoken";

const JWTsignInTokenGen = (id) => {
  return sign({ id }, "dnwuadhnowahfnenanfoaikndbfnaon", {
    expiresIn: 60 * 1,
  });
};
// Views

exports.view = (templateName, bodyObject) => {
  return (req, res) => {
    res.render(templateName, bodyObject);
  };
};

// User - Specific

// Pre-filler are used to Avoid invalid Injection of data through quering

exports.preFillSignUp = (req, res, next) => {
  const inputData = { ...req.body };
  if (req.body.phone.length !== 10)
    return next(new AppError("Enter Current Phone Number"));
  for (let each in inputData) {
    if (!inputData[each])
      return next(new AppError("Please Fill All Fields", 205));
  }

  const signUpData = {
    username: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };
  req.body = signUpData;
  next();
};

exports.preFillLogin = (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return next(new AppError("Please Enter Email and Password"));
  req.email = req.body.email;
  req.password = req.body.password;
  next();
};

exports.login = (model_Name, response) =>
  catchAsyncError(async (req, res, next) => {
    const user = await model_Name
      .findOne({ email: req.email })
      .select("+password");
    if (!user)
      return next(new AppError(`User with ${req.email} is Not Found `, 404));
    if (!(await user.comparePassword(req.password, user.password)))
      return next(
        new AppError(
          `Password is Wrong, If You Forgot the Password click on Forgot Password to change it.`
        )
      );
    res.redirect(response);
  });

// User gets Token of his Id As soon as he sign-Up/ registers
exports.sendSignUpToken = (response) => (req, res, next) => {
  const token = JWTsignInTokenGen(req.id);

  res.cookie("JWT-Token", token, {
    maxAge: 60000,
  });
  res.redirect(response);
};

// CRUD (users,shop,rental)

exports.createDocx = (model_Name) =>
  catchAsyncError(async (req, res, next) => {
    const docx = await model_Name.create(req.body);
    req.id = docx._id;
    next();
  });
