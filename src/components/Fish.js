import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from './../helpers';

const Fish = ({ index, addToOrder, details: { image, name, price, desc, status } }) => {
  const isAvailable = status === 'available';

  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">
          {formatPrice(price)}
        </span>
      </h3>
      <p>{desc}</p>
      <button disabled={!isAvailable} onClick={() => addToOrder(index)}>
        {isAvailable ? 'Add To Order' : 'Sold Out'}
      </button>
    </li>
  )
}

Fish.propTypes = {
  addToOrder: PropTypes.func,
  details: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    desc: PropTypes.string,
    status: PropTypes.string
  })
}

export default Fish;