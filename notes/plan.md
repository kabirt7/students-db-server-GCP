# 03 MVC

## Code along

Create a `controllers/students.js`.

Start to move logic from `routes/students.js` into `controllers/students.js`.

```js
// controllers/students.js
import { readFileSync, writeFileSync } from "fs";

let students = JSON.parse(readFileSync("./data/students.json"));

export const getStudents = (req, res) => {
  const { name, house } = req.query;
  let results = students;
  if (name) {
    const lowerName = name.toLowerCase();
    results = results.filter(student => {
      return student.first_name.toLowerCase().includes(lowerName);
    });
  }

  if (house) {
    const lowerHouse = house.toLowerCase();
    results = results.filter(student => {
      return student.house.toLowerCase() === lowerHouse;
    });
  }

  res.send({
    data: results,
  });
};

export const addStudent = (req, res) => {
  const studentExists = students.find(
    student => student.first_name === req.body.first_name && student.last_name === req.body.last_name
  );

  if (studentExists) {
    return res.status(403).send("Student already exists");
  }

  students.push(req.body);
  writeFileSync("./data/students.json", JSON.stringify(students, null, 2));
  res.status(201).send({
    message: `Student added, ${JSON.stringify(req.body)}`,
  });
};
```

Update `routes/students.js` to use the functions.

```js
// routes/students.js
import Router from "express";

import { getStudents, addStudent } from "../controllers/students.js";

const router = Router();

router.get("/", getStudents);

router.post("/", addStudent);

// OTHER ROUTES COMMENTED OUT
```

### Challenge #1

```js
// MOVE THE REMAINING LOGIC THAT IS IN THE GET AND DELETE ROUTER METHODS
// - CREATE TWO FUNCTIONS IN `controllers/students.js`
// - HOOK THEM UP
```

Solution below

```js
// controllers/students.js
export const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(student => student.id === id);

  if (student) {
    res.send({ data: student });
  } else {
    res.status(404).send("Student not found!");
  }
};

export const deleteStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const hasId = students.some(student => student.id === id);

  if (hasId) {
    const filteredStudents = students.filter(student => student.id !== id);
    students = filteredStudents;
    writeFileSync("./data/students.json", JSON.stringify(filteredStudents, null, 2));
    res.send({ data: filteredStudents });
  } else {
    res.status(404).send("Student not found!");
  }
};
```

```js
// routes/students.js

router.get("/:id", getStudentById);

router.delete("/:id", deleteStudentById);
```

### Challenge #2

```js
// TIME TO ADD SOME UPDATE FUNCTIONALITY INTO THIS API
// - ADD A PUT METHOD TO THE ROUTER IN routes/students.js
//  - THE PUT ENDPOINT WILL BE -> students/:id
// - CREATE A updateStudentById FUNCTION IN controllers/students.js
//  - THIS WILL USE THE PATH ID FROM THE ENDPOINT & ALSO THE BODY FROM THE REQUEST
//  - IT WILL USE THESE BITS OF DATA TO UPDATE A STUDENT WITH THE MATCHING ID
//  - IF THE STUDENT EXISTS IT WILL UPDATE THE STUDENT OBJECT & WRITE IT TO THE FILE
//  - IT WILL THEN RETURN THE UPDATED STUDENT
//  - IF THE STUDENT DOESN'T EXIST IT WILL RETURN A 404 STATUS CODE WITH MESSAGE
```

Solution below

```js
// controllers/students.js

export const updateStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(student => student.id === id);

  if (student) {
    student.first_name = req.body.first_name;
    student.last_name = req.body.last_name;
    student.house = req.body.house;

    writeFileSync("./data/students.json", JSON.stringify(students, null, 2));

    res.send({ data: student });
  } else {
    res.status(404).send("Student not found!");
  }
};
```

```js
// routes/students.js
router.put("/:id", updateStudentById);
```
