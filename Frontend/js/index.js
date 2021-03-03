//*fonction principale auto-invoquée*//
;(async function () {
  const produits = await getAllData();
  hydratePage(produits);
})()

//*request GET */
function getAllData (){

return new Promise((resolve) => {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (
      this.readyState == XMLHttpRequest.DONE &&
      this.status >= 200 &&
      this.status < 400
    ) {
      resolve(JSON.parse(this.responseText));
    } else {
      
    }
  };
  request.open("GET", "http://localhost:3000/api/furniture/");
  request.send();
});
};

//*Mise en place de la structure html *//
function hydratePage(produits){  
    produits.forEach((product) => {
    displayProduct(product)
  })
}

 function displayProduct(product){

   let productContainer = document.getElementById("productContainer");

   let productLink = document.createElement("a");
   productLink.href = "/Frontend/Produit.html?id=" + product._id;
   productLink.classList.add("Linkproduct")
 
   let productCard = document.createElement("div");
   productCard.classList.add("Meubles__card");
   productLink.appendChild(productCard);
   
   let productImg = document.createElement("img");
   productImg.classList.add("Imgcard");
   productImg.src = product.imageUrl;
   productImg.alt = product.name;
   productCard.appendChild(productImg);
 
   let productNew = document.createElement("span");
   productNew.classList.add("Meubles__new");
   productNew.innerText = "Nouveau";
   productCard.appendChild(productNew);
 
   let productText = document.createElement("div");
   productText.classList.add("Meubles__text");
   productCard.appendChild(productText);
 
   let productTitle = document.createElement("h3");
   productTitle.classList.add("Meubles__Name");
   productTitle.innerText = product.name;
   productText.appendChild(productTitle);
 
   let productPrice = document.createElement("span");
   productPrice.classList.add("Meubles__prix")
   productPrice.innerText = product.price / 100  + "€";
   productText.appendChild(productPrice);
 
   let productAdd = document.createElement("i")
   productAdd.classList.add("fas", "fa-plus-circle" , "Meubles__Plus")
   productText.appendChild(productAdd);
 
   productContainer.appendChild(productLink);
   
};





/*quand clique ajouter produit dans le panier et augmenter le chiffre sur le panier */
// const btn = document.getElementById("button")

