/* eslint-disable dot-notation */
const Property = require('../models/InvestmentTypes/Property')
const Vehicle = require('../models/InvestmentTypes/Vehicle')
const Jewel = require('../models/InvestmentTypes/Jewel')
const Stock = require('../models/InvestmentTypes/Stock')
const Crypto = require('../models/InvestmentTypes/Crypto')
const Bond = require('../models/InvestmentTypes/Bond')
const Commodity = require('../models/InvestmentTypes/Commodity')
const Fund = require('../models/InvestmentTypes/Fund')

const getAllBalances = async (req, res, next) => {
  const { userId } = req

  try {
    const properties = await Property.find({ user: userId })
    const vehicles = await Vehicle.find({ user: userId })
    const jewels = await Jewel.find({ user: userId })
    const stocks = await Stock.find({ user: userId })
    const cryptos = await Crypto.find({ user: userId })
    const bonds = await Bond.find({ user: userId })
    const commodities = await Commodity.find({ user: userId })
    const funds = await Fund.find({ user: userId })

    const propertiesBalance = properties.reduce((total, property) => total + property.value, 0)
    const vehiclesBalance = vehicles.reduce((total, vehicle) => total + vehicle.value, 0)
    const jewelsBalance = jewels.reduce((total, jewel) => total + jewel.value, 0)
    const stocksBalance = stocks.reduce((total, stock) => total + stock.value, 0)
    const cryptosBalance = cryptos.reduce((total, crypto) => total + crypto.value, 0)
    const bondsBalance = bonds.reduce((total, bond) => total + bond.value, 0)
    const commoditiesBalance = commodities.reduce((total, commodity) => total + commodity.value, 0)
    const fundsBalance = funds.reduce((total, fund) => total + fund.value, 0)

    res.json({ propertiesBalance, vehiclesBalance, jewelsBalance, stocksBalance, cryptosBalance, bondsBalance, commoditiesBalance, fundsBalance })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllBalances
}
