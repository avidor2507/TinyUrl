import express from 'express';
import validUrl from 'valid-url';
import { generate } from 'shortid';

const router = express.Router();
const baseUrl = "http://localhost:8080";

// @route   POST    /short
// @desc    create short URL
router.post('/short', (req, res) => {
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        return res.status(400).json('No URL value');
    }

    if (!validUrl.isUri(baseUrl)) {
        return res.status(500).json('There is a problem with the server');
    }

    const { url } = req.body;
    if (!validUrl.isUri(url)) {
        return res.status(400).json('Invalid URL');
    }

    //check if long url already exist in database
    //if exist return the existed one

    const code = generate();
    const shortUrl = `${baseUrl}/${code}`;
    return res.status(200).json(shortUrl);
});

export default router;