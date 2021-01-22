const express = require('express');
const config = require('config');
const shortid = require('shortid');
const validUrl = require('valid-url');
const verifyToken = require('../config/verifyToken');

const router = express.Router();
const Url = require('../models/Url');

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const { user_id } = req.headers;

  const baseUrl = config.get('baseUrl');

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid Base Url');
  }

  // Create Url Code

  const urlCode = shortid.generate();

  // Check long Url

  if (validUrl.isUri(baseUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          user: user_id,
          date: new Date(),
        });

        await url.save();

        res.json(url);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long Url');
  }
});

router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No url Found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
});

router.delete('/url/:urlId', async (req, res) => {
  const { urlId } = req.params;

  try {
    await Url.findByIdAndDelete(urlId);

    return res.status(204).send(`Successfully deleted`);
  } catch (error) {
    return res.status(400).json({
      message: `We don't have any event with the ID`,
    });
  }
});

module.exports = router;
