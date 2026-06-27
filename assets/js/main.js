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

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

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

function checkout() {
  updateCartUI();

  if (cart.length === 0) {
    const currentEmptyText = document.getElementById("emptyCartText");

    if (currentEmptyText) {
      currentEmptyText.style.color = "red";
      currentEmptyText.style.opacity = "1";
    }
    return;
  }

  // صياغة رسالة واتساب بالطلبات لتسهيل تجربة العميل
  let message = "مرحباً بوفيه مشتاق، أرغب في طلب ما يلي:\n";
  cart.forEach((item) => {
    message += `- ${item.name} (${item.price} ريال)\n`;
  });
  message += `\n*المجموع الكلي: ${totalPriceAmount.innerText}*`;

  const encodedMessage = encodeURIComponent(message);
  // توجيه لرقم المطعم مباشرة
  window.open(`https://wa.me/966539919613?text=${encodedMessage}`, "_blank");
}
