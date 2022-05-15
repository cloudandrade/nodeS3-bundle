const routes = require('express').Router();
const streamifier = require('streamifier');

const multer = require('multer');
const { sendFile } = require('./src/services/aws-service');

routes.get('/files', async (req, res) => {
  //const posts = await Post.find();
  const files = 'nada ainda';
  console.log('files get');

  return res.json(files);
});

routes.post(
  '/user/img',
  multer().single('file'),
  async (req, res) => {
    try {
      await sendFile(
        req.file.originalname,
        streamifier.createReadStream(req.file.buffer),
        process.env.BUCKET_NAME,
        process.env.AWS_USER_IMG_FOLDER
      );

      const accessUrl = `https://geekstorebrasil.s3.amazonaws.com/${process.env.AWS_USER_IMG_FOLDER}/${req.file.originalname}`;

      const { originalname: name, size, key } = req.file;
      const url = accessUrl;

      const file = {
        name,
        size,
        key,
        url,
      };

      return res.json(file);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

module.exports = routes;
