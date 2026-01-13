$(document).ready(function() {
    const $cartBtnDesktop = $('#cartBtnDesktop');
    const $cartBtnMobile = $('#cartBtnMobile');
    const $cartPanel = $('#cartPanel');
    const $closeCart = $('#closeCart');
    const $cartItemsContainer = $('.cart-items');
    const $cartTotalElement = $('#cartTotal');

    // --- APERTURA Y CIERRE ---

    function openCart() {
        $cartPanel.addClass('open');
    }

    $cartBtnDesktop.on('click', openCart);
    $cartBtnMobile.on('click', openCart);

    $closeCart.on('click', function() {
        $cartPanel.removeClass('open');
    });

    $(document).on('click', function(e) {
        const clickedInsidePanel = $cartPanel.is(e.target) || $cartPanel.has(e.target).length > 0;
        const clickedOnCartBtn = $cartBtnDesktop.is(e.target) || $cartBtnDesktop.has(e.target).length > 0 ||
                                 $cartBtnMobile.is(e.target) || $cartBtnMobile.has(e.target).length > 0;

        if (!clickedInsidePanel && !clickedOnCartBtn) {
            $cartPanel.removeClass('open');
        }
    });

    // --- ELIMINAR Y CALCULAR ---

    function updateCartTotal() {
        let total = 0;
        const $items = $('.cart-item');

        $items.each(function() {
            const priceText = $(this).find('.product-price').text();
            const price = parseFloat(priceText.replace('€', '').replace(/\./g, '').replace(',', '.').trim());
            const quantity = parseInt($(this).find('.quantity').text());
            
            total += price * quantity;
        });

        if ($cartTotalElement.length) {
            $cartTotalElement.text(total.toLocaleString('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) + ' €');
        }
    }

    $cartItemsContainer.on('click', '.delete-item', function(e) {
        e.stopPropagation();
        $(this).closest('.cart-item').remove();
        updateCartTotal();
    });

    // --- AÑADIR ---

    function addProductToCart(name, price, imgSrc) {
        const newCartItem = `
            <div class="cart-item">
                <img src="${imgSrc}" alt="${name}" class="product-img">
                <div class="product-info">
                    <p class="product-name">${name}</p>
                    <p class="product-price">${price}</p>
                </div>
                <div class="quantity">1</div>
                <button class="delete-item" aria-label="Eliminar">
                    <i class="trash-icon"></i>
                </button>
            </div>
        `;

        $cartItemsContainer.append(newCartItem);
        updateCartTotal();
        openCart(); 
    }

    // --- ESCUCHADORES DE EVENTOS (BOTONES) ---

    $(document).on('click', '.cart-icon', function(e) {
        e.stopPropagation();
        const $productCard = $(this).closest('.product-card');
        const name = $productCard.find('.product-title').text();
        const price = $productCard.find('.product-price').text();
        const imgSrc = $productCard.find('img').attr('src');
        addProductToCart(name, price, imgSrc);
    });

    const $mainAddBtn = $('.add-to-cart');
    $mainAddBtn.on('click', function(e) {
        e.stopPropagation();
        const name = "Nixon";
        const price = "269,95 €";
        const imgSrc = "media/img/sillon.webp";
        
        addProductToCart(name, price, imgSrc);
    });
});