document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section-title, .about-content, .skill-card, .timeline-item, .project-card, .contact-form-container').forEach(el => {
    animateOnScroll.observe(el);
});

document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

const titles = ['FULL STACK DEVELOPER', 'REACT JS DEVELOPER', 'DESIGNER'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

setTimeout(() => {
    typeWriter();
}, 1000);

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            formMessage.className = 'form-message success';
            formMessage.textContent = '✓ Message sent successfully! I will get back to you soon.';
            contactForm.reset();
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        formMessage.className = 'form-message error';
        formMessage.textContent = '✗ Error sending message. Please try again or contact me directly.';
        console.error('Error:', error);
    });
});
