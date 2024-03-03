const isAdmin = (req, res, next) => {
  const user = req.session.user;
  console.log(user);
  if (user && user.roles === "admin") {
    // User is an admin
    next();
  } else {
    // User is not an admin
    res.status(403).send("Only Admin Can Do This Operations, Sorry!!!!");
  }
};

module.exports = isAdmin;
