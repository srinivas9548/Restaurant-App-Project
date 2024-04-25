import {Component} from 'react'

import {BiFoodTag} from 'react-icons/bi'

import './index.css'

class RestaurantCategoryList extends Component {
  state = {dishCount: 0}

  onClickIncrement = () => {
    this.setState(prevState => ({dishCount: prevState.dishCount + 1}))
  }

  onClickDecrement = () => {
    const {dishCount} = this.state
    if (dishCount > 0) {
      this.setState(prevState => ({dishCount: prevState.dishCount - 1}))
    }
  }

  render() {
    const {dishCount} = this.state
    const {categoriesDetails, incrementCount, decrementCount} = this.props
    const {
      dishName,
      dishCalories,
      dishImage,
      dishCurrency,
      dishPrice,
      dishDescription,
      dishAvailability,
      addonCat,
      dishType,
    } = categoriesDetails

    const addonCatList = addonCat.length > 0

    const bgColor = dishType === 2 ? 'dot-icon bg-green' : 'dot-icon bg-brown'
    return (
      <li className="category-list-item">
        <div className="category-details-dot-icon-container">
          <BiFoodTag size={35} className={bgColor} />
          <div className="category-details">
            <h1 className="dish-name">{dishName}</h1>
            <div className="dish-currency-price-details">
              <p className="dish-currency">{dishCurrency}</p>
              <p className="dish-price">{dishPrice}</p>
            </div>
            <p className="dish-description">{dishDescription}</p>
            {dishAvailability ? (
              <div className="buttons-container">
                <button
                  type="button"
                  data-testid="minus"
                  className="icon"
                  onClick={() => {
                    this.onClickDecrement()
                    decrementCount()
                  }}
                >
                  -
                </button>

                <p className="items-count">{dishCount}</p>
                <button
                  type="button"
                  data-testid="plus"
                  className="icon"
                  onClick={() => {
                    this.onClickIncrement()
                    incrementCount()
                  }}
                >
                  +
                </button>
              </div>
            ) : (
              <p className="not-available-text">Not available</p>
            )}

            {addonCatList && (
              <p className="customization-available">
                Customizations available
              </p>
            )}
          </div>
        </div>
        <p className="dish-calories">{dishCalories} calories</p>
        <img src={dishImage} alt={dishName} className="dish-image" />
      </li>
    )
  }
}

export default RestaurantCategoryList
