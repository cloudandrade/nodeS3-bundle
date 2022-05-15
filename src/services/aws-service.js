const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Upload file to specified bucket.
const sendFile = async (FILENAME, FILE, BUCKET, KEY) => {
  const params = {
    Bucket: BUCKET,
    Key: `${KEY}/${FILENAME}`,
    Body: FILE,
  };

  s3.upload(params, function (s3Err, data) {
    if (s3Err) throw s3Err;

    console.log(`File uploaded successfully at ${data.Location}`);
  });
};

const deleteFile = async (FILENAME, BUCKET, KEY) => {
  const params = {
    Bucket: BUCKET,
    Key: `${KEY}/${FILENAME}`,
  };

  s3.deleteObject(params, function (s3Err) {
    if (s3Err) throw s3Err;
    console.log(`File deleted successfully`);
  });
};

module.exports = { sendFile, deleteFile };
