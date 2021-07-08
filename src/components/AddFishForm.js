import React, { createRef } from 'react';
import PropTypes from 'prop-types';

const AddFishForm = ({ addFish }) => {
  const nameRef = createRef();
  const priceRef = createRef();
  const statusRef = createRef();
  const descRef = createRef();
  const imageRef = createRef();

  const createFish = (e) => {
    e.preventDefault();

    const fish = {
      name: nameRef.current.value,
      price: parseFloat(priceRef.current.value),
      status: statusRef.current.value,
      desc: descRef.current.value,
      image: imageRef.current.value
    }

    addFish(fish);

    e.currentTarget.reset();
  }

  return (
    <form className="fish-edit" onSubmit={createFish}>
      <input name="name" ref={nameRef} type="text" placeholder="Name" />
      <input name="price" ref={priceRef} type="text" placeholder="Price" />
      <select name="status" ref={statusRef}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea name="desc" ref={descRef} placeholder="Desc" />
      <input name="image" ref={imageRef} type="text" placeholder="Image" />

      <button type="submit">+ Add Fish</button>
    </form>
  )


}

export default AddFishForm;