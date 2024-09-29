import { useState, useEffect } from 'react';
import buildClient from '../api/build-client';
import CartItem from '../components/cart-item';
import CartModal from '../components/cart-modal';
import { useRouter } from 'next/router'

const LandingPage = ({ currentUser, stores }) => {
  const [carts, setCarts] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const router = useRouter();
  useEffect(()=>{
    localStorage.clear();
    localStorage.setItem("data",JSON.stringify(carts));
  },[])
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
  const payment = () => {
    //sessionStorage.clear();
    //sessionStorage.setItem("carts",carts.map(cart=>{
    //  return {bookId:cart.id,qty:cart.qty,price:cart.price}
    //}));
    //localStorage.clear();
    const data = carts.map(cart=>{
      return {bookId:cart.id,qty:cart.qty,price:cart.price}
    })
   localStorage.setItem("data",JSON.stringify(data));
   
    
    router.push("/orders/new");
  
   // router.push("/orders/new",{state:data});
   

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
          <button className='btn btn-primary' onClick={() => payment()}>Payment</button>
        </div>
      </div>

    </div>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  console.log('CART PAGE!');
  console.log("Context",context);
  const { data } = await client.get('/api/stores');
  //const { stores } = await client.get("/api/stores");

  return {currentUser: currentUser, stores: data };
};

export default LandingPage;