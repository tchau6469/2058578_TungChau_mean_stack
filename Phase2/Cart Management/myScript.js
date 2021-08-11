var cartIsEmpty = true;
function addItem(itemName) {
    var _a;
    cartIsEmpty = false;
    //create the object and set it in the sessionstorage if not defined yet
    if (window.sessionStorage.length == 0) {
        var array = {
            underwear: { price: 20.00, quantity: 0 },
            chair: { price: 1400.00, quantity: 0 },
            shoes: { price: 85.00, quantity: 0 },
            dog: { price: 2000.00, quantity: 0 },
            totalPrice: 0.00
        };
        sessionStorage.setItem("mainArray", JSON.stringify(array));
    }
    //get the json string from sessionstorage and converting it to js object
    var object = JSON.parse(sessionStorage.getItem("mainArray"));
    //incrementing quantity of that item
    object[itemName].quantity++;
    //total price value getting updated
    object.totalPrice += object[itemName].price;
    console.log("TOTAL PRICE: " + object.totalPrice);
    //changing cart value DOM element
    var label = document.getElementById("cartValue");
    label.textContent = "$" + object.totalPrice.toFixed(2);
    //pushing item back into sessionstorage as json string
    sessionStorage.setItem("mainArray", JSON.stringify(object));
    (_a = document.getElementById("checkOutButton")) === null || _a === void 0 ? void 0 : _a.removeAttribute("disabled");
}
function checkOut() {
    var object = JSON.parse(sessionStorage.getItem("mainArray"));
    for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
        var key = _a[_i];
        var table_1 = document.getElementById("tableBody");
        //let tableRow = document.createElement("tr");
        console.log(object[key]);
        if (object[key].quantity > 0) {
            var tableString_1 = "<tr><td>" + (key.charAt(0).toUpperCase() + key.slice(1)) + "</td>\n                                        <td>$" + object[key].price.toFixed(2) + "</td>\n                                        <td>" + object[key].quantity + "</td></tr>";
            if ((table_1 === null || table_1 === void 0 ? void 0 : table_1.innerHTML) == null)
                table_1.innerHTML = tableString_1;
            else
                table_1.innerHTML += tableString_1;
        }
    }
    var table = document.getElementById("tableBody");
    var tableString = "<tr><td colSpan = 1>Total Price</td><td>$" + object.totalPrice.toFixed(2) + "</td></tr>";
    table.innerHTML += tableString;
}
