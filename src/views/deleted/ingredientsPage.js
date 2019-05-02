import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleReceiveIngredients } from '../actions/ingredients'
import { handleReceiveBurgers } from '../actions/burgers'

class IngredientsPage extends Component {
  submitFile = () => {}

  componentDidMount() {
    const { dispatch } = this.props
  }

  render() {
    const {ingredients, burgers} = this.props;
    return (
      <div className="">
        <div>
          <input type="file" name="file"/>
          <button>Submit</button>
        </div>
      </div>
    )
  }
}

export default withRouter(connect((state) => ({
  loading: state.loading,
  ingredients: state.ingredients,
  burgers: state.burgers,
}))(IngredientsPage))
