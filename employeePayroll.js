// Employee Payroll Management System Using MongoDB

db = db.getSiblingDB("PayrollDB");

// Insert or update employee records
const employees = [
    {
        empId: 101,
        name: "Amit",
        department: "IT",
        salary: 45000
    },
    {
        empId: 102,
        name: "Priya",
        department: "HR",
        salary: 35000
    },
    {
        empId: 103,
        name: "Rahul",
        department: "Finance",
        salary: 55000
    },
    {
        empId: 104,
        name: "Neha",
        department: "IT",
        salary: 60000
    }
];

employees.forEach(emp => {
    db.employees.updateOne(
        { empId: emp.empId },
        { $set: emp },
        { upsert: true }
    );
});

// Display all employees
print("Employee Records:");
printjson(db.employees.find().toArray());

// Find employees earning above 40000
print("High Salary Employees:");
printjson(
    db.employees.find({
        salary: { $gt: 40000 }
    }).toArray()
);

// Update employee salary
db.employees.updateOne(
    { empId: 101 },
    { $set: { salary: 50000 } }
);

// Calculate department-wise average salary
print("Average Salary by Department:");

printjson(
    db.employees.aggregate([
        {
            $group: {
                _id: "$department",
                averageSalary: { $avg: "$salary" }
            }
        }
    ]).toArray()
);

// Calculate total payroll
print("Total Payroll:");

printjson(
    db.employees.aggregate([
        {
            $group: {
                _id: null,
                totalSalary: { $sum: "$salary" }
            }
        }
    ]).toArray()
);

// Delete employee
db.employees.deleteOne({ empId: 104 });

print("Payroll Operations Completed!");