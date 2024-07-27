export let cart=  JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [{
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2
    },
    {
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:4
    }];    
}


function saveToLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId) {
    let matchingItem;
  
    // we here are using productId we get from js-add-to-cart class via data attribute
    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    // document.querySelector(`.js-quantity-selector-${productId}`).value = '1';
    console.log(quantity)
  
    cart.forEach((cartItem) => {
      //checking that the product already exists or not
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
  
    // if exists then increase quantity
    if (matchingItem) {
      matchingItem.quantity += quantity;
    }
    // else : push new item in cart
    else {
      cart.push({
        productId,
        quantity
      });
    }
    // console.log(cart);
    saveToLocalStorage();
  }

export function removeFromCart(productId){
    let newCart = [];

    cart.forEach((cartItem)=>{
        if(cartItem.productId !==  productId){
            newCart.push(cartItem);
        }
    })
    cart = newCart;
    saveToLocalStorage();
  }