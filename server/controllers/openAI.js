const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

const generateWill = async (req, res, next) => {
  console.log(req.body)

  const {
    name,
    surname,
    considerations,
    jurisdiction,
    dateOfBirth,
    address
  } = req.body

  console.log('data is: ', name)
  console.log('data is: ', surname)
  console.log('data is: ', considerations)
  console.log('data is: ', jurisdiction)
  console.log('data is: ', dateOfBirth)
  console.log('data is: ', address)

  // Check that data.name and data.considerations are defined and are strings
  if (typeof name !== 'string' || typeof considerations !== 'string') {
    return res.status(400).json({ message: 'Invalid input data.' })
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-16k',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `
          As an AI, I am instructed to create a digital will for ${name} ${surname}, who was born on ${dateOfBirth} and resides at ${address}. This document will adhere to a professional style, and serve as a template for further personalization and refinement. It is based on the considerations and preferences provided by ${name}, as detailed in ${considerations}.

          This document should be read in conjunction with legal advice, as I am an AI model and do not provide legal advice. It is important to ensure that the final document complies with all the legal requirements in ${jurisdiction}, which may include, but is not limited to, the necessity of being written, signed, and witnessed.

          To start, the will should formally identify ${name} ${surname} and establish their intent to create a will. It should state clearly that they are of sound mind and that the will is being made voluntarily. It should also mention that this new will revokes all previous wills and codicils.

          Next, the will should detail ${name}'s considerations as captured in ${considerations}. This section should include instructions for the distribution of property and assets, and may include specifics about real estate, personal property, financial accounts, and digital assets. If there are any specific bequests, they should be clearly described and assigned to the correct beneficiaries.

          The will should also specify an executor, who will be responsible for carrying out the instructions in the will. ${name} may also want to include alternatives in case the first-choice executor is unable or unwilling to serve.

          Provisions for ${name}'s dependents, if any, should be outlined. If ${name} has any pets, instructions for their care could also be included.

          If ${name} wishes to leave instructions regarding their funeral or memorial service, this can be included, although it is often recommended that such instructions be left in a separate document, as the will may not be read until after the funeral.

          Finally, the will should conclude with a statement that it is indeed ${name}'s last will and testament, followed by a place for ${name} to sign and date, and spaces for witnesses to do the same.

          The final document should be reviewed by a legal professional to ensure it is legally valid and accurately reflects ${name}'s wishes. It is also important for ${name} to consider adding details about their executor, dependents, pets, funeral instructions, and specific bequests as they see fit.
        `
        }
      ]
    })

    return res.status(200).json({ message: completion.data.choices[0].message.content })
  } catch (error) {
    // console.error('Error while generating will:', error)
    // return res.status(500).json({ message: 'Error generating will.' })
    next(error)
  }
}

const calculatePension = async (req, res) => {
  const data = req.body

  if (typeof data.currentAge !== 'string' || typeof data.considerations !== 'string') {
    return res.status(400).json({ message: 'Invalid input data.' })
  }

  try {
    // Perform calculations
    const desiredYearlyCapital = parseFloat(data.desiredYearlyCapital.replace(/,/g, ''))
    const yearlyPensionGrowth = parseFloat(data.yearlyPensionGrowth.replace(/,/g, '').replace('%', '')) / 100
    const adjustedYearlyPensionGrowth = yearlyPensionGrowth * 100
    const currentCapital = parseFloat(data.currentCapital.replace(/,/g, ''))
    const currentAge = parseInt(data.currentAge)
    const ageOfRetirement = parseInt(data.ageOfRetirement)

    const requiredCapital = desiredYearlyCapital / yearlyPensionGrowth
    const monthlyContributionRequired = currentCapital * Math.pow((1 + yearlyPensionGrowth), (ageOfRetirement - currentAge)) / (Math.pow((1 + yearlyPensionGrowth), (ageOfRetirement - currentAge)) - 1) * yearlyPensionGrowth
    const formattedResult = monthlyContributionRequired.toFixed(2)
    const yearsUntilRetirement = ageOfRetirement - currentAge

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-16k',
      messages: [
        { role: 'system', content: 'You are an intuitive retirement calculator assistant, you must reply with well summarized factual data.' },
        {
          role: 'user',
          content: `
            The response format must always respect this layout below :

            "Based on your criteria, here are the results:

            Current Age: ${currentAge}
            Desired Retirement Age: ${ageOfRetirement}
            Current Capital: $${currentCapital}
            Desired Yearly Retirement Income: $${desiredYearlyCapital}
            Yearly Pension Growth Rate: ${adjustedYearlyPensionGrowth}%
            Required Monthly Contributions: $${formattedResult}
            Considerations: ${data.considerations}"

            In detail now, analyse the data and provide a constructive response to the user, analyse the data, take the considerations into account and provide a constructive detailed suggestions to improve their individual situation.

            The response must respect this format:

            "Your Situation summarised :
              -
              -
              -
              etc...

            Suggestions :
              -
              -
              -
              etc..."
          `
        }
      ]
    })

    return res.status(200).json({
      message: completion.data.choices[0].message.content,
      monthlyContributions: formattedResult,
      requiredCapital,
      yearsUntilRetirement
    })
  } catch (error) {
    console.error('Error with Calculator:', error)
    return res.status(500).json({ message: 'Error.' })
  }
}

module.exports = {
  generateWill,
  calculatePension
}
