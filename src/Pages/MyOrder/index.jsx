import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'
import OrderCard from '../../Components/OrderCard'

const MyOrder = () => {
  //Leer el estado global
  const context = useContext(ShoppingCartContext)

  //Para visualizar los index de las ordenes saved
  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if (index === 'last'){
    index = context.order?.length - 1
  }

  return (
    <Layout>
      <div className='py-6 flex items-center justify-center relative w-80 mb-3'>
          <Link to='/my-orders' className='absolute left-0'>
            <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer'/>
          </Link>
          <h1 className='font-semibold text-xl'>My Order</h1>
        </div>
      <div className='flex flex-col w-80'>
          {
            context.order?.[index]?.products.map(product => (
              <OrderCard 
                key = {product.id}
                id = {product.id}
                title = {product.title}
                imageURL = {product.image}
                price = {product.price}                
              />
            ))
          }
      </div>
    </Layout>
  )
}

export default MyOrder
