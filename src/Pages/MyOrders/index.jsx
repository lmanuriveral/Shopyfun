import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context'
import OrdersCard from '../../Components/OrdersCard'

const MyOrders = () => {
  //Leer el estado global
  const context = useContext(ShoppingCartContext)
  
    return (
      <Layout>
        <div className='py-6 flex items-center justify-center relative w-80'>
          <h1 className='font-semibold text-xl'>My Orders</h1>
        </div>
        {
          context.order.map((order, index) => (
            <Link key={index} to={`/my-orders/${index}`}>
              <OrdersCard 
                totalPrice={order.totalPrice}
                totalProducts={order.totalProducts}/>
            </Link>
          ))
        }
      </Layout>
    )
  }
  
  export default MyOrders
  