const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

const generateWill = async (req, res) => {
  const data = req.body

  // Check that data.name and data.considerations are defined and are strings
  if (typeof data.name !== 'string' || typeof data.considerations !== 'string') {
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
          As an AI, I am instructed to create a digital will for ${data.name} ${data.surname}, who was born on ${data.dateOfBirth} and resides at ${data.address}. This document will adhere to a professional style, and serve as a template for further personalization and refinement. It is based on the considerations and preferences provided by ${data.name}, as detailed in ${data.considerations}.

          This document should be read in conjunction with legal advice, as I am an AI model and do not provide legal advice. It is important to ensure that the final document complies with all the legal requirements in ${data.jurisdiction}, which may include, but is not limited to, the necessity of being written, signed, and witnessed.

          To start, the will should formally identify ${data.name} ${data.surname} and establish their intent to create a will. It should state clearly that they are of sound mind and that the will is being made voluntarily. It should also mention that this new will revokes all previous wills and codicils.

          Next, the will should detail ${data.name}'s considerations as captured in ${data.considerations}. This section should include instructions for the distribution of property and assets, and may include specifics about real estate, personal property, financial accounts, and digital assets. If there are any specific bequests, they should be clearly described and assigned to the correct beneficiaries.

          The will should also specify an executor, who will be responsible for carrying out the instructions in the will. ${data.name} may also want to include alternatives in case the first-choice executor is unable or unwilling to serve.

          Provisions for ${data.name}'s dependents, if any, should be outlined. If ${data.name} has any pets, instructions for their care could also be included.

          If ${data.name} wishes to leave instructions regarding their funeral or memorial service, this can be included, although it is often recommended that such instructions be left in a separate document, as the will may not be read until after the funeral.

          Finally, the will should conclude with a statement that it is indeed ${data.name}'s last will and testament, followed by a place for ${data.name} to sign and date, and spaces for witnesses to do the same.

          The final document should be reviewed by a legal professional to ensure it is legally valid and accurately reflects ${data.name}'s wishes. It is also important for ${data.name} to consider adding details about their executor, dependents, pets, funeral instructions, and specific bequests as they see fit.
        `
        }
      ]
    })

    return res.status(200).json({ message: completion.data.choices[0].message.content })
  } catch (error) {
    console.error('Error while generating will:', error)
    return res.status(500).json({ message: 'Error generating will.' })
  }
}

module.exports = { generateWill }
