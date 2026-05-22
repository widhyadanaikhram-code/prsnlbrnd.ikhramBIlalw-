// Shared page behavior for all portfolio pages

const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

function applyStoredTheme() {
    if (!themeToggle) return;
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerText = '☀️';
    }
}

function setupThemeToggle() {
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerText = '☀️';
            theme = 'dark';
        } else {
            themeToggle.innerText = '🌙';
        }
        localStorage.setItem('theme', theme);
    });
}

function highlightActiveNav() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'Home.html';

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active-nav');
        }
    });
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('contactModal');
    const span = document.getElementsByClassName('close-btn')[0];

    if (!contactForm || !modal || !span) return;

    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const endpoint = contactForm.action;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                modal.style.display = 'block';
                contactForm.reset();
            } else {
                const result = await response.json();
                alert(result.error || 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
            }
        } catch (error) {
            alert('Tidak dapat mengirim pesan saat ini. Periksa koneksi internet dan coba lagi.');
        }
    });

    span.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

applyStoredTheme();
setupThemeToggle();
highlightActiveNav();
setupContactForm();
