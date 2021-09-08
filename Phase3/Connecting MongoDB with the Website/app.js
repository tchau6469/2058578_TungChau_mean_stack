let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

let app = express();
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
let url = "mongodb://localhost:27017/tcsmean";

mongoose.connect(url).then(result=>console.log("connected")).catch(err=>console.log(err));

let courseModel = require("./course.model.js");

app.get("/getCourses", (request, response)=>{
    courseModel.find({}, (err, result)=>{
        if (!err) response.json(result)
        else response.json(err);
    })
})


app.post("/addCourse", (request, response)=>{
    let course = request.body;
    console.log(course);
    courseModel.insertMany(course, (err, result)=> {
        if (!err) {
            console.log(`course ${course._id} has been added successfully`)
        }
        else {
            console.log(`did not add course ${course._id}`)
            
        }
        response.sendFile(__dirname + "/add.html");
    })
})

app.put("/updateCourse/:id/:amount", (request, response)=> {
    let id = request.params.id;
    let newAmount = request.params.amount;
    courseModel.updateOne({_id: id}, {$set:{amount: newAmount}}, (err, result)=> {
        
        if (result.modifiedCount > 0) {
            console.log(`updated course ${id} successfully`);
        }
        else {
            console.log(`could not update course ${id}`);
        }
    })
})

app.delete("/deleteCourse/:id", (request, response)=> {
    let id = request.params.id;
    courseModel.deleteOne({_id: id}, (err, result)=> {
        if (result.deletedCount > 0)  {
            console.log(`deleted course ${id} successfully`);
        }
        else {
            console.log(`did not delete course ${id}`);
        }

    })
})

app.get("/",(request,response)=> {
    response.sendFile(__dirname + "/index.html");
})

app.get("/Add", (request, response)=> {
    response.sendFile(__dirname + "/add.html");
})

app.get("/Delete", (request, response) => {
    response.sendFile(__dirname + "/delete.html");
})

app.get("/Update", (request, response)=> {
    response.sendFile(__dirname + "/update.html");
})

app.get("/Fetch", (request, response)=> {
    response.sendFile(__dirname + "/fetch.html");
})


app.listen(9090,()=>console.log("Server running on port number 9090"))