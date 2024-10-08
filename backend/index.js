import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nayem",
    database: "test"
});

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.json("hello, this is the backend")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err)
            return res.json("An error came!");
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json("2nd error came!")
        return res.json("Book has been created successfully");
    })
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        return res.json("Book has been deleted successfully.");
    })
});

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price
    ]

    db.query(q, [...values,bookId], (err, data) => {
        return res.json("Book has been updated successfully.");
    })
});



app.listen(3000, () => {
    console.log("Hello World. Connected to backend.")
})