const express = require("express");
const User = require("../../models/User");
const gravatar = require("gravatar");
const auth = require("../../middleware/auth");
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

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
