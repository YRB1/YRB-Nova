// YRB Nova shared site behaviour

document.addEventListener('DOMContentLoaded', () => {

    // Mobile nav: close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const toggle = document.getElementById('menu-toggle');
            if (toggle) toggle.checked = false;
        });
    });

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Back to top
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.style.display = (window.scrollY > 400) ? 'block' : 'none';
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Stripe checkout
    document.querySelectorAll('.js-checkout').forEach(btn => {
        btn.addEventListener('click', async () => {
            const pkg = btn.dataset.package;
            const originalText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Redirecting...';

            try {
                const response = await fetch('/api/create-checkout-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pkg })
                });
                const data = await response.json();

                if (!response.ok || !data.url) {
                    throw new Error(data.error || 'Unable to start checkout.');
                }

                window.location.href = data.url;
            } catch (err) {
                alert(err.message || 'Unable to start checkout. Please try again or contact us directly.');
                btn.disabled = false;
                btn.textContent = originalText;
            }
        });
    });

    // Hero background slideshow
    const heroSlides = document.querySelectorAll('.hero-slideshow .slide');
    if (heroSlides.length) {
        let heroIndex = 0;
        setInterval(() => {
            heroSlides[heroIndex].classList.remove('active');
            heroIndex = (heroIndex + 1) % heroSlides.length;
            heroSlides[heroIndex].classList.add('active');
        }, 3500);
    }

    // Testimonial carousel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const slides = carousel.children;
        const total = slides.length;
        let index = 0;
        const dotsWrap = document.querySelector('.carousel-dots');

        if (dotsWrap) {
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('button');
                if (i === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
                dot.addEventListener('click', () => showSlide(i));
                dotsWrap.appendChild(dot);
            }
        }

        function showSlide(i) {
            index = (i + total) % total;
            carousel.style.transform = `translateX(-${index * 100}%)`;
            if (dotsWrap) {
                Array.from(dotsWrap.children).forEach((d, di) => d.classList.toggle('active', di === index));
            }
        }

        setInterval(() => showSlide(index + 1), 5000);
    }

    // Cookie Consent
    const popup = document.getElementById('cookie-consent-popup');
    const modal = document.getElementById('cookie-preferences-modal');

    if (popup) {
        if (!localStorage.getItem('cookieChoice') && !localStorage.getItem('cookiesPreferences')) {
            popup.style.display = 'flex';
        }

        document.getElementById('accept-cookies').onclick = () => {
            localStorage.setItem('cookieChoice', 'accepted');
            popup.style.display = 'none';
        };

        document.getElementById('deny-cookies').onclick = () => {
            localStorage.setItem('cookieChoice', 'denied');
            popup.style.display = 'none';
        };

        document.getElementById('view-preferences').onclick = (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        };

        document.getElementById('close-modal').onclick = () => {
            modal.style.display = 'none';
        };

        document.getElementById('save-preferences').onclick = () => {
            const analytics = document.getElementById('analytics-cookies').checked;
            const marketing = document.getElementById('marketing-cookies').checked;
            localStorage.setItem('cookiesPreferences', JSON.stringify({ analytics, marketing }));
            popup.style.display = 'none';
            modal.style.display = 'none';
        };
    }
});
