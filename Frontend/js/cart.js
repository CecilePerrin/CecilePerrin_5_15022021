//---Panier--//
function getCart () {

    let cart = localStorage.getItem("cart");
    if (cart == null){
      cart = []; 
    }
    return cart;
  }
  
  function saveCart (cart) {
    localStorage.setItem("panier", cart);
  }
  
  