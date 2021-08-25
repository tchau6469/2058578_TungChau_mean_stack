
//global variables for modules
var readline = require("readline-sync");
var fs = require("fs");

//function that adds an entry to the json
function addRecord() {

    //checks if employees.json file exists. If it does not, then it creates it.
    if (!fs.existsSync("employees.json")) {
        console.log("employees.json doesnt exist, creating it now!");
        init(); 
    }

    //getting all of the inputs. i added random debugger statements for the project requirement
    let fname = readline.question("Enter your first name: ");
    debugger;
    let lname = readline.question("Enter your last name: ");
    debugger;
    let gender = readline.question("Enter your gender: ");
    debugger;
    let email = readline.questionEMail("Enter your email address: ");
    debugger;
    let dateAndTime = new Date().toString();

    //getting the json file and parsing it
    let data = fs.readFileSync("employees.json")
    let obj = JSON.parse(data);

    //creating new employee entry and pushing it into the array
    let emp = { "fname": fname, "lname": lname, "gender": gender, "email": email, "dateAndTime": dateAndTime };
    obj.push(emp);

    //writes the updated json file
    fs.writeFileSync("employees.json", JSON.stringify(obj));


    //extra lines of code to let user input more entries
    let addMore = readline.question("add another log entry? y/n: ");

    while (addMore != "y" && addMore != "n") {
        addMore = readline.question("add another entry? please type only y/n: ");
    }


    if (addMore == "y") addRecord();


}

//displays all of the log entries
function display() {
    let jsonObj = fs.readFileSync("employees.json");
    let data = JSON.parse(jsonObj);
    let counter = 1;
    console.log("DISPLAYING DATA:");

    for (let index of data) {
        console.log(`Entry ${counter}: First Name: ${index.fname}, Last Name: ${index.lname}, Gender: ${index.gender}, Email: ${index.email}, Date & Time: ${index.dateAndTime}`);
        counter++;
    }
}

//function that creates an employees.json file since it doesnt exist
function init() {
    fs.writeFileSync("employees.json", JSON.stringify([]));
}

//main function gets called instantly (IIFE)
(function main() {
    
    let answer = 0;
    while (answer != "3") {
        answer = readline.question("Press 1 to add log entries, Press 2 to display log entries, Press 3 to exit: ");

        switch (answer) {
            case "1":
                addRecord();
                break;
            case "2":
                display();
                break;
            case "3":
                console.log("☆º°˚*☆ Have a ηice day!! ☆º°˚*☆");
                break;
            default:
                answer = "3";
                console.log("UNKNOWN COMMAND, EXITING");
        }
    }
})();







