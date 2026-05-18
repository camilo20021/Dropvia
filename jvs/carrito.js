const botonesCarrito = document.querySelectorAll(".add-cart");
const toast = document.querySelector(".toast");
const contador = document.getElementById("cart-count");
const cartItems = document.querySelector(".cart-items");
const total = document.getElementById("cart-total");
const cartIcon = document.querySelector(".cart-icon");
const cartPanel = document.querySelector(".cart-panel");
const closeCart = document.querySelector(".close-cart");

// Corrección: Cargar datos existentes del localStorage para que no se borren al recargar
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let cantidad = carrito.length;
let totalCompra = carrito.reduce((sum, item) => sum + item.price, 0);

// Renderizar el estado inicial del carrito si ya tiene cosas guardadas
function actualizarInterfazInicial() {
    contador.textContent = cantidad;
    total.textContent = `$${totalCompra.toLocaleString()}`;
    if (carrito.length > 0) {
        const emptyCart = document.querySelector(".empty-cart");
        if (emptyCart) emptyCart.remove();
        
        carrito.forEach((prod, index) => {
            crearItemEnCarritoHTML(prod.nombre, prod.precio, prod.imagen, index);
        });
    }
}

/* ABRIR Y CERRAR PANEL */
cartIcon.addEventListener("click", () => cartPanel.classList.add("active"));
closeCart.addEventListener("click", () => cartPanel.classList.remove("active"));

/* AGREGAR PRODUCTOS */
botonesCarrito.forEach(boton => {
    boton.addEventListener("click", () => {
        // Mostrar Toast
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2500);

        // Obtener Datos del botón clicado
        const nombre = boton.dataset.name;
        const precio = parseInt(boton.dataset.price);
        const imagen = boton.dataset.img;

        if(!nombre || isNaN(precio)) return; // Validación por si faltan atributos data

        // Guardar en Array y LocalStorage
        carrito.push({ nombre, precio, imagen });
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Actualizar totales de la barra superior
        cantidad++;
        contador.textContent = cantidad;
        totalCompra += precio;
        total.textContent = `$${totalCompra.toLocaleString()}`;

        // Quitar texto de carrito vacío
        const emptyCart = document.querySelector(".empty-cart");
        if (emptyCart) emptyCart.remove();

        // Crear elemento en la vista
        crearItemEnCarritoHTML(nombre, precio, imagen, carrito.length - 1);
    });
});

/* FUNCIÓN PARA RENDERIZAR LOS PRODUCTOS */
function crearItemEnCarritoHTML(nombre, precio, imagen, index) {
    const item = document.createElement("div");
    item.classList.add("cart-item");
    item.setAttribute("data-index", index);
    item.innerHTML = `
        <img src="${imagen}" alt="${nombre}">
        <div>
            <h4>${nombre}</h4>
            <p>$${precio.toLocaleString()}</p>
        </div>
        <button class="remove-item">✖</button>
    `;

    cartItems.appendChild(item);

    // Lógica para eliminar el producto
    item.querySelector(".remove-item").addEventListener("click", () => {
        // Restar totales globales
        cantidad--;
        contador.textContent = cantidad;
        totalCompra -= precio;
        total.textContent = `$${totalCompra.toLocaleString()}`;

        // Remover del array y actualizar LocalStorage
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Remover visualmente del HTML
        item.remove();

        // Si se vacía por completo, volver a poner el mensaje
        if (carrito.length === 0) {
            cartItems.innerHTML = `<p class="empty-cart">Tu carrito está vacío</p>`;
        }
    });
}

// Ejecutar al cargar la página index.html
actualizarInterfazInicial();