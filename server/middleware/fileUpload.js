const Multer = require('multer')
const { Storage } = require('@google-cloud/storage')

const storage = new Storage({ projectId: process.env.GCLOUD_PROJECT, credentials: { client_email: process.env.GCLOUD_CLIENT_EMAIL, private_key: process.env.GCLOUD_PRIVATE_KEY } })

const bucketName = process.env.GCS_BUCKET
const bucket = storage.bucket(bucketName)

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
})

// Upload the file to Google Cloud Storage
const uploadToGCS = async (file, folder) => {
  return new Promise((resolve, reject) => {
    const folderPath = `${folder}/`
    const newFileName = `${folderPath}${Date.now()}-${file.originalname}`
    const blob = bucket.file(newFileName)
    const blobStream = blob.createWriteStream()

    blobStream.on('error', (err) => reject(err))

    blobStream.on('finish', () => {
      resolve(newFileName)
    })

    blobStream.end(file.buffer)
  })
}

const loadFileFromGCS = async (fileName) => {
  const options = {
    version: 'v4',
    action: 'read',
    expires: Date.now() + 1000 * 60 * 60
  }

  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options)

  return new Promise((resolve, reject) => {
    resolve(url)
  })
}

module.exports = {
  multer,
  uploadToGCS,
  loadFileFromGCS
}
