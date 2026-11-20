
/* =========================================
   RIG-FORGE GAMING STORE
   Product & Shopping Cart System
========================================= */

// PRODUCT DATABASE

const items = [
  {
    id: 1,
    n: "Performance Gaming PC",
    c: "PC & Displays",
    p: "KSh 189,999",
    d: "A powerful desktop setup for high-frame-rate gaming.",
    i: "photo-1587202372775-e229f172b9d7"
  },
  {
    id: 2,
    n: "Ultra-wide Gaming Monitor",
    c: "PC & Displays",
    p: "KSh 64,999",
    d: "Immersive widescreen visuals for your games.",
    i: "photo-1527443224154-c4a3942d3acf"
  },
  {
    id: 3,
    n: "Mechanical RGB Keyboard",
    c: "Peripherals",
    p: "KSh 12,499",
    d: "Responsive mechanical feel with vibrant lighting.",
    i: "photo-1595225476474-87563907a212"
  },
  {
    id: 4,
    n: "Precision Gaming Mouse",
    c: "Peripherals",
    p: "KSh 6,499",
    d: "Lightweight control for fast, accurate movement.",
    i: "photo-1527814050087-3793815479db"
  },
  {
    id: 5,
    n: "Wireless Gaming Headset",
    c: "Audio",
    p: "KSh 14,999",
    d: "Immersive sound and a comfortable over-ear fit.",
    i: "photo-1599669454699-248893623440"
  },
  {
    id: 6,
    n: "Gaming Controller",
    c: "Peripherals",
    p: "KSh 8,999",
    d: "Comfortable controls for console and PC gaming.",
    i: "photo-1600080972464-8e5f35f63d08"
  },
  {
    id: 7,
    n: "Ergonomic Gaming Chair",
    c: "Setup",
    p: "KSh 34,999",
    d: "Supportive seating for long gaming sessions.",
    i: "photo-1598550476439-6847785fcea6"
  },
  {
    id: 8,
    n: "RGB Gaming Desk Setup",
    c: "Setup",
    p: "KSh 24,999",
    d: "A clean foundation for your ultimate battle station.",
    i: "photo-1612198188060-c7c2a3b66eae"
  }
];

// STORE STATE

let category = "All";

const cart = new Map();

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");

// IMAGE HANDLING

function getImage(item) {
  return `https://images.unsplash.com/${item.i}?auto=format&fit=crop&w=800&q=85`;
}

// PRODUCT RENDERING

function render() {

  if (!productsContainer || !searchInput) {
    console.error("Rig-Forge: Required HTML elements are missing.");
    return;
  }

  const query = searchInput.value.trim().toLowerCase();

  const filteredItems = items.filter(item => {

    const matchesCategory =
      category === "All" || item.c === category;

    const matchesSearch =
      `${item.n} ${item.c} ${item.d}`
        .toLowerCase()
        .includes(query);

    return matchesCategory && matchesSearch;

  });

  if (filteredItems.length === 0) {

    productsContainer.innerHTML = `
      <div class="empty-state">
        <h3>No gaming gear found</h3>
        <p>Try another search or category.</p>
      </div>
    `;

    return;
  }

  productsContainer.innerHTML = filteredItems.map(item => {

    const quantity = cart.get(item.id) || 0;

    return `
      <article class="product" data-id="${item.id}">

        <div class="photo">

          <img
            src="${getImage(item)}"
            alt="${item.n}"
            loading="lazy"
            onerror="this.onerror=null;this.src='https://placehold.co/600x400/101713/9cff32?text=Rig-Forge+Gaming';"
          >

        </div>

        <div class="info">

          <div class="tag">${item.c}</div>

          <h3>${item.n}</h3>

          <div class="desc">
            ${item.d}
          </div>

          <div class="buyrow">

            <span class="price">${item.p}</span>

            <button
              class="add"
              type="button"
              onclick="addCart(${item.id})"
              aria-label="Add ${item.n} to cart"
            >
              ${quantity > 0 ? `ADD + (${quantity})` : "ADD +"}
            </button>

          </div>

        </div>

      </article>
    `;

  }).join("");

}

// CART FUNCTIONALITY

function addCart(id) {

  const item = items.find(product => product.id === id);

  if (!item) return;

  const currentQuantity = cart.get(id) || 0;

  cart.set(id, currentQuantity + 1);

  updateCart();

  render();

  showNotification(`${item.n} added to cart!`);

}

// UPDATE CART COUNTERS

function updateCart() {

  let total = 0;

  cart.forEach(quantity => {
    total += quantity;
  });

  const count = document.getElementById("count");
  const cartCount = document.getElementById("cartcount");

  if (count) count.textContent = total;

  if (cartCount) cartCount.textContent = total;

}

// NOTIFICATION SYSTEM

function showNotification(message) {

  let notification = document.getElementById("notification");

  if (!notification) {

    notification = document.createElement("div");

    notification.id = "notification";

    notification.style.cssText = `
      position: fixed;
      top: 95px;
      right: 20px;
      z-index: 999;
      background: #9cff32;
      color: #071006;
      padding: 14px 20px;
      border-radius: 9px;
      font-weight: 900;
      box-shadow: 0 8px 30px #0008;
      transition: opacity .3s ease;
    `;

    document.body.appendChild(notification);

  }

  notification.textContent = message;
  notification.style.opacity = "1";

  clearTimeout(notification.hideTimer);

  notification.hideTimer = setTimeout(() => {
    notification.style.opacity = "0";
  }, 2200);

}

// CATEGORY FILTERS

document.querySelectorAll(".filter").forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".filter").forEach(filter => {
      filter.classList.remove("active");
    });

    button.classList.add("active");

    category = button.dataset.cat;

    render();

  });

});

// LIVE SEARCH

if (searchInput) {
  searchInput.addEventListener("input", render);
}

// INITIALIZE STORE

render();
updateCart();
