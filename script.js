// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-level');
const animateSkillBars = () => {
    skillBars.forEach(skillBar => {
        const width = skillBar.style.width;
        skillBar.style.width = '0';
        
        setTimeout(() => {
            skillBar.style.width = width;
        }, 300);
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate skill bars when skills section is in view
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        let isValid = true;
        contactForm.querySelectorAll('[required]').forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--danger)';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        try {
            // In a real application, you would send this to your backend
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            
        } catch (error) {
            alert('There was an error sending your message. Please try again.');
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Current Year in Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Copy email to clipboard
const emailElement = document.querySelector('a[href^="mailto:"]');
if (emailElement) {
    emailElement.addEventListener('click', (e) => {
        // If Ctrl/Cmd is pressed, allow normal link behavior
        if (e.ctrlKey || e.metaKey) return;
        
        // Otherwise, copy to clipboard
        e.preventDefault();
        const email = emailElement.href.replace('mailto:', '');
        
        navigator.clipboard.writeText(email).then(() => {
            const originalText = emailElement.textContent;
            emailElement.textContent = 'Copied!';
            
            setTimeout(() => {
                emailElement.textContent = originalText;
            }, 2000);
        });
    });
}

// Project filtering (for future expansion)
const projectsFilter = () => {
    // This can be expanded when you have more projects
    console.log('Filter functionality ready to be implemented');
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Add animation classes
    const animatedElements = document.querySelectorAll('.hero-content, .project-card, .skill-category');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});