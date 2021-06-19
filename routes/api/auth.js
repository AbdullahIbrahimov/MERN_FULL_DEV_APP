const express = require("express");
const { request } = require("http");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const router = express.Router();

router.post("/auth", async (req, res) => {
  try {
    const user = await User.getByCredentials(req.body.email, req.body.password);
    const token = await user.generateToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
