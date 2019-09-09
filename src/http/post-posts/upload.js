let mime = require('mime')
let aws = require('aws-sdk')
let s3 = new aws.S3

/**
 * @param {object} params
 * @param {string} params.key
 * @param {object} params.photo
 * @param {string} params.photo.contentType
 * @param {buffer} params.photo.content
 */
module.exports = async function upload(params) {
  let ext = mime.getExtension(params.photo.contentType)
  let filename = `${params.key}.${ext}`
  await s3.putObject({
    ACL: 'public-read',
    Bucket: process.env.ARC_STATIC_BUCKET,
    Key: filename,
    Body: params.photo.content,
    ContentType: mime.getType(ext)
  }).promise()
  return filename
}
