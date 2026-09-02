// --- Smooth Interaction Follower Cursor Engine ---
const cursor = document.querySelector('.custom-cursor');
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

if (cursor && hasFinePointer) {
    // Perfectly center cursor anchor
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

    let cursorVisible = false;

    document.addEventListener('mousemove', (e) => {
        if (!cursorVisible) {
            cursorVisible = true;
            gsap.to(cursor, { opacity: 1, duration: 0.2 });
        }
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.08,
            ease: "power2.out"
        });
    });

    document.addEventListener('mouseleave', () => {
        cursorVisible = false;
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
    });

    // Expand and morph cursor ring on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .team-card, .unique-btn, .f-social-btn, .skills-tags span');
    interactiveElements.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                width: 45,
                height: 45,
                backgroundColor: "rgba(108, 56, 255, 0.08)",
                borderColor: "#ff2a85",
                duration: 0.25
            });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                width: 20,
                height: 20,
                backgroundColor: "transparent",
                borderColor: "#a370ff",
                duration: 0.25
            });
        });
    });
}

// --- Register GSAP Animation Modules ---
gsap.registerPlugin(ScrollTrigger);

// --- Entrance Reveal Animations (Hero Section) ---
function initEntranceAnimations() {
    gsap.from('.reveal-text', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: "power4.out"
    });

    gsap.from('.hero-subtext, .btn-container, .hero-section .hero-image-gallery', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.5,
        stagger: 0.15,
        ease: "power3.out"
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEntranceAnimations);
} else {
    initEntranceAnimations();
}

// --- Scroll Masking Presentation (Philosophy Section) ---
gsap.from('.huge-philosophy-text, .philosophy-description', {
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 45,
    stagger: 0.2,
    duration: 0.9,
    ease: "power3.out"
});

// --- Portfolio Section Reveal ---
gsap.from('.portfolio-card', {
    scrollTrigger: {
        trigger: '.portfolio-section',
        start: 'top 75%',
    },
    opacity: 0,
    y: 40,
    duration: 0.9,
    stagger: 0.2,
    ease: "power3.out"
});

// --- Dynamic Heading Reveals (Handles Each Section Title Independently) ---
document.querySelectorAll('.dynamic-title-reveal').forEach(title => {
    gsap.from(title.querySelectorAll('span, .title-underline'), {
        scrollTrigger: {
            trigger: title,
            start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out"
    });
});

// --- Cascade Sliding Animation (Team Cards) ---
const teamTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.team-section',
        start: 'top 70%',
    }
});

teamTimeline.from('.team-card-left', {
    x: -50,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out"
})
.from('.team-card-right', {
    x: 50,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out"
}, "-=0.6");

// --- Scale Pop Animation (Dual Portals) ---
gsap.from('.contact-portal', {
    scrollTrigger: {
        trigger: '.contact-portals',
        start: 'top 80%',
    },
    scale: 0.93,
    opacity: 0,
    stagger: 0.25,
    duration: 0.9,
    ease: "back.out(1.5)"
});

// --- Mobile Navigation Drawer Toggle ---
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        const isActive = mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', isActive);
    });

    // Close menu when clicking navigation links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// --- Recalculate Trigger Positions on Window Load ---
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});