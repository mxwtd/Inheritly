const Multer = require('multer')
const { Storage } = require('@google-cloud/storage')

const storage = new Storage({ projectId: process.env.GCLOUD_PROJECT, credentials: { client_email: process.env.GCLOUD_CLIENT_EMAIL, private_key: process.env.GCLOUD_PRIVATE_KEY } })

const bucket = storage.bucket(process.env.GCS_BUCKET)

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
})

// Upload the file to Google Cloud Storage
const uploadToGCS = async (file, folder) => {
  console.log('enter to uploadToGCS')
  console.log('save file: ', file)
  return new Promise((resolve, reject) => {
    const folderPath = `${folder}/`
    const newFileName = `${folderPath}${Date.now()}-${file.originalname}`
    const blob = bucket.file(newFileName)
    const blobStream = blob.createWriteStream()

    blobStream.on('error', (err) => reject(err))

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      resolve(publicUrl)
    })

    blobStream.end(file.buffer)
  })
}

module.exports = {
  multer,
  uploadToGCS
}
