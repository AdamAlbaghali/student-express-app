const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // use port 3000 if no port is specified

const bodyParser = require("body-parser");

const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const studentList = [
  {
    firstName: "Aryan",
    lastName: "Jabbari",
    sId: "234",
    school: "Queens College",
    major: "Computer Science",
  },
  {
    firstName: "Lidia",
    lastName: "De La Cruz",
    sId: "333",
    school: "Harvard",
    major: "Philanthrophy",
  },
  {
    firstName: "Brian",
    lastName: "De Los Santos",
    sId: "468",
    school: "John Jay",
    major: "Computer Science",
  },
  {
    firstName: "Adam",
    lastName: "Albaghali",
    sId: "589",
    school: "Brooklyn College",
    major: "Computer Science",
  },
  {
    firstName: "Nathan",
    lastName: "Vazquez",
    sId: "559",
    school: "Hunter College",
    major: "Computer Science",
  },
  {
    firstName: "Ynalois",
    lastName: "Pangilinan",
    sId: "560",
    school: "Hunter College",
    major: "Computer Science",
  },
  {
    firstName: "Shohruz",
    lastName: "Ernazarov",
    sId: "561",
    school: "Hunter College",
    major: "Computer Science",
  },
  {
    firstName: "Kevin",
    lastName: "Orta",
    sId: "562",
    school: "John Jay",
    major: "Computer Science",
  },
];

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/students", async (req, res) => {
  if (req.query) {
    properties = Object.keys(req.query);
    let filteredStudents = await prisma.student.findMany();
    for (const property of properties) {
      filteredStudents = filteredStudents.filter(
        (student) => student[property] === req.query[property]
      );
    }
    res.json(filteredStudents);
  } else {
    res.json(studentList);
  }
});

app.get("/students/:id", (req, res) => {
  const id = req.params.id;

  const student = studentList.find((s) => s.sId === id);

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

app.post("/students", async (req, res) => {
  studentList.push(req.body);
  console.log(studentList);
  const students = await prisma.student.create({ data: req.body });
  res.json(students);
  res.json({ message: "Post successful" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
