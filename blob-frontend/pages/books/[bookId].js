import {useEffect,useState } from 'react'
import  { useRouter } from 'next/router';
import useRequest from '../../hooks/use-request';
const BookUpdate = ({book,currentUser,bookId})=>{
    const [name, setName] = useState(book.name);
    const [isbn, setIsbn] = useState(book.isbn);
    const [price, setPrice] = useState(book.price);
    const [releaseDate, setReleaseDate] = useState(book.releaseDate.substring(0,10));
    const [author, setAuthor] = useState(book.author);
    const [genre, setGenre] = useState(book.genre);
    const [publisher, setPublisher] = useState(book.publisher);
    const [language, setLanguage] = useState(book.language);
    const [qty, setQty] = useState(book.qty);
    const [series, setSeries] = useState(book.series);
    const [additionals, setAdditionals] = useState(book.additionals);
    const [file, setFile] = useState(null);
    const router = useRouter();

    let formData = new FormData();
    const { doRequest, errors } = useRequest({
        url: `/api/books/${bookId}`,
        method: 'put',
        body:formData,
        onSuccess: () => router.push("/books")
      });
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const seriesHandle=(e)=>{
        if(e.target.checked==true){
            if(!series.includes(e.target.value)){
                series.push(e.target.value);
            }
           
        }else{
            if(series.includes(e.target.value)){
                series.splice(series.indexOf(e.target.value),1);
            }
        }
        
        setSeries(series);
    }
    const additionalsHandle=(e)=>{
        if(e.target.checked==true){
            if(!additionals.includes(e.target.value)){
                additionals.push(e.target.value);
            }
        }else{
            if(additionals.includes(e.target.value)){
                additionals.splice(e.target.value);
            }
        }
        
        setAdditionals(additionals);
    }
    const onSubmit = async event => {
        event.preventDefault();
        console.log(releaseDate);
        formData.append("name",name);
        console.log(name);
        formData.append("isbn",isbn);
        formData.append("releaseDate",releaseDate);
        formData.append("author",author);
        formData.append("genre",genre);
        formData.append("publisher",publisher);
        formData.append("language",language);
        formData.append("price",price);
        formData.append("qty",qty);
        formData.append("file",file);
        console.log(series);
        series.forEach((serie,index)=>{
            formData.append("series["+index.toString()+"]",serie);
        });
        console.log(additionals);
        additionals.forEach((additional,index)=>{
            formData.append("additionals["+index.toString()+"]",additional);
        })
        await doRequest();
      };
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input className="form-control" value={name}   onChange={e => setName(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>Isbn</label>
                <input className="form-control" value={isbn} onChange={e => setIsbn(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>releaseDate</label>
                <input className="form-control" type='date'  data-date-format={"yyyy-MM-dd"} value={releaseDate} onChange={e => setReleaseDate(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>author</label>
                <input className="form-control"  value={author} onChange={e => setAuthor(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>genre</label>
                <input className="form-control"  value={genre} onChange={e => setGenre(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>publisher</label>
                <input className="form-control"  value={publisher} onChange={e => setPublisher(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>language</label>
                <input className="form-control"  value={language} onChange={e => setLanguage(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>price</label>
                <input className="form-control" type='number'  value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>qty</label>
                <input className="form-control" type='number'  value={qty} onChange={e => setQty(e.target.value)} />
            </div>

            <div className='form-group'>
                <label>image</label>
                <input className="form-control" type='file'   onChange={handleFileChange} />
            </div>
            <div className='form-group'>
                <label>series</label>
                <div>
                    <ul>
                        <li><input type="checkbox" defaultChecked={series.includes("test1")} value={"test1"} onChange={e=>seriesHandle(e)}/><label>Test1</label></li>
                        <li><input type="checkbox" defaultChecked={series.includes("test2")} value={"test2"} onChange={e=>seriesHandle(e)}/><label>Test2</label></li>
                    </ul>
                </div>
            </div>
            <div className='form-group'>
                <label>additionals</label>
                <div>
                    <ul>
                        <li><input type="checkbox" defaultChecked={additionals.includes("add1")} value={"add1"} onChange={e=>additionalsHandle(e)}/><label>Add1</label></li>
                        <li><input type="checkbox" defaultChecked={additionals.includes("add2")} value={"add2"} onChange={e=>additionalsHandle(e)}/><label>Add2</label></li>
                    </ul>
                </div>
            </div>
            {errors}
            <button className='btn btn-primary'>Save</button>
        </form>
    )
}

BookUpdate.getInitialProps= async (context, client,currentUser) => {
    const { bookId } = context.query;
    const { data } = await client.get(`/api/books/${bookId}`);
  
    return { book: data,currentUser,bookId };
  };

  export default BookUpdate;
  