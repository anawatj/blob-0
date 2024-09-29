import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import useRequest from '../../hooks/use-request';
const OrderUpdate = ({ order, currentUser, orderId }) => {
    const router = useRouter();
    useEffect(() => {
        if (currentUser.role == "CUSTOMER") {
            router.push("/");
        }
    }, [currentUser]);
    const [orderName, setOrderName] = useState(order.orderName?order.orderName:'');
    const [orderDate, setOrderDate] = useState(order.orderDate?order.orderDate.substring(0,10):'');
    const [cardNumber, setCardNumber] = useState(order.cardNumber?order.cardNumber:'');
    const [cardHolder, setCardHolder] = useState(order.cardHolder?order.cardHolder:'');
    const [shipName, setShipName] = useState(order.shipName?order.shipName:'');
    const [shipAddress, setShipAddress] = useState(order.shipAddress?order.shipAddress:'');
    const [items, setItems] = useState(order.items?order.items:[]);

    const { doRequest, errors } = useRequest({
        url: `/api/orders/${orderId}`,
        method: 'put',
        body: {
            orderName,
            orderDate,
            cardNumber,
            cardHolder,
            shipName,
            shipAddress,
            items
          },
        onSuccess: () => router.push("/orders")
    });
    const onSubmit = async event => {
        event.preventDefault();
        await doRequest();
    };
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>OrderName</label>
                <input className="form-control" value={orderName} disabled={true} onChange={e => setOrderName(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>OrderDate</label>
                <input className="form-control" disabled={true} type='date' data-date-format={"yyyy-MM-dd"} value={orderDate} onChange={e => setOrderDate(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>CardNumber</label>
                <input className="form-control" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>CardHolder</label>
                <input className="form-control" value={cardHolder} onChange={e => setCardHolder(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>Ship Name</label>
                <input className="form-control" value={shipName} onChange={e => setShipName(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>shipAddress</label>
                <textarea className='form-control' value={shipAddress} onChange={e => setShipAddress(e.target.value)} />
            </div>
            
            {errors}
            <button className='btn btn-primary'>Save</button>
        </form>
    )
}

OrderUpdate.getInitialProps = async (context, client,currentUser) => {
    if (currentUser.role == "CUSTOMER") {
        return { order: {}, currentUser, undefined };
    }
    const { orderId } = context.query;
    console.log(orderId);
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data, currentUser, orderId };
};

export default OrderUpdate;
