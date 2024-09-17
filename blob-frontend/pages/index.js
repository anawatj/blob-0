import { useState,useEffect } from 'react';
import buildClient from '../api/build-client';
import CartItem from '../components/cart-item';


const LandingPage = ({ currentUser, stores }) => {
  const [carts,setCarts] = useState([]);
  const addToCard=(store)=>{
      if(!carts.map(c=>c.id).includes(store.id))
      {
        carts.push({id:store.id,name:store.name,image:store.image,price:store.price,qty:1});
      }
     
      setCarts(carts);
      console.log(carts);
  }
  const viewCard=()=>{
    console.log("View Cart");
  }

  console.log(stores);
  console.log(currentUser);
  return currentUser && currentUser!=null ? (

   
  
    <div className="div">

      {stores.map(store=>{
          return (<CartItem store={store} addToCard={addToCard} />)
      })}
      <div className='row'>
        <div className='col-sm-3'>

        </div>
        <div className='col-sm-3'>
          
        </div>
        <div className='col-sm-3'>
          
        </div>
        <div className='col-sm-3'>
        <button className='btn btn-primary' onClick={()=>viewCard()}>View Cart</button>
        </div>
      </div>
     
    </div>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

LandingPage.getInitialProps = async  (context, client, currentUser) => {
  console.log('CART PAGE!');
  const { data } = await client.get('/api/stores');
  //const { stores } = await client.get("/api/stores");

  return {currentUser:currentUser,stores:data};
};

export default LandingPage;