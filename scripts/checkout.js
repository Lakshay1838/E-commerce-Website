import { cart, removeFromCart, calculateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formattMoney } from './utils/money.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  let productId = cartItem.productId;

  let matchingProduct;

  products.forEach(
    (product) => {
      if (product.id === productId) {
        matchingProduct = product;
        // print(matchingProduct);
      }
    });
  console.log(matchingProduct);
  cartSummaryHTML += `<div class="cart-item-container  js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image
    }">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formattMoney(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span data-product-id = "${matchingProduct.id}" class="update-quantity-link js-update-cart-quantity link-primary">
                    Update
                    <input type="text" class="quantity-input">
                    <span data-product-id = "${matchingProduct.id}" class="save-quantity-link link-primary js-save-quantity-link">
                      Save
                    </span> 
                  <span data-product-id = "${matchingProduct.id}" class="delete-quantity-link link-primary js-delete-from-cart-button">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

});

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

// USE DATA ATTRIBUTE CAREFULLY AKING MISTAKES STAY AWAKE
document.querySelectorAll('.js-delete-from-cart-button')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      // console.log(cart);

      let container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();              //used toremove items from the current webpage.
      updateCartQuantity();
    });
  });


// used to handle top on checkout page 
// car quantity 
// function calculateCartQuantity(){
//     let cartQuantity = 0;
//     cart.forEach((cartItem)=>{
//         cartQuantity += cartItem.quantity;
//     });
//     // console.log('cart : ',cartQuantity);
//     return cartQuantity;
//   }
document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} Items`;

//   for updating after clicking the delete button
function updateCartQuantity() {
  const quantity = calculateCartQuantity();
  document.querySelector('.js-return-to-home-link').innerHTML = `${quantity} Items`;
}


document.querySelectorAll(`.js-update-cart-quantity`)
  .forEach((link)=>{
    const productId = link.dataset.productId;
    link.addEventListener('click',()=>{
      // console.log(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);

        container.classList.add('is-editing-quantity');
    })
  })
document.querySelectorAll(`.js-save-quantity-link`)
  .forEach((link)=>{
    const productId = link.dataset.productId;
    link.addEventListener('click',()=>{
      // console.log(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      container.classList.remove('is-editing-quantity');
    })
  })
