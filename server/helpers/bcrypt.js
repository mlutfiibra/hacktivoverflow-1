const bcrypt = require('bcryptjs')

module.exports = {
  encrypt(password) {
    return bcrypt.hashSync(password, 9)
  },
  decrypt(password, hash) {
    return bcrypt.compareSync(password, hash)
  }
}