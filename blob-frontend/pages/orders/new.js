import { useState, useEffect } from 'react'
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/router';
const newOrder = ({ currentUser }) => {
  const router = useRouter();




  const [orderName, setOrderName] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [shipName, setShipName] = useState('');
  const [shipAddress, setShipAddress] = useState('');
  const [items, setItems] = useState([]);
  useEffect(() => {


    const data = localStorage.getItem("data");
    const carts = JSON.parse(data);
    setItems(carts);

  }, []);
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      orderName,
      orderDate,
      shipName,
      shipAddress,
      items
    },
    onSuccess: () => router.push("/orders")
  });
  const onSubmit = async event => {
    event.preventDefault();
    await doRequest();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <div className='form-group'>
          <label>OrderName</label>
          <input type='text' className='form-control' value={orderName} onChange={e => setOrderName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Date</label>
          <input type='date' className='form-control' value={orderDate} onChange={e => setOrderDate(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Ship Name</label>
          <input type='text' className='form-control' value={shipName} onChange={e => setShipName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Ship Address</label>
          <textarea className='form-control' value={shipAddress} onChange={e => setShipAddress(e.target.value)} />
        </div>

        {errors}
        <button className='btn btn-primary'>Save</button>
      </div>
    </form>
  )

}

newOrder.getInitialProps = async (context, client, currentUser) => {
  return { currentUser: currentUser }
}
export default newOrder