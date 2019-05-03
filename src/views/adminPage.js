import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleReceiveIngredients } from '../actions/ingredients'
import { handleReceiveBurgers } from '../actions/burgers'
import {API_HOST} from '../utils/api_settings'
import Sidebar from '../components/sidebar'
import ConnectedBurgerContainer from '../components/burgerContainer'
import ConnectedIngredientsContainer from '../components/ingredientsContainer'
import Header from '../components/header'
import Loader from '../components/loader';

class AdminPage extends Component {
  state = {
    admin_pages: ["burgers", "ingredients", "discounts"]
  }

  isMenuValid() {
    const { menu } = this.props.match.params
    const { admin_pages } = this.state

    return admin_pages.includes(menu)
  }

  render() {
    const { menu } = this.props.match.params
    const {ingredients, burgers, loading} = this.props;

    if(menu === "burgers"){
      return(
        <div className="">
          <Header/>
          <Sidebar history={this.props.history}/>
          <Loader loading={loading}/>
          <ConnectedBurgerContainer className="content"/>
        </div>
      )
    }

    if(menu === "ingredients"){
      return(
        <div>
          <Header/>
          <Sidebar history={this.props.history}/>
          <Loader loading={loading}/>
          <ConnectedIngredientsContainer className="content"/>
        </div>
      )
    }

    return (
      <div className="">
        <Header/>
        <Sidebar history={this.props.history}/>
        <Loader loading={loading}/>
        <div className="content">
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
