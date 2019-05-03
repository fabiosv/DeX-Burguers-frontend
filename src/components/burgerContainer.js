import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ConnectedIngredientsList from './ingredientsList'
import { MdModeEdit, MdDelete } from "react-icons/md"
import { loadIngredients, clearCustomList } from '../actions/customBurger'
import { uploadImage } from '../utils/imageUpload';
import { handleAddBurger, handleUpdateBurger, handleDeleteBurger, updateBurgerImage } from '../actions/burgers';
import { sucessToast, errorMsg } from '../utils/ux_alerts';
import { loading, loaded } from '../actions/loading';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    display               : "flex",
    alignItems            : "center",
    justifyContent        : "center",
    flexDirection         : "column",
  }
};

class BurgerContainer extends Component {
  state = {
    name: "",
    file: "",
    selectedFile: null,
    create: false,
    edit: false,
  }
  onCreate(){
    const {dispatch} = this.props
    dispatch(clearCustomList())
    this.setState(() => ({create: true, name: "", selectedFile: null, file: ""}))
  }

  onEdit(burger){
    const {dispatch} = this.props
    this.setState(() => ({name: burger.name, edit: true, selectedFile: null, file: ""}))
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
    const targetFile = event.target.files[0]
    const file = URL.createObjectURL(event.target.files[0])
    console.log(targetFile)

    this.setState((currentState) => ({
      file: file,
      selectedFile: targetFile
    }))
  }

  save(){
    const {dispatch, customBurger} = this.props
    const {edit, create} = this.state
    const {name, file, selectedFile} = this.state
    const burger = {name: name, ingredients: customBurger}

    const sucessFnc = () => {
      sucessToast(create ? `${name} criado!` : `${name} atualizado!`)
      this.setState((currentState) => ({
        create: false,
        edit: false
      })
    )}

    if(create){
      dispatch(handleAddBurger(burger, sucessFnc, errorMsg))
    }

    if(edit){
      dispatch(handleUpdateBurger(burger, sucessFnc, errorMsg))
    }

    if(file !== "") {
      dispatch(loading())
      uploadImage(name, selectedFile)
        .then((data) => {
          console.log(data)
          dispatch(updateBurgerImage(data.burger))
          dispatch(loaded())
        })
    }

  }

  closeModal() {
    this.setState((currentState) => ({
      create: false,
      edit: false
    }))
  }

  render(){
    const {create, edit, name} = this.state
    const {burgers} = this.props

    return(
      <div className="containerFlex">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ingredientes</th>
              <th>Operações</th>
            </tr>
          </thead>
          <tbody>
            {burgers.map((burger) => (
              <tr key={burger.name}>
                <td>{burger.name}</td>
                <td>{burger.ingredients.toString()}</td>
                <td>
                  <button className="btn" onClick={(e) => this.onEdit(burger)}>
                    <MdModeEdit />
                  </button>
                  <button className="btn" onClick={(e) => this.onDelete(burger)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={(e) => this.onCreate()}>Novo Burger</button>
        {/* {burgers.map((burger) => (
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
        ))} */}
        <Modal
          isOpen={create || edit}
          contentLabel="Burgers"
          style={customStyles}
        >
          <button className="btn modalCloseButton" onClick={(e) => this.closeModal()}>X</button>
          <span className="col-10 nameRow">
            <label for="name">Nome:&nbsp;</label>
            <input id="name" name="name" disabled={edit}
              placeholder="Ex: X-Burger"
              type="text"
              onChange={(e) => this.handleNameChange(e)}
              value={name}/>
          </span>
          <ConnectedIngredientsList cols="col-10"/>
          <span className="uploadBox">
            <input type="file" name="file" onChange={(event) => this.handleUploadInput(event)}/>
            <img alt="preview"
              src={this.state.file === "" ? "/preview-image.png" : this.state.file}
              height="200" width="200"/>
          </span>
          <p>Só serão aceitos arquivos no formato (.png)</p>
          <button className="btn btn-secondary"
            style={{display: "block"}}
            onClick={(e) => this.save()}>Save</button>
        </Modal>
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