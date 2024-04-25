import './index.css'

const RestaurantTabsItem = props => {
  const {menuDetails, onChangeMenu, isActive} = props
  const {menuCategoryId, menuCategory} = menuDetails

  const activeTabClassName = isActive
    ? 'menu-category-btn active'
    : 'menu-category-btn'

  const onClickMenuTab = () => {
    onChangeMenu(menuCategoryId)
  }

  return (
    <li className="menu-list-item">
      <button
        type="button"
        className={activeTabClassName}
        onClick={onClickMenuTab}
      >
        {menuCategory}
      </button>
      <hr className="horizontal-line" />
    </li>
  )
}

export default RestaurantTabsItem
