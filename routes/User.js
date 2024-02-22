const express = require("express");
const User = require("../models/users.model");
const router = express.Router();

router.get("/get_users", async (req, res) => {
  try {
    const { filter, value } = req.query;
    const users = await User.find({});
    if (!filter || !value) {
      return res.status(200).send(users);
    } else {
      const filteredUsers = users.filter((user) => {
        return (
          user[filter] &&
          user[filter].toLowerCase().includes(value.toLowerCase())
        );
      });
      return res.status(200).send(filteredUsers);
    }
  } catch (error) {
    res.status(400).json({ msg: `${error.message}` });
  }
});

router.post("/post_users", async (req, res) => {
  try {
    const { firstName, lastname, username, email, idNo, password } = req.body;
    const emailFound = await User.findOne({ email });
    const usernameFound = await User.findOne({ username });
    const idNoFound = await User.findOne({ idNo });
    if (emailFound || usernameFound || idNoFound) {
      return res.status(400).json({
        msg: "User not created",
        emailFound: !!emailFound,
        usernameFound: !!usernameFound,
        idNoFound: !!idNoFound,
      });
    } else {
      const newUser = await User.create(req.body);
      return res.status(200).json({
        msg: "The user is successfully registered",
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong with your server" });
  }
});

router.delete("/delete_users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({ msg: "User not found" });
    } else {
      return res.status(200).json({
        msg: "User deleted successfully",
      });
    }
  } catch (error) {
    res.status(404).json({ msg: `${error.message}` });
  }
});

router.put("/update_user/:user_name", async (req, res) => {
  try {
    const { user_name } = req.params;
    const { firstName, lastName, email, idNo, password } = req.body;
    const allowedUpdates = { firstName, lastName, email, idNo, password };
    const updates = Object.keys(allowedUpdates).reduce((obj, key) => {
      if (allowedUpdates[key] !== undefined) {
        obj[key] = allowedUpdates[key];
      }
      return obj;
    }, {});

    const user = await User.findOne({ username: user_name });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const updatedUser = await User.findOneAndUpdate(
      { username: user_name },
      updates,
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username,password });

    if(!user){
      return res.status(400).json({msg:'Invalid credentials'})
    }
    res.status(200).json({msg:"User is validated"});

  } catch (error) {
    res.status(500).send({ msg: `${error.message}` });
  }
});

module.exports = router;
