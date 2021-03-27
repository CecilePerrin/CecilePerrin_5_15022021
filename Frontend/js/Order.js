// get cart total price name and adress
(async () => {
    let order = await JSON.parse(sessionStorage.getItem("order"));
    displayInfo(order);     
})()

function displayInfo(order){
    if (sessionStorage.getItem("order") != null){
    document.getElementById("prenom").innerHTML = order.contact.firstName;
    document.getElementById("nom").innerHTML = order.contact.lastName;
    document.getElementById("orderId").innerHTML = order.orderId;
    document.getElementById("address").innerHTML = order.contact.address;
    document.getElementById("city").innerHTML = order.contact.city;
    document.getElementById("city").innerHTML = order.contact.city;
    }
}


