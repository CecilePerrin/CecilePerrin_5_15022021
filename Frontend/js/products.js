
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart)
  if (!cart) {
    cart = [];
    saveCart(cart);
  }
  return cart
  
}

function getId() {
  let url = new URL(window.location.href);
  let id = url.searchParams.get('id');
  return id;
}

function  getData(id) {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status >= 200 
      ) {
         resolve(JSON.parse(this.responseText));
       } 
    };
    request.open("GET", `http://localhost:3000/api/furniture/${id}`)
    request.send();
  });
}

function displayProduct(dataFurniture){
  const templateProduct = document.getElementById("templateProduct");
  console.log(dataFurniture.varnish)
  const cloneTemplate = document.importNode(templateProduct.content, true);
  cloneTemplate.getElementById("Product__img").setAttribute("src",dataFurniture.imageUrl);
  cloneTemplate.getElementById("Product__description").innerHTML = dataFurniture.description;
  cloneTemplate.getElementById("Product__name").innerHTML = dataFurniture.name;
  cloneTemplate.getElementById("Product__price").innerHTML = dataFurniture.price /100 + "€";
  let selectVarnish = cloneTemplate.getElementById('product__varnish');
   dataFurniture.varnish.forEach(varnish => addVarnishOption(varnish, selectVarnish))
  document.getElementById("Product").appendChild(cloneTemplate);
}

function addVarnishOption(varnish, selectVarnish){
  let option =  document.createElement("option");
  option.value = varnish;
  option.innerHTML = varnish;
  selectVarnish.appendChild(option);
}


function addListenerOnButton(cart, dataFurniture){
  let button = document.getElementById("add");
  button.addEventListener("click", function () {
    cart.push(dataFurniture);
    saveCart(cart);
    alert("added to cart");
    diplayCartNumbers(cart);
    location.reload();
  });
}

function diplayCartNumbers(cart) {
  document.getElementById("count").textContent = cart.length;
}

(async function main() {
  const id =  getId();
  const dataFurniture = await getData(id);
  cart = getCart();
  displayProduct(dataFurniture);
  addListenerOnButton(cart, dataFurniture);
  diplayCartNumbers(cart);
})()