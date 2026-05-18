document.addEventListener('DOMContentLoaded', async () => {
    const productosGrid = document.getElementById('productos-container');
    const searchInput = document.getElementById('search-input');
    const categoria = productosGrid?.dataset.category || 'todos';

    const productos = await cargarProductos();
    mostrarProductos(productos, categoria);

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            mostrarProductos(productos, categoria, e.target.value);
        });
    }
});

async function cargarProductos() {
    try {
        const respuesta = await fetch('data/productos.json');
        return await respuesta.json();
    } catch (error) {
        console.error('Error cargando productos:', error);
        return [];
    }
}

function mostrarProductos(productos, categoria = 'todos', filtro = '') {
    const productosGrid = document.getElementById('productos-container');
    if (!productosGrid) return;

    let lista = productos;
    if (categoria !== 'todos') {
        lista = lista.filter(p => p.categoria === categoria);
    }

    if (filtro) {
        const texto = filtro.toLowerCase().trim();
        lista = lista.filter(p => p.nombre.toLowerCase().includes(texto));
    }

    if (lista.length === 0) {
        productosGrid.innerHTML = '<p style="color: #ccc; grid-column: 1/-1; text-align: center;">No se encontraron productos.</p>';
        return;
    }

    productosGrid.innerHTML = '';
    lista.forEach(producto => {
        const card = document.createElement('article');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio.toLocaleString()}</p>
            <button class="add-cart" data-name="${producto.nombre}" data-price="${producto.precio}" data-img="${producto.imagen_carrito}">Agregar al carrito</button>
        `;
        productosGrid.appendChild(card);
    });
}
