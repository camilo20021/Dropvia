document.addEventListener('DOMContentLoaded', () => {
    const googleButtonContainer = document.getElementById('google-button');
    const loggedUserCard = document.getElementById('logged-user');
    const userPicture = document.getElementById('user-picture');
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const logoutBtn = document.getElementById('logout-btn');
    const manualForm = document.getElementById('manual-register');

    function setUser(user) {
        localStorage.setItem('ceurbanUser', JSON.stringify(user));
        if (user && user.nombre) {
            userPicture.src = user.imagen || 'IMAGENES/favicon.png';
            userName.textContent = user.nombre;
            userEmail.textContent = user.email;
            loggedUserCard.classList.remove('hidden');
            logoutBtn.classList.remove('hidden');
            googleButtonContainer.classList.add('hidden');
        } else {
            loggedUserCard.classList.add('hidden');
            logoutBtn.classList.add('hidden');
            googleButtonContainer.classList.remove('hidden');
        }
    }

    function parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error parsing JWT', error);
            return null;
        }
    }

    async function saveGoogleUser(payload, credential = '') {
        const user = {
            googleId: payload.sub || payload.googleId || `manual-${Date.now()}`,
            nombre: payload.name,
            email: payload.email,
            imagen: payload.picture || payload.pictureUrl || 'IMAGENES/favicon.png',
            credential
        };

        try {
            await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
        } catch (error) {
            console.warn('No se pudo guardar el usuario en el servidor:', error);
        }

        setUser(user);
    }

    async function handleGoogleResponse(response) {
        const payload = parseJwt(response.credential);
        if (!payload) {
            alert('No se pudo iniciar sesión con Google. Intenta de nuevo.');
            return;
        }

        await saveGoogleUser(payload, response.credential);
        alert(`Bienvenido, ${payload.name}`);
    }

    function initializeGoogleSignIn() {
        if (window.google?.accounts?.id) {
            window.google.accounts.id.initialize({
                client_id: 'TU_GOOGLE_CLIENT_ID',
                callback: handleGoogleResponse
            });

            window.google.accounts.id.renderButton(document.getElementById('google-button'), {
                theme: 'outline',
                size: 'large',
                text: 'signin_with',
                shape: 'rectangular'
            });
        } else {
            setTimeout(initializeGoogleSignIn, 200);
        }
    }

    initializeGoogleSignIn();

    const storedUser = localStorage.getItem('ceurbanUser');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }

    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('ceurbanUser');
        setUser(null);
        alert('Sesión cerrada.');
    });

    manualForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nombre = document.getElementById('manual-name').value.trim();
        const email = document.getElementById('manual-email').value.trim();
        const telefono = document.getElementById('manual-phone').value.trim();

        if (!nombre || !email) {
            alert('Completa nombre y correo para continuar.');
            return;
        }

        await saveGoogleUser({
            sub: `manual-${Date.now()}`,
            name: nombre,
            email,
            picture: 'IMAGENES/favicon.png'
        });

        alert('Registro manual completado. Ahora puedes usar tu perfil.');
    });
});
