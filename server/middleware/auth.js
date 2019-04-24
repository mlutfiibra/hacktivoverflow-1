const jwt = require('jsonwebtoken')

module.exports = {
  authentication: function(req, res, next) {
    if (req.headers.token == 'null') {
      res.status(401).json({errors: 'You must login first'})
    } else {
      let decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
      req.authUser = decoded
      next()
    }
  }
}
