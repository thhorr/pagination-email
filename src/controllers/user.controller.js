const express = require("express")

const router = express.Router();

const User = require("../models/user.model")

const transporter = require("../configs/mail");

const adminEmails = [
  "abc@gmail.com",
  "ghj@gmail.com",
  "tuy@gmail.com",
  "vbd@gmail.com",
  "pow@gmail.com",
];

router.get("", async function (req, res) {

    const page = +req.query.page || 1;

    const size = +req.query.size || 10;

    const offset = (page - 1) * size;

    const users = await User.find().skip(offset).limit(size).lean().exec();

    const totalUserCount = await User.find().countDocuments();

    const totalPage = Math.ceil(totalUserCount / size);

    return res.send({ users, totalPage });
})

router.get("/signup", async function (req, res) {
  res.render("./signup");
});


router.post("/signupp", async function (req, res) {
  const user = new User(req.body);
  const data = await user.save();

  let message = {
    from: "yogendra_fw10_205@masai.school",
    to: user.email,
    subject: ` Welcome to ABC system ${user.first_name} ${user.last_name}`,
    text: ` Hi ${user.first_name}, Please confirm your email address`,
  };

  transporter.sendMail(message);

  //set of admins:
  adminEmails.forEach((email) => {
    let message = {
      from: "yogendra_fw10_205@masai.school",
      to: email,
      subject: `${user.first_name} ${user.last_name} has registered with us`,
      text: `Please welcome ${user.first_name} ${user.last_name}`,
    };

    transporter.sendMail(message);
  });

  return res.send(data);
});


module.exports = router;