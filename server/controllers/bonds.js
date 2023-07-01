/* eslint-disable dot-notation */
const Bond = require('../models/InvestmentTypes/Bond')
const User = require('../models/User')
const { uploadPhotoToGCS, uploadFilesToGCS, loadFileFromGCS, deleteFolderFromGCS, updateFileFromGCS, deleteFileFromGCS, moveGCSFile } = require('../middleware/googleCloud')

const createBond = async (req, res, next) => {
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

      issuer,
      purchasePrice,
      purchaseDate,
      additionalDetails,
      purchasedAt,
      couponRate,

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
        folder: await uploadPhotoToGCS(photoFile, userId, name, 'bonds')
      }
    }

    if (vehicleFiles) {
      files = await Promise.all(vehicleFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'bonds')
        }
      }))
    }

    const contactInformation = {
      accountNumber,
      email,
      phone,
      companyAddress
    }

    const bond = {
      name,
      currency,
      date,
      value,
      taxStatus,
      type,
      issuer,
      purchasePrice,
      purchaseDate,
      additionalDetails,
      purchasedAt,
      couponRate,
      contactInformation,
      photo,
      files
    }

    console.log('Bond to save: ', bond)

    const newBonds = new Bond({
      ...bond,
      user: user._id
    })

    const savedBonds = await newBonds.save()

    user.assets.push(savedBonds._id)
    await user.save()

    res.status(201).json(savedBonds)
  } catch (error) {
    console.log('Error: ', error)
    next(error)
  }
}

const getAllUserBonds = async (req, res, next) => {
  const { userId } = req

  try {
    // Find bonds that belong to the user with the given ID
    const bonds = await Bond.find({ user: userId })

    const changePhotoPromises = bonds.map(async (bond) => {
      if (bond.photo.folder) {
        bond.photo = {
          ...bond.photo,
          url: await loadFileFromGCS(bond.photo.folder)
        }
      } else {
        bond.photo = {
          ...bond.photo,
          url: 'https://i.pinimg.com/564x/91/ed/eb/91edebb64768d1f00ca34807a6b74d73.jpg'
        }
      }

      if (bond.files) {
        console.log('Set files')
        console.log('bonds files folder: ', bond.files.folder)
        bond.files = await Promise.all(
          bond.files.map(async (file) => {
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

    res.json(bonds)
  } catch (error) {
    next(error)
  }
}

const getBondById = async (req, res, next) => {
  const { id } = req.params

  try {
    const bond = await Bond.findById(id)
    // }
    const changePhotoPromise = async () => {
      if (bond.photo.folder) {
        bond.photo = {
          ...bond.photo,
          url: await loadFileFromGCS(bond.photo.folder)
        }
      } else {
        bond.photo = {
          ...bond.photo,
          url: 'https://i.pinimg.com/564x/91/ed/eb/91edebb64768d1f00ca34807a6b74d73.jpg'
        }
      }

      if (bond.files) {
        console.log('Set files')
        bond.files = await Promise.all(
          bond.files.map(async (file) => {
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

    res.json(bond)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const updateBond = async (req, res, next) => {
  const { id } = req.params
  const updates = req.body

  console.log('updates: ', updates)

  try {
    const vehicleToUpdate = await Bond.findById(id)
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

    console.log('bond files: ', vehicleFiles)

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
          folder: await uploadFilesToGCS(file, userId, name, 'bonds')
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
    const updatedBonds = await Bond.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).exec()

    res.json(updatedBonds)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const deleteBond = async (req, res, next) => {
  const { id } = req.params

  try {
    const { userId } = req
    const user = await User.findById(userId)
    const vehicleToDelete = await Bond.findByIdAndDelete(id)

    if (vehicleToDelete.photo) {
      const folderPath = `${userId}/bonds/${vehicleToDelete.name}/`
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
    const bond = await Bond.findById(id)

    if (bond && bond.files) {
      const fileToDelete = bond.files.find(file => file._id.toString() === fileId)

      if (fileToDelete) {
        await deleteFileFromGCS(fileToDelete.folder)

        const updatedFiles = bond.files.filter(file => file._id.toString() !== fileId)
        bond.files = updatedFiles

        await Bond.findByIdAndUpdate(
          id,
          bond,
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
    const bond = await Bond.findById(id)

    if (bond && bond.files) {
      const fileToRename = bond.files.find(file => file._id.toString() === fileId)

      if (fileToRename) {
        const { oldName, newName } = req.body

        const oldPath = fileToRename.folder
        const newPath = oldPath.replace(oldName, newName)

        await moveGCSFile(oldPath, newPath)

        fileToRename.folder = newPath

        const fileIndex = bond.files.findIndex(file => file._id.toString() === fileId)
        bond.files[fileIndex] = fileToRename

        await Bond.findByIdAndUpdate(
          id,
          bond,
          { new: true }
        ).exec()

        console.log('Bond files: ', bond.files)

        res.status(204).end()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createBond,
  getAllUserBonds,
  getBondById,
  updateBond,
  deleteBond,
  deleteFile,
  renameFile
}
