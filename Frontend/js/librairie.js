function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = [];
      saveCart(cart);
    }
    return cart
  }
