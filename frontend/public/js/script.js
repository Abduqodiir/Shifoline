document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Toggle active class
        item.classList.toggle('active');

        // Collapse others
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
    });
});


document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Toggle active class
        item.classList.toggle('active');

        // Collapse others
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
    });
});

document.querySelectorAll('nav .nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const searchInputs = document.querySelectorAll('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', () => {
        const searchTerms = Array.from(searchInputs).map(input => input.value.trim());
        console.log('Search Terms:', searchTerms);
    });
});

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Modal Functionality
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Kirish / Ro'yxatdan o'tish</h2>
            <form id="auth-form">
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Parol" required>
                <button type="submit">Kirish</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-modal');
    const authForm = modal.querySelector('#auth-form');

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(authForm)) {
            modal.style.display = 'none';
        }
    });

    return modal;
}

// Login Button Event
document.querySelector('.login-btn').addEventListener('click', () => {
    const modal = document.getElementById('auth-modal') || createModal();
    modal.style.display = 'block';
});

document.addEventListener('DOMContentLoaded', function() {
    const reviewsWrapper = document.querySelector('.reviews-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    nextBtn.addEventListener('click', () => {
        const cardWidth = reviewsWrapper.querySelector('.review-card').offsetWidth + 32;
        currentIndex++;
        reviewsWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            const cardWidth = reviewsWrapper.querySelector('.review-card').offsetWidth + 32;
            currentIndex--;
            reviewsWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});