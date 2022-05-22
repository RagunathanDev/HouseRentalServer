const express = require("express");
//involk the router into express
const router = express.Router();

const UserInfo = require("../models/userInfo");

//create User
router.post("/createUser", async (req, res) => {
  try {
    const userInfo = new UserInfo({
      name: req.body.name,
      email: req.body.email,
      mobileNumber: Number(req.body.mobileNo),
      aadhaar: Number(req.body.aadhaar),
      role: req.body.role,
    });

    userInfo.setPassword(req.body.password);
    //console.log(userInfo);

    const saveUserInfo = await userInfo.save();
    //console.log("save");

    res.status(200).json(saveUserInfo);
  } catch (err) {
    //console.error(err);
    res.status(500).json({ message: err.message });
  }
  // post.save()
  //     .then(data=>{
  //         res.json(data);
  //     })
  //     .catch(err=>{
  //         res.status(400).json(err);
  //     })
});

router.get("/getAllUsers", async (req, res) => {
  try {
    const allUsers = await UserInfo.find();
    //console.log(allUsers);
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// User login api
router.post("/login", (req, res) => {
  // Find user with requested email
  UserInfo.findOne({ email: req.body.email }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      if (user.validPassword(req.body.password)) {
        return res.status(201).send({
          message: "User Logged In",
          user: user,
        });
      } else {
        return res.status(400).send({
          message: "Wrong Password",
        });
      }
    }
  });
});

module.exports = router;
