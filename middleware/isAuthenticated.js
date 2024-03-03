const isAuthenticated = (req, res, next) => {
  //console.log("Session:", req.session);
  const user = req.session.user;
  // console.log("User:", user);

  if (req.session && user) {
    // User is authenticated
    next();
  } else {
    // User is not authenticated
    res.status(401).send("Please Connect!!!!");
  }
};

module.exports = isAuthenticated;
