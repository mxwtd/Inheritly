// const { Storage } = require('@google-cloud/storage')

// const storage = new Storage({
//   keyFilename: './config/inheritlytest-55b611cf095a.json'
// })

// const bucketName = process.env.BUCKET_NAME
// const bucket = storage.bucket(bucketName)

export const uploadPhotoToCloudStorage = (localFilePath, destinationPath) => {
  // return new Promise((resolve, reject) => {
  //   bucket.upload(localFilePath, { destination: destinationPath }, (err, file) => {
  //     if (err) {
  //       console.error(`Error uploading image: ${err}`)
  //       reject(err)
  //     } else {
  //       console.log(`Image uploaded to ${bucketName}.`)
  //       resolve(file)
  //     }
  //   })
  // })
  console.log('path', localFilePath)
  console.log('destination', destinationPath)
  return 'hi'
}
