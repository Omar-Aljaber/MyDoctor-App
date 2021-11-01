import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import models from "../models";

/**
 * Register.
 * @param req
 * @param res
 */
export const register = async (req, res) => {
  const {
    name,
    email,
    password,
    userType,
    specialization,
    workingHours,
    address,
    location,
    phone,
  } = req.body;

  try {
    // Bcrypt the password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await models.User.create({
      name,
      email,
      password: hashPassword,
      userType,
      latitude: location.latitude,
      longetude: location.longetude,
    });
    // Check if user is a Doctor
    if (userType === "doctor") {
      const profile = await models.Profile.create({
        userId: user.id,
        specialization,
        workingHours,
        address,
        phone,
      });
    }

    res.status(200).json({ message: "Account has been created!" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

/**
 * Login.
 * @param req
 * @param res
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Incorrect Email or Password!" });
    }
    // Decrypt the password
    const authSuccess = bcrypt.compare(password, user.password);
    if (authSuccess) {
      // Generate user token.
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token: token });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

/**
 * Chek me.
 * @param req
 * @param res
 */
export const me = (req, res) => {
  const user = req.user;
  res.json(user);
};

/**
 * Get Profile data.
 * @param req
 * @param res
 */
export const profile = async (req, res) => {
  try {
    // Finde the Doctor profile
    const result = await models.User.findOne({
      where: { id: req.user.id },
      include: [{ model: models.Profile, as: "profile" }],
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
