import {AiOutlineShoppingCart} from 'react-icons/ai'

import './index.css'

const Header = props => {
  const {restaurantName, quantity} = props

  return (
    <nav className="navbar">
      <div className="nav-header">
        <h1 className="restaurant-title">{restaurantName}</h1>
        <div className="my-order-cart-details">
          <p className="my-orders-text">My Orders</p>
          <div>
            <AiOutlineShoppingCart className="shopping-cart-icon" />
            <p className="count-value">{quantity}</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
