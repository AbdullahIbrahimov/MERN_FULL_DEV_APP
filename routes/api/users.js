const express = require("express");
const User = require("../../models/User");
const gravatar = require("gravatar");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    user.avatar = gravatar.url(user.email, {
      s: "200",
      r: "pg",
      d: "mm"
    });
    await user.save();
    const token = await user.generateToken();
    res.status(201).send({ token, username: user.name, avatar: user.avatar, id: user.id });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
