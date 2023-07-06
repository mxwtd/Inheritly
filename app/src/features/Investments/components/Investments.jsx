import InvestmentCard from '../../../components/InvestmentCard'
import { useGetInvestmentsQuery } from '../services/investmentsApiSlice'

const Investments = () => {
  const {
    data: investments,
    isLoading,
    isSuccess
  } = useGetInvestmentsQuery('investmentsList', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 300000
  })

  let content

  if (isLoading) {
    content = (
      <div className='p-4 sm:ml-64 h-[100%]'>
        <div className='p-4 mt-14'>
          <div>
            <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Investment Type</h1>
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl'>
            <p>Loading</p>
          </div>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    const { propertiesBalance, vehiclesBalance, jewelsBalance, stocksBalance, cryptosBalance, bondsBalance, commoditiesBalance, fundsBalance } = investments || {}

    content = (
      <div className='p-4 sm:ml-64 h-[100%]'>
        <div className='p-4 mt-14'>
          <div>
            <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Investment Type</h1>
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl'>
            <InvestmentCard cardName='Stocks' path='stocks' balance={stocksBalance} />
            <InvestmentCard cardName='Bonds' path='bonds' balance={bondsBalance} />
            <InvestmentCard cardName='Funds' path='funds' balance={fundsBalance} />
            <InvestmentCard cardName='Commodities' path='commodities' balance={commoditiesBalance} />
            <InvestmentCard cardName='Crypto' path='cryptos' balance={cryptosBalance} />
            <InvestmentCard cardName='Properties' path='properties' balance={propertiesBalance} />
            <InvestmentCard cardName='Vehicles' path='vehicles' balance={vehiclesBalance} />
            <InvestmentCard cardName='jewels' path='jewels' balance={jewelsBalance} />
            <InvestmentCard cardName='Miscellaneous' path='miscellaneous' />
          </div>
        </div>
      </div>
    )
  }
  return content
}

export default Investments
