const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get All Books
 * Access: Public
 * Paramaters: None
 */
router.get("/", (req, res)=>{
    res.status(200).json({success: true, data: books})
})


/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by id
 * Access: Public
 * Paramaters: Id
 */
router.get("/:id",(req, res)=>{
    const {id} = req.params;

    const book = books.find((each)=> each.id === id);

    if(!book)
        return res.status(404).json({
    success: false,
    message: "Book Not Found For The given Id :-( "        
})

    return res.status(200).json({
        success: true,
        data: book
    })

})


/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Paramaters: None
 */
router.get("/issued/by-user", (req, res)=>{
    const usersWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook) return each
    })
    const issuedBooks = [];
    
     usersWithIssuedBooks.forEach((each)=>{
        const book = books.find((book) => book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
     });
     if(issuedBooks.length === 0)
        return res.status(404).json({
    success: false,
    message: "No Books has been issued yet"
});

    return res.status(200).json({
        success: true,
        data: issuedBooks
    })

});
/**
 * Route: /books
 * Method: POST
 * Description: Create a new Book
 * Access: Public
 * Paramaters: None
 * Data: author, name, genre, price, publisher, id
 */
router.post('/',(req, res)=>{
    const {data} = req.body;

    if(!data)
    return res.status(404).json({
success: false,
message: "No data provided"
})

    const book = books.find((each) => each.id === data.id)
    if(book)
        return res.status(404).json({
    success: false,
    message: "User with the given id already exists :-( "
        })

const allBooks = [...books, data];

return res.status(201).json({
    success: true,
    data: allBooks
})
})
/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book by their id
 * Access: Public
 * Paramaters: Id
 * Data: author, name, genre, price, publisher, id
 */
router.put("/:id", (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each)=>each.id ===id)
    if(!book)
        return res.status(404).json({
            success: false,
            message: "Book with the given id doesn't exist :-("
        })

        const updateData = books.map((each)=>{
            if(each.id === id){
                return {...each, ...data}
            }
            return each
        });
        return res.status(200).json({
            success: true,
            data: updateData
        })
})


module.exports = router;