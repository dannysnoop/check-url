const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({ region: 'us-east-1' });  // Thay theo region của bạn

exports.handler = async (event) => {
  const params = {
    Bucket: 'danny-deptrai11',  // Thay bằng tên bucket của bạn
    Key: 'hello.txt',             // Tên tệp bạn muốn lưu
    Body: 'Hello from Lambda!',   // Nội dung tệp
  };

  try {
    const data = await s3.send(new PutObjectCommand(params));
    console.log('File uploaded successfully', data);
    console.log('File uploaded successfully', data);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File uploaded successfully!' }),
    };
  } catch (err) {
    console.error('Error uploading file', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to upload file' }),
    };
  }
};