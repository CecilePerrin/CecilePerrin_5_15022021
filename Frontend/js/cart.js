

;(async()=>{
  const takeProductInStorage = await storage();
  if (takeProductInStorage == null){ 
    return displayEmptyCart(); 
  } else {
     return displayProduct();
    }
})()


  function storage(){
    return JSON.parse(localStorage.getItem('panier'))
  }

  

  //--template quand il n'y a pas de produit--//
  function displayEmptyCart(){

    const templateEmpty = document.getElementById("template-empty")
    
    const cloneEmpty = document.importNode(templateEmpty.content, true);

    document.getElementById("checkout__products").appendChild(cloneEmpty)
    }
   

  //--template des produits--//

  function displayProduct(shopProduct){
    
    const templatePanier = document.getElementById("wraping-product");
    
    const clone = document.importNode(templatePanier.content, true);

    clone.getElementById("wrapimg").setAttribute("src",shopProduct.imageUrl);
    clone.getElementById("name").innerHTML = shopProduct.description;
    clone.getElementById("price").innerHTML = shopProduct.price /100 + "€";
    document.getElementById("checkout__products").appendChild(clone);
    clone.getElementById("qty").textContent= cart.length;

}

