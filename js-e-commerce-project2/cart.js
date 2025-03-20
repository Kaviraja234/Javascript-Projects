//Display Cart
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartTable = document.getElementById("cart-items");
    let totalPrice = 0;

    cartTable.innerHTML = ""; // Clear previous content

    cart.forEach((item, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartTable.appendChild(row);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById("total-price").innerText = `Total: $${totalPrice.toFixed(2)}`;
}


//Remove from cart (index)
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

//Clearcart
function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

// Window on Load = displaycart
window.onload = displayCart;


  