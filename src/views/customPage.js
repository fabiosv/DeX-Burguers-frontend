import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import debounce from 'lodash.debounce'
import {API_HOST} from '../utils/api_settings'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import ConnectedIngredientsList from '../components/ingredientsList'
import { calculatePrice } from '../utils/API/calculate'
import { handleReceivePrices } from '../actions/prices'
import { clearCustomList } from '../actions/customBurger'
import Loader from '../components/loader'
import Swal from 'sweetalert2'
import {handleCartAddBurger, cartRemoveBurger} from '../actions/cart'
import {MdAddShoppingCart} from "react-icons/md"
import {sucessToast} from '../utils/ux_alerts'

class CustomPage extends Component {
  state = {
    originalPrice: 0,
    promoPrice: 0,
    promotions: [],
    selectedIngredients: 0
  }

  addToCart() {
    const {dispatch} = this.props
    const {customBurger} = this.props
    const burger = {
      name: "custom",
      ingredients: customBurger
    }
    Swal.fire({
      title: `Você deseja adicionar um ${burger.name} ao carrinho?`,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Adicionar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(handleCartAddBurger(burger, () => sucessToast("Adicionado!")))
      }
    })
  }

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
    const {ingredients, loading, prices} = this.props;
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
          <button onClick={(e) => this.addToCart()} title="Adicionar ao Carrinho">
            <MdAddShoppingCart/>
          </button>
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
