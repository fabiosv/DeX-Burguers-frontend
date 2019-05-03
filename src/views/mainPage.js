import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {API_HOST} from '../utils/api_settings'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Loader from '../components/loader';

class MainPage extends Component {
  getPrice(burger) {
    const {prices} = this.props
    const price = prices.filter((price) => price.name === burger)
    if(price.length > 0) {
      return price[0]
    }
    return {
      originalPrice: 0,
      promoPrice: 0,
      promotions: []
    }
  }
  render() {
    const {loading, ingredients, burgers} = this.props;
    return (
      <div className="">
        <Header/>
        <Sidebar history={this.props.history}/>
        <Loader loading={loading}/>
        {/* <div>
          {JSON.stringify(ingredients)}
        </div> */}
        <h2>Cardápio</h2>
        <div className="offset-md-1 burgers_menu">
          {burgers.map((burger) => (
            <span className="burger" key={burger.name}>
              <img src={API_HOST + burger.image} height={200} width={280}/>
              <h4>{burger.name}</h4>
              <ul>
                {burger.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
              <p>Por: R$ {this.getPrice(burger.name).promoPrice.toFixed(2)}</p>
            </span>
          ))}
        </div>
      </div>
    )
  }
}

export default withRouter(connect((state) => ({
  loading: state.loading,
  ingredients: state.ingredients,
  burgers: state.burgers,
  prices: state.prices,
}))(MainPage))
