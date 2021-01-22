const Code = require('../models/Code');

module.exports = {
  async createCode(req, res) {
    try {
      const { code } = req.body;

      const newCode = await Code.create({
        code,
      });

      return res.json({
        _id: newCode._id,
        code: newCode.code,
      });
    } catch (error) {
      throw Error(`Error while creating a new code : ${error}`);
    }
  },

  async checkCode(req, res) {
    try {
      const { code } = req.body;

      const validCode = await Code.findOne({ code });

      if (!validCode) {
        return res.json(false);
      }

      if (validCode) {
        return res.json(true);
      }
    } catch (error) {
      throw Error(`Error while Authenticating the Code ${error}`);
    }
  },
};
