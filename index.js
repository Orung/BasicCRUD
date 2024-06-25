const express = require("express");
const uuid = require("uuid");
const app = express();

app.use(express.json());

let tasks = [];

app.get("/tasks", function (req, res) {
  res.send(tasks);
});

app.post("/task", function (req, res) {
  const taskDetails = req.body;
  const id = uuid.v4();
  if (!taskDetails.title || !taskDetails.startTime || !taskDetails.endTime) {
    return res.status(400).send("Invalid task data");
  }
  tasks.push({
    id,
    title: taskDetails.title,
    description: taskDetails.description,
    status: taskDetails.status,
    startTime: taskDetails.startTime,
    endTime: taskDetails.endTime,
  });
  res.send("Task added successfully");
});


app.get("/tasks/:id", function (req, res) {
    const taskId = req.params.id;
    const taskDetails =  tasks.find(task => task.id === taskId)
    console.log(taskDetails);
    res.send(taskDetails);
})

app.delete("/tasks/:id", function (req, res) {
    const taskId = req.params.id;
    const taskDetails =  tasks.find(task => task.id === taskId)
    if(!taskDetails){
        return  res.status(404).send('Task not found')
    }
    tasks =  tasks.filter(task => task.id != taskId)  
    res.send('delete task successfully');
})


app.put("/tasks/:id", function (req, res) {
    const taskUpdate = req.body;
    const taskId = req.params.id
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id == taskId){
            tasks[i].title = taskUpdate.title
            tasks[i].description = taskUpdate.description 
        }
    }
    res.send('update task successfully')
})

app.patch("/tasks/:id", function (req, res) {
    const taskUpdate = req.body;
    const taskId = req.params.id
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id == taskId){
            tasks[i].status = taskUpdate.status
         }
    }
    res.send('update task successfully')
}) 

app.listen(3000, function () {
  console.log("Server is runing");
});
