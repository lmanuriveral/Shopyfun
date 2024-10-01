import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'

const Card = (data) => {
  
  //Leer el estado global
  const context = useContext(ShoppingCartContext)

  //Show Product on ProductDetail
  const showProduct = (productDetail) => {
    context.openProductDetail()
    context.setProductToShow(productDetail)
  }

  //Agregar productos al carrito
  const addProductsToCart = (event, productData) => {
    event.stopPropagation()
    context.setCount(context.count + 1)
    context.setCartProducts([...context.cartProducts, productData])
    context.openCheckoutSideMenu()
  }

  //Marcar producto como agregado
  const renderIcon = (id) => {
    const isInCart = context.cartProducts.filter(product => product.id === id).length > 0
    if (isInCart) {
      return(
        <div 
          className='absolute top-0 right-0 flex justify-center items-center bg-lime-300 w-6 h-6 rounded-full m-2 p-1'>
          <CheckIcon className='h-6 w-6 text-black'/>
        </div>
      )
    } else{
      return(
        <div 
          className='absolute top-0 right-0 flex justify-center items-center bg-white border border-lime-300 w-6 h-6 rounded-full m-2 p-1'
          onClick={(event) => addProductsToCart(event, data.data)}>
          <PlusIcon className='h-6 w-6 text-black'/>
        </div>
      )
    }
    
  }

  return (
    <div 
    className='bg-white border border-lime-500 p-1 cursor-pointer w-56 h-60 rounded-lg'
    onClick={() => showProduct(data.data)}>
      <figure className='relative mb-2 w-full h-2/3'>
        <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data.data.category}</span>
        <img className='w-full h-full object-cover rounded-lg border border-lime-200' src={data.data.image} alt={data.data.title} />
        {renderIcon(data.data.id)}
      </figure>
      <p className='flex justify-between relative mb-4'>
        <span className='w-full h-full text-xs font-light'>{data.data.title}</span>
        <span className='text-sm font-semibold'>${data.data.price}</span>
      </p>
    </div>
  )
}

export default Card