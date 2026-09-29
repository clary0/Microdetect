document.addEventListener('DOMContentLoaded', async () => {
    const placeholders = document.querySelectorAll('[data-navbar]');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    await Promise.all(Array.from(placeholders, async (placeholder) => {
        try {
            const response = await fetch('componentes/navbar.html', { cache: 'no-cache' });
            if (!response.ok) {
                throw new Error(`Navbar request failed: ${response.status}`);
            }

            placeholder.innerHTML = await response.text();
            const currentLink = Array.from(placeholder.querySelectorAll('.nav-menu a'))
                .find((link) => link.getAttribute('href') === currentPage);

            currentLink?.setAttribute('aria-current', 'page');
        } catch (error) {
            console.error('No se pudo cargar la barra de navegación.', error);
        }
    }));
});