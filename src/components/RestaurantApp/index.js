import {Component} from 'react'

import Header from '../Header'
import RestaurantTabsItem from '../RestaurantTabsItem'
import RestaurantCategoryList from '../RestaurantCategoryList'

import './index.css'

class RestaurantApp extends Component {
  state = {
    activeTabId: '',
    totalData: [],
    restaurantName: '',
    quantity: 0,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    const apiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(apiUrl)
    const data = await response.json()
    // console.log(data)

    const array = data.map(each => ({
      tableMenuList: each.table_menu_list,
      restaurantName: each.restaurant_name,
    }))
    // console.log(array)

    const totalDetails = array[0]
    const {tableMenuList, restaurantName} = totalDetails

    const formattedData = tableMenuList.map(each => ({
      categoryDishes: each.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishCount: 0,
        dishName: eachDish.dish_name,
        dishImage: eachDish.dish_image,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        dishCalories: eachDish.dish_calories,
        dishCurrency: eachDish.dish_currency,
        dishDescription: eachDish.dish_description,
        dishPrice: eachDish.dish_price,
        nexturl: eachDish.nexturl,
        addonCat: eachDish.addonCat.map(eachAddOnCat => ({
          addonCategory: eachAddOnCat.addon_category,
          addonCategoryId: eachAddOnCat.addon_category_id,
          addonSelection: eachAddOnCat.addon_selection,
          nexturl: eachAddOnCat.nexturl,
          addons: eachAddOnCat.addons.map(eachAddons => ({
            dishId: eachAddons.dish_id,
            dishName: eachAddons.dish_name,
            dishImage: eachAddons.dish_image,
            dishAvailability: eachAddons.dish_Availability,
            dishType: eachAddons.dish_Type,
            dishCalories: eachAddons.dish_calories,
            dishCurrency: eachAddons.dish_currency,
            dishDescription: eachAddons.dish_description,
            dishPrice: eachAddons.dish_price,
          })),
        })),
      })),
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nexturl: each.nexturl,
    }))

    this.setState({
      totalData: formattedData,
      activeTabId: formattedData[0].menuCategoryId,
      restaurantName,
    })
  }

  onChangeMenu = id => {
    this.setState({activeTabId: id})
  }

  decrementCount = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  incrementCount = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  render() {
    const {restaurantName, totalData, activeTabId, quantity} = this.state
    // console.log(totalData)

    const filteredData = totalData.filter(
      each => each.menuCategoryId === activeTabId,
    )

    let categoriesData = []

    if (filteredData.length > 0) {
      const {categoryDishes} = filteredData[0]
      categoriesData = categoryDishes
    }

    // console.log(categoriesData)

    return (
      <>
        <Header restaurantName={restaurantName} quantity={quantity} />
        <div className="restaurant-app-container">
          <ul className="menu-categories-list">
            {totalData.map(each => (
              <RestaurantTabsItem
                key={each.menuCategoryId}
                menuDetails={each}
                onChangeMenu={this.onChangeMenu}
                isActive={activeTabId === each.menuCategoryId}
              />
            ))}
          </ul>

          <ul className="category-dishes-list">
            {categoriesData.map(eachDish => (
              <RestaurantCategoryList
                key={eachDish.dishId}
                categoriesDetails={eachDish}
                incrementCount={this.incrementCount}
                decrementCount={this.decrementCount}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default RestaurantApp
