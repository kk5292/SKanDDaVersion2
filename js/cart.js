document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  if (!cartContainer) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    const table = document.createElement("table");
    table.className = "cart-table";
    table.innerHTML = `
      <thead>
        <tr>
          <th>Product</th>
          <th>Price (AED)</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const tbody = table.querySelector("tbody");

    let total = 0;

    cart.forEach((item, index) => {
      const row = document.createElement("tr");
      const itemTotal = item.priceAED * item.quantity;
      total += itemTotal;

      row.innerHTML = `
        <td>${item.name}<br/><small>${item.weight || ''}</small><br/><small>${item.benefit || ''}</small></td>
        <td>${item.priceAED.toFixed(2)}</td>
        <td>
          <button class="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="increase">+</button>
        </td>
        <td>AED ${itemTotal.toFixed(2)}</td>
      `;
      tbody.appendChild(row);

      row.querySelector(".increase").addEventListener("click", () => {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

      row.querySelector(".decrease").addEventListener("click", () => {
        item.quantity -= 1;
        if (item.quantity <= 0) cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });

    cartContainer.innerHTML = "";
    cartContainer.appendChild(table);

    const totalDiv = document.createElement("div");
    totalDiv.className = "cart-total";
    totalDiv.textContent = `Total: AED ${total.toFixed(2)}`;
    cartContainer.appendChild(totalDiv);

    // Checkout Form
    const form = document.createElement("div");
    form.className = "checkout-form";
    form.innerHTML = `
      <h3>Checkout</h3>
      <input type="text" id="customer-name" placeholder="Full Name" required>
      <input type="email" id="customer-email" placeholder="Email" required>
      <input type="text" id="customer-phone" placeholder="Phone Number" required>
      <textarea id="customer-address" placeholder="Address" rows="3" required></textarea>
      <p>Payment Method: <strong>Cash on Delivery (COD)</strong></p>
      <button id="place-order">Place Order</button>
    `;
    cartContainer.appendChild(form);

    document.getElementById("place-order").addEventListener("click", () => {
      const name = document.getElementById("customer-name").value.trim();
      const email = document.getElementById("customer-email").value.trim();
      const phone = document.getElementById("customer-phone").value.trim();
      const address = document.getElementById("customer-address").value.trim();

      if (!name || !email || !phone || !address) {
        alert("Please fill all checkout fields.");
        return;
      }

      alert(`Order placed successfully!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nTotal: AED ${total.toFixed(2)}\nPayment: COD`);

      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  }

  renderCart();
});
