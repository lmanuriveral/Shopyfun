import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'

function Home () {
  //Leer el estado global
  const context = useContext(ShoppingCartContext)

  //Para mostrar si hay o no hay consulta
  const renderView = () => {
    if(context.filteredItems?.length > 0){
        return(
          context.filteredItems?.map(item => (
            <Card key={item.id} data={item}/>
          ))
        )
    }else{
        return(
          <div>We don´t have that products 😒</div>
        )
      }
  }

  return (
    <Layout>
      <div className='flex items-baseline justify-center relative w-80 mb-4'>
        <h1 className='font-semibold text-xl'>Exclusive Products</h1>
      </div>
      <input 
        className='rounded-lg border border-lime-700 w-80 p-4 mb-4 focus:outline-none'  
        type='text' placeholder='Search a Product'
        onChange={(event) => context.setSearchByTitle(event.target.value)}/>
      <div className='grid gap-3 grid-cols-4 w-full max-w-screen-lg'>
        {renderView()}
      </div>
      <ProductDetail/>
    </Layout>
  )
}

export default Home