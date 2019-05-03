import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleReceiveIngredients } from '../actions/ingredients'
import { handleReceiveBurgers } from '../actions/burgers'
import {API_HOST} from '../utils/api_settings'
import Sidebar from '../components/sidebar'
import ConnectedBurgerContainer from '../components/burgerContainer'
import ConnectedIngredientsContainer from '../components/ingredientsContainer'

class AdminPage extends Component {
  state = {
    admin_pages: ["burgers", "ingredients", "discounts"]
  }
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(handleReceiveIngredients())
    dispatch(handleReceiveBurgers())
  }

  isMenuValid() {
    const { menu } = this.props.match.params
    const { admin_pages } = this.state

    return admin_pages.includes(menu)
  }

  render() {
    const { menu } = this.props.match.params
    const {ingredients, burgers} = this.props;

    if(menu === "burgers"){
      return(
        <div>
          <Sidebar history={this.props.history}/>
          <ConnectedBurgerContainer/>
        </div>
      )
    }

    if(menu === "ingredients"){
      return(
        <div>
          <Sidebar history={this.props.history}/>
          <ConnectedIngredientsContainer/>
        </div>
      )
    }

    return (
      <div className="">
        <header className="">
        </header>
        <Sidebar history={this.props.history}/>
        <div className="burgers_menu">
        </div>
      </div>
    )
  }
}

export default withRouter(connect((state) => ({
  loading: state.loading,
  ingredients: state.ingredients,
  burgers: state.burgers,
}))(AdminPage))
