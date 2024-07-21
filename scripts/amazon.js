// const products = [

// {
//     image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name: 'Black and Grey Athletic Cotton Socks - 6 Pairs',
//     ratings : {
//         stars:4.5,
//         count:87
//     },
//     priceCents:1080                              
//     // we are calculating price in cents because javascript has problem with numbers 
//     // suggestion is to calculate in cents then convert in dollars 
// },

// {
//     image: 'images/products/intermediate-composite-basketball.jpg',
//     name: 'Intermediate size Basketball',
//     ratings:{
//         stars:4,
//         count:127
//     },
//     priceCents:2095
// },

// {
//     image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name:'Adult-Cotton-Tshirt-2-Pack',
//     ratings:{
//         stars:4.5,
//         count:56
//     },
//     priceCents:799
// }];
// FIRSTLY USED ARRAY THEN WE USE THE ARRAY IN PRODUCTS.JS

let productsHTMLCode = '';

products.forEach((product) => {
  // ->>>->->-> while creating html using javascript remember to use names accurately ->>>->->->
  productsHTMLCode += `
         <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
                                                                                            
          <button class="js-add-to-cart add-to-cart-button button-primary" data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});
// console.log(productsHTML)


document.querySelector('.products-grid')
  .innerHTML = productsHTMLCode;

// Cart
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {

    const productId = button.dataset.productId;
    // console.log(button.dataset.productId);
    let matchingItem;

    cart.forEach((cartItem) => {
      //checking that the product already exists or not
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    // if exists then increase quantity
    if (matchingItem) {
      matchingItem.quantity++;
    }
    // else : push new item in cart
    else {
      cart.push({
        productId: productId,
        quantity: 1
      });
    }
    // console.log(cart);
    let cartQuantity = 0;
    cart.forEach((item)=>{
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  })
})


