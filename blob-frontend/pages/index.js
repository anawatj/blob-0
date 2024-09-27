import { useState, useEffect } from 'react';
import buildClient from '../api/build-client';
import CartItem from '../components/cart-item';
import CartModal from '../components/cart-modal';


const LandingPage = ({ currentUser, stores }) => {
  const [carts, setCarts] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const addToCard = (store) => {
    if (!carts.map(c => c.id).includes(store.id)) {
      carts.push({ id: store.id, name: store.name, image: store.image, price: store.price, qty: 1 });
    }

    setCarts(carts);
  }
  const viewCart = () => {

    setIsCartModalOpen(true)
  }
  const onCartModalClose = () => {


    setIsCartModalOpen(false);
  }


  return currentUser && currentUser != null ? (



    <div className="div">

      <CartModal isModalOpen={isCartModalOpen} onClose={onCartModalClose} carts={carts} setCarts={setCarts} />
      {stores.map(store => {
        return (<CartItem store={store} addToCard={addToCard} key={store.id} />)
      })}
      <div className='row'>
        <div className='col-sm-3'>

        </div>
        <div className='col-sm-3'>

        </div>
        <div className='col-sm-3'>

        </div>
        <div className='col-sm-3'>
          <button className='btn btn-primary' onClick={() => viewCart()}>Carts</button>
        </div>
      </div>

    </div>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  console.log('CART PAGE!');
  const { data } = await client.get('/api/stores');
  //const { stores } = await client.get("/api/stores");

  return { currentUser: currentUser, stores: data };
};

export default LandingPage;