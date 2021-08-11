
let addClient = () => {
    if (document.getElementById("clientName").value =="" || document.getElementById("projectName").value == "" || 
    document.getElementById("budget").value == "") return;


    if (window.sessionStorage.length == 0 ) sessionStorage.setItem("mainArray", JSON.stringify([]) );
    
    let entry = {clientName : document.getElementById("clientName").value,
                 projectName: document.getElementById("projectName").value,
                 budget: document.getElementById("budget").value
                }

    let mainArrayJson = sessionStorage.getItem("mainArray");
    let mainArrayObj = JSON.parse(mainArrayJson);
    mainArrayObj.push(entry);

    sessionStorage.setItem("mainArray", JSON.stringify(mainArrayObj));

    console.log(mainArrayObj);
    console.log(mainArrayObj.length);

}

let displayData = () => {
    console.log("DISPLAYING DATA");
    let mainArrayJson = sessionStorage.getItem("mainArray");
    let mainArrayObj = JSON.parse(mainArrayJson);
    
    
    let startTable = "<table border = 1 align = 'center' ><tr><th>Client Name</id><th>Project Name</th><th>Budget</th></tr>"

    let tableContent = "";

    let budget = 0;
    for (let i of mainArrayObj) {
        budget += parseInt(i.budget);
        
        tableContent += "<tr><td>" + i.clientName + "</td><td>" + i.projectName + "</td><td>$" + parseInt(i.budget).toLocaleString() + "</td></tr>";
        
    }
    tableContent+= "<tr><td colSpan = 2>Total Budget</td><td>$" + parseInt(budget).toLocaleString() + "</td></tr>";

    let endTable = "</table>"
    document.getElementById("theTable").innerHTML = startTable+tableContent+endTable;
}