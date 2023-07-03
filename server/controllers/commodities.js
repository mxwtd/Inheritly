/* eslint-disable dot-notation */
const Commodity = require('../models/InvestmentTypes/Commodity')
const User = require('../models/User')
const { uploadPhotoToGCS, uploadFilesToGCS, loadFileFromGCS, deleteFolderFromGCS, updateFileFromGCS, deleteFileFromGCS, moveGCSFile } = require('../middleware/googleCloud')

const createCommodity = async (req, res, next) => {
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

      quantity,
      unit,
      location,
      additionalDetails,

      accountNumber,
      email,
      phone,
      companyAddress
    } = req.body

    let photoFile = null
    let commodityFiles = null

    if (req.files) {
      photoFile = req.files['photo'] ? req.files['photo'][0] : null
      commodityFiles = req.files['files'] ? req.files['files'] : null
    }

    let photo = null
    let files = null

    if (photoFile) {
      photo = {
        url: null,
        folder: await uploadPhotoToGCS(photoFile, userId, name, 'commodities')
      }
    }

    if (commodityFiles) {
      files = await Promise.all(commodityFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'commodities')
        }
      }))
    }

    const contactInformation = {
      accountNumber,
      email,
      phone,
      companyAddress
    }

    const commodity = {
      name,
      currency,
      date,
      value,
      taxStatus,
      type,
      quantity,
      unit,
      location,
      additionalDetails,
      contactInformation,
      photo,
      files
    }

    console.log('Commodity to save: ', commodity)

    const newCommodities = new Commodity({
      ...commodity,
      user: user._id
    })

    const savedCommodities = await newCommodities.save()

    user.assets.push(savedCommodities._id)
    await user.save()

    res.status(201).json(savedCommodities)
  } catch (error) {
    console.log('Error: ', error)
    next(error)
  }
}

const getAllUserCommodities = async (req, res, next) => {
  const { userId } = req

  try {
    // Find commodities that belong to the user with the given ID
    const commodities = await Commodity.find({ user: userId })

    const changePhotoPromises = commodities.map(async (commodity) => {
      if (commodity.photo.folder) {
        commodity.photo = {
          ...commodity.photo,
          url: await loadFileFromGCS(commodity.photo.folder)
        }
      } else {
        commodity.photo = {
          ...commodity.photo,
          url: 'https://i.pinimg.com/564x/91/ed/eb/91edebb64768d1f00ca34807a6b74d73.jpg'
        }
      }

      if (commodity.files) {
        console.log('Set files')
        console.log('commodities files folder: ', commodity.files.folder)
        commodity.files = await Promise.all(
          commodity.files.map(async (file) => {
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

    res.json(commodities)
  } catch (error) {
    next(error)
  }
}

const getCommodityById = async (req, res, next) => {
  const { id } = req.params

  try {
    const commodity = await Commodity.findById(id)
    // }
    const changePhotoPromise = async () => {
      if (commodity.photo.folder) {
        commodity.photo = {
          ...commodity.photo,
          url: await loadFileFromGCS(commodity.photo.folder)
        }
      } else {
        commodity.photo = {
          ...commodity.photo,
          url: 'https://i.pinimg.com/564x/91/ed/eb/91edebb64768d1f00ca34807a6b74d73.jpg'
        }
      }

      if (commodity.files) {
        console.log('Set files')
        commodity.files = await Promise.all(
          commodity.files.map(async (file) => {
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

    res.json(commodity)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const updateCommodity = async (req, res, next) => {
  const { id } = req.params
  const updates = req.body

  console.log('updates: ', updates)

  try {
    const commodityToUpdate = await Commodity.findById(id)
    const { userId } = req

    const { name } = commodityToUpdate
    let { files } = commodityToUpdate

    console.log('Files before: ', files)

    let photoFile = null
    let commodityFiles = null

    if (req.files) {
      photoFile = req.files['photo'] ? req.files['photo'][0] : null
      commodityFiles = req.files['files'] ? req.files['files'] : null
    }

    console.log('commodity files: ', commodityFiles)

    let photoPath = null

    if (photoFile) {
      // console.log('get photo file')
      photoPath = await updateFileFromGCS(photoFile, commodityToUpdate.photo.folder)
    }

    if (commodityFiles) {
      console.log('Set files')
      const newFiles = await Promise.all(commodityFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'commodities')
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
    const updatedCommodities = await Commodity.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).exec()

    res.json(updatedCommodities)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const deleteCommodity = async (req, res, next) => {
  const { id } = req.params

  try {
    const { userId } = req
    const user = await User.findById(userId)
    const commodityToDelete = await Commodity.findByIdAndDelete(id)

    if (commodityToDelete.photo) {
      const folderPath = `${userId}/commodities/${commodityToDelete.name}/`
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
    const commodity = await Commodity.findById(id)

    if (commodity && commodity.files) {
      const fileToDelete = commodity.files.find(file => file._id.toString() === fileId)

      if (fileToDelete) {
        await deleteFileFromGCS(fileToDelete.folder)

        const updatedFiles = commodity.files.filter(file => file._id.toString() !== fileId)
        commodity.files = updatedFiles

        await Commodity.findByIdAndUpdate(
          id,
          commodity,
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
    const commodity = await Commodity.findById(id)

    if (commodity && commodity.files) {
      const fileToRename = commodity.files.find(file => file._id.toString() === fileId)

      if (fileToRename) {
        const { oldName, newName } = req.body

        const oldPath = fileToRename.folder
        const newPath = oldPath.replace(oldName, newName)

        await moveGCSFile(oldPath, newPath)

        fileToRename.folder = newPath

        const fileIndex = commodity.files.findIndex(file => file._id.toString() === fileId)
        commodity.files[fileIndex] = fileToRename

        await Commodity.findByIdAndUpdate(
          id,
          commodity,
          { new: true }
        ).exec()

        console.log('Commodity files: ', commodity.files)

        res.status(204).end()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createCommodity,
  getAllUserCommodities,
  getCommodityById,
  updateCommodity,
  deleteCommodity,
  deleteFile,
  renameFile
}
