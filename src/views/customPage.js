import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import debounce from 'lodash.debounce'
import {API_HOST} from '../utils/api_settings'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import ConnectedIngredientsList from '../components/ingredientsList'
import { calculatePrice } from '../utils/API/calculate';
import { handleReceivePrices } from '../actions/prices';
import { clearCustomList } from '../actions/customBurger';
import Loader from '../components/loader';

class CustomPage extends Component {
  state = {
    originalPrice: 0,
    promoPrice: 0,
    promotions: [],
    selectedIngredients: 0
  }

  // getPrice = debounce((ingredients) => {
  //   calculatePrice({name: "custom", ingredients})
  //     .then((data) => {
  //       this.setState((currentState) => ({...data}))
  //       console.log("calculated")
  //       console.log(data)
  //     })
  // }, 1500)

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(clearCustomList())
  }

  componentDidUpdate(prevState, prevProps){
    if(typeof(this.props.customBurger) !== "undefined"){
      if(this.props.customBurger.length !== this.state.selectedIngredients){
        const {dispatch} = this.props
        const burger = {
          name: "custom",
          ingredients: this.props.customBurger
        }
        console.log("going to get prices")
        dispatch(handleReceivePrices(burger))
        this.setState(() => ({selectedIngredients: this.props.customBurger.length}))
      }
    }
  }

  getPrice(){
    const {prices} = this.props
    const price = prices.filter((burger) => burger.name === "custom")

    console.log(price)

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
    const {ingredients, burgers, loading, prices} = this.props;
    const price = this.getPrice()
    return (
      <React.Fragment>
        <Header/>
        {/* <Loader loading={loading}/> */}
        <div className="containerFlex content">
          <Sidebar history={this.props.history}/>
          {/* <div>
            {JSON.stringify(ingredients)}
          </div> */}
          <h2>Faça seu próprio lanche</h2>
          <ConnectedIngredientsList/>
          {price.promotions.length > 0 && (
            <span>
              <p>Promoção: {price.promotions.toString()}</p>
              <p>De: R$ {price.originalPrice.toFixed(2)}</p>
              <p>Por: R$ {price.promoPrice.toFixed(2)}</p>
            </span>
          )}
          {price.promotions.length === 0 && (
            <p>Preço: R$ {price.originalPrice.toFixed(2)}</p>
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(connect((state) => ({
  loading: state.loading,
  ingredients: state.ingredients,
  customBurger: state.customBurger,
  prices: state.prices
}))(CustomPage))
