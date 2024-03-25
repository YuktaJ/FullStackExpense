const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Sib = require("sib-api-v3-sdk");
const uuid = require("uuid");

const ForgotPassword = require("../models/forgotPassword");

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SIB_KEY;

exports.postSignup = async (req, res) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    let saltRounds = 10;
    let hash = await bcrypt.hash(password, saltRounds);

    // console.log(name, email, password);

    let user = new User({
      name: name,
      email: email,
      password: hash,
      totalExpense: 0,
      isPremium: false,
    });
    let result = await user.save();
    console.log(result);
    res.status(200).json({
      message: "User created successfully",
      user: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong.",
    });
  }
};
exports.generateToken = (id, name, isPremium) => {
  return jwt.sign({ id, name, isPremium }, process.env.SECRET_KEY);
};
exports.postLogin = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(403).json({
        error: "Invalid user details.",
      });
    }
    let result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({
        error: "Incorrect password!",
      });
    }
    res.status(202).json({
      token: exports.generateToken(user.id, user.name, user.isPremium),
      message: "Successfully logged in! ",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postForgotPassword = async (req, res) => {
  try {
    let email = req.body.resetEmail;
    console.log(email.length, email.trim().length);
    let user = await User.findOne({ email: email });
    console.log(req.user, "User hai");
    console.log(user, "Why null value?");
    if (user) {
      const id = uuid.v4();
      let obj = new ForgotPassword({
        uuid: id,
        active: true,
        userId: user._id,
      });
      await obj.save();

      const apiInstance = new Sib.TransactionalEmailsApi();
      console.log("working");

      const sendEmail = await apiInstance.sendTransacEmail({
        sender: { email: "yuktapatil1820@gmail.com" },
        to: [{ email: req.body.resetEmail }],
        subject: "Reset Your Expense Tracker Password",
        textContent:
          "Expense Tracker will help to cover your day-to-day expenses.",
        htmlContent: `<a href="http://localhost:3000/resetpassword/${id}" type="button">Reset password</a>`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getResetPassword = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    let forgotpasswordrequest = ForgotPassword.findOne({ uuid: id });
    if (forgotpasswordrequest) {
      console.log(forgotpasswordrequest.active, "here is active");
      ForgotPassword.findOneAndUpdate({ uuid: id }, { active: false });
      res.status(200).send(`  <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>

                                    <form action="/updatepassword/${id}" method="post">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required>
                                        <input name='resetpasswordid' type='hidden' value='${id}'>
                                        <button>reset password</button>
                                    </form>`);
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const newpassword = req.body.newpassword;
    const resetpasswordid = req.body.resetpasswordid;
    console.log(newpassword, resetpasswordid);

    let resetpasswordrequest = await ForgotPassword.findOne({
      uuid: resetpasswordid,
    });

    let user = await User.findOne({ _id: resetpasswordrequest.userId });
    if (user) {
      const saltrounds = 10;
      bcrypt.genSalt(saltrounds, (err, salt) => {
        if (err) {
          console.log(err);
          throw new Error(err);
        }
        bcrypt.hash(newpassword, salt, (err, hash) => {
          if (err) {
            console.log(err);
            throw new Error(err);
          }
          User.findByIdAndUpdate(
            {
              _id: resetpasswordrequest.userId,
            },
            { password: hash }
          ).then(() => {
            //res.sendStatus(201).json({message:'Successful Update new Password'})
          });
        });
      });
    } else {
      res.send(404).json({ error: "No user Exists", success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error, success: false });
  }
};
