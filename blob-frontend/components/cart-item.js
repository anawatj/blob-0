import webUrl from '../api/base-web';
const CartItem = ({ store, addToCard }) => {
    return <div className="card" key={store.id} style={{padding:35}} >
        <div className='row'>
            <div className="col-sm-3">
                <img src={webUrl + store.image} width={"100px"} height={"100px"} />
            </div>
            <div className='col-sm-9'>
                <div className='row'>
                    <div className='col-sm-4'>
                        <label>Name</label>
                    </div>
                    <div className='col-sm-4'>
                        {store.name}
                    </div>
                    <div className='col-sm-4'></div>
                </div>
                <div className='row'>
                    <div className='col-sm-4'>
                        <label>Isbn</label>
                    </div>
                    <div className='col-sm-4'>
                        {store.isbn}
                    </div>
                    <div className='col-sm-4'></div>
                </div>
                <div className='row'>
                    <div className='col-sm-4'>
                        <label>Author</label>
                    </div>
                    <div className='col-sm-4'>
                        {store.author}
                    </div>
                    <div className='col-sm-4'></div>
                </div>
                <div className='row'>
                    <div className='col-sm-4'>
                        Price
                    </div>
                    <div className='col-sm-4'>
                        {store.price}
                    </div>
                    <div className='col-sm-4'>
                        <button className='btn btn-primary' onClick={() => addToCard(store)}>Add To Card</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CartItem