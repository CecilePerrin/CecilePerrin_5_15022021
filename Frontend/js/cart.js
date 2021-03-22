;
(async () => {
    let cart = await getCart()
    displayCart(cart);
    addEventListenerToTarget(cart);
    addListenerOnRemoveButton();       
})()

//-----------------------------//
function displayCart(cart) {
    let cartContent = document.getElementById("checkout__products");
    for (let i = 0; i < cartContent.childNodes.length; i++){
        if(cartContent.childNodes[i].className == "wraping-product"){
            cartContent.removeChild(cartContent.childNodes[i]);
        }    
    }
    if (0 == cart.length){
        displayEmptyCart();
    }
    else{
        cart.forEach((product) => {
            displayProduct(product);
        })    
    }
    diplayTotalPrice(cart);
    displayNumberOfProductCart(cart);
}

//---------------Template empty cart--------------//
function displayEmptyCart() {

    const templateEmpty = document.getElementById("template-empty")

    const cloneEmpty = document.importNode(templateEmpty.content, true);

    document.getElementById("checkout__products").appendChild(cloneEmpty)
}


//--------------template products--------------//

function displayProduct(product) {

    const templatePanier = document.getElementById("template-panier");

    const clone = document.importNode(templatePanier.content, true);

    clone.getElementById("wrapimg").setAttribute("src", product.imageUrl);
    clone.getElementById("name").innerHTML = product.name;
    clone.getElementById("price").innerHTML = product.price / 100 + "€";
    clone.getElementById("disabled").setAttribute("data-id", product._id);
    document.getElementById("checkout__products").appendChild(clone); 
}


//--------------Remove item--------------//
function addEventListenerToTarget(cart){
    const cartContent = document.getElementById("checkout__products");

    cartContent.addEventListener("click", event =>{
        if (event.target.classList.contains("disabled")){
            removeThisProduct (event.target.dataset.id, cart)
        }
    })
}


function removeThisProduct(id, cart) {
    for (let i = 0; i < cart.length; i++){
        if(cart[i]._id === id){
            cart.splice(i, 1);
            break;
        }
    }
    
    saveCart(cart);
    displayCart(cart);
}  


//--------------clear cart -------------- //

function addListenerOnRemoveButton(){    
    let removeButton = document.getElementById("clearAll");
    removeButton.addEventListener("click", function ()  {  
        saveCart([]); 
        displayCart([]);
    });
}  


//--------------Total price && qty--------------//

function diplayTotalPrice(cart) {
    let sum = 0;
    cart.forEach((product) => {
        sum += product.price / 100;
    })
    document.getElementById("total").textContent = sum + " €";
}


function displayNumberOfProductCart(cart) {
    document.getElementById("totalqty").textContent = cart.length
}

//---------------purchase button--------------//

function purchaseOrder(){
    document.getElementById('purchase').onclick = (e) =>{
        e.preventDefault()
        sendPurchase()
        displayCart([])
    }
}


function sendPurchase(){

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const address = document.getElementById('adress').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;

    let products = getCart()

    if (products.length === 0){
        alert("votre panier est vide")
        }else{
            products.forEach(() => {
                contact = {
                    utilisateur: {
                    firstName: firstname,
                    lastName : lastname,
                    address: address,
                    city: city,
                    email: email,
                    } 
                }
            })  
        }
}

//Ajout vérification après récup valeurs du form

//Effets en fonctions de vérification
//Envoie à l'API
function sendData (){
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onload = function () {
        if (
          this.readyState == XMLHttpRequest.DONE &&
          this.status == 201) {
          sessionStorage.setItem("order", this.responseText);
          window.location ="./Frontend/Confirmation.html"
          resolve(JSON.parse(this.responseText));
        } 
      };
      request.open("POST", "http://localhost:3000/api/furniture/order");
      request.setRequestHeader("Content-Type", "application/json");
      request.send();
    });  
};
