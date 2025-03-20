// 1. Smooth Scroll Navigation with Header Offset
$(document).ready(function () {
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash; //Updates URL after animation
        }
      );
    }
  });
});

// 2. Mobile Menu Toggle Closing
$(".menu-items a").click(function () {
  $("#checkbox").prop("checked", false);//Closes the mobile menu
});

// 3. Enhanced Cart Functionality
function addToCart(id, name, price) {                                                                                                                                                                                                                                    
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart data
 
  let existingItem = cart.find(item => item.id === id);// Check for duplicates
  if (existingItem) {
      existingItem.quantity += 1;// Increment quantity
  } else {
      cart.push({ id, name, price, quantity: 1 }); // Add new item
  }

  localStorage.setItem("cart", JSON.stringify(cart));// Save to storage
   alert(`${name} added to cart!`);// Notify User
}

