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
const uploadPhotoToGCS = async (file, userId, propertyName, type) => {
  return new Promise((resolve, reject) => {
    const folderPath = `${userId}/${type}/${propertyName}/photos/`
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

const uploadFilesToGCS = async (file, userId, propertyName) => {
  return new Promise((resolve, reject) => {
    const folderPath = `${userId}/properties/${propertyName}/files/`
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

const updateFileFromGCS = async (file, fileName) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(fileName)
    const blobStream = blob.createWriteStream()

    blobStream.on('error', (err) => reject(err))

    blobStream.on('finish', () => {
      resolve()
    })

    blobStream.end(file.buffer)
  })
}

const deleteFileFromGCS = async (fileName) => {
  return new Promise((resolve, reject) => {
    bucket.file(fileName).delete()
      .then(() => {
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const deleteFolderFromGCS = async (folderPath) => {
  const [files] = await storage.bucket(bucketName).getFiles({ prefix: folderPath })

  const deletionPromises = files.map((file) => file.delete())
  await Promise.all(deletionPromises)

  return storage.bucket(bucketName).deleteFiles({ prefix: folderPath })
}

module.exports = {
  multer,
  uploadPhotoToGCS,
  uploadFilesToGCS,
  loadFileFromGCS,
  updateFileFromGCS,
  deleteFileFromGCS,
  deleteFolderFromGCS
}
