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