// const { Storage } = require('@google-cloud/storage')
// const storage = new Storage({
//   keyFilename: '/path/to/inheritlytest-55b611cf095a.json' // Update with the absolute path to the service account key file
// })
// const bucketName = 'your-bucket-name' // Update with your actual bucket name

// const bucket = storage.bucket(bucketName)

// export const uploadPhotoToCloudStorage = async (localFilePath, destinationPath) => {
//   // Uploading the photo
//   const file = bucket.file('someFolderInBucket/profile.png') // Update with the desired file name and destination folder

//   await file.save(photo, { resumable: false })

//   const photoUrl = await file.getSignedUrl({
//     action: 'read',
//     expires: '03-17-2025' // Update with an appropriate expiration date
//   })

//   return photoUrl[0]
// }
