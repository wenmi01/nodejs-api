var express = require("express");
var router = express.Router();

// let data = [

let todos = [
    { id: 1, title: 'Create a project',  order: 1, completed: true, author: 'Diego Laura' },
    { id: 2, title: 'Take a cofféé',     order: 2, completed: true, author: 'Laong-Laan' },
    { id: 3, title: 'Write new article', order: 3, completed: true, author: 'Agap-ito Bagumbayan' },
    { id: 4, title: 'Walk toward home', order: 4, completed: false, author: 'Taga-Ilog' },
    { id: 5, title: 'Have some dinner', order: 5, completed: false, author: 'Dimas-Ilaw' },
];

// GET ALL
router.get("/", (req, res) => {
    res.send(todos);
});

// Count ALL
router.get("/count/all", (req, res) => {
    res.status(200).send({total:todos.length});
});

// 
router.get("/:id", (req, res) => {
    const { id } = req.params;
    let todo = todos.find((item) => {
        return item.id === Number(id);
    });
    res.status(200).send(todo ? todo : "Record not found!");
});

router.get("/title/:keyword", (req, res) => {
    const { keyword } = req.params;
    const result = todos.filter(item=>item.title.toLowerCase().includes(keyword));
    res.status(200).send( result.length > 0 ? result : keyword + " not found!");
});

router.post("/todo", (req, res) =>{
    let data = {
      id: req.body.id,
      title: req.body.title,
      order: req.body.order,
      completed: req.body.completed,
      author: req.body.author,
    };
    todos.push(data);
    res.status(200).send( data );
  });

  router.put("/:id", (req, res)=>{
    const { id } = req.params;

    let todo = todos.find((item) => {
        return item.id === Number(id);
    });

    // todo.name = req.body.name;
    // todo.title = req.body.title;
    // todo.order = req.body.order;
    // todo.completed = req.body.completed;
    // todo.author = req.body.author;

    if(todo !== undefined){
        todo.title = req.body.title ? req.body.title : todo.title;
        todo.order = req.body.order ? req.body.order : todo.order;
        todo.completed = req.body.completed ? req.body.completed : todo.completed;
        todo.author = req.body.author ? req.body.author : todo.author;

        res.status(200).send( todo );
    } else {
        res.status(404).send("Record not found");
    }

    // res.status(200).send( todo );
    // todo !== undefined ? res.status(200).send( todo ) : res.status(400).send("Record not found");

  });

  router.delete("/:id",(req, res)=>{
    const { id } = req.params;
    let todos_len = todos.length;
    todos = todos.filter(item=>item.id != Number(id));

    // data.map
    // data.splice(data.indexOf(item), 1);

    todos_len != todos.length ? res.status(200).send("Record " + id + " has been deleted.") : res.status(400).send("Record not found");

  });

module.exports = router;