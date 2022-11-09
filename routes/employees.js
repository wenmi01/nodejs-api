var express = require("express");
var router = express.Router();

let employees = [
    {id: 1, name: "Oliver Queen", title: "CEO", gender: "male", age: 38, languages: ["english", "spanish"]}, 
    {id: 2, name: "Ben Hur", title: "Security consultant", gender: "male", age: 25, languages: ["latin", "italian"]}, 
    {id: 3, name: "Jessica Alba", title: "Admin Assistant", gender: "female", age: 23, languages: ["english", "spanish"]}, 
    {id: 4, name: "Pepper Piper", title: "Quality Assurance", gender: "female", age: 32, languages: ["english", "spanish"]},
    {id: 5, name: "Red Sullivan", title: "Project Manager", gender: "male", age: 27, languages: ["russian", "english"]},
    {id: 6, name:"Juan Dela Cruz", title: "Manager", age: 23, gender: "male", languages: ["russian", "french"]},
    {id: 7, name:"Anna Salvador", title: "Junior Dev", age: 21, gender: "female", languages: ["english", "french"]},
    {id: 8, name:"Mark Bautista", title: "Senior Fullstack Dev", age: 28, gender: "male", languages: ["russion", "spanish"]},
    {id: 9, name:"Micheal Garcia", title: "CEO", age: 40, gender: "male", languages: ["english", "latin"]}
];

router.get("/", (req, res) => {
    res.send(employees);
});

router.get("/count/all", (req, res) => {
  res.status(200).send({total:employees.length});
});

router.get("/:id", (req, res,next) => {
  const { id } = req.params;
  let employee = employees.find((item) => {
      return item.id === Number(id);
  });
  res.status(200).send(employee ? employee : "Record not found!");
});

router.get("/name/:keyword", (req, res) => {
    const { keyword } = req.params;
    const result = employees.filter(item=>item.name.toLowerCase().includes(keyword));
    res.status(200).send( result.length > 0 ? result : keyword + " not found!");
});

router.get("/age/:age", (req, res) => {
    const { age } = req.params;
    const result = employees.filter(item=>item.age === Number(age));
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(200).send("Age "+ age + " not found!");
    }
  });

  router.get("/gender/:gender", (req, res) => {
    const { gender } = req.params;
    const result = employees.filter(item=>item.gender === gender);
  
    res.status(200).send( result.length > 0 ? result : gender + " not found!");
  });

  router.post("/employee", (req, res) =>{
    let data = {
      id: req.body.id,
      name: req.body.name,
      title: req.body.title,
      age: req.body.age,
      gender: req.body.gender,
      languages: req.body.languages,
    };
    employees.push(data);
    res.status(200).send( data );
  });

  router.put("/:id", (req, res)=>{
    const { id } = req.params;

    let employee = employees.find((item) => {
        return item.id === Number(id);
    });

    employee.name = req.body.name;
    employee.title = req.body.title;
    employee.age = req.body.age;
    employee.gender = req.body.gender;
    employee.languages = req.body.languages;

    res.status(200).send( employee );

  });

  // add employee
  router.post("/:id", (req, res)=>{
    const { id } = req.params;

    console.log(req.body);

    let lastItem =employees[employees.length - 1];
    console.log(req.body);
    let employee = {};
    
    // employee.id = employees[employees.length - 1].id + 1;
    employee.id = lastItem.id + 1;
    employee.name = req.body.name;
    employee.title = req.body.title;
    employee.age = req.body.age;
    employee.gender = req.body.gender;
    employee.languages = req.body.languages;

    // simulate adding data to object collection
    employees.push(employee);

    res.status(200).send( employee );

  });

  router.delete("/:id",(req, res)=>{
    const { id } = req.params;
    employees = employees.filter(item=>item.id != Number(id));

    res.status(200).send("Record " + id + " has been deleted.");

  });
  

module.exports = router;

