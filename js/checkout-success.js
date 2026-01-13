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





