//requires express
const express = require("express");

//create an express server from funct above
const server = express(); //this server is deaf af, cant hear anything

//tell our server how to process different payloads (this is middleware-> exists between req and res)
server.use(express.json());
// global object called process
//console.log(process.env.PORT)

//allow CORS on requests, can be route specific
const cors = require("cors");
server.use(cors());

//make it listen (give it ears)
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("server listening");
});

// CRUD
// create => POST
//READ => GET
//UPDATE => PUT
// DELETE => DELETE

const destinations = []; //database , rule of thumb use /databaseName as path

const students = {
  dao: {
    name: "dao",
    interests: ["tacos"],
    city: "Sac town",
  },
  nikko: {
    name: "nikko",
    interests: ["bananas", "camaro", "frontier", "wrangler"],
    city: "detroit",
  },
  will: {
    name: "will",
    interests: ["bananas"],
    city: "detroit",
  },
};
//GET/students
// ?name=STUDENT_NAME
//localhost:3000/students?name=will
server.get("/students/", (req, res) => {
  const { name, interests, city } = req.query;

  if (name) {
    const student = students[name.toLowerCase()];
    if (student) {
      return res.send(student);
    }
    return res
      .status(404)
      .send({ error: `student by the name of ${name} not found` });
  }

  let filteredStudents = Object.values(students);
  if (interests) {
    filteredStudents = filteredStudents.filter((student) => {
      return student.interests.includes(interests.toLowerCase());
    });
  }
  if (city) {
    filteredStudents = filteredStudents.filter(
      (student) => student.city.toLowerCase() === city.toLowerCase()
    );
  }
  return res.send(filteredStudents);
});

//GET/ students/city/:mycity
//using NAMED ROUTE PARAMETERS
//localhost:3000/students/city/detroit
server.get("/students/city/:city", (req, res) => {
  const { city } = req.params;

  if (city) {
    const filteredStudents = Object.values(students).filter(
      (student) => student.city.toLowerCase() === city.toLowerCase()
    );

    return res.send(filteredStudents);
  }
});

server.get("/students/name/:names", (req, res) => {
  const { names } = req.params;
  if (names) {
    const filteredStudents = Object.values(students).filter(
      (student) => student.name.toLowerCase() === names.toLowerCase()
    );
    return res.send(filteredStudents);
  }
});

server.get("/students/interests/:interest", (req, res) => {
  const { interest } = req.params;
  console.log(interest);
  if (interest) {
    const filteredStudents = Object.values(students).filter((student) =>
      student.interests.includes(interest.toLowerCase())
    );
    return res.send(filteredStudents);
  }
});
//CREATE => POST
// post /destinations
//what is a destination what makes a destination record
/*
- destination name REQUIRED
- location REQUIRED
- photo
- description
*/
// this function acts as req (req, res) handler
server.post("/destinations", (req, res) => {
  // only grab what i need
  const { destination, location, photo, description } = req.body;

  // validate what i got to ensure required fields are present
  if (
    !destination ||
    !location ||
    destination.length === 0 ||
    location.length === 0
  ) {
    return;
    res
      .status(400)
      .send({ error: "Destination AND Location are BOTH required" });
  }

  // create a new object to put into the database
  const newDest = {
    destination,
    location,
    photo: photo && photo.length !== 0 ? photo : "sdlkjfsdllk",
    description: description && description.length !== 0 ? description : "", //condition ? dothiswhentrue: dothiswhenfalse;
  };

  destinations.push(newDest); // -> validates path

  res.redirect(303, "/destinations"); //-> tells to push
});

//get /justin ->this is a route format is method(path)
server.get("/destinations", (req, res) => {
  res.send(destinations);
});
