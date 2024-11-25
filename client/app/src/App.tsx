import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([]); // initially it wil be empty Array
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [newTitle, setNewTitle] = useState(""); // for updation purpose

  //this is a useEffect , which we are using so we can call it everytime when we render it . Empty ARRAY is showing that it will run only once.
  useEffect(() => {
    fetchBooks();
  }, []);


// ************************************************* Get Books***************************************************
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
// *****************************************************************************************************************

// ***************************************ADD Book*****************************************************
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
      
      setBooks((prev_data) => [...prev_data, data]); //updating state (books) using JavaScript spread operator (...) with previous data and push new data
                                                     // https://www.w3schools.com/howto/howto_js_spread_operator.asp

      alert("Book Added....");
      
    } catch (err) {
      console.log(err);
    }
  };
// *****************************************************************************************************************

// ************************************* Update Title************************************************************
const updateTitle = async (pk, release_year) => {
  const bookData = {
    title: newTitle,
    release_year:release_year,
  };
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    const data = await response.json();
    console.log(data);
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id === pk) {
          return data;
        } else {
          return book;
        }
      })
    );

    // setBooks(b => b.map(book => (book.id === id ? data : book)   with turnary operators


  } catch (err) {
    console.log(err);
  }
};
// ************************************************************************************************

// ************************ Delete ******************************************************************

const deleteBook = async (pk) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
      method: "DELETE",
    });

    setBooks((prev) => prev.filter((book) => book.id !== pk));   //https://www.w3schools.com/jsref/jsref_filter.asp 
  } catch (err) {
    console.log(err);
  }
};

// *********************************************************************************************************




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
          <p>ID: {x.id}</p>
          <p>Title: {x.title}</p>
          <p>Release Year: {x.release_year} </p>
          
          <input
            type="text"
            placeholder="New title..."
            onChange={(e)=>setNewTitle(e.target.value)}
          />
          <button onClick={() => updateTitle(x.id, x.release_year)}>Change Title</button>
          <br /><br /><div><button onClick={() => deleteBook(x.id)}> Delete Book</button></div>

          <p>************************************</p>


        </div>
      ))}
      </>
  );
}

export default App






//https://www.youtube.com/watch?v=xldTxXtNiuk