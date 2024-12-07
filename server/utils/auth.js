const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    res.status(401);
    throw new Error("Authentication error");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.AUTH_SEC);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403);
    throw new Error("Unauthorized access");
  }
};
