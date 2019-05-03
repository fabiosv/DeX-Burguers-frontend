import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ConnectedIngredientsList from './ingredientsList'
import { MdModeEdit, MdDelete } from "react-icons/md"
import { loadIngredients } from '../actions/customBurger'
import { uploadImage } from '../utils/imageUpload';
import { handleAddBurger, handleUpdateBurger, handleDeleteBurger } from '../actions/burgers';
import { sucessToast, errorMsg } from '../utils/ux_alerts';

class BurgerContainer extends Component {
  state = {
    name: "",
    file: "",
    create: false,
    edit: false
  }
  onEdit(burger){
    const {dispatch} = this.props
    this.setState(() => ({name: burger.name, edit: true}))
    dispatch(loadIngredients(burger.ingredients))
  }

  onDelete(burger){
    const {dispatch} = this.props
    dispatch(handleDeleteBurger(burger, () => console.log("deleted"), (msg) => console.log(msg)))
  }

  handleNameChange(event) {
    const text = event.target.value

    this.setState(() => ({name: text}))
  }

  handleUploadInput(event) {
    const file = URL.createObjectURL(event.target.files[0])
    console.log(file)

    this.setState((currentState) => ({
      file: file
    }))
  }

  save(){
    const {dispatch, customBurger} = this.props
    const {edit, create} = this.state
    const {name, file} = this.state
    const burger = {name: name, ingredients: customBurger}

    if(create){
      dispatch(handleAddBurger(burger, () => sucessToast(`${name} criado!`), (msg) => errorMsg(msg)))
    }

    if(edit){
      dispatch(handleUpdateBurger(burger, () => sucessToast(`${name} atualizado!`), (msg) => errorMsg(msg)))
    }

    if(file !== "") {
      uploadImage(name, file)
    }


    this.setState((currentState) => ({
      create: false
    }))
  }

  render(){
    const {create, edit, name} = this.state
    const {burgers} = this.props

    if(create || edit) {
      return(
        <div className="containerFlex">
          <label>Nome:</label>
          <input name="name" disabled={edit}
            placeholder="X-Burger"
            onChange={(e) => this.handleNameChange(e)}
            value={name}/>
          <ConnectedIngredientsList/>
          <span style={{display: "flex", alignItems: "flex-end", marginBottom: "15px"}}>
            <input type="file" name="file" onChange={(event) => this.handleUploadInput(event)}/>
            <img src={this.state.file === "" ? "/preview-image.png" : this.state.file} height="200" width="200"/>
          </span>
          <button className="btn btn-secondary"
            style={{display: "block"}}
            onClick={(e) => this.save()}>Save</button>
        </div>
      )
    }

    return(
      <div>
        <h2>Cardápio</h2>
        <p>BREADCUMBERS</p>
        {burgers.map((burger) => (
          <span className="card" key={burger.name} style={{}}>
            <span style={{alignSelf: "center"}}>
              <b>{burger.name}</b>
              <p>{burger.ingredients.toString()}</p>
            </span>
            <span style={{alignSelf: "flex-end", position: "absolute"}}>
              <button className="btn" onClick={(e) => this.onEdit(burger)}>
                <MdModeEdit />
              </button>
              <button className="btn" onClick={(e) => this.onDelete(burger)}>
                <MdDelete />
              </button>
            </span>
          </span>
        ))}
      </div>
    )
  }
}


export default withRouter(connect((state) => ({
  loading: state.loading,
  ingredients: state.ingredients,
  burgers: state.burgers,
  customBurger: state.customBurger
}))(BurgerContainer))