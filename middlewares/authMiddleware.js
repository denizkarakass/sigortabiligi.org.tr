const user = require('../Models/User');

module.exports = (req, res, next) => {
  user.findById(req.session.userID, (err, user) => {
    if (err || !user) return res.redirect('/giris-yap');
    next();
  });
};