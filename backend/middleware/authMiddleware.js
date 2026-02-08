// ------------------------------ Authentication Middleware ------------------------------ //
// Check if user is authenticated
const checkAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log(req.session.user);
    next();
  } else {
    res.status(401).send({ message: "Authorization required." });
  }
};

// ------------------------------ Export Middleware ------------------------------ //
module.exports = checkAuth;
