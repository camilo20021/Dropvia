/* ========================= */
/* CARGAR CARRITO */
/* ========================= */

const summaryItems = document.querySelector(".summary-items");

const subtotal = document.getElementById("subtotal");

const total = document.getElementById("total");

/* STORAGE */

const carrito = JSON.parse(

    localStorage.getItem("carrito")

) || [];

let totalCompra = 0;

/* RECORRER */

carrito.forEach(producto => {

    totalCompra += producto.precio;

    /* CREAR ITEM */

    const item = document.createElement("div");

    item.classList.add("summary-item");

    item.innerHTML = `

        <img src="${producto.imagen}">

        <div>

            <h4>${producto.nombre}</h4>

            <p>$${producto.precio.toLocaleString()}</p>

        </div>

    `;

    summaryItems.appendChild(item);

});

/* TOTALES */

subtotal.textContent = `$${totalCompra.toLocaleString()}`;

total.textContent = `$${totalCompra.toLocaleString()}`;