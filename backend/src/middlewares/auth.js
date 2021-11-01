import jwt from "jsonwebtoken";

/**
 * LoggedIn Middleware.
 * @param req
 * @param res
 * @param next
 */
const isLoggend = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .stauts(400)
        .json({ message: "Missing the Authorization token!" });
    }
    // Get JWT_Token
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export default isLoggend;
