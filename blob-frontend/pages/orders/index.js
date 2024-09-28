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
                            Order Amount
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) => {
                            return <tr key={order.id}>
                                <td>{order.orderName}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.orderAmount}</td>

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