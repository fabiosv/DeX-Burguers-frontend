import React from 'react'
import {PacmanLoader} from 'react-spinners'
import './loader.css'

function Loader (props) {
  const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const {loading} = props;
  return (
    <div className={loading ? "loader" : "loader invisible"}>
      <PacmanLoader
        css={override}
        sizeUnit={"px"}
        size={25}
        color={'#ffff00'}
        loading={loading}
      />
    </div>
  )
}

export default Loader