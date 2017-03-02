var express = require('express');
var path = require('path');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var requireRole = require('../requireRole');
var sys = require('sys'),
    exec = require('child_process').exec;

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  next();
});

router.get('/admin',
  requireRole('admin'),
  function(req, res, next) {
  next();
});

router.get('/about-us', requireRole('user'), function(req, res, next) { next() });

router.get('/login', function(req, res){
  res.render('login', { env: env });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.post('/build', function(req, res) {

  console.log("Building roots");

  exec('bash build.sh', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

  res.status(200);
  res.send('OK. We are building your site!');
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/' || '/user');
  });


module.exports = router;
