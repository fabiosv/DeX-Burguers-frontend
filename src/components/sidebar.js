import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { MdRestaurant, MdSettings, MdNewReleases, MdShoppingCart } from 'react-icons/md'
import { GiHamburger, GiCheeseWedge, GiChefToque } from 'react-icons/gi'

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default function Sidebar(props) {
  return(
    <SideNav
      onSelect={(selected) => {
        console.log(selected)
        const admin_pages = ["burgers", "ingredients", "discounts"]
        if(admin_pages.includes(selected)){
          // selected = selected.includes("admin") || props.history.location.pathname.includes("admin")
          selected = selected.includes("admin")
          ? selected
          : `admin/${selected}`
        }
        selected = selected !== "/" ? `/${selected}` : selected
        console.log(selected)
        props.history.push(selected)
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="/" className="menu">
        <NavItem eventKey="/">
          <NavIcon>
            <MdRestaurant style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>Cardapio</NavText>
        </NavItem>
        <NavItem eventKey="custom">
          <NavIcon>
            <GiChefToque style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>Faça o seu</NavText>
        </NavItem>
        <NavItem eventKey="cart">
          <NavIcon>
            <MdShoppingCart style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>Meu Carrinho</NavText>
        </NavItem>
        <NavItem eventKey="admininistrator">
            <NavIcon>
                <MdSettings style={{ fontSize: '1.75em' }}/>
            </NavIcon>
            <NavText>Admininstrador</NavText>
            <NavItem eventKey="burgers">
              <NavIcon>
                  <GiHamburger style={{ fontSize: '1.75em' }}/>
              </NavIcon>
              <NavText>Burgers</NavText>
            </NavItem>
            <NavItem eventKey="ingredients">
              <NavIcon>
                <GiCheeseWedge style={{ fontSize: '1.75em' }}/>
              </NavIcon>
              <NavText>Ingredientes</NavText>
            </NavItem>
            <NavItem eventKey="discounts">
              <NavIcon>
                <MdNewReleases style={{ fontSize: '1.75em' }}/>
              </NavIcon>
              <NavText>Promoções</NavText>
            </NavItem>
        </NavItem>
      </SideNav.Nav>
  </SideNav>
  )
  // return(
  //   <div className="show col-md-3" style={{display: "flex", flexDirection: "column", zIndex: 1}}>
  //     <h2>Menu</h2>
  //     <Link to="/">Home</Link>
  //     <hr/>
  //     <h2>Admininstrador</h2>
  //     <Link to={`/admin/burgers`}>Burgers</Link>
  //     <Link to={`/admin/ingredients`}>Ingredients</Link>
  //     <hr/>
  //   </div>
  // )
}