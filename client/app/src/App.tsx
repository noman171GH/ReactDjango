import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([]); // initially it wil be empty Array
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);


  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/"); //https://developer.mozilla.org/en-US/docs/Web/API/Response/json_static
      console.log(response);
      const data = await response.json();
      console.log(data);
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  };


  const addBook = async () => {
    const bookData = {
      title : title,
      release_year: releaseYear,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      
      const data = await response.json();
      
      setBooks((prev_data) => [...prev_data, data]);
      

   

    } catch (err) {
      console.log(err);
    }
  };







  //this is a useEffect , which we are using so we can call it everytime when we render it . Empty ARRAY is showing that it will run only once.
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <h1> REACT CURD using DJANGO RestFramework</h1>
      <h2> Book Website </h2>

      <div>

        <input
        
          type="text"
          placeholder="Book Title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
      
          type="number"
          placeholder="Release Year..."
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <button onClick={addBook}> Add Book </button>
         <p>************************************</p>
      </div>

      {books.map((x) => (
        <div key={x.id}>
          <p>Title: {x.title}</p>
          <p>Release Year: {x.release_year} </p>
          <p>*********************************** </p>

        </div>
      ))}
      </>
  );
}

export default App
