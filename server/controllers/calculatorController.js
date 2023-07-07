const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

const calculatePension = async (req, res) => {
  const data = req.body

  if (typeof data.currentAge !== 'string' || typeof data.considerations !== 'string') {
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
        "Based on your input data, let's calculate your potential retirement age and retirement income. Here are your input details:

        Current Age: ${data.currentAge}
        Desired Retirement Age: ${data.ageOfRetirement}
        Current Capital: ${data.currentCapital}
        Desired Yearly Retirement Income: ${data.desiredYearlyCapital}
        Yearly Pension Growth Rate: ${data.yearlyPensionGrowth}%
        Considerations: ${data.considerations}

        Let's assume a simple model where your capital grows each year with the specified growth rate and you make monthly contributions to it, while your expenses after retirement are covered by the desired yearly capital.

        Capital Required at Retirement: To sustain your desired yearly retirement income indefinitely, assuming the yearly pension growth rate is constant after your retirement, the required capital is calculated by dividing your desired yearly retirement income by the yearly pension growth rate. That would be {desiredYearlyCapital} / ({yearlyPensionGrowth}/100).
        Monthly Contributions Required: To calculate the monthly contributions required to reach the required capital by your desired retirement age, we'll need to use a compound interest formula which takes into account your current capital, the growth rate, and the period till retirement. ${data.currentCapital} * ((1 + (${data.yearlyPensionGrowth}/100)) ^ (${data.ageOfRetirement} - ${data.currentAge})) / (((1 + (${data.yearlyPensionGrowth}/100)) ^ (${data.ageOfRetirement} - ${data.currentAge})) - 1) * (${data.yearlyPensionGrowth}/100). This gives us a monthly contribution of {monthlyContributionRequired}.
        Do bear in mind that this model is highly simplified. It does not account for inflation, changes in living costs, changes in your income, unexpected expenses or potential increases in your desired retirement income. As you get closer to your retirement age, it may be prudent to switch to safer, lower-yield investments, which could require more capital.

        Considering your current age, capital, and retirement goals, it's recommended to review and adjust your retirement plans annually. Consider working with a financial advisor to develop a comprehensive and adaptable plan. It's also crucial to build an emergency fund, diversify your investments, and consider insurance policies as part of a well-rounded financial strategy."
        `
        }
      ]
    })

    return res.status(200).json({ message: completion.data.choices[0].message.content })
  } catch (error) {
    console.error('Error with Calculator:', error)
    return res.status(500).json({ message: 'Error.' })
  }
}

module.exports = { calculatePension }
