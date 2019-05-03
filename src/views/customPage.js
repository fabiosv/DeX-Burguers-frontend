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


  render() {
    const {ingredients, burgers, loading} = this.props;
    return (
      <React.Fragment>
        <Header/>
        <Loader loading={loading}/>
        <div className="containerFlex content">
          <Sidebar history={this.props.history}/>
          {/* <div>
            {JSON.stringify(ingredients)}
          </div> */}
          <h2>Faça seu próprio lanche</h2>
          <ConnectedIngredientsList/>
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
