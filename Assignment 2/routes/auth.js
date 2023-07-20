const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.redirect('/login');
  }

  user.comparePassword(password, (err, isMatch) => {
    if (err || !isMatch) {
      return res.redirect('/login');
    }

    req.session.userId = user._id;
    res.redirect('/contacts');
  });
});

module.exports = router;
