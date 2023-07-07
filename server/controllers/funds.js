/* eslint-disable dot-notation */
const Fund = require('../models/InvestmentTypes/Fund')
const User = require('../models/User')
const { uploadPhotoToGCS, uploadFilesToGCS, loadFileFromGCS, deleteFolderFromGCS, updateFileFromGCS, deleteFileFromGCS, moveGCSFile } = require('../middleware/googleCloud')

const createFund = async (req, res, next) => {
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

      accountNumber,
      email,
      phone,
      companyAddress
    } = req.body

    let photoFile = null
    let fundFiles = null

    if (req.files) {
      photoFile = req.files['photo'] ? req.files['photo'][0] : null
      fundFiles = req.files['files'] ? req.files['files'] : null
    }

    let photo = null
    let files = null

    if (photoFile) {
      photo = {
        url: null,
        folder: await uploadPhotoToGCS(photoFile, userId, name, 'funds')
      }
    }

    if (fundFiles) {
      files = await Promise.all(fundFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'funds')
        }
      }))
    }

    const contactInformation = {
      accountNumber,
      email,
      phone,
      companyAddress
    }

    const fund = {
      name,
      currency,
      date,
      value,
      taxStatus,
      type,
      description,
      contactInformation,
      photo,
      files
    }

    console.log('Fund to save: ', fund)

    const newFunds = new Fund({
      ...fund,
      user: user._id
    })

    const savedFunds = await newFunds.save()

    user.assets.push(savedFunds._id)
    await user.save()

    res.status(201).json(savedFunds)
  } catch (error) {
    console.log('Error: ', error)
    next(error)
  }
}

const getAllUserFunds = async (req, res, next) => {
  const { userId } = req

  try {
    // Find funds that belong to the user with the given ID
    const funds = await Fund.find({ user: userId })

    const changePhotoPromises = funds.map(async (fund) => {
      if (fund.photo.folder) {
        fund.photo = {
          ...fund.photo,
          url: await loadFileFromGCS(fund.photo.folder)
        }
      } else {
        fund.photo = {
          ...fund.photo,
          url: 'https://res.cloudinary.com/djr22sgp3/image/upload/v1688733996/Inheritly_-_Third_design_qodghx_ffzb1b.png'
        }
      }

      if (fund.files) {
        console.log('Set files')
        console.log('funds files folder: ', fund.files.folder)
        fund.files = await Promise.all(
          fund.files.map(async (file) => {
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

    res.json(funds)
  } catch (error) {
    next(error)
  }
}

const getFundById = async (req, res, next) => {
  const { id } = req.params

  try {
    const fund = await Fund.findById(id)
    // }
    const changePhotoPromise = async () => {
      if (fund.photo.folder) {
        fund.photo = {
          ...fund.photo,
          url: await loadFileFromGCS(fund.photo.folder)
        }
      } else {
        fund.photo = {
          ...fund.photo,
          url: 'https://res.cloudinary.com/djr22sgp3/image/upload/v1688733996/Inheritly_-_Third_design_qodghx_ffzb1b.png'
        }
      }

      if (fund.files) {
        console.log('Set files')
        fund.files = await Promise.all(
          fund.files.map(async (file) => {
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

    res.json(fund)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const updateFund = async (req, res, next) => {
  const { id } = req.params
  const updates = req.body

  console.log('updates: ', updates)

  try {
    const fundToUpdate = await Fund.findById(id)
    const { userId } = req

    const { name } = fundToUpdate
    let { files } = fundToUpdate

    console.log('Files before: ', files)

    let photoFile = null
    let fundFiles = null

    if (req.files) {
      photoFile = req.files['photo'] ? req.files['photo'][0] : null
      fundFiles = req.files['files'] ? req.files['files'] : null
    }

    console.log('fund files: ', fundFiles)

    let photoPath = null

    if (photoFile) {
      // console.log('get photo file')
      photoPath = await updateFileFromGCS(photoFile, fundToUpdate.photo.folder)
    }

    if (fundFiles) {
      console.log('Set files')
      const newFiles = await Promise.all(fundFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'funds')
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
    const updatedFunds = await Fund.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).exec()

    res.json(updatedFunds)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const deleteFund = async (req, res, next) => {
  const { id } = req.params

  try {
    const { userId } = req
    const user = await User.findById(userId)
    const fundToDelete = await Fund.findByIdAndDelete(id)

    if (fundToDelete.photo) {
      const folderPath = `${userId}/funds/${fundToDelete.name}/`
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
    const fund = await Fund.findById(id)

    if (fund && fund.files) {
      const fileToDelete = fund.files.find(file => file._id.toString() === fileId)

      if (fileToDelete) {
        await deleteFileFromGCS(fileToDelete.folder)

        const updatedFiles = fund.files.filter(file => file._id.toString() !== fileId)
        fund.files = updatedFiles

        await Fund.findByIdAndUpdate(
          id,
          fund,
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
    const fund = await Fund.findById(id)

    if (fund && fund.files) {
      const fileToRename = fund.files.find(file => file._id.toString() === fileId)

      if (fileToRename) {
        const { oldName, newName } = req.body

        const oldPath = fileToRename.folder
        const newPath = oldPath.replace(oldName, newName)

        await moveGCSFile(oldPath, newPath)

        fileToRename.folder = newPath

        const fileIndex = fund.files.findIndex(file => file._id.toString() === fileId)
        fund.files[fileIndex] = fileToRename

        await Fund.findByIdAndUpdate(
          id,
          fund,
          { new: true }
        ).exec()

        console.log('Fund files: ', fund.files)

        res.status(204).end()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createFund,
  getAllUserFunds,
  getFundById,
  updateFund,
  deleteFund,
  deleteFile,
  renameFile
}
