const  BookIndex = ({books})=>{
    return <h1>Hello</h1>
}
BookIndex.getInitialProps=async(context,client)=>{
    const {data}= await client.get('/api/books');
    return {books:data}
}

export default BookIndex;