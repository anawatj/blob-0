import Link from "next/link";
import webUrl from '../../api/base-web'
import Router, { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
const OrderIndex = ({ orders, currentUser, client }) => {

    const router = useRouter();


    useEffect(() => {
        if (currentUser.role == "CUSTOMER") {
            router.push("/");
        }
    }, [currentUser]);


    const handleDelete = async (id) => {
        if (confirm("Are you sure to delete this orders")) {
            const result = await axios.delete(`/api/orders/${id}`);
            router.reload();
        }

    }

    return (
        <div >
            <table className="table">
                <thead>
                    <tr>

                        <th>
                            Order Name
                        </th>
                        <th>
                            Order Date
                        </th>
                        <th>
                            Action
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) => {
                            return <tr key={order.id}>
                                <td>{order.orderName}</td>
                                <td>{order.orderDate}</td>
                                <th>
                                    <Link href={`/orders/${order.id}`}>View</Link>&nbsp;
                                    <Link href={"#"} onClick={() => handleDelete(order.id)}>Delete</Link>
                                </th>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}
OrderIndex.getInitialProps = async (context, client, currentUser) => {
    if (currentUser.role == "CUSTOMER") {

        return { orders: [], currentUser: currentUser };
    }

    const { data } = await client.get('/api/orders');
    console.log(data);
    return { orders: data, currentUser: currentUser }


}

export default OrderIndex;