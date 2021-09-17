//NAVIGATE TO THE RIGHT SECTION.
function navSection(){
  const intro = document.getElementsByClassName("intro")[0];
  const about = document.getElementsByClassName("about")[0];
  const shop = document.getElementsByClassName("shop")[0];

  const introArea = document.getElementsByClassName("intro-area")[0];
  const aboutSection = document.getElementsByClassName("about-section")[0];
  const shopTopic = document.getElementsByClassName("shop-topic")[0];

  intro.addEventListener("click", () => { introArea.scrollIntoView(true) });
  about.addEventListener("click", () => { aboutSection.scrollIntoView(true) });
  shop.addEventListener("click", () => { shopTopic.scrollIntoView(true) });
}
navSection();

//MANIPULATING THE PRODUCT SECTION.
const ProductSection = () => {

  let inc;
  let cartValue = document.getElementsByClassName("cart-number")

  let createCart = document.getElementById("first-table");
  let receiptOrder = document.getElementById("last-table");
  let newProducts = {} 
  let cname;
  let cemail;
  let cphone;

  let products = { 
    0: {
      index: 0,
      id: 'p1',
      name: 'Samsung TV',
      image: "./Images/product1.png",
      cart: "ADD TO CART",
      price: 500000
    },
    1: {
      index: 1,
      id: 'p2',
      name: 'Pixel 4a',
      image: "./Images/product2.png",
      cart: "ADD TO CART",
      price: 250000
    },
    2: {
      index: 2,
      id: 'p3',
      name: 'PS 5',
      image: "./Images/product3.png",
      cart: "ADD TO CART",
      price: 300000
    },
    3: {
      index: 3,
      id: 'p4',
      name: 'MacBook Air',
      image: "./Images/product4.png",
      cart: "ADD TO CART",
      price: 800000
    },
    4:{
      index: 4,
      id: 'p5',
      name: 'Apple Watch',
      image: "./Images/product5.png",
      cart: "ADD TO CART",
      price: 95000
    },
    5: {
      index: 5,
      id: 'p6',
      name: 'Air Pods',
      image: "./Images/product6.png",
      cart: "ADD TO CART",
      price: 75000
    }
  }
  //CREATING THE PRODUCT SECTION.
  function displayProducts(){
    document.getElementsByClassName("grid-container")[0].innerHTML = 
    Object.keys(products).map(product => 
    `<figure class="product-figure">
        <div class="container">
          <img class="product-image" src="${products[product].image}" alt="${products[product].name}"/>
          <div class="overlay">
            <div class="text">
              <p>PRICE</p>
              <p>#${products[product].price}</p>
            </div>
          </div>
        </div>
        <h2 class="product-header">${products[product].name}</h2>
        <button id="add-product" class="product-button" name=${products[product].index}>${products[product].cart}</button>
      </figure>`
    ).join("")
  }
  displayProducts();

  //CREATING THE CART SECTION FOR PRODUCTS ADDED TO CART.
  function cartProducts() {
    document.querySelectorAll(".product-button").forEach((item) => {

    item.addEventListener('click', function() {
      inc = 0;
      inc++;
      if(item.textContent === "ADD TO CART") {
        cartValue[0].textContent++;
        item.textContent = "Remove From Cart";
        products[item.name].cart = item.textContent;

        const addProduct = Object.keys(products).filter(product => 
          products[product].cart === products[item.name].cart
        )
        createCart.innerHTML = `${addProduct.map(pr => 
          `<tr class="table-row">
          <td class="table-col">${inc++}</td>
          <td class="cart-product" title=${products[pr].index}>${products[pr].name}</td>
          <td class="cart-price" title=${products[pr].index}>${products[pr].price}</td>
          <td class="adjust-cart">
            <span class="bar add-bar" title=${products[pr].index}><i class="fas fa-plus-circle"></i></span>
            <span class="bar bar-number" title=${products[pr].index}>1</span>
            <span class="bar sub-bar" title=${products[pr].index}><i class="fas fa-minus-circle"></i></span>
          </td>
          <td class="remove-cart" title=${products[pr].index}><i class="fas fa-trash-alt"></i></td>
        </tr>`).join("")}`
      }else{
        cartValue[0].textContent--;
        item.textContent = "ADD TO CART"
        products[item.name].cart = item.textContent;
        
        const subProd = Object.keys(products).filter(product => 
            products[product].cart !== products[item.name].cart
          )
        createCart.innerHTML = `${subProd.map(pr => {
          return `<tr class="table-row">
            <td class="table-col" >${inc++}</td>
            <td class="cart-product" title=${products[pr].index}>${products[pr].name}</td>
            <td class="cart-price" title=${products[pr].index}>${products[pr].price}</td>
            <td class="adjust-cart">
              <span class="bar add-bar" title=${products[pr].index}><i class="fas fa-plus-circle"></i></span>
              <span class="bar bar-number" title=${products[pr].index}>1</span>
              <span class="bar sub-bar" title=${products[pr].index}><i class="fas fa-minus-circle"></i></span>
            </td>
            <td class="remove-cart" title=${products[pr].index}><i class="fas fa-trash-alt"></i></td>
          </tr>`}).join("")}`
      }
      adjustCart()
      removeCart()
    })
    })
  }
  cartProducts()

  //CALCULATING PRICES OF PRODUCTS ADDED TO CART.
  function showCartPrice() {
    let totalPrice = 0;
    document.querySelectorAll(".cart-price").forEach(item => {
      totalPrice += Number(item.textContent);
      document.getElementsByClassName("total")[0].textContent = "#"+totalPrice
    })
    return totalPrice
  }

  //MANIPULATING THE CART BUTTON.
  function revealCart() {

    document.getElementsByClassName("cart-button")[0].addEventListener('click', function() {
      
      if(cartValue[0].innerHTML !== "0") {
        document.getElementById('abc').style.display = "block";
        document.getElementById('empty').style.display = "none";
      }else{
        document.getElementById('abc').style.display = "none";
        document.getElementById('empty').style.display = "block";
      }
      showCartPrice()
    })
    document.getElementById('first-close').addEventListener('click', function() {
      document.getElementById('empty').style.display = "none";
    })
    document.getElementById('second-close').addEventListener('click', function() {
      document.getElementById('abc').style.display = "none";
    })
    document.querySelector('.continue').addEventListener('click', function() {
      document.getElementById('abc').style.display = "none";
    })
  }
  revealCart()

  
  //MANIPULATING THE QUANTITY OF PRODUCTS ADDED TO CART.
  function adjustCart() {
    document.querySelectorAll(".add-bar").forEach(item => {
      item.addEventListener("click", function() {
        item.nextElementSibling.innerHTML = Number(item.nextElementSibling.innerHTML) + 1;
        item.parentElement.previousElementSibling.innerHTML = Number(item.parentElement.previousElementSibling.innerHTML) + products[item.title].price;
        showCartPrice()
      })
    })
    document.querySelectorAll(".sub-bar").forEach(item => {
      item.addEventListener("click", function() {
        if(item.previousElementSibling.innerHTML === "1"){
          alert("Click on the Remove button")
        }else{
          item.previousElementSibling.innerHTML = Number(item.previousElementSibling.innerHTML) - 1;
          item.parentElement.previousElementSibling.innerHTML = Number(item.parentElement.previousElementSibling.innerHTML) - products[item.title].price;
        }
        showCartPrice()
      })
    })
  }

  //MANIPULATING THE REMOVE BUTTONS OF PRODUCT IN CART.
   function removeCart() {
    document.querySelectorAll(".remove-cart").forEach(item => {
      item.addEventListener("click", function(){
        cartValue[0].textContent--; 

        inc = 0;
        inc++;
        item.parentElement.remove();
        document.querySelectorAll(".table-col").forEach(item => {
        item.innerHTML = inc++;
      })
      document.getElementsByClassName("product-button")[item.title].innerHTML = "ADD TO CART";
      products[item.title].cart = "ADD TO CART";
      showCartPrice()
      if(createCart.children.length === 0){
        document.getElementsByClassName("total")[0].textContent = "#"+0;
      }
      })
    })
  }

  //Input Name Validation
  function handleName(e){
      let validName = /[a-zA-Z]+$/;
      //let name = e.target.value;
      cname = e.target.value;
      if(cname == ''){
          document.getElementById('name').innerText = 'Please enter your name';
          document.querySelector('.name').classList.add('invalid-input');
      }else if(!cname.match(validName)){
          document.getElementById('name').innerText = 'Invalid name';
          document.querySelector('.name').classList.add('invalid-input');
      }else{
          document.getElementById('name').innerText = '';
          e.target.style.backgroundColor = '#e8f0fd'; 
          document.querySelector('.name').classList.add('valid-input');
      }
      return cname;
    }
    
  //Input Email Validation
  function handleEmail(e){
      //let email = e.target.value;
      cemail = e.target.value;
      let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(cemail == ''){
          document.getElementById('email').innerText = 'Please enter an email';
          document.querySelector('.email').classList.add('invalid-input');
          
      }else if(!cemail.match(validEmail)){
          document.getElementById('email').innerText = 'Invalid email';
          document.querySelector('.email').classList.add('invalid-input');
      }else{
          document.getElementById('email').innerText = '';
          e.target.style.backgroundColor = '#e8f0fd'; 
          document.querySelector('.email').classList.add('valid-input');
      }
      return cemail;
  }
    
  //Input Phone Number Validation
  function handlePhone(e){
      cphone = e.target.value;
      let numbers = /^[0-9]+$/;
      let checkMatch = cphone.match(numbers);
  
      if(cphone === ''){
          document.getElementById('number').innerText = 'Please enter your telephone number';
          document.querySelector('.number').classList.add('invalid-input');
      }else if(!checkMatch){
          document.getElementById('number').innerText = 'Phone number can only be number';  
          document.querySelector('.number').classList.add('invalid-input');
      }else if(checkMatch && cphone.length < 11){
          document.getElementById('number').innerText = 'Phone number cannot be less than 11 characters';  
      }else{
          document.getElementById('number').innerText = ''; 
          e.target.style.backgroundColor = '#e8f0fd'; 
          document.querySelector('.number').classList.add('valid-input');
      }
      return cphone;
  }

    //Set Name DOM
    function setName(){
      return document.querySelector('.name');
    }
    //Set Email DOM
    function setEmail(){
      return document.querySelector('.email');
    }
    //Set Phone Number DOM 
    function setPhone(){
      return document.querySelector('.number');
    }
    // setName().addEventListener('blur', handleName);
    // setEmail().addEventListener('blur', handleEmail);
    // setPhone().addEventListener('blur', handlePhone);
  

  //FINISH THE CART PROCESS.
  function openSuccess() {
    document.querySelectorAll(".cart-product").forEach(item => {
      newProducts[item.title] = {name: item.innerHTML};
    })
    document.querySelectorAll(".cart-price").forEach(item => {
      newProducts[item.title].price = item.innerHTML
    })
    document.querySelectorAll(".bar-number").forEach(item => {
      newProducts[item.title].quantity = item.innerHTML
    })
    inc = 0;
    inc++;
    receiptOrder.innerHTML = Object.keys(newProducts).map(product => 
      `<tr class="table-row">
      <td class="table-col" >${inc++}</td>
      <td>${newProducts[product].name}</td>
      <td class="order-price">${newProducts[product].price}</td>
      <td class="">${newProducts[product].quantity}</td>
    </tr>`).join("")
    
    document.getElementsByTagName("body")[0].addEventListener("click", function(){
      document.getElementById('completed').style.display = "none";
      location.reload()
    })
}

  //PROCESSING PAYMENT FOR PRODUCTS IN CART.
  function payWithPaystack() {
    document.cookie = 'cookie2=value2; SameSite=Lax'
    var handler = PaystackPop.setup({
      key: 'pk_test_baaa5f7909ef3113206b36d5882c2c125c3e786e', // Replace with your public key
      email: document.getElementById('email-input').value,
      amount: Number(showCartPrice()) * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
      currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
      ref: Math.floor((Math.random() * 90000000000) + 1), // Replace with a reference you generated
      callback: function(response) {
        //this happens after the payment is completed successfully
        document.getElementById('abc').style.display = "none";
        document.getElementById('completed').style.display = "block";
        // Make an AJAX call to your server with the reference to verify the transaction
      },
      onClose: function() {
        alert('Transaction was not completed, window closed.');
      },
    });
    handler.openIframe();
  }
  
  //CALLING THE PAYMENT PROCESSING REQUEST.
  function completeOrder() {
    
    setName().addEventListener('blur', handleName);
    setEmail().addEventListener('blur', handleEmail);
    setPhone().addEventListener('blur', handlePhone);
    document.getElementById("form").addEventListener("submit", function(event){
      event.preventDefault();
      openSuccess();
      payWithPaystack()
    })
  }
  completeOrder()
}
ProductSection()