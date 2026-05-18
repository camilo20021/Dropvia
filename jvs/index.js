const menuToggle = document.querySelector(".menu-toggle");

const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("active");

});
/* ========================= */
/* CARRITO */
/* ========================= */

const botonesCarrito = document.querySelectorAll(".add-cart");

const contador = document.getElementById("cart-count");

let cantidad = 0;

/* RECORRER BOTONES */

botonesCarrito.forEach(boton => {

    boton.addEventListener("click", () => {

        cantidad++;

        contador.textContent = cantidad;

    });

});
const cartIcon = document.querySelector(".cart-icon");

const cartPanel = document.querySelector(".cart-panel");

const closeCart = document.querySelector(".close-cart");

/* ABRIR */

cartIcon.addEventListener("click", () => {

    cartPanel.classList.add("active");

});

/* CERRAR */

closeCart.addEventListener("click", () => {

    cartPanel.classList.remove("active");

});