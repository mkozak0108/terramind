const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const router = express.Router();
const { auth } = require("../middlewares/auth");
router.use(express.json());
const { messages } = require("../config/constants");

router.get("/", (req, res) => {
  res.send("Router works");
});

router.post("/api/signup", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(422).send({ error: messages.MISSING_FIELD });
  }
  if (password !== confirmPassword) {
    return res.status(422).send({ error: messages.PASSWORD_NOT_MATCHING });
  }

  try {
    let user = new User({ firstName, lastName, email, password });
    await user.save();
    let token = await user.generateAuthToken();
    user.toJSON();
    res.status(201).send({ user, token });
  } catch (error) {
    if (error.message.includes("duplicate key error")) {
      return res.status(422).send({ error: messages.DUPLICATE });
    }
    res.status(503).send({ error: error.message });
  }
});

router.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: messages.NO_EMAIL_FOUND });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(422).send({ error: messages.CANNOT_SIGNIN });
    }
    await user.comparePassword(password);
    let token = await user.generateAuthToken();
    user.toJSON();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(501).send({ error: messages.CANNOT_SIGNIN });
  }
});

router.post("/api/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (tokenObject) => tokenObject.token !== req.token
    );
    await req.user.save();
    res.status(200).send({ message: messages.LOGGED_OUT });
  } catch (error) {
    res.status(402).send({ error: error.message });
  }
});

router.post("/api/user/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send({});
  } catch (e) {
    res.status(402).send({ error: e.message });
  }
});

module.exports = router;
