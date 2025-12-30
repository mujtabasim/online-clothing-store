let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  const item = cart.find(p => p.name === name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count =cart.reduce((sum, item) => sum + item.quantity, 0);
  const counter= document.getElementById("cart-count");
  if (counter) counter.innerText = count;
}

updateCartCount();
function displayCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if(!list)return;

  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total+=item.price * item.quantity;

    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${item.name}</strong> - $${item.price}
      <br>
      <button onclick="decreaseQty('${item.name}')">➖</button>
      <span> ${item.quantity} </span>
      <button onclick="increaseQty('${item.name}')">➕</button>
    `;

    list.appendChild(li);
  });

  totalEl.innerText = total;
}
function increaseQty(name) {
  const item = cart.find(p => p.name=== name);
  if (item) {
    item.quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
  }
}

function decreaseQty(name) {
  const item = cart.find(p => p.name=== name);

  if (item) {
    item.quantity--;

    if (item.quantity === 0) {
      cart =cart.filter(p => p.name !== name);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
  }
}


displayCart();

const orderBtn=document.getElementById("order-btn");
const orderMsg = document.getElementById("order-msg");

if (orderBtn) {
  orderBtn.addEventListener("click", () => {

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

 
    cart=[];
    localStorage.removeItem("cart");

    displayCart();
    updateCartCount();

    orderMsg.innerText = "✅ Order placed successfully!";
    orderMsg.style.color = "green";
    alert('Order placed successfully!');
  });
  
}
