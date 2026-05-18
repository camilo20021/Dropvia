let productosContainer;
let botonesCategoria;
let searchInput;
let listaProductos = [];

document.addEventListener("DOMContentLoaded", () => {
    productosContainer = document.getElementById("productos-container");
    botonesCategoria = document.querySelectorAll(".btn-categoria");
    searchInput = document.getElementById("search-input");
    
    cargarProductos();
    configurarFiltros();
    configurarBuscador();
});

async function cargarProductos() {
    try {
        const respuesta = await fetch('productos.json');
        listaProductos = await respuesta.json();
        mostrarProductos(listaProductos);
    } catch (error) {
        console.error("Error cargando el JSON:", error);
        if(productosContainer) {
            productosContainer.innerHTML = `<p style="color: red; grid-column: 1/-1; text-align: center;">Error al conectar con el catálogo.</p>`;
        }
    }
}

function mostrarProductos(productos) {
    if (!productosContainer) return;
    productosContainer.innerHTML = "";

    if (productos.length === 0) {
        productosContainer.innerHTML = `<p style="color: #999; grid-column: 1/-1; text-align: center;">No se encontraron productos.</p>`;
        return;
    }

    productos.forEach(producto => {
        const card = document.createElement("article");
        card.classList.add("card");
        
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio.toLocaleString()}</p>
            <button 
                class="add-cart" 
                data-name="${producto.nombre}" 
                data-price="${producto.precio}" 
                data-img="${producto.imagen_carrito}">
                Agregar al carrito
            </button>
        `;
        productosContainer.appendChild(card);
    });
}

function configurarFiltros() {
    if(!botonesCategoria) return;
    botonesCategoria.forEach(boton => {
        boton.addEventListener("click", (e) => {
            botonesCategoria.forEach(btn => btn.style.background = "rgba(255,255,255,0.05)");
            e.target.style.background = "#ff6600";

            const categoriaSeleccionada = e.target.dataset.category;

            if (categoriaSeleccionada === "todos") {
                mostrarProductos(listaProductos);
            } else {
                const productosFiltrados = listaProductos.filter(prod => prod.categoria === categoriaSeleccionada);
                mostrarProductos(productosFiltrados);
            }
        });
    });
}

function configurarBuscador() {
    if(!searchInput) return;
    searchInput.addEventListener("input", (e) => {
        const textoBusqueda = e.target.value.toLowerCase().trim();

        if (textoBusqueda === "") {
            mostrarProductos(listaProductos);
            return;
        }

        const productosFiltrados = listaProductos.filter(producto => {
            return producto.nombre.toLowerCase().includes(textoBusqueda);
        });

        mostrarProductos(productosFiltrados);
    });
}