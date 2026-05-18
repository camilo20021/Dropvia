const toast = document.querySelector(".toast");
const contador = document.getElementById("cart-count");
const cartItems = document.querySelector(".cart-items");
const total = document.getElementById("cart-total");
const cartIcon = document.querySelector(".cart-icon");
const cartPanel = document.querySelector(".cart-panel");
const closeCart = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let cantidad = carrito.length;
let totalCompra = carrito.reduce((sum, item) => sum + item.precio, 0);

function actualizarInterfazInicial() {
    if(!contador || !total || !cartItems) return;
    contador.textContent = cantidad;
    total.textContent = `$${totalCompra.toLocaleString()}`;
    
    if (carrito.length > 0) {
        cartItems.innerHTML = "";
        carrito.forEach((prod, index) => {
            crearItemEnCarritoHTML(prod.nombre, prod.precio, prod.imagen, index);
        });
    }
}

if(cartIcon) cartIcon.addEventListener("click", () => cartPanel.classList.add("active"));
if(closeCart) closeCart.addEventListener("click", () => cartPanel.classList.remove("active"));

if(clearCartBtn) clearCartBtn.addEventListener("click", () => {
    const confirmar = confirm('¿Deseas vaciar todo el carrito?');
    if (!confirmar) return;

    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));

    cantidad = 0;
    contador.textContent = cantidad;

    totalCompra = 0;
    if (total) total.textContent = `$0`;

    if (cartItems) cartItems.innerHTML = `<p class="empty-cart">Tu carrito está vacío</p>`;

    if (toast) {
        toast.textContent = 'Carrito vaciado';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2200);
    }
});

document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("add-cart")) {
        const boton = e.target;

        if(toast) {
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 2500);
        }

        const nombre = boton.dataset.name;
        const precio = parseInt(boton.dataset.price);
        const imagen = boton.dataset.img;

        carrito.push({ nombre, precio, imagen });
        localStorage.setItem("carrito", JSON.stringify(carrito));

        cantidad++;
        contador.textContent = cantidad;
        totalCompra += precio;
        total.textContent = `$${totalCompra.toLocaleString()}`;

        const emptyCart = document.querySelector(".empty-cart");
        if(emptyCart) emptyCart.remove();

        crearItemEnCarritoHTML(nombre, precio, imagen, carrito.length - 1);
    }
});

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

    item.querySelector(".remove-item").addEventListener("click", () => {
        cantidad--;
        contador.textContent = cantidad;
        totalCompra -= precio;
        total.textContent = `$${totalCompra.toLocaleString()}`;

        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        item.remove();

        // Re-indexar los elementos restantes visualmente
        const itemsRestantes = cartItems.querySelectorAll(".cart-item");
        itemsRestantes.forEach((el, idx) => el.setAttribute("data-index", idx));

        if (carrito.length === 0) {
            cartItems.innerHTML = `<p class="empty-cart">Tu carrito está vacío</p>`;
        }
    });
}

document.addEventListener("DOMContentLoaded", actualizarInterfazInicial);