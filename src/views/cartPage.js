import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {API_HOST} from '../utils/api_settings'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Loader from '../components/loader'
import background from '../background.jpg'
import Swal from 'sweetalert2'
import {handleCartAddBurger, cartRemoveBurger, cartClear} from '../actions/cart'
import customBurger from '../customburger.png'
import {MdRemoveShoppingCart, MdRemove} from "react-icons/md"
import {sucessToast} from '../utils/ux_alerts'

class CartPage extends Component {
  removeFromCart(burger) {
    const {dispatch} = this.props
    Swal.fire({
      title: `Você deseja remover um ${burger.name} do carrinho?`,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remover',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(cartRemoveBurger(burger))
      }
    })
  }

  clearCart() {
    const {dispatch} = this.props
    Swal.fire({
      title: `Você tem certeza que quer esvaziar o carrinho?`,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Esvaziar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(cartClear())
        sucessToast("Carrinho Esvaziado!")
      }
    })
  }

  render() {
    const {loading, cart} = this.props;
    return (
      <React.Fragment>
        <Header/>
        <Sidebar history={this.props.history}/>
        <Loader loading={loading}/>
        <div style={{background: `url(${background}) no-repeat center center fixed`, overflow: "auto", height: "100%"}}>
          <div className="offset-md-2 col-md-9 content">
          <h2>Carrinho</h2>
          <span>
            <button onClick={(e) => this.clearCart()} title="Limpar Carrinho">
              <MdRemoveShoppingCart/>
            </button>
          </span>
            {cart.map((burger) => (
              <span key={burger.name} className="burgerCart">
                <span className="col-md-1">
                  <img src={burger.name === "custom" ? customBurger : API_HOST + burger.image} height={80} width={160}/>
                </span>
                <span className="col-md-2">
                  <p>{burger.name}</p>
                </span>
                <ul className="col-md-4">
                  {burger.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
                {burger.promotions.length > 0 && (
                  <span className="prices">
                    <span style={{display: "flex",flexDirection: "row"}}>
                      <p>Promoção:</p>
                      <ul className="col-md-4">
                        {burger.promotions.map((promo) => (
                          <li key={promo}>{promo}</li>
                        ))}
                      </ul>
                    </span>
                    <p>De: R$ {burger.originalPrice.toFixed(2)}</p>
                    <p>Por: R$ {burger.promoPrice.toFixed(2)}</p>
                  </span>
                )}
                {burger.promotions.length === 0 && (
                  <span className="prices">
                    <p>Preço: R$ {burger.originalPrice.toFixed(2)}</p>
                  </span>
                )}
                <button title={`remover ${burger.name}`} onClick={(e) => this.removeFromCart(burger) }>
                  <MdRemove/>
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
  cart: state.cart,
  prices: state.prices,
}))(CartPage))
