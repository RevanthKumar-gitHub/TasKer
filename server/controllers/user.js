const { asyncHandler, validateRequest } = require("../utils/handlers");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.statusCode = 400;
    throw new Error("Please provide required details");
  }
  validateRequest({ email, password });
  const isEmailExists = await userModel.getUserByEmail(email);
  if (isEmailExists.length > 0) {
    res.statusCode = 400;
    throw new Error("Email already exists");
  }
  const encodedPassword = await bcrypt.hash(
    password + process.env.PASSWORD_SEC,
    10
  );
  const result = await userModel.registerUser({
    username,
    email,
    encodedPassword,
  });
  res.status(201).json({
    success: true,
    message: "User registered",
  });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.statusCode = 400;
    throw new Error("Please provide required details");
  }
  validateRequest({ email, password });
  const isEmailExists = await userModel.getUserByEmail(email);
  if (isEmailExists.length == 0) {
    res.statusCode = 400;
    throw new Error("Email doesnot exists");
  }
  const validPassword = await bcrypt.compare(
    password + process.env.PASSWORD_SEC,
    isEmailExists[0].password
  );
  if (!validPassword) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
  const token = jwt.sign(
    {
      email: email,
      id: isEmailExists[0].id,
      username: isEmailExists[0].username,
    },
    process.env.AUTH_SEC
  );

  res.status(200).json({
    success: true,
    message: "user logged in",
    token: token,
  });
});
