const express = require("express");
const User = require("../models/user.model");
const emailValidator = require("deep-email-validator");
const passwordValidator = require("password-validator");
const hashedPassword = require("../utils/hashedPassword");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const passwordSchema = new passwordValidator();
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values
async function isEmailvalid(email) {
  return emailValidator.validate(email);
}
const SignUp = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const { valid, reason, validators } = await isEmailvalid(email);
  try {
    if (!(name || email || password || role)) {
      res.status(400).json({
        message: "Please fill needed Fields",
      });
    } else if (!valid) {
      return res.status(400).send({
        message: "Please provide a valid email address.",
        reason: validators[reason].reason,
      });
    } else {
      const validationResult = passwordSchema.validate(password, { details: true });
      if (validationResult.length > 0) {
        res.status(400).json({
          message: "error in password validation",
          errors: validationResult,
        });
      } else {
        const userExit = await User.findOne({ email });
        if (!userExit) {
          const hash_password = hashedPassword(password);

          const createUser = await User.create({
            name,
            email,
            password: hash_password,
            role,
          });
          res.json({ message: "successfully created user" });
        } else {
          res.status(409).json({
            success: false,
            message: "Your email address is already in use",
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const SignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!(email || password)) {
      res.status(400).json({
        message: "Please enter your email address",
      });
    } else {
      const checkuser = await User.findOne({ email });
      if (!checkuser) {
        return res.status(404).json({
          success: false,
          message: "Account not found",
        });
      } else {
        const checkPassword = bcryptjs.compareSync(password, checkuser.password);
        if (!checkPassword) {
          return res.status(404).json({
            success: false,
            message: "Incorrect password Please try again",
          });
        } else {
          const token = jwt.sign(
            {
              id: checkuser._id,
              email: checkuser?.email,
              role: checkuser?.role,
            },
            "deault_secret_key",
            { expiresIn: "1d" }
          );
          const finalResult = {
            token,
            user: {
              email: checkuser.email,
              name: checkuser.name,
              _id: checkuser._id,
              role: checkuser?.role,
            },
          };
          return res.json({
            success: true,
            message: "Login successful",
            finalResult,
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { SignUp, SignIn };
