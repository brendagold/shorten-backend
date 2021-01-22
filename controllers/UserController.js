const User = require('../models/User');
const Code = require('../models/Code');
const bcrypt = require('bcrypt');
const mailgun = require('mailgun-js');
const DOMAIN = 'sandbox92129b44ee8d4acab3f2651b2e082010.mailgun.org';
const apikey = '1ff07939e3423792a2c8b2ac92d070b2-cb3791c4-dbf694a8';
const mg = mailgun({ apiKey: apikey, domain: DOMAIN });

module.exports = {
  async createUser(req, res) {
    try {
      const { userName, password, email, code } = req.body;

      const AdminCode = await Code.findOne({ code });

      if (AdminCode) {
        const existenUser = await User.findOne({ email });
        if (!existenUser) {
          const hashedPassword = await bcrypt.hash(password, 10);

          // const data = {
          //   from: 'noreply@techie.com',
          //   to: email,
          //   subject: 'Hello',
          //   text: 'Testing some Mailgun awesomness!',
          // };
          // mg.messages().send(data, function (error, body) {
          //   console.log(body);
          // });

          const user = await User.create({
            userName,
            email,
            password: hashedPassword,
          });

          return res.json({
            _id: user._id,
            email: user.email,
            userName: user.userName,
          });
        }
      } else {
        return res.json({ message: 'You are not Authorized to Register' });
      }
      return res.status(400).json({
        message: 'email/user already exist! Do you want to login instead?',
      });
    } catch (error) {
      throw Error(`Error while registering a new user : ${error}`);
    }
  },

  async getUserById(req, res) {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        message: 'User ID does not exist! Do you want to Register instead?',
      });
    }
  },
};
