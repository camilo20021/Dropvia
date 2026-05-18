document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("summary-items-container");
    const subtotalEl = document.getElementById("checkout-subtotal");
    const totalEl = document.getElementById("checkout-total");
    const formulario = document.getElementById("payment-form");

    // Traer el carrito guardado
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        if(container) {
            container.innerHTML = `<p style="color: #666; text-align: center; padding: 20px;">No tienes productos seleccionados.</p>`;
        }
        return;
    }

    // Dibujar cada elemento en la interfaz de pago
    let acumulado = 0;
    container.innerHTML = "";

    carrito.forEach(producto => {
        const itemRow = document.createElement("div");
        itemRow.style.display = "flex";
        itemRow.style.alignItems = "center";
        itemRow.style.gap = "15px";
        itemRow.style.marginBottom = "15px";
        itemRow.style.background = "rgba(255,255,255,0.02)";
        itemRow.style.padding = "10px";
        itemRow.style.borderRadius = "6px";
        itemRow.style.border = "1px solid rgba(255,255,255,0.05)";

        itemRow.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
            <div style="flex: 1;">
                <h4 style="font-size: 14px; margin-bottom: 2px; color: white;">${producto.nombre}</h4>
                <p style="color: #ff6600; font-size: 13px; font-weight: bold;">$${producto.precio.toLocaleString()}</p>
            </div>
        `;
        container.appendChild(itemRow);
        acumulado += producto.precio;
    });

    // Pintar totales calculados
    subtotalEl.textContent = `$${acumulado.toLocaleString()}`;
    totalEl.textContent = `$${acumulado.toLocaleString()}`;

    // Captura del envío del formulario
    if(formulario) {
        formulario.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("¡Pedido recibido con éxito! Muchas gracias por comprar en C&E Urban.");
            localStorage.removeItem("carrito"); // Limpiamos el carrito al finalizar
            window.location.href = "index.html"; // Redirección a Home
        });
    }
});