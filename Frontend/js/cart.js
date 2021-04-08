;(async() => {
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
    location.reload();
}  


//--------------clear cart -------------- //

function addListenerOnRemoveButton(){    
    let removeButton = document.getElementById("clearAll");
    removeButton.addEventListener("click", function ()  {  
        saveCart([]); 
        displayCart([]);
        location.reload();
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

//---------------FORMULAIRE--------------//

    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const address = document.getElementById('adress');
    const city = document.getElementById('city');
    const email = document.getElementById('email');
    let cart = getCart()
    
    let comfirmbutton = document.getElementById("form")
    comfirmbutton.addEventListener("submit", function (e){
        e.preventDefault()
        alertUser()
        if (checkCartEmpty() == true){
            sendOrder()
        }
        localStorage.clear()     
    });
       
//-----------Alert for User------------//
function alertUser(){
    const firstnameValue = firstname.value;
    const lastnameValue = lastname.value;
    const addressValue = address.value;
    const cityValue = city.value;
    const emailValue = email.value;

    if(firstnameValue === '') {
		setErrorFor(firstname, 'First name cannot be blank');
	} else {
		setSuccessFor(firstname);
	}
	
	if(lastnameValue === '') {
		setErrorFor(lastname, 'Name cannot be blank');
	}  else {
		setSuccessFor(lastname);
	}
	
	if(addressValue === '') {
		setErrorFor(address, 'Adress cannot be blank');
	} else {
		setSuccessFor(address);
	}
	
	if(cityValue === '') {
		setErrorFor(city, 'City cannot be blank');
	}
	 else{
		setSuccessFor(city);
	}

    if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
    
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^([a-zA-Z0-9\.-_]+)[@]{1}([a-zA-Z0-9.-_]+)[.]{1}([a-z]{2,10})$/.test(email);
}

 function sendOrder(){
    const firstnameValue = firstname.value;
    const lastnameValue = lastname.value;
    const addressValue = address.value;
    const cityValue = city.value;
    const emailValue = email.value;
    const emailRegex = /^([a-zA-Z0-9\.-_]+)[@]{1}([a-zA-Z0-9.-_]+)[.]{1}([a-z]{2,10})$/
    if (!(
        firstnameValue.length > 1
        && lastnameValue.length > 1
        && emailRegex.test(emailValue)
        && addressValue.length > 6
        && cityValue.length > 1
      )) {
        alert("Veuillez remplir tout les champs correctements")
        return
      }
      
      const furnitureToOrder = []
      cart.forEach((product) => {
        furnitureToOrder.push(product._id);
      });
    
      const order = {
        contact: {
          firstName: firstnameValue,
          lastName: lastnameValue,
          address: addressValue,
          city: cityValue,
          email: emailValue,
        },
        products: furnitureToOrder,
      }
      let sendForm = JSON.stringify(order);
      sendData(sendForm)
 }


function checkCartEmpty() {
    if (0 == cart.length || cart == []){
    alert ("votre panier est vide");
    return false;
    }else{
        return true;
    }
}

function sendData (sendForm){
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onload = function () {
        if (
          this.readyState == XMLHttpRequest.DONE &&
          this.status == 201) {
          sessionStorage.setItem("order", this.responseText);
          window.location ="./Confirmation.html"
          resolve(JSON.parse(this.responseText));
        } 
      };
      request.open("POST", "http://localhost:3000/api/furniture/order");
      request.setRequestHeader("Content-Type", "application/json");
      request.send(sendForm);
    });  
};



  