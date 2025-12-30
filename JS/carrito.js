const cartBtnDesktop = document.getElementById('cartBtnDesktop');
const cartBtnMobile = document.getElementById('cartBtnMobile');
const cartPanel = document.getElementById('cartPanel');
const closeCart = document.getElementById('closeCart');

// --- FUNCIONES DE APERTURA Y CIERRE ---

function openCart() {
  cartPanel.classList.add('open');
}

cartBtnDesktop?.addEventListener('click', openCart);
cartBtnMobile?.addEventListener('click', openCart);

closeCart?.addEventListener('click', () => {
  cartPanel.classList.remove('open');
});

// Cierre al hacer clic fuera
document.addEventListener('click', (e) => {
  const clickedInsidePanel = cartPanel && cartPanel.contains(e.target);
  const clickedOnCartBtn = [cartBtnDesktop, cartBtnMobile].some(btn => btn && (e.target === btn || btn.contains(e.target)));

  if (!clickedInsidePanel && !clickedOnCartBtn) {
    cartPanel?.classList.remove('open');
  }
});

// --- LÓGICA: ELIMINAR Y CALCULAR ---

const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.getElementById('cartTotal'); // Asegúrate de que en tu HTML diga id="cartTotal"

function updateCartTotal() {
    let total = 0;
    const items = document.querySelectorAll('.cart-item');

    items.forEach(item => {
        const priceText = item.querySelector('.product-price').textContent;
        // Limpiamos el texto para convertirlo a número funcional
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

// Evento para eliminar productos sin cerrar el panel
cartItemsContainer?.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-item');
    
    if (deleteBtn) {
        // ESTA LÍNEA ES LA CLAVE: 
        // Evita que el clic llegue al document y ejecute la función de cerrar panel
        e.stopPropagation(); 

        const itemToRemove = deleteBtn.closest('.cart-item');
        itemToRemove.remove();
        
        updateCartTotal();
    }
});