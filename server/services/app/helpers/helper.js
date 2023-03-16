const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const JWT_SECRET_KEY='bismillah';
module.exports = {
  hash: (password) => {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
  },
  compare: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },
  encodeToken: (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY);
  },
  decodeToken: (token) => {
    return jwt.verify(token, JWT_SECRET_KEY);
  },
};
