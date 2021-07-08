import React, { createRef } from 'react';
import { getFunName } from './../helpers';
import PropTypes from 'prop-types';

const StorePicker = ({ history }) => {

  const myInput = createRef();

  const goToStore = (event) => {
    event.preventDefault();
    const storeName = myInput.current.value;

    history.push(`/store/${storeName}`);
  }

  return (
    <form className="store-selector" onSubmit={goToStore}>
      <h2>Please Enter A Store</h2>
      <input
        type="text"
        placeholder="Store Name"
        defaultValue={getFunName()}
        ref={myInput}
        required />
      <button type="submit">Visit Store →</button>
    </form>
  )
}

StorePicker.propTypes = {
  history: PropTypes.object
}

export default StorePicker;