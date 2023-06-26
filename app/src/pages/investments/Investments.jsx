import InvestmentCard from '../../components/InvestmentCard'

const Investments = () => {
  return (
    <>
      <div className='p-4 sm:ml-64 h-[100%]'>
        <div className='p-4 mt-14'>
          <div>
            <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Investment Type</h1>
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4 p-4 bg-gradient-to-bl from-indigo-500 via-blue-300 to-slate-50 dark:from-indigo-900 dark:via-blue-800 dark:to-slate-800 rounded-2xl shadow-2xl'>
            <InvestmentCard cardName='Stocks' path='stocks' />
            <InvestmentCard cardName='Bonds' path='bonds' />
            <InvestmentCard cardName='Funds' path='funds' />
            <InvestmentCard cardName='Commodities' path='commodities' />
            <InvestmentCard cardName='Crypto' path='crypto' />
            <InvestmentCard cardName='Properties' path='properties' />
            <InvestmentCard cardName='Vehicles' path='vehicles' />
            <InvestmentCard cardName='Jewelery' path='jewelery' />
            <InvestmentCard cardName='Miscellaneous' path='miscellaneous' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Investments
