const products = [
    { id: 1, name: "Batom Velvet Rose", price: 39.90, icon: "💄" },
    { id: 2, name: "Gloss Crystal Shine", price: 32.90, icon: "💋" },
    { id: 3, name: "Sérum Vitamina C", price: 59.90, icon: "🧴" },
    { id: 4, name: "Hidratante Facial", price: 48.90, icon: "✨" },
    { id: 5, name: "Máscara de Cílios", price: 44.90, icon: "👁️" },
    { id: 6, name: "Perfume Rose Garden", price: 119.90, icon: "🌹" },
    { id: 7, name: "Óleo Capilar", price: 42.90, icon: "💆" },
    { id: 8, name: "Paleta Nude", price: 79.90, icon: "🎨" }
  ];
  
  let cartItems = [];
  
  const productsArea = document.getElementById("products");
  const search = document.getElementById("search");
  const cartBox = document.getElementById("cart");
  const cartItemsArea = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const total = document.getElementById("total");
  
  // Formata o preço
  function money(value) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }
  
  // Mostra os produtos
  function showProducts(list = products) {
    productsArea.innerHTML = "";
  
    list.forEach(product => {
      productsArea.innerHTML += `
        <div class="product">
          <div class="product-image">${product.icon}</div>
  
          <h3>${product.name}</h3>
  
          <span class="price">
            ${money(product.price)}
          </span>
  
          <button onclick="addToCart(${product.id})">
            Adicionar
          </button>
        </div>
      `;
    });
  }
  
  // Adiciona produto ao carrinho
  function addToCart(id) {
    const item = cartItems.find(item => item.id === id);
  
    if (item) {
      item.quantity++;
    } else {
      cartItems.push({
        id: id,
        quantity: 1
      });
    }
  
    showCart();
  }
  
  // Mostra o carrinho
  function showCart() {
    cartItemsArea.innerHTML = "";
  
    let totalPrice = 0;
    let totalQuantity = 0;
  
    if (cartItems.length === 0) {
      cartItemsArea.innerHTML = "<p>Seu carrinho está vazio.</p>";
    }
  
    cartItems.forEach(item => {
      const product = products.find(product => product.id === item.id);
  
      const subtotal = product.price * item.quantity;
  
      totalPrice += subtotal;
      totalQuantity += item.quantity;
  
      cartItemsArea.innerHTML += `
        <div class="cart-item">
  
          <div>
            <strong>${product.name}</strong>
            <br>
            ${money(subtotal)}
          </div>
  
          <div>
            <button onclick="changeQuantity(${product.id}, -1)">
              −
            </button>
  
            ${item.quantity}
  
            <button onclick="changeQuantity(${product.id}, 1)">
              +
            </button>
          </div>
  
        </div>
      `;
    });
  
    total.textContent = money(totalPrice);
    cartCount.textContent = totalQuantity;
  }
  
  // Altera quantidade
  function changeQuantity(id, amount) {
    const item = cartItems.find(item => item.id === id);
  
    if (!item) {
      return;
    }
  
    item.quantity += amount;
  
    if (item.quantity <= 0) {
      cartItems = cartItems.filter(item => item.id !== id);
    }
  
    showCart();
  }
  
  // Pesquisa produtos
  search.addEventListener("input", function () {
    const text = search.value.toLowerCase();
  
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(text)
    );
  
    showProducts(filteredProducts);
  });
  
  // Abrir carrinho
  document.getElementById("cartButton").addEventListener("click", function () {
    cartBox.classList.add("open");
  });
  
  // Fechar carrinho
  document.getElementById("closeCart").addEventListener("click", function () {
    cartBox.classList.remove("open");
  });
  
  // Finalizar compra
  document.getElementById("checkout").addEventListener("click", function () {
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
  
    alert("Pedido realizado com sucesso! 💕");
  
    cartItems = [];
  
    showCart();
  
    cartBox.classList.remove("open");
  });
  
  // Inicia o site
  showProducts();
  showCart();