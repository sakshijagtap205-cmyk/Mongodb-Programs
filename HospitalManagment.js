// Hospital Management System Using MongoDB

db = db.getSiblingDB("HospitalDB");

// Sample patient records
const patients = [
    {
        patientId: 101,
        name: "Amit Sharma",
        age: 35,
        disease: "Fever",
        doctor: "Dr. Mehta",
        status: "Admitted",
        bill: 5000
    },
    {
        patientId: 102,
        name: "Priya Patil",
        age: 28,
        disease: "Migraine",
        doctor: "Dr. Shah",
        status: "Discharged",
        bill: 3000
    },
    {
        patientId: 103,
        name: "Rahul Joshi",
        age: 45,
        disease: "Diabetes",
        doctor: "Dr. Mehta",
        status: "Admitted",
        bill: 12000
    }
];

// Insert or update patients
patients.forEach(patient => {
    db.patients.updateOne(
        { patientId: patient.patientId },
        { $set: patient },
        { upsert: true }
    );
});

// Display all patients
print("All Patient Records:");
printjson(db.patients.find().toArray());

// Find admitted patients
print("Admitted Patients:");
printjson(
    db.patients.find({
        status: "Admitted"
    }).toArray()
);

// Update patient status
db.patients.updateOne(
    { patientId: 101 },
    { $set: { status: "Discharged" } }
);

// Calculate total hospital bills
print("Total Hospital Bills:");
printjson(
    db.patients.aggregate([
        {
            $group: {
                _id: null,
                totalBill: { $sum: "$bill" }
            }
        }
    ]).toArray()
);

// Count patients assigned to each doctor
print("Doctor-wise Patient Count:");
printjson(
    db.patients.aggregate([
        {
            $group: {
                _id: "$doctor",
                totalPatients: { $sum: 1 }
            }
        }
    ]).toArray()
);

// Delete patient record
db.patients.deleteOne({ patientId: 102 });

// Display updated records
print("Updated Patient Records:");
printjson(db.patients.find().toArray());

print("Hospital Management Operations Completed!");