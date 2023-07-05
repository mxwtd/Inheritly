import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDeletePropertyMutation } from '../features/InvestmentTypes/properties/services/propertiesApiSlice'
import { useDeleteVehicleMutation } from '../features/InvestmentTypes/vehicles/services/vehiclesApiSlice'
import { useDeleteBondMutation } from '../features/InvestmentTypes/bonds/services/bondsApiSlice'
import { useDeleteCommodityMutation } from '../features/InvestmentTypes/commodities/services/commoditiesApiSlice'
import { useDeleteCryptoMutation } from '../features/InvestmentTypes/cryptos/services/cryptosApiSlice'

const DeleteModal = ({ onClose, investmentType }) => {
  const investmentsTypes = [
    {
      type: 'property',
      pluralName: 'properties',
      getMutation: useDeletePropertyMutation()
    },
    {
      type: 'vehicle',
      pluralName: 'vehicles',
      getMutation: useDeleteVehicleMutation()
    },
    {
      type: 'bond',
      pluralName: 'bonds',
      getMutation: useDeleteBondMutation()
    },
    {
      type: 'commodity',
      pluralName: 'commodities',
      getMutation: useDeleteCommodityMutation()
    },
    {
      type: 'crypto',
      pluralName: 'cryptos',
      getMutation: useDeleteCryptoMutation()
    }
  ]

  const {
    getMutation: deleteMutation
  } = investmentsTypes.find(
    investment => investment.type === investmentType?.type.toLowerCase()
  )

  const [
    deleteInvestment,
    {
      isSuccess,
      isError
    }
  ] = deleteMutation

  const { pluralName } = investmentsTypes.find(
    investment => investment.type === investmentType?.type.toLowerCase()
  )

  const { id } = useParams()
  const navigate = useNavigate()

  const handleConfirm = async () => {
    try {
      await deleteInvestment({ id })
      if (isSuccess) {
        onClose()
        navigate(`/investments/${pluralName}/`)
      }
    } catch (error) {
      console.error(`Failed to delete ${pluralName}:`, error)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      onClose()
      navigate(`/investments/${pluralName}/`)
    }
  }, [isSuccess, onClose, navigate, pluralName])

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center'>
      <div className='absolute inset-0 bg-black opacity-50' />
      <div className='z-50 bg-slate-100 dark:bg-slate-800 rounded-xl w-[65%] md:w-[40%] xl:w-[35%] px-8'>
        <div className='flex flex-col items-center'>
          <div className='my-8 text-center'>
            <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Delete</h1>
            <h2 className='text-2xl font-bold text-slate-800 dark:text-white mt-3'>{investmentType?.name}?</h2>
            {isError && <p className='text-red-500'>There was an error deleting the property.</p>}
          </div>
          <div className='relative w-full rounded-2xl' style={{ aspectRatio: '1/1' }}>
            <div className='bg-slate-200 dark:bg-slate-700 p-4 rounded-2xl'>
              <div className='relative w-full h-full overflow-hidden rounded-2xl'>
                <img
                  src={investmentType?.photo.url}
                  alt={investmentType?.name}
                  className='object-cover w-full h-full transform transition-all duration-500 hover:scale-110'
                  style={{ aspectRatio: '1/1' }}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-5 bg-slate-200 dark:bg-slate-800 my-8 p-3 rounded-2xl'>
            <button className='bg-slate-400 hover:bg-red-600 text-white font-bold py-3 px-5 rounded-xl transition-all ease-in-out duration-200' onClick={handleConfirm}>Delete</button>
            <Link to={`../${id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-xl transition-all ease-in-out duration-200' onClick={onClose}>Cancel</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
