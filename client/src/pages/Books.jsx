import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/books");
        setBooks(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3000/books/" + id);
      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <main>
      <div id="book">
        {books.map((book) => (
          <div className="bookItem" key={book.id}>
            {/* {book.cover && <img src={book.cover} />} */}
            <h3>Title: {book.title}</h3>
            <p>Description: {book.desc}</p>
            <p>Price : {book.price}</p>
            <div className="addDelete">
              <button className="delete" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
              <button className="update">
                <Link to={`/update/${book.id}`}>Update</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="addBookContainer">
        <button className="addNewBook">
          <Link to="/add">Add New Book</Link>
        </button>
      </div>
    </main>
  );
};

export default Books;
