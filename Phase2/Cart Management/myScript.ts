var cartIsEmpty : boolean = true;

function addItem(itemName:string) {

    cartIsEmpty = false;

    //create the object and set it in the sessionstorage if not defined yet
    if (window.sessionStorage.length == 0 ) {
        let array : any = {
            underwear: {price: 20.00, quantity: 0}, 
            chair: {price: 1400.00, quantity: 0},
            shoes: {price: 85.00, quantity: 0},
            dog: {price: 2000.00, quantity: 0},
            totalPrice: 0.00
        };
        sessionStorage.setItem("mainArray", JSON.stringify(array) );
    }




    //get the json string from sessionstorage and converting it to js object
    let object = JSON.parse(sessionStorage.getItem("mainArray")!);


    //incrementing quantity of that item
    object[itemName].quantity++;


    //total price value getting updated
    object.totalPrice += object[itemName].price;

   
    console.log(`TOTAL PRICE: ${object.totalPrice}`);



    //changing cart value DOM element
    let label = document.getElementById("cartValue");
    label!.textContent = `$${object.totalPrice.toFixed(2)}`;

    //pushing item back into sessionstorage as json string
    sessionStorage.setItem("mainArray", JSON.stringify(object));

    document.getElementById("checkOutButton")?.removeAttribute("disabled");

    
}


function checkOut(){
    let object = JSON.parse(sessionStorage.getItem("mainArray")!);
    for (let key of Object.keys(object)) {
        let table = document.getElementById("tableBody");
        //let tableRow = document.createElement("tr");
        console.log(object[key]);

        if (object[key].quantity > 0) {
            let tableString :string  = `<tr><td>${key.charAt(0).toUpperCase() + key.slice(1)}</td>
                                        <td>$${object[key].price.toFixed(2)}</td>
                                        <td>${object[key].quantity}</td></tr>`;
            if (table?.innerHTML == null)  table!.innerHTML = tableString;

            else table.innerHTML += tableString;

        }
        
    }

    let table = document.getElementById("tableBody");
    let tableString : string = `<tr><td colSpan = 1>Total Price</td><td>$${object.totalPrice.toFixed(2)}</td></tr>`;
    table!.innerHTML += tableString;

}

