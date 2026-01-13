$(document).ready(function () {
  const animationDuration = 0.4; // segundos

  $(".tab").on("click", function () {
    const category = $(this).data("category");
    const $categoryDiv = $(".category." + category);

    if ($categoryDiv.hasClass("active")) {
      gsap.to($categoryDiv, {
        height: 0,
        autoAlpha: 0,
        duration: animationDuration,
        ease: "power2.inOut",
        onComplete: () => $categoryDiv.removeClass("active")
      });
      $(this).removeClass("active");
      return;
    }

    $(".tab").removeClass("active");
    $(".category.active").each(function () {
      gsap.to(this, {
        height: 0,
        autoAlpha: 0,
        duration: animationDuration,
        ease: "power2.inOut",
        onComplete: () => $(this).removeClass("active")
      });
    });

    $(this).addClass("active");
    $categoryDiv.addClass("active");

    let autoHeight = $categoryDiv.css("height", "auto").height();
    $categoryDiv.height(0);

    gsap.to($categoryDiv, {
      height: autoHeight,
      autoAlpha: 1,
      duration: animationDuration,
      ease: "power2.inOut"
    });

    if (category === "paypal") {
      setTimeout(() => {
        window.location.href = "https://www.paypal.com/checkoutnow?token=65U984472L9049229";
      }, animationDuration * 1000);
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {

  if (window.innerWidth < 991) return;

  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: "power3.out"
    }
  });

  tl.from(".checkout-left", {
    x: -80,
    opacity: 0
  })

  .from(".checkout-product", {
    x: -40,
    opacity: 0,
    stagger: 0.15
  }, "-=0.4")

  .from(".product-total, .checkout-finalizar", {
    y: 40,
    opacity: 0
  }, "-=0.3")

  .from(".checkout-right", {
    x: 80,
    opacity: 0
  }, "-=0.8")

  .from(".checkout-form .input-group", {
    y: 30,
    opacity: 0,
    stagger: 0.08
  }, "-=0.4")

  .from(".tabs .tab", {
    scale: 0.9,
    opacity: 0,
    stagger: 0.1
  }, "-=0.3");

});

document.addEventListener('DOMContentLoaded', () => {
    const totalContainer = document.querySelector('.product-total strong');
    const deleteButtons = document.querySelectorAll('.delete-item-compra');

    
    const calcularTotal = () => {
        const precios = document.querySelectorAll('.product-info .price');
        let total = 0;

        precios.forEach(precioElemento => {
            let precioTexto = precioElemento.textContent
                .replace('€', '')
                .replace('.', '') 
                .replace(',', '.')
                .trim();
            
            total += parseFloat(precioTexto) || 0;
        });

        if (totalContainer) {
            totalContainer.textContent = total.toLocaleString('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) + ' €';
        }
    };

    document.addEventListener('click', (event) => {
        const btn = event.target.closest('.delete-item-compra');
        
        if (btn) {
            const productSection = btn.closest('.checkout-product');
            
            if (productSection) {
                productSection.remove();
                
                calcularTotal();
            }
        }
    });

    calcularTotal();
});

