import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import debounce from 'lodash.debounce'
import {API_HOST} from '../utils/api_settings'
import Sidebar from '../components/sidebar'
import ConnectedIngredientsList from '../components/ingredientsList'
import { calculatePrice } from '../utils/API/calculate';

class CustomPage extends Component {
  state = {
    originalPrice: 0,
    promoPrice: 0,
    promotions: []
  }

  getPrice = debounce((ingredients) => {
    calculatePrice({name: "custom", ingredients})
      .then((data) => {
        this.setState((currentState) => ({...data}))
        console.log("calculated")
      })
  }, 1500)

  render() {
    const {ingredients, burgers} = this.props;
    return (
      <div className="containerFlex">
        <header className="">
          <h1>DeX-Burgers</h1>
        </header>
        <Sidebar history={this.props.history}/>
        {/* <div>
          {JSON.stringify(ingredients)}
        </div> */}
        <h2>Faça seu próprio lanche</h2>
        <ConnectedIngredientsList/>
      </div>
    )
  }
}

export default withRouter(connect((state) => ({
  loading: state.loading,
  ingredients: state.ingredients,
  burgers: state.burgers,
}))(CustomPage))
