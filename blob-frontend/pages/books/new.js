import { useState, useEffect } from 'react'
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
const newBook = () => {
    const [name, setName] = useState('');
    const [isbn, setIsbn] = useState('');
    const [price, setPrice] = useState(0);
    const [releaseDate, setReleaseDate] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [publisher, setPublisher] = useState('');
    const [language, setLanguage] = useState('');
    const [qty, setQty] = useState(0);
    const [series, setSeries] = useState([]);
    const [additionals, setAdditionals] = useState([]);
    const [file, setFile] = useState(null);
    let formData = new FormData();
    const { doRequest, errors } = useRequest({
        url: '/api/books',
        method: 'post',
        body:formData,
        onSuccess: () => Router.push('/')
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
            if(!series.includes(e.target.value)){
                additionals.push(e.target.value);
            }
        }else{
            if(series.includes(e.target.value)){
                additionals.splice(e.target.value);
            }
        }
        
        setAdditionals(additionals);
    }
    const onSubmit = async event => {
        event.preventDefault();
        formData.append("name",name);
        formData.append("isbn",isbn);
        formData.append("releaseDate",releaseDate);
        formData.append("author",author);
        formData.append("genre",genre);
        formData.append("publisher",publisher);
        formData.append("language",language);
        formData.append("price",price);
        formData.append("qty",qty);
        formData.append("file",file);
        series.forEach((serie,index)=>{
            formData.append("series["+index.toString()+"]",serie);
        });
        additionals.forEach((additional,index)=>{
            formData.append("additionals["+index.toString()+"]",additional);
        })
        await doRequest();
      };
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>Isbn</label>
                <input className="form-control" value={isbn} onChange={e => setIsbn(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>releaseDate</label>
                <input className="form-control" type='date' data-date-format={"YYYY-MM-DD"} value={releaseDate} onChange={e => setReleaseDate(e.target.value)} />
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
                        <li><input type="checkbox" value={"test1"} onChange={e=>seriesHandle(e)}/><label>Test1</label></li>
                        <li><input type="checkbox" value={"test2"} onChange={e=>seriesHandle(e)}/><label>Test2</label></li>
                    </ul>
                </div>
            </div>
            <div className='form-group'>
                <label>additionals</label>
                <div>
                    <ul>
                        <li><input type="checkbox" value={"add1"} onChange={e=>additionalsHandle(e)}/><label>Add1</label></li>
                        <li><input type="checkbox" value={"add2"} onChange={e=>additionalsHandle(e)}/><label>Add2</label></li>
                    </ul>
                </div>
            </div>
            <button className='btn btn-primary'>Save</button>
        </form>
    )
}

export default newBook