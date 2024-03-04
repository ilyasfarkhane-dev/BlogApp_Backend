const isAuthenticated = (req, res, next) => {
  const user = req.session.user;

  if (req.session && user) {
    next();
  } else {
    res.status(401).send("Please Connect!!!!");
  }
};

module.exports = isAuthenticated;
