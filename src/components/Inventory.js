import React, { useState, useEffect } from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import PropTypes from 'prop-types';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

const Inventory = ({ storeId, fishes, updateFish, deleteFish, addFish, loadSampleFishes }) => {
  const [uid, setUid] = useState(null);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        authHandler({ user })
      }
    });
  }, [])

  const authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(authHandler)
  }

  const authHandler = async (authData) => {
    const store = await base.fetch(storeId, {});

    if (!store.owner) {
      await base.post(`${storeId}/owner`, {
        data: authData.user.uid
      });
    }

    setUid(authData.user.uid);
    setOwner(store.owner || authData.user.uid)
  }

  const handleLogout = async () => {
    await firebase.auth().signOut();
    setUid(null);
  }

  const logout = <button onClick={handleLogout}>Log Out!</button>

  if (!uid) {
    return <Login authenticate={authenticate} />
  }

  if (uid !== owner) {
    return (
      <div>
        <p>Sorry you are not the owner</p>
        {logout}
      </div>
    )
  }

  return (
    <div className="inventory">
      <h2>Inventory</h2>
      {logout}
      {Object.keys(fishes).map(key => (
        <EditFishForm
          key={key}
          index={key}
          fish={fishes[key]}
          updateFish={updateFish}
          deleteFish={deleteFish} />))}
      <AddFishForm addFish={addFish} />
      <button onClick={loadSampleFishes}>Load Sample Fishes</button>
    </div>
  )
}

Inventory.propTypes = {
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  addFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
  fishes: PropTypes.object
}

export default Inventory;