

(async function main() {
  const id =  getId();
  const dataFurniture = await getData(id);
  displayProduct(dataFurniture);
  onLoadCartNumbers()
})()



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
};


function displayProduct(detailsProduct){
    
    const templateProduct = document.getElementById("templateProduct");
    
    const cloneTemplate = document.importNode(templateProduct.content, true);

    cloneTemplate.getElementById("Product__img").setAttribute("src",detailsProduct.imageUrl);
    cloneTemplate.getElementById("Product__description").innerHTML = detailsProduct.description;
    cloneTemplate.getElementById("Product__name").innerHTML = detailsProduct.name;
    cloneTemplate.getElementById("Product__price").innerHTML = detailsProduct.price /100 + "€";
    // let vernis = document.getElementsByClassName('product__varnish');
    // vernis.innerHTML = `repeat(${detailsProduct.varnish.length})`;
    document.getElementById("Product").appendChild(cloneTemplate);
  
//-----------------------------------PANIER---------------------------------------//

const panier = JSON.parse(localStorage.getItem("panier"));
console.log(panier)

  //display number
function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers= parseInt (productNumbers);

    if (productNumbers){
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.getElementById("count").textContent = productNumbers + 1;
    }
      else{
        localStorage.setItem('cartNumbers',1);
        document.getElementById("count").textContent = 1;
      }
   
  }
//Vérification et initialisation du panier

if (localStorage.getItem("panier")) {
  console.log(panier);
} else {
  console.log("Le panier va être initalisé");
  let panierInit = [];
  localStorage.setItem("panier", JSON.stringify(panierInit));
}
  
  //Add to cart

let acheter = document.getElementById("add");
  acheter.addEventListener("click", async function (event) {
    event.preventDefault()
    let url = new URL(window.location.href);
    let id = url.searchParams.get('id')
    const pushElt = await getData(id);
    panier.push(pushElt);
    localStorage.setItem("panier", JSON.stringify(panier));
    alert("added to cart");
    cartNumbers();
  });
 
}
  


function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
      document.getElementById("count").textContent = productNumbers;
  }
}

