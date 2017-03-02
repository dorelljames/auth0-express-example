module.exports = function requireRole(role) {
  return function(req, res, next) {
  	if (! req.user) {
  		next();
  	}
  	console.log(req.user);

    var appMetadata = req.user._json.app_metadata || {};
    var roles = appMetadata.roles || [];

    console.log(roles);

    if (roles.indexOf(role) != -1) {
      next();
    } else {
      res.redirect('/unauthorized');
    }
  }
}
