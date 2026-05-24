const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log("Request Method:", req.method);
    next();
});

let students = [
    {
        id: 1,
        name: "Jithesh",
        age: 20,
        course: "Computer Science"
    },
    {
        id: 2,
        name: "Rahul",
        age: 21,
        course: "Information Technology"
    }
];

app.get("/students", (req, res) => {
    res.json(students);
});

app.post("/students", (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age,
        course: req.body.course
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student Added Successfully",
        student: newStudent
    });
});

app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(
        s => s.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name || student.name;
    student.age = req.body.age || student.age;
    student.course = req.body.course || student.course;

    res.json({
        message: "Student Updated Successfully",
        student
    });
});

app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(
        s => s.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.json({
        message: "Student Deleted Successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
