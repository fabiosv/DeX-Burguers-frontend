import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MdModeEdit, MdDelete } from "react-icons/md"
import { handleAddIngredient, handleUpdateIngredients, handleDeleteIngredients } from '../actions/ingredients';
import { sucessToast, errorMsg } from '../utils/ux_alerts';
import Swal from 'sweetalert2';

class IngredientsContainer extends Component {
  state = {
    create: false,
    edit: false,
  }

  onCreate() {
    const { dispatch } = this.props
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([{
      title: 'Nome do Ingrediente',
      text: 'Não será possivel modificar o nome posteriormente',
      input: 'text',
      inputValidator: (value) => {
        if(!value) {
          return "Você precisa informar um nome"
        }
      }
    }, {
      title: 'Preço do Ingrediente',
      text: '(use ponto como vírgula)',
      input: 'number',
      inputValidator: (value) => {
        if(!value) {
          return "Você precisa informar um preço"
        }
      }
    }]).then((result) => {
        if (result.value) {
          const ingredient = {name: result.value[0], price: result.value[1]*1}
          dispatch(handleAddIngredient(ingredient, () => sucessToast("Ingrediente criado!"), errorMsg))
        }
    })
  }

  onEdit(ingredient) {
    const { dispatch } = this.props
    Swal.fire({
      title: `Qual é o novo preço pro ${ingredient}`,
      text: "(use ponto como vírgula)",
      input: 'number',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Você precisa informar um valor'
        }
      }
    }).then((result) => {
      if (result.value) {
        const updatedIngredient = {name: ingredient, price: result.value*1}
        dispatch(handleUpdateIngredients(updatedIngredient, () => sucessToast("Preço Atualizado!"), errorMsg))
      }
    })
  }

  onDelete(ingredient) {
    const { dispatch } = this.props
    dispatch(handleDeleteIngredients({name: ingredient},  sucessToast, errorMsg))
  }

  render() {
    const {ingredients} = this.props
    console.log(ingredients)
    return(
      <div className="containerFlex">
        <h2>Ingredientes</h2>
        <table>
          <thead>
            <tr>
              <th>Ingrediente</th>
              <th>Preço</th>
              <th>Operações</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(ingredients).map((ingredient) => (
              <tr className="" key={ingredient}>
                <td>{ingredient}</td>
                <td>R$ {ingredients[ingredient].toFixed(2)}&nbsp;</td>
                <td>
                  <button title="atualizar preço" onClick={(e) => this.onEdit(ingredient)}>
                    <MdModeEdit/>
                  </button>
                  <button onClick={(e) => this.onDelete(ingredient)}>
                    <MdDelete/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={(e) => this.onCreate()}>Novo Ingrediente</button>
      </div>
    )
  }
}

export default connect((state) => ({
    loading: state.loading,
    ingredients: state.ingredients,
    burgers: state.burgers,
    customBurger: state.customBurger
  }))(IngredientsContainer)