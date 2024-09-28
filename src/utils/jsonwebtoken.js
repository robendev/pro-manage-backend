import jwt from "jsonwebtoken";

const generateJsonWebToken = (payload) => {
  const tokenJwt = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "31d",
  });
  return tokenJwt;
};

export default generateJsonWebToken;
