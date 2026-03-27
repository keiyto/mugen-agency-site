/* =============================================
   MAIN.JS – Mugen Agency
   ============================================= */

// ---- THEME TOGGLE ----
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// ---- HAMBURGER / MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ---- REVEAL ON SCROLL ----
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ---- SMOOTH ACTIVE LINK HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchors.forEach(a => {
                a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text-primary)' : '';
            });
        }
    });
}, { threshold: 0.3 });

sections.forEach(s => sectionObserver.observe(s));

// ---- CONTACT FORM SUBMIT (EmailJS) ----
function handleSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('contactForm');
    const btn = form.querySelector('.form-submit');

    // Labels lisibles pour les selects
    const projectSelect = form.querySelector('#projectType');
    const budgetSelect = form.querySelector('#budget');
    const sourceSelect = form.querySelector('#source');
    document.getElementById('projectTypeLabel').value = projectSelect.options[projectSelect.selectedIndex]?.text || '';
    document.getElementById('budgetLabel').value = budgetSelect.options[budgetSelect.selectedIndex]?.text || '';
    document.getElementById('sourceLabel').value = sourceSelect.options[sourceSelect.selectedIndex]?.text || '';

    btn.innerHTML = '<span>Envoi en cours...</span>';
    btn.disabled = true;

    emailjs.sendForm('service_mfymbpp', 'template_a8d6dtp', form)
        .then(() => {
            form.innerHTML = '<div style="padding:40px 20px; text-align:center; color:#34d399;"><p style="font-size:1.2rem; font-weight:600; margin-bottom:8px;">Merci pour votre message !</p><p style="color:var(--text-secondary);">Nous vous recontactons sous 24h ouvrées.</p></div>';
        })
        .catch(() => {
            btn.innerHTML = '<span>Envoyer ma demande</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            btn.disabled = false;
            alert('Erreur lors de l\'envoi. Appelez-nous au 06 58 48 61 15.');
        });
}

// ---- CURSOR GLOW EFFECT ----
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.2s ease, top 0.2s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
}, { passive: true });

// ---- PARALLAX HERO ORBS ----
const orbs = document.querySelectorAll('.hero-orb');
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

    orbs.forEach((orb, i) => {
        const depth = (i + 1) * 10;
        orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
}, { passive: true });

// ---- SERVICE CARD TILT ----
document.querySelectorAll('.service-card, .testimonial-card, .pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        card.style.transform = `translateY(-4px) rotateX(${y * -2}deg) rotateY(${x * 2}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ---- PROCESS STEP HOVER ----
document.querySelectorAll('.process-step').forEach(step => {
    step.addEventListener('mouseenter', () => {
        const num = step.querySelector('.process-step-num');
        num.style.background = 'var(--gradient-main)';
        num.style.borderColor = 'transparent';
        num.style.boxShadow = '0 0 40px rgba(139,92,246,0.4)';
    });
    step.addEventListener('mouseleave', () => {
        const num = step.querySelector('.process-step-num');
        num.style.background = '';
        num.style.borderColor = '';
        num.style.boxShadow = '';
    });
});

// ---- PRICING TABS ----
document.querySelectorAll('.pricing-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.pricing-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.pricing-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.getElementById('panel-' + tab.dataset.tab);
        panel.classList.add('active');
        // Trigger reveals inside newly visible panel
        panel.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    });
});

// ---- FAQ ACCORDION ----
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item.active').forEach(activeItem => {
            activeItem.classList.remove('active');
            activeItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isActive) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// ---- BUTTON RIPPLE EFFECT ----
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
      position: absolute; border-radius: 50%; pointer-events: none;
      background: rgba(255,255,255,0.15);
      width: ${size}px; height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      transform: scale(0); animation: rippleAnim 0.6s ease-out forwards;
    `;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ---- MOCKUP HOVER PARALLAX ----
const mockupContainer = document.querySelector('.hero-mockups');
if (mockupContainer) {
    const mockups = mockupContainer.querySelectorAll('.mockup');
    mockupContainer.addEventListener('mousemove', (e) => {
        const rect = mockupContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        mockups.forEach((mockup, i) => {
            const depth = (i === 1) ? 4 : 8;
            const rotY = x * 3;
            const rotX = y * -2;
            if (mockup.classList.contains('mockup-center')) {
                mockup.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
            } else if (mockup.classList.contains('mockup-left')) {
                mockup.style.transform = `rotate(-6deg) translateX(40px) translateY(${20 + y * depth}px) rotateY(${rotY}deg)`;
            } else {
                mockup.style.transform = `rotate(6deg) translateX(-40px) translateY(${20 + y * depth}px) rotateY(${rotY}deg)`;
            }
        });
    }, { passive: true });

    mockupContainer.addEventListener('mouseleave', () => {
        mockups.forEach(mockup => {
            mockup.style.transform = '';
        });
    });
}

// ---- INIT: Trigger reveals for elements in viewport on load ----
window.addEventListener('load', () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
});
