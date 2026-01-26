const checkAuth = (req, res, next) => {
  if (req.session.user) {
    console.log(req.session.user);
    next();
  } else {
    res.status(401).send({ message: "Authorization required." });
  }
};

module.exports = checkAuth;
