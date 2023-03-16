const bcrypt = require("bcrypt");
module.exports = {
  hash: (password) => {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
  },
  compare: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  }
};
