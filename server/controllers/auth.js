const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isExisting = await User.findOne({ email });

    if (isExisting)
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while hashing the password",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while hashing the password" + error,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Incomplete information",
      });
    }

    const isExisting = await User.findOne({ email });
    if (!isExisting) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    const payload = {
      email: isExisting.email,
      id: isExisting._id,
      role: isExisting.role,
    };

    if (await bcrypt.compare(password, isExisting.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      let user = isExisting.toObject();

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User logged in Successfully",
      });
    } else
      return res
        .status(403)
        .json({ success: false, message: "Incorrect Password" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};
