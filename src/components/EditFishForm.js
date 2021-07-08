import React from 'react';
import PropTypes from 'prop-types';

const EditFishForm = ({index, updateFish, fish, deleteFish}) => {
  const {name, price, status, desc, image} = fish;

  const handleChange = (event) => {
    const updatedFish = {
      ...fish,
      [event.currentTarget.name]: event.currentTarget.value
    }

    updateFish(index, updatedFish);
  }

  return (
    <div className="fish-edit">
      <input
        name="name"
        type="text"
        value={name}
        onChange={handleChange} />
      <input
        name="price"
        type="text"
        value={price}
        onChange={handleChange} />
      <select
        name="status"
        value={status}
        onChange={handleChange}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea
        name="desc"
        value={desc}
        onChange={handleChange} />
      <input
        name="image"
        type="text"
        value={image}
        onChange={handleChange} />
      <button
        onClick={() => deleteFish(index)}>
        Remove Fish
      </button>
    </div>
  )
}

EditFishForm.propTypes = {
  index: PropTypes.string,
  updateFish: PropTypes.func,
  fish: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    desc: PropTypes.string,
    status: PropTypes.string
  }),
  deleteFish: PropTypes.func
}

export default EditFishForm;