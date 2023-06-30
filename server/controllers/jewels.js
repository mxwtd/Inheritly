/* eslint-disable dot-notation */
const Jewel = require('../models/InvestmentTypes/Jewel')
const User = require('../models/User')
const { uploadPhotoToGCS, uploadFilesToGCS, loadFileFromGCS, deleteFolderFromGCS, updateFileFromGCS, deleteFileFromGCS, moveGCSFile } = require('../middleware/googleCloud')

const createJewel = async (req, res, next) => {
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

      description,
      history,
      condition,

      accountNumber,
      email,
      phone,
      companyAddress
    } = req.body

    let photoFile = null
    let vehicleFiles = null

    if (req.files) {
      photoFile = req.files['photo'] ? req.files['photo'][0] : null
      vehicleFiles = req.files['files'] ? req.files['files'] : null
    }

    let photo = null
    let files = null

    if (photoFile) {
      photo = {
        url: null,
        folder: await uploadPhotoToGCS(photoFile, userId, name, 'jewels')
      }
    }

    if (vehicleFiles) {
      files = await Promise.all(vehicleFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'jewels')
        }
      }))
    }

    const contactInformation = {
      accountNumber,
      email,
      phone,
      companyAddress
    }

    const jewel = {
      name,
      currency,
      date,
      value,
      taxStatus,
      type,
      description,
      history,
      condition,
      contactInformation,
      photo,
      files
    }

    console.log('Jewel to save: ', jewel)

    const newJewels = new Jewel({
      ...jewel,
      user: user._id
    })

    const savedJewels = await newJewels.save()

    user.assets.push(savedJewels._id)
    await user.save()

    res.status(201).json(savedJewels)
  } catch (error) {
    console.log('Error: ', error)
    next(error)
  }
}

const getAllUserJewels = async (req, res, next) => {
  const { userId } = req

  try {
    // Find jewels that belong to the user with the given ID
    const jewels = await Jewel.find({ user: userId })

    const changePhotoPromises = jewels.map(async (jewel) => {
      if (jewel.photo.folder) {
        jewel.photo = {
          ...jewel.photo,
          url: await loadFileFromGCS(jewel.photo.folder)
        }
      } else {
        jewel.photo = {
          ...jewel.photo,
          url: 'https://i.pinimg.com/564x/91/ed/eb/91edebb64768d1f00ca34807a6b74d73.jpg'
        }
      }

      if (jewel.files) {
        console.log('Set files')
        console.log('jewels files folder: ', jewel.files.folder)
        jewel.files = await Promise.all(
          jewel.files.map(async (file) => {
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

    res.json(jewels)
  } catch (error) {
    next(error)
  }
}

const getJewelById = async (req, res, next) => {
  const { id } = req.params

  try {
    const jewel = await Jewel.findById(id)
    // }
    const changePhotoPromise = async () => {
      if (jewel.photo.folder) {
        jewel.photo = {
          ...jewel.photo,
          url: await loadFileFromGCS(jewel.photo.folder)
        }
      } else {
        jewel.photo = {
          ...jewel.photo,
          url: 'https://i.pinimg.com/564x/91/ed/eb/91edebb64768d1f00ca34807a6b74d73.jpg'
        }
      }

      if (jewel.files) {
        console.log('Set files')
        jewel.files = await Promise.all(
          jewel.files.map(async (file) => {
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

    res.json(jewel)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const updateJewel = async (req, res, next) => {
  const { id } = req.params
  const updates = req.body

  console.log('updates: ', updates)

  try {
    const vehicleToUpdate = await Jewel.findById(id)
    const { userId } = req

    const { name } = vehicleToUpdate
    let { files } = vehicleToUpdate

    console.log('Files before: ', files)

    let photoFile = null
    let vehicleFiles = null

    if (req.files) {
      photoFile = req.files['photo'] ? req.files['photo'][0] : null
      vehicleFiles = req.files['files'] ? req.files['files'] : null
    }

    console.log('jewel files: ', vehicleFiles)

    let photoPath = null

    if (photoFile) {
      // console.log('get photo file')
      photoPath = await updateFileFromGCS(photoFile, vehicleToUpdate.photo.folder)
    }

    if (vehicleFiles) {
      console.log('Set files')
      const newFiles = await Promise.all(vehicleFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'jewels')
        }
      }))

      files = files.concat(newFiles)
    }

    // Check for empty values in updates
    const hasEmptyValues = Object.values(updates).some((value) => {
      if (typeof value === 'string') {
        return value.trim() === ''
      }
      return false
    })

    if (hasEmptyValues) {
      return res.status(400).json({ error: 'Empty values are not allowed' })
    }

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
    const updatedJewels = await Jewel.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).exec()

    res.json(updatedJewels)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const deleteJewel = async (req, res, next) => {
  const { id } = req.params

  try {
    const { userId } = req
    const user = await User.findById(userId)
    const vehicleToDelete = await Jewel.findByIdAndDelete(id)

    if (vehicleToDelete.photo) {
      const folderPath = `${userId}/jewels/${vehicleToDelete.name}/`
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
    const jewel = await Jewel.findById(id)

    if (jewel && jewel.files) {
      const fileToDelete = jewel.files.find(file => file._id.toString() === fileId)

      if (fileToDelete) {
        await deleteFileFromGCS(fileToDelete.folder)

        const updatedFiles = jewel.files.filter(file => file._id.toString() !== fileId)
        jewel.files = updatedFiles

        await Jewel.findByIdAndUpdate(
          id,
          jewel,
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
    const jewel = await Jewel.findById(id)

    if (jewel && jewel.files) {
      const fileToRename = jewel.files.find(file => file._id.toString() === fileId)

      if (fileToRename) {
        const { oldName, newName } = req.body

        const oldPath = fileToRename.folder
        const newPath = oldPath.replace(oldName, newName)

        await moveGCSFile(oldPath, newPath)

        fileToRename.folder = newPath

        const fileIndex = jewel.files.findIndex(file => file._id.toString() === fileId)
        jewel.files[fileIndex] = fileToRename

        await Jewel.findByIdAndUpdate(
          id,
          jewel,
          { new: true }
        ).exec()

        console.log('Jewel files: ', jewel.files)

        res.status(204).end()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createJewel,
  getAllUserJewels,
  getJewelById,
  updateJewel,
  deleteJewel,
  deleteFile,
  renameFile
}
