/**
 * customization.js - Component Customization System
 * Handles all component editing and customization logic
 */

// Global reference to components (will be set from builder.js)
let componentsData = null;

/**
 * Initialize customization system
 * @param {object} components - Component definitions from builder.js
 */
function initCustomization(components) {
    componentsData = components;

    const customizationPanel = document.getElementById('customization-panel');
    const panelClose = document.getElementById('panel-close');

    // Close panel handlers
    if (panelClose) {
        panelClose.addEventListener('click', () => {
            closeCustomizationPanel();
        });
    }

    // Close panel when clicking outside
    customizationPanel?.addEventListener('click', (e) => {
        if (e.target === customizationPanel) {
            closeCustomizationPanel();
        }
    });
}

let currentEditingComponent = null;

/**
 * Opens the customization panel for a given component
 * @param {HTMLElement} componentWrapper - The component wrapper element
 */
function openCustomizationPanel(componentWrapper) {
    currentEditingComponent = componentWrapper;
    const componentType = componentWrapper.getAttribute('data-type');
    const componentId = componentWrapper.getAttribute('data-component-id');
    const customizationPanel = document.getElementById('customization-panel');
    const panelContent = document.getElementById('panel-content');

    // Set panel title
    document.getElementById('panel-title').textContent = `Customize: ${componentsData[componentType].name}`;

    // Generate customization form based on component type
    panelContent.innerHTML = generateCustomizationForm(componentType, componentWrapper);

    // Show panel
    customizationPanel.classList.add('active');

    // Attach event listeners to form elements
    attachCustomizationListeners(componentType, componentWrapper);
}

/**
 * Closes the customization panel
 */
function closeCustomizationPanel() {
    const customizationPanel = document.getElementById('customization-panel');
    customizationPanel.classList.remove('active');
    currentEditingComponent = null;
}

/**
 * Generates customization form HTML based on component type
 * @param {string} type - Component type
 * @param {HTMLElement} wrapper - Component wrapper element
 * @returns {string} HTML for customization form
 */
function generateCustomizationForm(type, wrapper) {
    switch (type) {
        case 'navbar_simple':
            return generateNavbarForm(wrapper);
        case 'hero_centered':
        case 'hero_split':
            return generateHeroForm(wrapper, type);
        case 'cta_banner':
            return generateCTAForm(wrapper);
        case 'pricing_cards':
            return generatePricingForm(wrapper);
        case 'contact_form':
            return generateContactFormCustomization(wrapper);
        case 'features_grid':
            return generateFeaturesForm(wrapper);
        case 'testimonial_grid':
            return generateTestimonialForm(wrapper);
        case 'stats_counter':
            return generateStatsForm(wrapper);
        case 'footer_simple':
            return generateFooterForm(wrapper);
        case 'content_center':
            return generateContentForm(wrapper);
        // Add more cases for other components
        default:
            return '<p style="color: #64748b;">Customization for this component is coming soon!</p>';
    }
}

// ========== COMPONENT-SPECIFIC FORM GENERATORS ==========

/**
 * Generates form for navbar customization
 */
function generateNavbarForm(wrapper) {
    const logo = wrapper.querySelector('.tmp-logo')?.textContent || 'VELOCITY';
    const navLinks = Array.from(wrapper.querySelectorAll('.tmp-nav-links a')).map(a => a.textContent);

    return `
        <div class="form-group">
            <label>Logo Text</label>
            <input type="text" id="navbar-logo" class="form-control" value="${logo}">
        </div>
        
        <div class="form-group">
            <label>Navigation Links</label>
            <div id="nav-links-list" class="list-editor">
                ${navLinks.map((link, index) => `
                    <div class="list-item" data-index="${index}">
                        <input type="text" class="form-control" value="${link}" data-link-index="${index}">
                        <button class="btn-remove" data-index="${index}">×</button>
                    </div>
                `).join('')}
            </div>
            <button id="add-nav-link" class="btn btn-outline btn-sm">+ Add Link</button>
        </div>
    `;
}

/**
 * Generates form for hero section customization
 */
function generateHeroForm(wrapper, type) {
    const heading = wrapper.querySelector('h1')?.textContent || '';
    const description = wrapper.querySelector('p')?.textContent || '';

    return `
        <div class="form-group">
            <label>Heading</label>
            <textarea id="hero-heading" class="form-control" rows="3">${heading}</textarea>
        </div>
        
        <div class="form-group">
            <label>Description</label>
            <textarea id="hero-description" class="form-control" rows="4">${description}</textarea>
        </div>
        
        <p style="color: #64748b; font-size: 0.85rem; margin-top: 1rem;">
            <strong>Note:</strong> Button customization coming soon!
        </p>
    `;
}

/**
 * Generates form for CTA banner customization
 */
function generateCTAForm(wrapper) {
    const heading = wrapper.querySelector('h2')?.textContent || '';
    const description = wrapper.querySelector('p')?.textContent || '';

    return `
        <div class="form-group">
            <label>Heading</label>
            <input type="text" id="cta-heading" class="form-control" value="${heading}">
        </div>
        
        <div class="form-group">
            <label>Description</label>
            <textarea id="cta-description" class="form-control" rows="3">${description}</textarea>
        </div>
    `;
}

/**
 * Generates form for pricing cards customization
 */
function generatePricingForm(wrapper) {
    const sectionHeading = wrapper.querySelector('h2')?.textContent || '';

    return `
        <div class="form-group">
            <label>Section Heading</label>
            <input type="text" id="pricing-heading" class="form-control" value="${sectionHeading}">
        </div>
        
        <p style="color: #64748b; font-size: 0.85rem; margin-top: 1rem;">
            <strong>Note:</strong> Individual pricing tier customization coming soon!
        </p>
    `;
}

/**
 * Generates form for contact form customization
 */
function generateContactFormCustomization(wrapper) {
    const heading = wrapper.querySelector('h2')?.textContent || '';
    const description = wrapper.querySelector('p')?.textContent || '';

    return `
        <div class="form-group">
            <label>Heading</label>
            <input type="text" id="contact-heading" class="form-control" value="${heading}">
        </div>
        
        <div class="form-group">
            <label>Description</label>
            <textarea id="contact-description" class="form-control" rows="3">${description}</textarea>
        </div>
        
        <p style="color: #64748b; font-size: 0.85rem; margin-top: 1rem;">
            <strong>Note:</strong> Form field customization coming soon!
        </p>
    `;
}

/**
 * Generates form for features grid customization
 */
function generateFeaturesForm(wrapper) {
    const sectionHeading = wrapper.querySelector('h2')?.textContent || '';
    const sectionDesc = wrapper.querySelector('p')?.textContent || '';

    return `
        <div class="form-group">
            <label>Section Heading</label>
            <input type="text" id="features-heading" class="form-control" value="${sectionHeading}">
        </div>
        
        <div class="form-group">
            <label>Section Description</label>
            <textarea id="features-description" class="form-control" rows="3">${sectionDesc}</textarea>
        </div>
        
        <p style="color: #64748b; font-size: 0.85rem; margin-top: 1rem;">
            <strong>Note:</strong> Individual feature card editing coming soon!
        </p>
    `;
}

/**
 * Generates form for testimonial grid customization
 */
function generateTestimonialForm(wrapper) {
    const sectionHeading = wrapper.querySelector('h2')?.textContent || '';

    return `
        <div class="form-group">
            <label>Section Heading</label>
            <input type="text" id="testimonial-heading" class="form-control" value="${sectionHeading}">
        </div>
        
        <p style="color: #64748b; font-size: 0.85rem; margin-top: 1rem;">
            <strong>Note:</strong> Individual testimonial editing coming soon!
        </p>
    `;
}

/**
 * Generates form for stats counter customization
 */
function generateStatsForm(wrapper) {
    return `
        <p style="color: #64748b; font-size: 0.9rem;">
            <strong>Stats Counter Customization</strong><br><br>
            Individual stat editing coming soon! You'll be able to edit numbers, labels, and add/remove stats.
        </p>
    `;
}

/**
 * Generates form for footer customization
 */
function generateFooterForm(wrapper) {
    const companyName = wrapper.querySelector('div[style*="font-weight: 900"]')?.textContent || '';
    const description = wrapper.querySelector('p')?.textContent || '';

    return `
        <div class="form-group">
            <label>Company Name</label>
            <input type="text" id="footer-company" class="form-control" value="${companyName}">
        </div>
        
        <div class="form-group">
            <label>Description</label>
            <textarea id="footer-description" class="form-control" rows="3">${description}</textarea>
        </div>
        
        <p style="color: #64748b; font-size: 0.85rem; margin-top: 1rem;">
            <strong>Note:</strong> Footer link editing coming soon!
        </p>
    `;
}

/**
 * Generates form for centered content customization
 */
function generateContentForm(wrapper) {
    const heading = wrapper.querySelector('h2')?.textContent || '';
    const content = wrapper.querySelector('p')?.textContent || '';

    return `
        <div class="form-group">
            <label>Heading</label>
            <input type="text" id="content-heading" class="form-control" value="${heading}">
        </div>
        
        <div class="form-group">
            <label>Content</label>
            <textarea id="content-text" class="form-control" rows="5">${content}</textarea>
        </div>
    `;
}

// ========== EVENT LISTENER ATTACHERS ==========

/**
 * Attaches event listeners to customization form elements
 * @param {string} type - Component type
 * @param {HTMLElement} wrapper - Component wrapper element
 */
function attachCustomizationListeners(type, wrapper) {
    switch (type) {
        case 'navbar_simple':
            attachNavbarListeners(wrapper);
            break;
        case 'hero_centered':
        case 'hero_split':
            attachHeroListeners(wrapper);
            break;
        case 'cta_banner':
            attachCTAListeners(wrapper);
            break;
        case 'pricing_cards':
            attachPricingListeners(wrapper);
            break;
        case 'contact_form':
            attachContactFormListeners(wrapper);
            break;
        case 'features_grid':
            attachFeaturesListeners(wrapper);
            break;
        case 'testimonial_grid':
            attachTestimonialListeners(wrapper);
            break;
        case 'stats_counter':
            // No listeners needed yet (placeholder only)
            break;
        case 'footer_simple':
            attachFooterListeners(wrapper);
            break;
        case 'content_center':
            attachContentListeners(wrapper);
            break;
    }
}

/**
 * Attaches listeners for navbar customization
 */
function attachNavbarListeners(wrapper) {
    const panelContent = document.getElementById('panel-content');

    // Logo text input
    const logoInput = document.getElementById('navbar-logo');
    if (logoInput) {
        logoInput.addEventListener('input', (e) => {
            const logoEl = wrapper.querySelector('.tmp-logo');
            if (logoEl) logoEl.textContent = e.target.value;
        });
    }

    // Nav link inputs
    const linkInputs = document.querySelectorAll('[data-link-index]');
    linkInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-link-index'));
            const links = wrapper.querySelectorAll('.tmp-nav-links a');
            if (links[index]) {
                links[index].textContent = e.target.value;
            }
        });
    });

    // Remove link buttons
    const removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            const links = wrapper.querySelectorAll('.tmp-nav-links li');
            if (links[index]) {
                links[index].remove();
                // Regenerate form
                panelContent.innerHTML = generateCustomizationForm('navbar_simple', wrapper);
                attachCustomizationListeners('navbar_simple', wrapper);
            }
        });
    });

    // Add link button
    const addLinkBtn = document.getElementById('add-nav-link');
    if (addLinkBtn) {
        addLinkBtn.addEventListener('click', () => {
            const navList = wrapper.querySelector('.tmp-nav-links');
            if (navList) {
                const newLi = document.createElement('li');
                const newLink = document.createElement('a');
                newLink.href = '#';
                newLink.textContent = 'New Link';
                newLi.appendChild(newLink);
                navList.appendChild(newLi);
                // Regenerate form
                panelContent.innerHTML = generateCustomizationForm('navbar_simple', wrapper);
                attachCustomizationListeners('navbar_simple', wrapper);
            }
        });
    }
}

/**
 * Attaches listeners for hero customization
 */
function attachHeroListeners(wrapper) {
    const headingInput = document.getElementById('hero-heading');
    const descInput = document.getElementById('hero-description');

    if (headingInput) {
        headingInput.addEventListener('input', (e) => {
            const h1 = wrapper.querySelector('h1');
            if (h1) h1.textContent = e.target.value;
        });
    }

    if (descInput) {
        descInput.addEventListener('input', (e) => {
            const p = wrapper.querySelector('p');
            if (p) p.textContent = e.target.value;
        });
    }
}

/**
 * Attaches listeners for CTA customization
 */
function attachCTAListeners(wrapper) {
    const headingInput = document.getElementById('cta-heading');
    const descInput = document.getElementById('cta-description');

    if (headingInput) {
        headingInput.addEventListener('input', (e) => {
            const h2 = wrapper.querySelector('h2');
            if (h2) h2.textContent = e.target.value;
        });
    }

    if (descInput) {
        descInput.addEventListener('input', (e) => {
            const p = wrapper.querySelector('p');
            if (p) p.textContent = e.target.value;
        });
    }
}

/**
 * Attaches listeners for pricing customization
 */
function attachPricingListeners(wrapper) {
    const headingInput = document.getElementById('pricing-heading');

    if (headingInput) {
        headingInput.addEventListener('input', (e) => {
            const h2 = wrapper.querySelector('h2');
            if (h2) h2.textContent = e.target.value;
        });
    }
}

/**
 * Attaches listeners for contact form customization
 */
function attachContactFormListeners(wrapper) {
    const headingInput = document.getElementById('contact-heading');
    const descInput = document.getElementById('contact-description');

    if (headingInput) {
        headingInput.addEventListener('input', (e) => {
            const h2 = wrapper.querySelector('h2');
            if (h2) h2.textContent = e.target.value;
        });
    }

    if (descInput) {
        descInput.addEventListener('input', (e) => {
            const p = wrapper.querySelector('p');
            if (p) p.textContent = e.target.value;
        });
    }
}
