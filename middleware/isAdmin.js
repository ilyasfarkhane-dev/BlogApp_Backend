const isAdmin = (req, res, next) => {
  const user = req.session.user;
  console.log(user);
  if (user && user.roles === "admin") {
    next();
  } else {
    res.status(403).send("Only Admin Can Do This Operations, Sorry!!!!");
  }
};

module.exports = isAdmin;
