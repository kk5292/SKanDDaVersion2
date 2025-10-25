document.addEventListener("DOMContentLoaded", () => {

  const categories = [
    {
      name: "Food & Grocery",
      subcategories: [
        {
          name: "Snacks",
          products: [
            { name: "Groundnut Chikki", img: "groundnut-chikki.png", priceAED: 6.5, weight: "100 g", benefit: "High in plant protein & healthy fats for sustained energy", status: "in-stock" },
            { name: "Sesame Chikki – Black", img: "sesame-groundnut-chikki.png", priceAED: 5, weight: "50 g", benefit: "Rich in calcium & iron, supports bone strength", status: "in-stock" },
            { name: "Split Gram Chikki Balls", img: "splitgram-groundnut-chikki.png", priceAED: 7, weight: "100 g", benefit: "Packed with protein & fiber; good for digestion", status: "in-stock" },
            { name: "Nilavembu Groundnut Chikki", img: "nilavembu-groundnut-chikki.png", priceAED: 11, weight: "200 g", benefit: "Nilavembu boosts immunity & detoxifies naturally", status: "in-stock" },
            { name: "Moringa Groundnut Chikki", img: "moringa-groundnut-chikki.png", priceAED: 12, weight: "200 g", benefit: "Moringa adds antioxidants, vitamins & anti-inflammatory nutrients", status: "in-stock" }
          ]
        },
        {
          name: "Grocery",
          products: [
            { name: "Grocery Coming Soon", img: "grocery-coming.png", priceAED: 0, weight: "-", benefit: "-", status: "coming-soon" }
          ]
        }
      ]
    },
    {
      name: "Return Gifts",
      subcategories: [
        {
          name: "Return Gifts",
          products: [
            { name: "Return Gifts Coming Soon", img: "return-gifts-coming.png", priceAED: 0, weight: "-", benefit: "-", status: "coming-soon" }
          ]
        }
      ]
    },
    {
      name: "Fashion",
      subcategories: [
        {
          name: "Kids Wear",
          products: [
            { name: "Kids Wear Coming Soon", img: "kids-wear-coming.png", priceAED: 0, weight: "-", benefit: "-", status: "coming-soon" }
          ]
        },
        {
          name: "Girls",
          products: [
            { name: "Tops", img: "girls-tops-coming.png", priceAED: 0, weight: "-", benefit: "-", status: "coming-soon" },
            { name: "Sarees", img: "girls-sarees-coming.png", priceAED: 0, weight: "-", benefit: "-", status: "coming-soon" }
          ]
        }
      ]
    }
  ];

  const container = document.querySelector(".product-sections");
  if (!container) return;

  categories.forEach(category => {
    const catSection = document.createElement("div");
    catSection.className = "category-section fade-up";

    const catTitle = document.createElement("h2");
    catTitle.textContent = category.name;
    catSection.appendChild(catTitle);

    category.subcategories.forEach(sub => {
      const subDiv = document.createElement("div");
      subDiv.className = "subcategory";

      const subTitle = document.createElement("h3");
      subTitle.textContent = sub.name;
      subDiv.appendChild(subTitle);

      const grid = document.createElement("div");
      grid.className = "product-grid";

      sub.products.forEach(prod => {
        const card = document.createElement("div");
        card.className = `product-card ${prod.status}`;

        const imgDiv = document.createElement("div");
        imgDiv.className = "product-image-container";
        const img = document.createElement("img");
        img.src = `assets/${prod.img}`;
        img.alt = prod.name;
        imgDiv.appendChild(img);

        const statusDiv = document.createElement("div");
        statusDiv.className = prod.status === "in-stock" ? "stock-overlay" : "coming-overlay";
        statusDiv.textContent = prod.status === "in-stock" ? "In Stock" : "Coming Soon";
        imgDiv.appendChild(statusDiv);

        card.appendChild(imgDiv);

        const infoDiv = document.createElement("div");
        infoDiv.className = "product-info";

        const nameEl = document.createElement("h4");
        nameEl.textContent = prod.name;
        infoDiv.appendChild(nameEl);

        if (prod.status === "in-stock") {
          const weightPriceDiv = document.createElement("div");
          weightPriceDiv.className = "weight-price";
          weightPriceDiv.innerHTML = `<span>${prod.weight}</span> | <span>AED ${prod.priceAED.toFixed(2)}</span>`;
          infoDiv.appendChild(weightPriceDiv);

          const benefitEl = document.createElement("p");
          benefitEl.className = "benefit";
          benefitEl.textContent = prod.benefit;
          infoDiv.appendChild(benefitEl);

          const btn = document.createElement("button");
          btn.className = "add-cart";
          btn.textContent = "Add to Cart";
          btn.addEventListener("click", () => addToCart(prod));
          infoDiv.appendChild(btn);
        }

        card.appendChild(infoDiv);
        grid.appendChild(card);
      });

      subDiv.appendChild(grid);
      catSection.appendChild(subDiv);
    });

    container.appendChild(catSection);
  });

  // Fade-in animations
  const faders = document.querySelectorAll(".fade-up");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.2 });
  faders.forEach(f => observer.observe(f));

  updateCartCount();
});

// ===== CART LOGIC =====
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(p => p.name === product.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Added ${product.name} to cart`);
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElems = document.querySelectorAll("#cart-count");
  const totalQty = cart.reduce((a, b) => a + b.quantity, 0);
  cartCountElems.forEach(el => el.textContent = totalQty);
}
