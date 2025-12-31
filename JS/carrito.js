const cartBtnDesktop = document.getElementById('cartBtnDesktop');
const cartBtnMobile = document.getElementById('cartBtnMobile');
const cartPanel = document.getElementById('cartPanel');
const closeCart = document.getElementById('closeCart');

// --- APERTURA Y CIERRE ---

function openCart() {
  cartPanel.classList.add('open');
}

cartBtnDesktop?.addEventListener('click', openCart);
cartBtnMobile?.addEventListener('click', openCart);

closeCart?.addEventListener('click', () => {
  cartPanel.classList.remove('open');
});

document.addEventListener('click', (e) => {
  const clickedInsidePanel = cartPanel && cartPanel.contains(e.target);
  const clickedOnCartBtn = [cartBtnDesktop, cartBtnMobile].some(btn => btn && (e.target === btn || btn.contains(e.target)));

  if (!clickedInsidePanel && !clickedOnCartBtn) {
    cartPanel?.classList.remove('open');
  }
});

// --- ELIMINAR Y CALCULAR ---

const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.getElementById('cartTotal');

function updateCartTotal() {
    let total = 0;
    const items = document.querySelectorAll('.cart-item');

    items.forEach(item => {
        const priceText = item.querySelector('.product-price').textContent;
        const price = parseFloat(priceText.replace('€', '').replace(/\./g, '').replace(',', '.').trim());
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        
        total += price * quantity;
    });

    if (cartTotalElement) {
        cartTotalElement.textContent = total.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + ' €';
    }
}

cartItemsContainer?.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-item');
    if (deleteBtn) {
        e.stopPropagation(); 
        const itemToRemove = deleteBtn.closest('.cart-item');
        itemToRemove.remove();
        updateCartTotal();
    }
});

// --- AÑADIR ---

function addProductToCart(name, price, imgSrc) {
    const container = document.querySelector('.cart-items');
    const newCartItem = document.createElement('div');
    newCartItem.classList.add('cart-item');

    newCartItem.innerHTML = `
        <img src="${imgSrc}" alt="${name}" class="product-img">
        <div class="product-info">
            <p class="product-name">${name}</p>
            <p class="product-price">${price}</p>
        </div>
        <div class="quantity">1</div>
        <button class="delete-item" aria-label="Eliminar">
            <i class="trash-icon"></i>
        </button>
    `;

    container.appendChild(newCartItem);
    updateCartTotal();
    openCart(); 
}

// --- ESCUCHADORES DE EVENTOS (BOTONES) ---

const addToCartIcons = document.querySelectorAll('.cart-icon');
addToCartIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        const productCard = icon.closest('.product-card');
        const name = productCard.querySelector('.product-title').textContent;
        const price = productCard.querySelector('.product-price').textContent;
        const imgSrc = productCard.querySelector('img').src;
        addProductToCart(name, price, imgSrc);
    });
});

const mainAddBtn = document.querySelector('.add-to-cart');
if (mainAddBtn) {
    mainAddBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const name = "Nixon";
        const price = "269,95 €";
        const imgSrc = "MEDIA/img/sillon.webp";
        
        addProductToCart(name, price, imgSrc);
    });
}