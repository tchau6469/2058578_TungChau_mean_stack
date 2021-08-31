let http = require("http");
let url = require("url");
let fs = require("fs");

let cleanTable = `
    <table border = '1'>
    <tr>
        <th>Employee Id</th>
        <th>Task Id</th>
        <th>Task</th>
        <th>Deadline</th>
    </tr>
    
`;

let plannerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div {
            margin-top: 50px;
        }
    </style>
</head>
<body>
    <h1><u>Task Planner</u></h1>
    <div>
        <label><u>Add Task</u></label>
        <form action = "addTask" method = "get">
            Emp Id: <input type = "text" name = "empId" required> <br>
            Task Id: <input type = "text" name = "taskId" required> <br>
            Task: <input type = "text" name = "task" required> <br>
            Deadline: <input type = "date" name = "deadline" required> <br>
            <input type = "submit" value = "Add Task"> <input type = "reset" value = "Reset">
        </form>
    </div>

    <div>
        <form action = "deleteTask" method = "get" >
            <label><u>Delete Task</u></label> <br>
            Task Id: <input type = "text" name = "deleteTaskId" required> <input type = "submit" value = "Delete Task"> <br>
        </form>
    </div>

    <div>
        <form action = "showTasks">
            <label><u>List Task</u></label> <br>
            <input type = "submit" value = "List all tasks">
        </form>
    </div>
    
        
    <div id = "here">
        
    </div>

</body>
</html>
`;

//IIFE TO CREATE JSON FILE IF IT DOESNT EXIST, OTHERWISE IT USES THE CURRENT FILE
(() => {
    if (!fs.existsSync("tasks.json")) {
        console.log("tasks.json does not exist, creating it now!!");
        fs.writeFileSync("tasks.json", JSON.stringify([]));
    }
    else console.log("tasks.json already exists, we will be modifying that file");
})();

let server = http.createServer((request, response) => {
    let urlInfo = url.parse(request.url, true);



    switch (urlInfo.pathname) {
        case "/":
            response.write(plannerHTML);
            break;
        case "/addTask": {
            let login = urlInfo.query;
            let objArray = JSON.parse(fs.readFileSync("tasks.json"));


            let taskId = objArray.findIndex(i => i.taskId == login.taskId);

            response.writeHead(200, { "content-type": "text/html" });
            if (taskId == -1) {
                objArray.push({ "empId": login.empId, "taskId": login.taskId, "task": login.task, "deadline": login.deadline });
                console.log(objArray);
                fs.writeFileSync("tasks.json", JSON.stringify(objArray));
                response.write(`Task with taskId ${login.taskId} has successfully been added!`);
            }
            else response.write(`Task with taskId ${login.taskId} already exists, please user another taskId number`);

            response.write(plannerHTML);

            break;
        }
        case "/deleteTask": {
            let id = urlInfo.query.deleteTaskId;

            console.log("ID to delete: " + id);
            let objArray = JSON.parse(fs.readFileSync("tasks.json"));
            let index = objArray.findIndex(i => i.taskId === id);
            response.writeHead(200, { "content-type": "text/html" });

            if (index != -1) {
                objArray.splice(index, 1);
                fs.writeFileSync("tasks.json", JSON.stringify(objArray));
                response.write(`Task with taskId ${id} has been deleted!`);
            }
            else response.write(`Task with taskId ${id} does not exist, please enter a valid task id to delete`);

            response.write(plannerHTML);
            break;
        }

        case "/showTasks": {
            let objArray = JSON.parse(fs.readFileSync("tasks.json"));

            let string = "";

            objArray.forEach(element => {
                string += `<tr>
                           <td>${element.empId}</td>
                           <td>${element.taskId}</td>
                           <td>${element.task}</td>
                           <td>${element.deadline}</td>
                           </tr>
                          `
            });


            let index = plannerHTML.lastIndexOf(`"here"`);
            
            //getting the plannerHTML string up to the table div id
            let firstPart = plannerHTML.slice(0, index + 7);

            //getting the plannerHTML string after the table id to get remainder of string
            let lastPart = plannerHTML.slice(index + 7, -1);

            //combines all the strings, including the new table rows
            complete = firstPart + cleanTable + string + "</table>" + lastPart;

            response.write(complete);
            break;
        }

        default:
            response.write(plannerHTML);

    }



    response.end();
});

server.listen(9090, () => console.log("server running on port 9090"));