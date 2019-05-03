import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {API_HOST} from '../utils/api_settings'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Loader from '../components/loader'
import background from '../background.jpg'
import Swal from 'sweetalert2'
import {handleCartAddBurger} from '../actions/cart'
import {MdAddShoppingCart} from "react-icons/md"
import {sucessToast} from '../utils/ux_alerts'

class MainPage extends Component {
  addToCart(burger) {
    const {dispatch} = this.props
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
        dispatch(handleCartAddBurger(burger, () => sucessToast(`${burger.name} Adicionado!`)))
      }
    })
  }

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
      <React.Fragment>
        <Header/>
        <Sidebar history={this.props.history}/>
        <Loader loading={loading}/>
        <div style={{background: `url(${background}) no-repeat center center fixed`}}>
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
                <button onClick={(e) => this.addToCart(burger)} title="Adicionar ao Carrinho">
                  <MdAddShoppingCart/>
                </button>
              </span>
            ))}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(connect((state) => ({
  loading: state.loading,
  ingredients: state.ingredients,
  burgers: state.burgers,
  prices: state.prices,
}))(MainPage))
