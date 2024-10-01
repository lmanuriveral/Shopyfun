import { XMarkIcon } from '@heroicons/react/24/solid'

const OrderCard = props => {
  const { id, title, imageURL, price, handleDelete } = props
  let renderXMarkIcon
  if (handleDelete) {
    renderXMarkIcon = <XMarkIcon className='h-6 w-6 text-black cursor-pointer' onClick={() => handleDelete(id)}/>
  }
  return (
    <div className='flex justify-between rounded-lg items-center mb-4  border border-lime-500'>
      <div className='flex items-center object-cover gap-3'>
        <figure className='w-16 h-16 flex-shrink-0'>
            <img className='w-full h-full object-cover rounded-lg border border-lime-200' src={imageURL} alt={title} />
        </figure>
        <p className='text-sm font-light'>{title}</p>
      </div>
      <div className='flex items-center gap-2'>
        <p className='text-lg font-medium'>${price}</p>
        {renderXMarkIcon}
      </div>
      
    </div>
  )
}

export default OrderCard
