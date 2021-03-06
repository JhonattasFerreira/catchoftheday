import React, { useState, useEffect } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from './../sample-fishes';
import Fish from './Fish';
import base from './../base';
import PropTypes from 'prop-types';

const App = ({ match: { params: { storeId } } }) => {
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState({});

  useEffect(() => {
    const localStorageRef = localStorage.getItem(storeId);

    if (localStorageRef) {
      setOrder(JSON.parse(localStorageRef))
    }

    const ref = base.syncState(`${storeId}/fishes`, {
      context: {
        setState: ({ fishes }) => setFishes({ ...fishes }),
        state: { fishes },
      },
      state: 'fishes'
    });

    return () => {
      base.removeBinding(ref);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(storeId, JSON.stringify(order));
  }, [order])

  const addFish = fish => {
    setFishes({ ...fishes, [`fish${Date.now()}`]: fish });
  }

  const updateFish = (key, updatedFish) => {
    const updatedFishes = { ...fishes, [key]: updatedFish };
    setFishes(updatedFishes);

    base.post(`${storeId}/fishes`, {
      data: updatedFishes
    });
  }

  const deleteFish = (key) => {
    const updatedFishes = { ...fishes, [key]: null }
    setFishes(updatedFishes);

    base.post(`${storeId}/fishes`, {
      data: updatedFishes
    });
  }

  const addToOrder = key => {
    setOrder({
      ...order,
      [key]: order[key] + 1 || 1
    })
  }

  const removeFromOrder = key => {
    const orders = { ...order };
    delete orders[key]
    setOrder(orders);
  }

  const loadSampleFishes = () => {
    setFishes({ ...sampleFishes });

    base.post(`${storeId}/fishes`, {
      data: { ...fishes, ...sampleFishes }
    });
  }

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {Object.keys(fishes)
            .map(key => <Fish key={key}
              index={key}
              details={fishes[key]}
              addToOrder={addToOrder} />)}
        </ul>
      </div>
      <Order
        fishes={fishes}
        order={order}
        removeFromOrder={removeFromOrder} />
      <Inventory
        addFish={addFish}
        updateFish={updateFish}
        deleteFish={deleteFish}
        loadSampleFishes={loadSampleFishes}
        fishes={fishes}
        storeId={storeId} />
    </div>
  )
}

App.propTypes = {
  match: PropTypes.object
}

export default App;