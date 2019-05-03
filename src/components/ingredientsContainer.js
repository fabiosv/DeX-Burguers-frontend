import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MdModeEdit, MdDelete } from "react-icons/md"

class IngredientsContainer extends Component {
  state = {
    create: false,
    edit: false,
  }

  onCreate() {

  }

  render() {
    const {ingredients} = this.props
    return(
      <div className="containerFlex">
        <h2>Ingredientes</h2>
        <table>
          <thead>
            <th>Ingrediente</th>
            <th>Preço</th>
            <th>Operações</th>
          </thead>
          <tbody>
            {Object.keys(ingredients).map((ingredient) => (
              <tr className="" key={ingredient}>
                <td>{ingredient}</td>
                <td>R$ {ingredients[ingredient].toFixed(2)}</td>
                <td>
                  <button title="atualizar preço"><MdModeEdit/></button>
                  <button><MdDelete/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button>Novo Ingrediente</button>
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