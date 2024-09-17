import webUrl from '../api/base-web';
const  CartItem = ({store,addToCard})=>{
    return <div className="row">
        <div className="col-md-3">
            <img src={webUrl + store.image} width={"100px"} height={"100px"}/>
        </div>
        <div className="col-md-9">
            <div className='row'>
                <div className='col-md-3'>
                    Name 
                </div>
                <div className='col-md-3'>
                    {store.name}
                </div>
                <div className='col-md-3'>
                    Isbn 
                </div>
                <div className='col-md-3'>
                    {store.isbn}
                </div>
            </div>
            <div className='row'>
                <div className='col-md-3'>
                    Author 
                </div>
                <div className='col-md-3'>
                    {store.author}
                </div>
                <div className='col-md-3'>
                    Price 
                </div>
                <div className='col-md-3'>
                    {store.price}
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <button className='btn btn-primary' onClick={()=>addToCard(store)}>Add To Card</button>
                </div>
            </div>
        </div>
    </div>
}

export default CartItem