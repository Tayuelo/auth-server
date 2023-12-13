const jwt = require("jsonwebtoken");

const toJWT = (uid = "", secret, expiresIn) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) {
        console.error(err);
        reject("Token creation failed");
      } else {
        resolve(token);
      }
    });
  });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  toJWT,
  verifyToken
};
