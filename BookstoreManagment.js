// Online Book Store Management Using MongoDB

db = db.getSiblingDB("BookStoreDB");

// Insert book records
db.books.insertMany([
    {
        bookId: 101,
        title: "Core Java",
        author: "Cay Horstmann",
        price: 650,
        stock: 20
    },
    {
        bookId: 102,
        title: "Clean Code",
        author: "Robert Martin",
        price: 850,
        stock: 15
    },
    {
        bookId: 103,
        title: "Effective Java",
        author: "Joshua Bloch",
        price: 750,
        stock: 10
    }
]);

// Display all books
print("Available Books:");
printjson(db.books.find().toArray());

// Find affordable books
print("Books Under Rs. 800:");
printjson(
    db.books.find({ price: { $lt: 800 } }).toArray()
);

// Update book stock after purchase
db.books.updateOne(
    { bookId: 101, stock: { $gte: 2 } },
    { $inc: { stock: -2 } }
);

// Sort books by price
print("Books Sorted by Price:");
printjson(
    db.books.find().sort({ price: 1 }).toArray()
);

// Calculate total inventory value
print("Total Inventory Value:");

printjson(
    db.books.aggregate([
        {
            $group: {
                _id: null,
                totalValue: {
                    $sum: {
                        $multiply: ["$price", "$stock"]
                    }
                }
            }
        }
    ]).toArray()
);

// Delete a book
db.books.deleteOne({ bookId: 103 });

// Display remaining books
print("Updated Book Records:");
printjson(db.books.find().toArray());

print("Book Store Operations Completed!");