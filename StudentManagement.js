// Student Management System Using MongoDB

// Select or create database
db = db.getSiblingDB("StudentDB");

// Create collection if it does not exist
if (!db.getCollectionNames().includes("students")) {
    db.createCollection("students");
}

// CREATE - Insert student records
db.students.insertMany([
    {
        rollNo: 101,
        name: "Amit",
        department: "Computer Science",
        marks: 85
    },
    {
        rollNo: 102,
        name: "Priya",
        department: "Information Technology",
        marks: 92
    },
    {
        rollNo: 103,
        name: "Rahul",
        department: "Computer Science",
        marks: 78
    }
]);

// READ - Display all students
print("All Student Records:");
printjson(db.students.find().toArray());

// READ - Find students with marks above 80
print("Students with marks above 80:");
printjson(
    db.students.find({ marks: { $gt: 80 } }).toArray()
);

// UPDATE - Update student marks
db.students.updateOne(
    { rollNo: 101 },
    { $set: { marks: 95 } }
);

// DELETE - Delete student record
db.students.deleteOne({ rollNo: 103 });

// SORT - Display students by marks
print("Students sorted by marks:");
printjson(
    db.students.find().sort({ marks: -1 }).toArray()
);

// COUNT - Total students
print("Total Students: " + db.students.countDocuments());

print("Operations completed successfully!");