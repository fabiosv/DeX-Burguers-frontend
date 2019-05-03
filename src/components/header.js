import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import {FaBookDead, FaArrowLeft} from "react-icons/fa"
import logo from "../logo+blackbord.png"


class Header extends Component {
  goBack = () => {
    this.props.history.goBack();
  }
  render(){
    const { goBackButton, showIcon, title } = this.props
    return(
      <div className="header">
        {/* {goBackButton && (
          <button id="goBack-button" onClick={(e) => this.goBack()}><FaArrowLeft /></button>
        )} */}
        <h2>
          <img src={logo} height={200} width={400} />
          &nbsp;{title}
        </h2>
      </div>
    )
  }
}

export default withRouter(Header)