;
(async () => {
    const ProductInStorage = await getProductInStorage();
    if (ProductInStorage == null || ProductInStorage.length == 0) {
        return displayEmptyCart();
    } else {
        hydratePage(ProductInStorage);
        totalPrice(ProductInStorage);
        NumberOfFurniture(ProductInStorage);
        removeProduct(ProductInStorage)
    }
})()

function getProductInStorage() {
    return JSON.parse(localStorage.getItem('cart'))
}

function hydratePage(ProductInStorage) {
    ProductInStorage.forEach((product) => {
        displayProduct(product)
        // sameProduct(product)
    })
}


//--template quand il n'y a pas de produit--//
function displayEmptyCart() {

    const templateEmpty = document.getElementById("template-empty")

    const cloneEmpty = document.importNode(templateEmpty.content, true);

    document.getElementById("checkout__products").appendChild(cloneEmpty)
}


//--template des produits--//

function displayProduct(product) {

    const templatePanier = document.getElementById("template-panier");

    const clone = document.importNode(templatePanier.content, true);

    clone.getElementById("wrapimg").setAttribute("src", product.imageUrl);
    clone.getElementById("name").innerHTML = product.name;
    clone.getElementById("price").innerHTML = product.price / 100 + "€";
    // clone.getElementById("Quantity").innerHTML= product.length;
    document.getElementById("checkout__products").appendChild(clone);
}
// let cart = JSON.parse(localStorage.getItem('cart'))
// console.log(cart)
// let cartItems = cart.map( item => item)
// console.log(cartItems)
function removeProduct(cartItems){
    cartItems.forEach((cartItems)=>{
    let removeButton = document.getElementById("disabled");
    removeButton.addEventListener("click", function ()  {
        removeItem(cartItems);
    })
});

    removeItem = (cartItems) => {
         cart.splice(cartItems, 1);
         localStorage.clear();
         localStorage.setItem("panier", JSON.stringify(cartItems));
         window.location.reload();
       
     };  

}

function totalPrice(ProductInStorage) {
    let priceOfEach = 0;
    ProductInStorage.forEach((ProductInStorage) => {
        priceOfEach += ProductInStorage.price / 100;
        document.getElementById("total").textContent = priceOfEach + " €";
        console.log(ProductInStorage);
    })
}

// function sameProduct(product){

// }



function NumberOfFurniture(cart) {
    document.getElementById("totalqty").textContent = cart.length
}

