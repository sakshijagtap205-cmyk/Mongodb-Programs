use StudentDB

db.createCollection("Students")

db.Students.insertOne({
    roll_no: 101,
    name: "Sakshi",
    age: 22,
    department: "Computer Science",
    marks: 85
})

db.Students.find()
