
import { useGetVehiclesQuery } from '../services/vehiclesApiSlice'
import VehicleCard from './VehicleCard.jsx'
import Vehicles from '../index.jsx'
import { Link } from 'react-router-dom'
import ModalAddButton from '../../../components/ModalAddButton.jsx'
import CardSkeleton from '../../../components/CardSkeleton.jsx'

import AddNewContainer from '../../../components/AddNewContainer.jsx'

const VehiclesList = () => {
  const {
    data: vehicles,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetVehiclesQuery('vehiclesList', {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    pollingInterval: 20000
  })

  let content

  if (isLoading) {
    content = (
      <Vehicles>
        <CardSkeleton />
      </Vehicles>
    )
  }

  const errClass = isError ? 'errorMsg text-red-500 my-5' : 'offscreen'

  if (isError) {
    content = (
      <Vehicles>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100 my-8'>Vehicles</h1>
          <div className='flex justify-end items-center'>
            <Link to='/investments/vehicles/new'>
              <ModalAddButton />
            </Link>
          </div>
        </div>
        <p className={errClass}>{error?.data?.message}</p>
        {
        (error?.data?.error === 'Forbidden token')
          ? (
            <Link to='/login' className='my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Login Again</Link>
            )
          : null
      }
      </Vehicles>
    )
  }

  if (isSuccess) {
    const listContent = vehicles?.length
      ? vehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} />)
      : null

    content = (
      <Vehicles backTo='/investments'>
        <div className='flex justify-between my-8'>
          <h1 className='text-4xl font-semibold text-slate-800 dark:text-slate-100'>Vehicles</h1>
          <Link to='./new'><ModalAddButton /></Link>
        </div>
        {(!listContent || listContent.length === 0) && <AddNewContainer type='vehicle' />}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 my-4 '>
          {listContent}
        </div>
      </Vehicles>
    )
  }

  return content
}
export default VehiclesList
