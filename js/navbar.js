/**
 * navbar.js - Dropdown menu functionality
 * Handles click toggles, keyboard navigation, and mobile support
 */

document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    // Click toggle for mobile/accessibility
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');

        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();

                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                        const otherToggle = other.querySelector('.nav-dropdown-toggle');
                        if (otherToggle) {
                            otherToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                });

                // Toggle current dropdown
                const isActive = dropdown.classList.toggle('active');
                toggle.setAttribute('aria-expanded', isActive);
            });

            // Keyboard navigation
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle.click();
                } else if (e.key === 'Escape') {
                    dropdown.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const toggle = dropdown.querySelector('.nav-dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    // Close dropdowns on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const toggle = dropdown.querySelector('.nav-dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
});
