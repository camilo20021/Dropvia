const botonesCarrito = document.querySelectorAll(".add-cart");

const contador = document.getElementById("cart-count");

const cartItems = document.querySelector(".cart-items");

const total = document.getElementById("cart-total");

const cartIcon = document.querySelector(".cart-icon");

const cartPanel = document.querySelector(".cart-panel");

const closeCart = document.querySelector(".close-cart");

let cantidad = 0;

let totalCompra = 0;
let carrito = [];
/* ABRIR PANEL */

cartIcon.addEventListener("click", () => {

    cartPanel.classList.add("active");

});

/* CERRAR PANEL */

closeCart.addEventListener("click", () => {

    cartPanel.classList.remove("active");

});

/* AGREGAR PRODUCTOS */

botonesCarrito.forEach(boton => {

    boton.addEventListener("click", () => {

        /* DATOS */

        const nombre = boton.dataset.name;

        const precio = parseInt(boton.dataset.price);

        const imagen = boton.dataset.img;
        carrito.push({

        nombre,
    precio,
    imagen

});

/* GUARDAR */

localStorage.setItem(

    "carrito",

    JSON.stringify(carrito)

);

        /* CONTADOR */

        cantidad++;

        contador.textContent = cantidad;

        /* TOTAL */

        totalCompra += precio;

        total.textContent = `$${totalCompra.toLocaleString()}`;

        /* ELIMINAR TEXTO VACIO */

        const emptyCart = document.querySelector(".empty-cart");

        if(emptyCart){

            emptyCart.remove();

        }

        /* CREAR ITEM */

        const item = document.createElement("div");

        item.classList.add("cart-item");

        item.innerHTML = `

            <img src="${imagen}" alt="${nombre}">

            <div>

                <h4>${nombre}</h4>

                <p>$${precio.toLocaleString()}</p>

            </div>

            <button class="remove-item">
                ✖
            </button>

        `;

        /* AGREGAR */

        cartItems.appendChild(item);

        /* ELIMINAR ITEM */

        const removeBtn = item.querySelector(".remove-item");

        removeBtn.addEventListener("click", () => {

            item.remove();

            cantidad--;

            contador.textContent = cantidad;

            totalCompra -= precio;

            total.textContent = `$${totalCompra.toLocaleString()}`;

            /* CARRITO VACIO */

            if(cantidad === 0){

                cartItems.innerHTML = `

                    <p class="empty-cart">
                        Tu carrito está vacío
                    </p>

                `;

            }

        });

    });

});