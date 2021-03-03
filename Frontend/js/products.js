

(async function main() {
  const id =  getId();
  const dataFurniture = await getData(id);
  displayProduct(dataFurniture);
  
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

    document.getElementById("Product").appendChild(cloneTemplate);
}
  

saveCart(['blabla','lol' ]);

// function diplayCart(productCart){
//   const btnAdd = document.getElementById ("Ajouter");
//   btnAdd.addEventListener("click",fonction()){
    

//   }
  //pour chaque produits selectionnés on l'affichera sur une page panier qui sera pour l'instant cachée

//}



