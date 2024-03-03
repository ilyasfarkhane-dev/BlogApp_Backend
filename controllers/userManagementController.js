const mongoose = require("mongoose");
const users = require("../models/users");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email: email });

    if (!user || user.length == 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    req.session.user = {
      username: user.username,
      roles: user.roles,
      id: user._id,
    };

    const message = `Hi ${user.username}, You are ${user.roles}`;
    res.status(201).json({ message });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const signupController = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      req.body.password = hash;
      await users.insertMany(req.body);
      res.status(201).send("user created!!!");
    });
  } catch (err) {
    console.log(err);
  }
};

const logoutController = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error logging out" });
    }
    res.clearCookie();
    res.status(200).json({ message: "Logout successful" });
  });
};

const getUsersController = async (req, res) => {
  try {
    const user = await users.find({});

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};

const deleteUserController = async (req, res) => {
  const id = req.params.id;

  try {
    await users.deleteOne({ _id: id });

    res.status(201).send("User Deleted!!!!");
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};
const updateUserController = async (req, res) => {
  try {
    const user = await users.updateOne({ _id: req.params.id }, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};

module.exports = {
  getUsersController,
  loginController,
  signupController,
  logoutController,
  deleteUserController,
  updateUserController,
};
