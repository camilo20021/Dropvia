document.addEventListener('DOMContentLoaded', () => {
    const adminLink = document.querySelector('.admin-link');
    if (!adminLink) return;
    const isAdmin = localStorage.getItem('ceurbanAdmin') === 'true';
    if (isAdmin) {
        adminLink.classList.remove('hidden');
    } else {
        adminLink.classList.add('hidden');
    }
});
