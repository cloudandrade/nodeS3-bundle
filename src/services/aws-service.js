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

  return s3.upload(params, function (s3Err, data) {
    if (s3Err) throw s3Err;
    console.log(`File uploaded successfully at ${data.Location}`);
    return data.location;
  });
};

module.exports = { sendFile };
