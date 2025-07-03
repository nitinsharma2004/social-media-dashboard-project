import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization)  return res.status(401).send("You are not authenticated!");
    const token = req.headers.authorization.split(" ")[1];
    if (!token)  return next(createError(401, "You are not authenticated!"));

    const decode = await jwt.verify(token, process.env.JWT);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error)
    res.status(402).json({ error: error.message })
  }
};