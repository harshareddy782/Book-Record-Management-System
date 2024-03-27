const express = require("express");
const {users} = require("./data/users.json")

const userRouter = require("./routes/users")
const booksRouter = require("./routes/books")

const app = express();

const PORT = 8082;

app.use(express.json());

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Server is up and running"
    })
})


app.use("/users", userRouter);
app.use("/books",booksRouter)

app.get("*", (req, res)=>{
    res.status(200).json({
        message: "This route does not exist"
    })
})


app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`);
})