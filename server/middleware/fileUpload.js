const multer = require('multer')
const { Storage } = require('@google-cloud/storage')

// Set up Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the temporary upload destination on your server
    console.log('set temp upload destination')
    cb(null, '../temp/uploads')
  },
  filename: (req, file, cb, next) => {
    // Set the filename for the uploaded file
    console.log('set filename')
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

// Create a Google Cloud Storage client
const storageClient = new Storage()

// Upload the file to Google Cloud Storage
const uploadToGCS = async (file) => {
  console.log('save file: ', file)
  const bucketName = process.env.BUCKET_NAME
  const bucket = storageClient.bucket(bucketName)

  const fileName = Date.now() + '-' + file.originalname
  const fileDestination = 'uploaded-files/' + fileName

  // Upload the file to Google Cloud Storage
  await bucket.upload(file.path, {
    destination: fileDestination
  })

  // Get the signed URL of the uploaded file
  const signedUrl = await bucket.file(fileDestination).getSignedUrl({
    action: 'read',
    expires: '03-01-2024' // Set the expiration date as needed
  })

  return signedUrl[0]
}

module.exports = {
  upload,
  storageClient,
  uploadToGCS
}
