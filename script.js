/**
 * ==========================================================================
 * TECHNICAL PORTFOLIO BEHAVIOR CONTROLLER (VANILLA JS)
 * Client: Jagan Pragallapati
 * Description: Interactive animations, loading timers, scroll tracking, 
 *              and validation workflows. Complete with developer comments.
 * ==========================================================================
 */

// Wait until the DOM is fully loaded and ready
document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize components
    initLoader();
    initParticles();
    initTypewriter();
    initStickyHeader();
    initMobileNav();
    initScrollReveal();
    initMouseSpotlight();
    initContactForm();
    initResumeModal();

});

/* --------------------------------------------------------------------------
   1. PAGE LOADING SCREEN
   -------------------------------------------------------------------------- */
function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    // We allow the loader animation to play out for 1.8 seconds, then fade it out.
    // This gives a premium intro feel to the visitor.
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        
        // After fade out transition finishes (500ms), trigger initial page reveals
        setTimeout(() => {
            document.body.classList.add("loaded");
            // Highlight the home section on load
            triggerFirstSectionReveal();
        }, 500);
    }, 1800);
}

// Manually trigger reveal class on hero elements on start
function triggerFirstSectionReveal() {
    const firstReveals = document.querySelectorAll("#home .reveal-fade, #home .reveal-up");
    firstReveals.forEach(el => el.classList.add("active"));
}

/* --------------------------------------------------------------------------
   2. CSS BACKGROUND PARTICLE GENERATOR
   -------------------------------------------------------------------------- */
function initParticles() {
    const container = document.getElementById("particles");
    if (!container) return;

    const particleCount = 20; // Number of floating particles

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("css-particle");

        // 1. Randomize size (between 3px and 8px)
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // 2. Randomize initial horizontal position (0% to 100% of viewport width)
        particle.style.left = `${Math.random() * 100}%`;

        // 3. Randomize animation delays (so particles rise at different times)
        const delay = Math.random() * 15;
        particle.style.animationDelay = `${delay}s`;

        // 4. Randomize floating speed / duration (between 10s and 25s)
        const duration = Math.random() * 15 + 10;
        particle.style.animationDuration = `${duration}s`;

        // Append to container
        container.appendChild(particle);
    }
}

/* --------------------------------------------------------------------------
   3. HERO SECTION TYPING ANIMATION (TYPEWRITER)
   -------------------------------------------------------------------------- */
function initTypewriter() {
    const words = [
        "Full Stack Developer",
        "AI Enthusiast",
        "Data Science Student",
        "Problem Solver"
    ];
    
    let wordIndex = 0;     // Index of current word in array
    let charIndex = 0;     // Index of current character of current word
    let isDeleting = false; // Flag to check if we are typing or deleting
    
    const typewriterElement = document.getElementById("typewriter");
    if (!typewriterElement) return;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove one character
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add one character
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Dynamically adjust speed: faster when deleting, slower when typing
        let typeSpeed = isDeleting ? 40 : 80;

        // Word completed typing -> pause, then start deleting
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2200; // Pause at full word
            isDeleting = true;
        } 
        // Word completed deleting -> pause, switch to next word, then start typing
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Loop around array
            typeSpeed = 400; // Brief pause before typing next word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typewriter loop
    setTimeout(typeEffect, 1000);
}

/* --------------------------------------------------------------------------
   4. STICKY NAVBAR & ACTIVE PAGE LINK TRACKING
   -------------------------------------------------------------------------- */
function initStickyHeader() {
    const navbar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!navbar) return;

    window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY;

        // Toggle sticky state styling
        if (scrollPos > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Track active section and highlight corresponding menu item
        let currentSectionId = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 160; // offset for smooth activation
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });

        // Set active link class
        navLinks.forEach(link => {
            link.classList.remove("active-link");
            const hrefTarget = link.getAttribute("href").substring(1);
            if (hrefTarget === currentSectionId) {
                link.classList.add("active-link");
            }
        });
    });
}

/* --------------------------------------------------------------------------
   5. MOBILE HAMBURGER MENU DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const toggleBtn = document.getElementById("mobile-nav-toggle");
    const menuList = document.getElementById("nav-menu-list");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!toggleBtn || !menuList) return;

    // Toggle menu visibility
    toggleBtn.addEventListener("click", () => {
        toggleBtn.classList.toggle("active");
        menuList.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            toggleBtn.classList.remove("active");
            menuList.classList.remove("active");
        });
    });
}

/* --------------------------------------------------------------------------
   6. SCROLL REVEAL & SKILLS ANIMATIONS (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-fade, .reveal-up, .reveal-left, .reveal-right");

    // Standard reveal animations on scroll
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Run animation once
            }
        });
    }, {
        threshold: 0.12 // Trigger when 12% of element is in viewport
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   7. MOUSE SPOTLIGHT GLOW EFFECT FOR CARDS
   -------------------------------------------------------------------------- */
function initMouseSpotlight() {
    const cards = document.querySelectorAll(".glassmorphism");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse coordinate relative to the card border
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set coordinates as custom CSS variables
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
}

/* --------------------------------------------------------------------------
   8. CONTACT FORM WORKFLOWS & CUSTOM TOAST MESSAGING
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Stop default form submit page reload

        let isValid = true;
        
        // Target input fields
        const nameInput = document.getElementById("contact-name");
        const emailInput = document.getElementById("contact-email");
        const messageInput = document.getElementById("contact-message");

        // Helper to clear error state
        const clearError = (input) => {
            input.parentElement.classList.remove("error");
        };

        // Helper to apply error state
        const applyError = (input) => {
            input.parentElement.classList.add("error");
            isValid = false;
        };

        // Reset error styling on inputs
        clearError(nameInput);
        clearError(emailInput);
        clearError(messageInput);

        // 1. Name Check
        if (nameInput.value.trim() === "") {
            applyError(nameInput);
        }

        // 2. Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            applyError(emailInput);
        }

        // 3. Message Check
        if (messageInput.value.trim() === "") {
            applyError(messageInput);
        }

        // If form inputs are correct, execute submit success toast
        if (isValid) {
            const userName = nameInput.value.trim();
            form.reset(); // Reset form values
            
            // Pop success toast
            showToast(`Thank you, ${userName}! Your message was successfully sent.`, "success");
        }
    });
}

/**
 * Creates and displays an animated toast message at the bottom right corner.
 * @param {string} message - Message text to display.
 * @param {string} type - Class name type of toast (e.g., 'success').
 */
function showToast(message, type) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    // Create toast div
    const toast = document.createElement("div");
    toast.classList.add("toast", type);

    // Create custom inline SVG Checkmark icon
    toast.innerHTML = `
        <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="toast-message">${message}</span>
    `;

    // Append to container
    container.appendChild(toast);

    // Trigger sliding animation using setTimeout
    setTimeout(() => {
        toast.classList.add("show");
    }, 50);

    // Fade out and remove toast after 4.5 seconds
    setTimeout(() => {
        toast.classList.remove("show");
        
        // Remove from DOM after slide out transitions complete
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4500);
}

/* --------------------------------------------------------------------------
   9. RESUME MODAL VIEWER CONTROLLER
   -------------------------------------------------------------------------- */
function initResumeModal() {
    const resumeLinks = document.querySelectorAll("#link-resume, #btn-hero-resume, [href*='Jagan_Resume_Draft.pdf']");
    const modal = document.getElementById("resume-modal");
    const closeBtn = document.getElementById("close-resume-modal");

    if (!modal || !closeBtn) return;

    resumeLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Stop default navigation/download behavior
            modal.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = ""; // Restore background scrolling
    });

    // Close when clicking outside the modal content
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // Close when ESC key is pressed
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
}
