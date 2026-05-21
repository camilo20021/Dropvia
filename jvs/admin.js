document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.getElementById('admin-login-btn');
    const loginSection = document.getElementById('admin-login');
    const dashboardSection = document.getElementById('dashboard-content');
    const ordersTableBody = document.querySelector('#orders-table tbody');
    const totalOrdersEl = document.getElementById('total-orders');
    const totalRevenueEl = document.getElementById('total-revenue');
    const adminLink = document.querySelector('.admin-link');

    const storedAdmin = localStorage.getItem('ceurbanAdmin') === 'true';
    if (storedAdmin) {
        if (adminLink) adminLink.classList.remove('hidden');
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        cargarDashboard();
    }

    btnLogin?.addEventListener('click', async () => {
        const user = document.getElementById('admin-user').value;
        const pass = document.getElementById('admin-pass').value;

        if (user === 'admin' && pass === 'admin123') {
            localStorage.setItem('ceurbanAdmin', 'true');
            if (adminLink) adminLink.classList.remove('hidden');
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            await cargarDashboard();
        } else {
            alert('Credenciales incorrectas');
        }
    });

    async function cargarDashboard() {
        try {
            const respuesta = await fetch('/api/admin/orders');
            const data = await respuesta.json();
            if (!respuesta.ok) throw new Error(data.error || 'Error cargando pedidos');

            ordersTableBody.innerHTML = '';
            let totalRevenue = 0;

            data.pedidos.forEach((pedido, idx) => {
                totalRevenue += pedido.total;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${idx + 1}</td>
                    <td>${pedido.nombre}</td>
                    <td>${pedido.email}</td>
                    <td>$${pedido.total.toLocaleString()}</td>
                    <td>${pedido.estado}</td>
                    <td>${pedido.creado_en}</td>
                `;
                ordersTableBody.appendChild(row);
            });

            totalOrdersEl.textContent = data.pedidos.length;
            totalRevenueEl.textContent = `$${totalRevenue.toLocaleString()}`;
        } catch (error) {
            console.error(error);
            alert('No se pudieron obtener los pedidos.');
        }
    }
});
