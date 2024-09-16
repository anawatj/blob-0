import Link from "next/link";
import webUrl from '../../api/base-web'
import { useRouter } from "next/router";
import axios from "axios";
const BookIndex = ({ books, currentUser,client }) => {
    const router = useRouter();

   
    const handleNewClick=()=>{
        router.push("/books/new");
    }
    const handleDelete=async(id)=>{
        if(confirm("Are you sure to delete this books")){
            console.log(id);
            const result = await axios.delete(`/api/books/${id}`);
            router.reload();
        }
        
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
                                    <Link href={"#"} onClick={()=>handleDelete(book.id)}>Delete</Link>
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
    console.log(data);
    return { books: data, currentUser: currentUser}
}

export default BookIndex;