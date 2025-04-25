const menuItems = {
  drinks: [
    { name: "Coca-Cola®", price: 85.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/8512e529-2d14-42a9-0dfc-8f7399139400/f=avif,w=960,q=80" },
    { name: "Diet Dr Pepper®", price: 88.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/16e83fd2-c4b9-4332-f77e-c3be98289e00/f=avif,w=960,q=80" },
    { name: "Sprite®", price: 85.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/b9aceef5-2f42-4253-d359-8435b30e6600/f=avif,w=960,q=80" },
    { name: "Hi-C Flashin' Fruit Punch®", price: 90.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/47d2d95a-83df-4c8c-0365-f3bf9c0d4200/f=avif,w=960,q=80" },
    { name: "Minute Maid® Zero Sugar", price: 80.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/cbb82867-d1cf-47df-3779-bc193cbd3600/f=avif,w=960,q=80" },
  ],
  desserts: [
    { name: "Andes Mint Chocolate Shake", price: 180.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/bf9f1d98-1053-4291-5dad-6997f45db200/f=avif,w=960,q=80" },
    { name: "Vanilla Shake", price: 180.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/9d8badff-7dc3-4aae-ffad-133656b9b100/f=avif,w=960,q=80" },
    { name: "Chocolate Shake", price: 175.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/50081b55-3b84-4988-32c0-854709ffae00/f=avif,w=960,q=80" },
    { name: "Apple Turnover", price: 163.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/73ff9253-cf09-41d5-1182-175c4f347900/f=avif,w=960,q=80" },
    { name: "Cherry Turnover", price: 163.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/fb93d263-e3a2-4bca-a76e-8efa106b8f00/f=avif,w=960,q=80" },
  ],
  meals: [
    { name: "Ham & Swiss Melt Meal", price: 350.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/ae891047-9a95-4f88-ba0a-841f47ece000/f=avif,w=960,q=80" },
    { name: "Crispy Fish Sandwich Meal", price: 298.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/c80d7ea6-0633-48e6-92e3-3605a9fc1800/f=avif,w=960,q=80" },
    { name: "Deluxe Burger Meal", price: 390.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/3d8ed472-5b3d-4ab2-7945-43842d245800/f=avif,w=960,q=80" },
    { name: "BBQ Bacon Burger Meal", price: 310.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/34d4505d-08c8-462a-38aa-cf7d6b2e2100/f=avif,w=960,q=80" },
    { name: "Big Cheesy Bacon Burger Meal", price: 270.00, img: "https://imagedelivery.net/cyuZzWywsYlsu7DPQZIgOg/d14c1a49-0512-4a9c-6516-02fb689f8500/f=avif,w=960,q=80" },
  ],
};

let order = [];

function renderMenu() {
const menuContainer = document.getElementById("menu");
menuContainer.innerHTML = "";

for (const category in menuItems) {
  const categoryDiv = document.createElement("div");
  categoryDiv.classList.add("category");

  const title = document.createElement("h2");
  title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
  title.style.textAlign = "center";
  title.style.marginBottom = "20px";
  categoryDiv.appendChild(title);

  const itemsDiv = document.createElement("div");
  itemsDiv.classList.add("items");

  menuItems[category].forEach((item) => {
    const btn = document.createElement("button");
    btn.classList.add("item-btn");
    btn.onclick = () => addToOrder(item);

    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.name;

    const name = document.createElement("div");
    name.textContent = `${item.name} - ₱${item.price.toFixed(2)}`;

    btn.appendChild(img);
    btn.appendChild(name);
    itemsDiv.appendChild(btn);
  });

  categoryDiv.appendChild(itemsDiv);
  menuContainer.appendChild(categoryDiv);
}
}
function addToOrder(item) {
  order.push(item);
  updateSummary();
}

function removeFromOrder(index) {
  order.splice(index, 1);
  updateSummary();
}

function updateSummary() {
  const summaryList = document.getElementById("order-summary");
  summaryList.innerHTML = "";
  let total = 0;

  order.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₱${item.price.toFixed(2)} 
      <button onclick="removeFromOrder(${index})" style="margin-left: 10px; color: red; border: none; background: transparent; cursor: pointer;">❌</button>
    `;
    summaryList.appendChild(li);
    total += item.price;
  });

  const currentHour = new Date().getHours();
  let discount = 0;
  if (currentHour >= 14 && currentHour <= 16) {
    discount = 0.1;
  }

  total -= total * discount;
  document.getElementById("total").textContent = total.toFixed(2);
}

function pay(method) {
  if (order.length === 0) {
    alert("Please select items before paying.");
    return;
  }

  const loadingDiv = document.getElementById("loading");
  loadingDiv.style.display = "block";

  setTimeout(() => {
    loadingDiv.style.display = "none";

    const receiptDiv = document.getElementById("receipt");
    receiptDiv.style.display = "block";
    receiptDiv.innerHTML = `
      <h3>🧾 Receipt</h3>
      <p>Payment Method: <strong>${method}</strong></p>
      <ul>${order.map(item => `<li>${item.name} - ₱${item.price.toFixed(2)}</li>`).join("")}</ul>
      <p><strong>Total Paid:</strong> ₱${order.reduce((t, item) => t + item.price, 0).toFixed(2)}</p>
      <p>✅ Thank you for your order!</p>
    `;
  }, 3000);
}

function startNewOrder() {
  order = [];
  updateSummary();
  document.getElementById("receipt").style.display = "none";
  renderMenu();
}

renderMenu();