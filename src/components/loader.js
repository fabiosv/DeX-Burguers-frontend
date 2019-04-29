import React from 'react'
import {bool} from 'prop-types'
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
        color={'#123abc'}
        loading={loading}
      />
    </div>
  )
}

Loader.propTypes = {
  loading: bool.isRequired,
}

export default Loader