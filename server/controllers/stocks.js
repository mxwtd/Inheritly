/* eslint-disable dot-notation */
const Stock = require('../models/InvestmentTypes/Stock')
const User = require('../models/User')
const { uploadPhotoToGCS, uploadFilesToGCS, loadFileFromGCS, deleteFolderFromGCS, updateFileFromGCS, deleteFileFromGCS, moveGCSFile } = require('../middleware/googleCloud')

const createStock = async (req, res, next) => {
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

      accountNumber,
      email,
      phone,
      companyAddress
    } = req.body

    let photoFile = null
    let stockFiles = null

    if (req.files) {
      photoFile = req.files['photo'] ? req.files['photo'][0] : null
      stockFiles = req.files['files'] ? req.files['files'] : null
    }

    let photo = null
    let files = null

    if (photoFile) {
      photo = {
        url: null,
        folder: await uploadPhotoToGCS(photoFile, userId, name, 'stocks')
      }
    }

    if (stockFiles) {
      files = await Promise.all(stockFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'stocks')
        }
      }))
    }

    const contactInformation = {
      accountNumber,
      email,
      phone,
      companyAddress
    }

    const stock = {
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
      contactInformation,
      photo,
      files
    }

    const newStocks = new Stock({
      ...stock,
      user: user._id
    })

    const savedStocks = await newStocks.save()

    user.assets.push(savedStocks._id)
    await user.save()

    res.status(201).json(savedStocks)
  } catch (error) {
    console.log('Error: ', error)
    next(error)
  }
}

const getAllUserStocks = async (req, res, next) => {
  const { userId } = req

  try {
    // Find stocks that belong to the user with the given ID
    const stocks = await Stock.find({ user: userId })

    const changePhotoPromises = stocks.map(async (stock) => {
      if (stock.photo.folder) {
        stock.photo = {
          ...stock.photo,
          url: await loadFileFromGCS(stock.photo.folder)
        }
      } else {
        stock.photo = {
          ...stock.photo,
          url: 'https://i.pinimg.com/564x/91/ed/eb/91edebb64768d1f00ca34807a6b74d73.jpg'
        }
      }

      if (stock.files) {
        console.log('Set files')
        console.log('stocks files folder: ', stock.files.folder)
        stock.files = await Promise.all(
          stock.files.map(async (file) => {
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

    res.json(stocks)
  } catch (error) {
    next(error)
  }
}

const getStockById = async (req, res, next) => {
  const { id } = req.params

  try {
    const stock = await Stock.findById(id)
    // }
    const changePhotoPromise = async () => {
      if (stock.photo.folder) {
        stock.photo = {
          ...stock.photo,
          url: await loadFileFromGCS(stock.photo.folder)
        }
      } else {
        stock.photo = {
          ...stock.photo,
          url: 'https://i.pinimg.com/564x/91/ed/eb/91edebb64768d1f00ca34807a6b74d73.jpg'
        }
      }

      if (stock.files) {
        console.log('Set files')
        stock.files = await Promise.all(
          stock.files.map(async (file) => {
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

    res.json(stock)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const updateStock = async (req, res, next) => {
  const { id } = req.params
  const updates = req.body

  console.log('updates: ', updates)

  try {
    const stockToUpdate = await Stock.findById(id)
    const { userId } = req

    const { name } = stockToUpdate
    let { files } = stockToUpdate

    console.log('Files before: ', files)

    let photoFile = null
    let stockFiles = null

    if (req.files) {
      photoFile = req.files['photo'] ? req.files['photo'][0] : null
      stockFiles = req.files['files'] ? req.files['files'] : null
    }

    console.log('stock files: ', stockFiles)

    let photoPath = null

    if (photoFile) {
      // console.log('get photo file')
      photoPath = await updateFileFromGCS(photoFile, stockToUpdate.photo.folder)
    }

    if (stockFiles) {
      console.log('Set files')
      const newFiles = await Promise.all(stockFiles.map(async (file) => {
        return {
          url: null,
          folder: await uploadFilesToGCS(file, userId, name, 'stocks')
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
    const updatedStocks = await Stock.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).exec()

    res.json(updatedStocks)
  } catch (error) {
    (isNaN(id)) ? next(error) : res.status(404).end()
  }
}

const deleteStock = async (req, res, next) => {
  const { id } = req.params

  try {
    const { userId } = req
    const user = await User.findById(userId)
    const stockToDelete = await Stock.findByIdAndDelete(id)

    if (stockToDelete.photo) {
      const folderPath = `${userId}/stocks/${stockToDelete.name}/`
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
    const stock = await Stock.findById(id)

    if (stock && stock.files) {
      const fileToDelete = stock.files.find(file => file._id.toString() === fileId)

      if (fileToDelete) {
        await deleteFileFromGCS(fileToDelete.folder)

        const updatedFiles = stock.files.filter(file => file._id.toString() !== fileId)
        stock.files = updatedFiles

        await Stock.findByIdAndUpdate(
          id,
          stock,
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
    const stock = await Stock.findById(id)

    if (stock && stock.files) {
      const fileToRename = stock.files.find(file => file._id.toString() === fileId)

      if (fileToRename) {
        const { oldName, newName } = req.body

        const oldPath = fileToRename.folder
        const newPath = oldPath.replace(oldName, newName)

        await moveGCSFile(oldPath, newPath)

        fileToRename.folder = newPath

        const fileIndex = stock.files.findIndex(file => file._id.toString() === fileId)
        stock.files[fileIndex] = fileToRename

        await Stock.findByIdAndUpdate(
          id,
          stock,
          { new: true }
        ).exec()

        console.log('Stock files: ', stock.files)

        res.status(204).end()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createStock,
  getAllUserStocks,
  getStockById,
  updateStock,
  deleteStock,
  deleteFile,
  renameFile
}
