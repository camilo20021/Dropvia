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
    iniciarCarrusel();
    configurarMenuHamburguesa();
    actualizarAdminLink();
});

function actualizarAdminLink() {
    const adminLink = document.querySelector('.admin-link');
    if (!adminLink) return;
    const isAdmin = localStorage.getItem('ceurbanAdmin') === 'true';
    if (isAdmin) {
        adminLink.classList.remove('hidden');
    } else {
        adminLink.classList.add('hidden');
    }
}

async function cargarProductos() {
    try {
        const respuesta = await fetch('data/productos.json');
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

// Inicia la rotación automática del carrusel
function iniciarCarrusel(interval = 2500, visibleDesktop = 3) {
    const container = document.querySelector('.carrusel-contenedor');
    const track = document.querySelector('.carrusel-imagenes');
    if (!container || !track) return;

    let items = Array.from(track.querySelectorAll('.carrusel-item'));
    if (items.length === 0) return;

    let visible = window.innerWidth < 768 ? 1 : visibleDesktop;
    let index = 0;
    let itemWidth = 0;
    let autoTimer = null;

    function setup() {
        // limpiar clones previos
        const clones = track.querySelectorAll('.clone-item');
        clones.forEach(c => c.remove());

        items = Array.from(track.querySelectorAll('.carrusel-item'));
        visible = window.innerWidth < 768 ? 1 : visibleDesktop;
        itemWidth = container.clientWidth / visible;

        // fijar ancho de cada item
        items.forEach(it => {
            it.style.flex = `0 0 ${itemWidth}px`;
            it.style.width = `${itemWidth}px`;
        });

        // clonar primeros visibles para bucle infinito
        for (let i = 0; i < visible; i++) {
            const clone = items[i].cloneNode(true);
            clone.classList.add('clone-item');
            // asegurar que el clone tenga el mismo tamaño
            clone.style.flex = `0 0 ${itemWidth}px`;
            clone.style.width = `${itemWidth}px`;
            track.appendChild(clone);
        }

        // reset posición
        track.style.transition = 'none';
        index = 0;
        track.style.transform = `translateX(0px)`;
        // forzar reflow
        void track.offsetWidth;
        track.style.transition = 'transform 0.6s ease';
    }

    function next() {
        index++;
        track.style.transform = `translateX(${-index * itemWidth}px)`;

        const totalOriginal = items.length;
        // cuando lleguemos al final (mostrando clones), saltar al inicio sin animación
        if (index >= totalOriginal) {
            setTimeout(() => {
                track.style.transition = 'none';
                index = 0;
                track.style.transform = `translateX(0px)`;
                // reactivar transición
                void track.offsetWidth;
                track.style.transition = 'transform 0.6s ease';
            }, 620);
        }
    }

    function start() {
        stop();
        autoTimer = setInterval(next, interval);
    }

    function stop() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    // manejar redimensionado
    let resizeTimer = null;
    function onResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setup();
        }, 150);
    }

    // inicializar
    setup();
    start();

    // pausar al hover
    container.addEventListener('mouseenter', stop);
    container.addEventListener('mouseleave', start);
    window.addEventListener('resize', onResize);
}

// Maneja el botón hamburguesa en mobile
function configurarMenuHamburguesa() {
    const toggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.navbar a');
    if (!toggle || !header) return;

    toggle.addEventListener('click', () => {
        header.classList.toggle('open');
        // cambiar icono simple
        toggle.textContent = header.classList.contains('open') ? '✖' : '☰';
    });

    // cerrar al pulsar un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (header.classList.contains('open')) {
                header.classList.remove('open');
                toggle.textContent = '☰';
            }
        });
    });
}