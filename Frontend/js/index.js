
/*request GET */

      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          let response = JSON.parse(this.responseText);
          response.forEach(product=> {
            displayProduct(product);
          });
        } else if (this.readyState == 4 && this.status == 404) {
          ;
        }
      };
      request.open("GET", "http://localhost:3000/api/furniture/");

      request.send();





/*index.html*/
  
/* faire un refacto*/
 function displayProduct(product){
  let productContainer = document.getElementById("productContainer");

  let productLink = document.createElement("a");
  productLink.href = "";

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
  
  // let productDescription = document.createElement("span");
  // productDescription.classList.add("Meubles__description")
  // productDescription.innerText = product.description;
  // productText.appendChild(productDescription);

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
const btn = document.getElementById("button")

