/* eslint-disable dot-notation */
const Crypto = require('../models/InvestmentTypes/Crypto')
const User = require('../models/User')
const { uploadPhotoToGCS, uploadFilesToGCS, loadFileFromGCS, deleteFolderFromGCS, updateFileFromGCS, deleteFileFromGCS, moveGCSFile } = require('../middleware/googleCloud')

const createCrypto = async (req, res, next) => {
  try {
    const { userId } = req
    const user = await User.findById(userId)

    const {
      name,
      currency,
      date,
      value,
      taxStatus,
      type,

      symbol,
      quantity,
      purchasePrice,
      purchaseDate,
      additionalDetails,
      purchasedAt,
      walletAddress,

      accountNumber,
      email,
      phone,
      companyAddress
    } = req.body

    let photoFile = null
    let cryptoFiles = null

    if (req.files) {
      photoFile = req.files['photo'] ? req.files['photo'][0] : null
      cryptoFiles = req.files['files'] ? req.files['files'] : null
    }

    let photo = null
    let files = null

    if (photoFile) {
      photo = {
        url: null,
        folder: await uploadPhotoToGCS(photoFile, userId, name, 'cryptos')
      }
    }

    if (cryptoFiles) {
      files = await Promise.all(cryptoFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'cryptos')
        }
      }))
    }

    const contactInformation = {
      accountNumber,
      email,
      phone,
      companyAddress
    }

    const crypto = {
      name,
      currency,
      date,
      value,
      taxStatus,
      type,
      symbol,
      quantity,
      purchasePrice,
      purchaseDate,
      additionalDetails,
      purchasedAt,
      walletAddress,
      contactInformation,
      photo,
      files
    }

    console.log('Crypto to save: ', crypto)

    const newCryptos = new Crypto({
      ...crypto,
      user: user._id
    })

    const savedCryptos = await newCryptos.save()

    user.assets.push(savedCryptos._id)
    await user.save()

    res.status(201).json(savedCryptos)
  } catch (error) {
    console.log('Error: ', error)
    next(error)
  }
}

const getAllUserCryptos = async (req, res, next) => {
  const { userId } = req

  try {
    // Find cryptos that belong to the user with the given ID
    const cryptos = await Crypto.find({ user: userId })

    const changePhotoPromises = cryptos.map(async (crypto) => {
      if (crypto.photo.folder) {
        crypto.photo = {
          ...crypto.photo,
          url: await loadFileFromGCS(crypto.photo.folder)
        }
      } else {
        crypto.photo = {
          ...crypto.photo,
          url: 'https://i.pinimg.com/564x/dc/56/40/dc56402c003b214d53c13e8fdb1a96ed.jpg'
        }
      }

      if (crypto.files) {
        console.log('Set files')
        console.log('cryptos files folder: ', crypto.files.folder)
        crypto.files = await Promise.all(
          crypto.files.map(async (file) => {
            return {
              ...file,
              url: await loadFileFromGCS(file.folder)
            }
          })
        )
      }
    })

    // Wait for all the promises to complete
    await Promise.all(changePhotoPromises)

    res.json(cryptos)
  } catch (error) {
    next(error)
  }
}

const getCryptoById = async (req, res, next) => {
  const { id } = req.params

  try {
    const crypto = await Crypto.findById(id)
    // }
    const changePhotoPromise = async () => {
      if (crypto.photo.folder) {
        crypto.photo = {
          ...crypto.photo,
          url: await loadFileFromGCS(crypto.photo.folder)
        }
      } else {
        crypto.photo = {
          ...crypto.photo,
          url: 'https://i.pinimg.com/564x/dc/56/40/dc56402c003b214d53c13e8fdb1a96ed.jpg'
        }
      }

      if (crypto.files) {
        console.log('Set files')
        crypto.files = await Promise.all(
          crypto.files.map(async (file) => {
            return {
              ...file,
              url: await loadFileFromGCS(file.folder)
            }
          })
        )
      }
    }

    // Wait for the promise to complete
    await changePhotoPromise()

    res.json(crypto)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const updateCrypto = async (req, res, next) => {
  const { id } = req.params
  const updates = req.body

  console.log('updates: ', updates)

  try {
    const cryptoToUpdate = await Crypto.findById(id)
    const { userId } = req

    const { name } = cryptoToUpdate
    let { files } = cryptoToUpdate

    console.log('Files before: ', files)

    let photoFile = null
    let cryptoFiles = null

    if (req.files) {
      photoFile = req.files['photo'] ? req.files['photo'][0] : null
      cryptoFiles = req.files['files'] ? req.files['files'] : null
    }

    console.log('crypto files: ', cryptoFiles)

    let photoPath = null

    if (photoFile) {
      // console.log('get photo file')
      photoPath = await updateFileFromGCS(photoFile, cryptoToUpdate.photo.folder)
    }

    if (cryptoFiles) {
      console.log('Set files')
      const newFiles = await Promise.all(cryptoFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'cryptos')
        }
      }))

      files = files.concat(newFiles)
    }

    // Check for empty values in updates
    // const hasEmptyValues = Object.values(updates).some((value) => {
    //   if (typeof value === 'string') {
    //     return value.trim() === ''
    //   }
    //   return false
    // })

    // if (hasEmptyValues) {
    //   return res.status(400).json({ error: 'Empty values are not allowed' })
    // }

    // add photo to updates if it exists
    if (photoPath) {
      updates.photo = {
        ...updates.photo,
        folder: photoPath
      }
    }

    // add files to updates if it exists
    if (files) {
      updates.files = files
    }

    // console.log('updates photo: ', updates.photo)

    // Confirm note exists to update
    const updatedCryptos = await Crypto.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).exec()

    res.json(updatedCryptos)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const deleteCrypto = async (req, res, next) => {
  const { id } = req.params

  try {
    const { userId } = req
    const user = await User.findById(userId)
    const cryptoToDelete = await Crypto.findByIdAndDelete(id)

    if (cryptoToDelete.photo) {
      const folderPath = `${userId}/cryptos/${cryptoToDelete.name}/`
      await deleteFolderFromGCS(folderPath)
    }

    const updatedAssets = user.assets.filter(asset => asset.toString() !== id)
    user.assets = updatedAssets
    await user.save()

    console.log('assets after: ', user.assets)

    res.status(204).end()
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const deleteFile = async (req, res, next) => {
  const { id, fileId } = req.params

  try {
    const crypto = await Crypto.findById(id)

    if (crypto && crypto.files) {
      const fileToDelete = crypto.files.find(file => file._id.toString() === fileId)

      if (fileToDelete) {
        await deleteFileFromGCS(fileToDelete.folder)

        const updatedFiles = crypto.files.filter(file => file._id.toString() !== fileId)
        crypto.files = updatedFiles

        await Crypto.findByIdAndUpdate(
          id,
          crypto,
          { new: true }
        ).exec()

        res.status(204).end()
      }
    }
  } catch (error) {
    next(error)
  }
}

const renameFile = async (req, res, next) => {
  const { id, fileId } = req.params

  try {
    const crypto = await Crypto.findById(id)

    if (crypto && crypto.files) {
      const fileToRename = crypto.files.find(file => file._id.toString() === fileId)

      if (fileToRename) {
        const { oldName, newName } = req.body

        const oldPath = fileToRename.folder
        const newPath = oldPath.replace(oldName, newName)

        await moveGCSFile(oldPath, newPath)

        fileToRename.folder = newPath

        const fileIndex = crypto.files.findIndex(file => file._id.toString() === fileId)
        crypto.files[fileIndex] = fileToRename

        await Crypto.findByIdAndUpdate(
          id,
          crypto,
          { new: true }
        ).exec()

        console.log('Crypto files: ', crypto.files)

        res.status(204).end()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createCrypto,
  getAllUserCryptos,
  getCryptoById,
  updateCrypto,
  deleteCrypto,
  deleteFile,
  renameFile
}
