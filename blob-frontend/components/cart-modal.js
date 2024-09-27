
import webUrl from '../api/base-web'
import { Modal, ModalHeader, ModalBody } from 'react-bootstrap';
const CartModal = ({ isModalOpen, onClose, carts, setCarts }) => {
    const deleteItem = (cart) => {
        carts.splice(carts.indexOf(cart), 1);
        setCarts(carts);
        onClose();
    }
    const onItemQtyChange = (e, cart) => {
        cart.qty = e.target.value;
        setCarts(carts);
    }
    return (
        <Modal show={isModalOpen} onHide={onClose} size='xl' >
            <ModalHeader closeButton>
                List Of Cart
            </ModalHeader>
            <ModalBody>
                {carts ? carts.map(cart => {
                    return (
                        <div className="card" key={cart.id}>
                            <div className='row'>
                                <div className='col-sm-3'>
                                    <div className="col-sm-12">
                                        <img width={"100px"} height={"100px"} src={webUrl + cart.image} />
                                    </div>
                                </div>
                                <div className='col-sm-9'>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            {cart.name}
                                        </div>
                                        <div className="col-sm-3">
                                            {cart.price}
                                        </div>
                                        <div className="col-sm-3">
                                            <input type="number" className='form-control' defaultValue={cart.qty} onChange={(e) => onItemQtyChange(e, cart)} />
                                        </div>
                                        <div className="col-sm-3">
                                            <button className="btn btn-primary" onClick={() => deleteItem(cart)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                }) : ''}
            </ModalBody>
        </Modal>
    )

}
export default CartModal;