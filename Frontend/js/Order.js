
(async () => {
    let order = await JSON.parse(sessionStorage.getItem("order"));
    displayInfo(order);
    diplayTotalPrice(order)   
})()

function displayInfo(order){
    if (sessionStorage.getItem("order") != null){
    document.getElementById("prenom").innerHTML = order.contact.firstName;
    document.getElementById("nom").innerHTML = order.contact.lastName;
    document.getElementById("orderId").innerHTML = order.orderId;
    console.log(order.products)
    }
}

function diplayTotalPrice(order) {
    let sum = 0;
    order.products.forEach((products) => {
        sum += products.price / 100;
    })
    document.getElementById("prixtotal").textContent = sum + " €";
}

