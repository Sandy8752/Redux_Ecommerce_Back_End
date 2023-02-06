const User = require("../Models/Users");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/register", async (request, response) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(request.body.password, salt);
  request.body.password = hash;
  const newUser = new User({
    userName: request.body.userName,
    email: request.body.email,
    password: request.body.password,
  });

  try {
    const savedUser = newUser.save();
    response.status(200).json({
      message: "User added!",
      savedUser,
    });
  } catch (error) {
    response.status(500).json(error);
  }
});

router.post("/", async (request, response) => {
  try {
    const user = await User.findOne({ userName: request.body.userName });
    if (user) {
      const match = await bcrypt.compare(request.body.password, user.password);
      if (match) {
        const token = jwt.sign(
          { id: user._id, username: user.userName },
          process.env.JWT_SEC
        );
        response
          .status(200)
          .json({ user, message: "Successfully Logged In !!", token });
      } else {
        response.json({ message: "Password Incorrect" });
      }
    } else {
      response.json({ message: "User Not Found" });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;