import Link from "next/link";
import webUrl from '../../api/base-web'
import  Router  from "next/router";
const BookIndex = ({ books, currentUser }) => {
    const handleNewClick=()=>{
        Router.push("/books/new");
    }
    return (
        <div >
            <button className='btn btn-primary' onClick={handleNewClick}>New Book</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>

                        </th>
                        <th>
                            Book Name
                        </th>
                        <th>
                            Book Price
                        </th>
                        <th>
                            Book Qty
                        </th>
                        <th>
                            Book Image
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((book, index) => {
                            return <tr key={book.id}>
                                <td><input type="checkbox" /></td>
                                <td>{book.name}</td>
                                <td>{book.price}</td>
                                <td>{book.qty}</td>
                                <td><img width={"50px"} height={"50px"} src={webUrl + book.image} /></td>
                                <td>
                                    <Link href={`/books/${book.id}`}>Edit</Link>&nbsp;
                                    <Link href={"#"}>Delete</Link>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}
BookIndex.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/books');
    return { books: data, currentUser: currentUser }
}

export default BookIndex;