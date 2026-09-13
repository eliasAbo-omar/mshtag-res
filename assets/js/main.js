let cart = [];
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartDrawer = document.getElementById("cartDrawer");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const emptyCartText = document.getElementById("emptyCartText");
const totalPriceAmount = document.getElementById("totalPriceAmount");
const cartCount = document.getElementById("cartCount");

// Toggle Drawer
cartBtn.addEventListener("click", () => cartDrawer.classList.add("open"));
closeCart.addEventListener("click", () => cartDrawer.classList.remove("open"));

export function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
}

window.addToCart = addToCart;

export function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

window.removeFromCart = removeFromCart;

function updateCartUI() {
  cartCount.innerText = cart.length;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "";

    const p = document.createElement("p");
    p.id = "emptyCartText";
    p.innerText = "السلة فارغة حالياً";
    p.style.cssText =
      "text-align: center; margin-top: 2rem; opacity: 0.5; color: ''; display: block;";

    cartItemsContainer.appendChild(p);

    totalPriceAmount.innerText = "0 ريال";
    return;
  }

  // Clear current items list
  cartItemsContainer.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const itemEl = document.createElement("div");
    itemEl.classList.add("cart-item");
    itemEl.innerHTML = `
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <span>${item.price} ريال</span>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
                `;
    cartItemsContainer.appendChild(itemEl);
  });

  totalPriceAmount.innerText = `${total} ريال`;
}

export function checkout() {
  updateCartUI();

  if (cart.length === 0) {
    const currentEmptyText = document.getElementById("emptyCartText");

    if (currentEmptyText) {
      currentEmptyText.style.color = "red";
      currentEmptyText.style.opacity = "1";
    }
    return;
  }

  let message = "مرحباً بوفيه مشتاق، أرغب في طلب ما يلي:\n";
  cart.forEach((item) => {
    message += `- ${item.name} (${item.price} ريال)\n`;
  });
  message += `\n*المجموع الكلي: ${totalPriceAmount.innerText}*`;

  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/966539919613?text=${encodedMessage}`, "_blank");
}

window.checkout = checkout;

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 300,
  reset: true,
});

sr.reveal(`.header`, { delay: 200, origin: `right`, reset: false });
sr.reveal(`.hero h1`, { delay: 200, origin: `top` });
sr.reveal(`.hero p`, { delay: 200, origin: `top` });
sr.reveal(`.hero a`, { delay: 200, origin: `top` });
sr.reveal(`.info-strip`, { delay: 200, origin: `left` });
sr.reveal(`.menu-section .section-title`, {
  delay: 300,
  origin: `top`,
  reset: false,
});
sr.reveal(`.menu-section .menu-card`, {
  delay: 300,
  origin: `bottom`,
  reset: false,
});
sr.reveal(`.contact-section .contact-info`, { delay: 200, origin: `right` });
sr.reveal(`.contact-section .map-container`, { delay: 200, origin: `left` });
sr.reveal(`footer p`, { delay: 500, origin: `bottom` });
