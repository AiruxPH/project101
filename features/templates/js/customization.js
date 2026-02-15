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
    const buttons = Array.from(wrapper.querySelectorAll('.btn')).map(btn => btn.textContent);

    return `
        <div class="form-group">
            <label>Heading</label>
            <textarea id="hero-heading" class="form-control" rows="3">${heading}</textarea>
        </div>
        
        <div class="form-group">
            <label>Description</label>
            <textarea id="hero-description" class="form-control" rows="4">${description}</textarea>
        </div>
        
        <div class="form-group">
            <label>Button Text</label>
            <div id="hero-buttons-list" class="list-editor">
                ${buttons.map((btnText, index) => `
                    <div class="list-item" data-index="${index}">
                        <input type="text" class="form-control" value="${btnText}" data-btn-index="${index}">
                        <button class="btn-remove" data-index="${index}">×</button>
                    </div>
                `).join('')}
            </div>
            <button id="add-hero-button" class="btn btn-outline btn-sm" style="margin-top: 0.5rem;">+ Add Button</button>
        </div>
    `;
}

/**
 * Generates form for CTA banner customization
 */
function generateCTAForm(wrapper) {
    const heading = wrapper.querySelector('h2')?.textContent || '';
    const description = wrapper.querySelector('p')?.textContent || '';
    const buttons = Array.from(wrapper.querySelectorAll('.btn')).map(btn => btn.textContent);

    return `
        <div class="form-group">
            <label>Heading</label>
            <input type="text" id="cta-heading" class="form-control" value="${heading}">
        </div>
        
        <div class="form-group">
            <label>Description</label>
            <textarea id="cta-description" class="form-control" rows="3">${description}</textarea>
        </div>
        
        <div class="form-group">
            <label>Button Text</label>
            <div id="cta-buttons-list" class="list-editor">
                ${buttons.map((btnText, index) => `
                    <div class="list-item" data-index="${index}">
                        <input type="text" class="form-control" value="${btnText}" data-btn-index="${index}">
                        <button class="btn-remove" data-index="${index}">×</button>
                    </div>
                `).join('')}
            </div>
            <button id="add-cta-button" class="btn btn-outline btn-sm" style="margin-top: 0.5rem;">+ Add Button</button>
        </div>
    `;
}

/**
 * Generates form for pricing cards customization
 */
function generatePricingForm(wrapper) {
    const sectionHeading = wrapper.querySelector('h2')?.textContent || '';
    const sectionDesc = wrapper.querySelector('p[style*="color: #64748b"]')?.textContent || '';
    const tiers = Array.from(wrapper.querySelectorAll('div[style*="border-radius: 16px"]')).map(card => {
        return {
            name: card.querySelector('h3')?.textContent || '',
            desc: card.querySelector('p')?.textContent || '',
            price: card.querySelector('span[style*="font-weight: 800"]')?.textContent || '',
            features: Array.from(card.querySelectorAll('ul li')).map(li => li.textContent.replace('✓ ', '').trim())
        };
    });

    return `
        <div class="form-group">
            <label>Section Heading</label>
            <input type="text" id="pricing-heading" class="form-control" value="${sectionHeading}">
        </div>
        
        <div class="form-group">
            <label>Section Description</label>
            <textarea id="pricing-description" class="form-control" rows="2">${sectionDesc}</textarea>
        </div>
        
        <div class="form-group">
            <label>Pricing Tiers</label>
            <div id="pricing-list" class="list-editor">
                ${tiers.map((tier, index) => `
                    <div class="list-item" style="flex-direction: column; align-items: stretch; gap: 0.5rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 1.5rem;" data-index="${index}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: 700; font-size: 0.75rem; text-transform: uppercase; color: #64748b;">Tier ${index + 1}</span>
                            <button class="btn-remove" data-index="${index}">×</button>
                        </div>
                        <input type="text" class="form-control" value="${tier.name}" placeholder="Plan Name" data-tier-name="${index}">
                        <input type="text" class="form-control" value="${tier.desc}" placeholder="Plan Description" data-tier-desc="${index}">
                        <input type="text" class="form-control" value="${tier.price}" placeholder="Price (e.g. $29)" data-tier-price="${index}">
                        
                        <div style="margin-top: 0.5rem;">
                            <label style="font-size: 0.75rem; font-weight: 700; color: #64748b; margin-bottom: 0.25rem; display: block;">Features</label>
                            <div class="tier-features-list">
                                ${tier.features.map((f, fi) => `
                                    <div style="display: flex; gap: 0.5rem; margin-bottom: 0.25rem;">
                                        <input type="text" class="form-control form-control-sm" value="${f}" data-tier-feature="${index}" data-feature-index="${fi}">
                                        <button class="btn-remove-feature" data-tier-index="${index}" data-feature-index="${fi}">×</button>
                                    </div>
                                `).join('')}
                            </div>
                            <button class="add-tier-feature btn btn-outline btn-sm" data-tier-index="${index}" style="width: 100%; border-style: dashed; padding: 0.25rem; font-size: 0.7rem;">+ Add Feature</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button id="add-pricing-tier" class="btn btn-outline btn-sm">+ Add Pricing Tier</button>
        </div>
    `;
}

/**
 * Generates form for contact form customization
 */
function generateContactFormCustomization(wrapper) {
    const heading = wrapper.querySelector('h2')?.textContent || '';
    const description = wrapper.querySelector('p')?.textContent || '';
    const fields = Array.from(wrapper.querySelectorAll('form > div')).map(div => {
        const label = div.querySelector('label');
        const input = div.querySelector('input') || div.querySelector('textarea');
        return {
            label: label?.textContent || '',
            placeholder: input?.placeholder || '',
            type: input?.tagName.toLowerCase() === 'textarea' ? 'textarea' : input?.type || 'text'
        };
    });

    return `
        <div class="form-group">
            <label>Heading</label>
            <input type="text" id="contact-heading" class="form-control" value="${heading}">
        </div>
        
        <div class="form-group">
            <label>Description</label>
            <textarea id="contact-description" class="form-control" rows="3">${description}</textarea>
        </div>
        
        <div class="form-group">
            <label>Form Fields</label>
            <div id="contact-fields-list" class="list-editor">
                ${fields.map((field, index) => `
                    <div class="list-item" style="flex-direction: column; align-items: stretch; gap: 0.5rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 1rem;" data-index="${index}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: 700; font-size: 0.75rem; text-transform: uppercase; color: #64748b;">Field ${index + 1}</span>
                            <button class="btn-remove" data-index="${index}">×</button>
                        </div>
                        <input type="text" class="form-control" value="${field.label}" placeholder="Label" data-field-label="${index}">
                        <input type="text" class="form-control" value="${field.placeholder}" placeholder="Placeholder" data-field-placeholder="${index}">
                        <select class="form-control" data-field-type="${index}">
                            <option value="text" ${field.type === 'text' ? 'selected' : ''}>Text Input</option>
                            <option value="email" ${field.type === 'email' ? 'selected' : ''}>Email Input</option>
                            <option value="textarea" ${field.type === 'textarea' ? 'selected' : ''}>Textarea</option>
                        </select>
                    </div>
                `).join('')}
            </div>
            <button id="add-contact-field" class="btn btn-outline btn-sm">+ Add Field</button>
        </div>
    `;
}

/**
 * Generates form for features grid customization
 */
function generateFeaturesForm(wrapper) {
    const sectionHeading = wrapper.querySelector('h2')?.textContent || '';
    const sectionDesc = wrapper.querySelector('p')?.textContent || '';
    const features = Array.from(wrapper.querySelectorAll('.tmp-feat-card')).map(card => ({
        heading: card.querySelector('h3')?.textContent || '',
        description: card.querySelector('p')?.textContent || ''
    }));

    return `
        <div class="form-group">
            <label>Section Heading</label>
            <input type="text" id="features-heading" class="form-control" value="${sectionHeading}">
        </div>
        
        <div class="form-group">
            <label>Section Description</label>
            <textarea id="features-description" class="form-control" rows="3">${sectionDesc}</textarea>
        </div>
        
        <div class="form-group">
            <label>Feature Cards</label>
            <div id="features-list" class="list-editor">
                ${features.map((feat, index) => `
                    <div class="list-item" style="flex-direction: column; align-items: stretch; gap: 0.5rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 1rem;" data-index="${index}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: 700; font-size: 0.75rem; text-transform: uppercase; color: #64748b;">Feature ${index + 1}</span>
                            <button class="btn-remove" data-index="${index}">×</button>
                        </div>
                        <input type="text" class="form-control" value="${feat.heading}" placeholder="Feature Title" data-feat-heading="${index}">
                        <textarea class="form-control" rows="2" placeholder="Feature Description" data-feat-desc="${index}">${feat.description}</textarea>
                    </div>
                `).join('')}
            </div>
            <button id="add-feature" class="btn btn-outline btn-sm">+ Add Feature Card</button>
        </div>
    `;
}

/**
 * Generates form for testimonial grid customization
 */
function generateTestimonialForm(wrapper) {
    const sectionHeading = wrapper.querySelector('h2')?.textContent || '';
    const sectionDesc = wrapper.querySelector('p[style*="color: #64748b"]')?.textContent || '';
    const testimonials = Array.from(wrapper.querySelectorAll('div[style*="background: #fff"]')).filter(el => el.querySelector('p[style*="font-style: italic"]')).map(card => {
        const infoDivs = card.querySelectorAll('div > div > div');
        return {
            quote: card.querySelector('p[style*="font-style: italic"]')?.textContent || '',
            name: infoDivs[0]?.textContent || '',
            role: infoDivs[1]?.textContent || ''
        };
    });

    return `
        <div class="form-group">
            <label>Section Heading</label>
            <input type="text" id="testimonial-heading" class="form-control" value="${sectionHeading}">
        </div>
        
        <div class="form-group">
            <label>Section Description</label>
            <textarea id="testimonial-description" class="form-control" rows="2">${sectionDesc}</textarea>
        </div>
        
        <div class="form-group">
            <label>Testimonials</label>
            <div id="testimonial-list" class="list-editor">
                ${testimonials.map((t, index) => `
                    <div class="list-item" style="flex-direction: column; align-items: stretch; gap: 0.5rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 1rem;" data-index="${index}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: 700; font-size: 0.75rem; text-transform: uppercase; color: #64748b;">Testimonial ${index + 1}</span>
                            <button class="btn-remove" data-index="${index}">×</button>
                        </div>
                        <textarea class="form-control" rows="3" placeholder="Quote" data-t-quote="${index}">${t.quote}</textarea>
                        <input type="text" class="form-control" value="${t.name}" placeholder="Name" data-t-name="${index}">
                        <input type="text" class="form-control" value="${t.role}" placeholder="Role/Company" data-t-role="${index}">
                    </div>
                `).join('')}
            </div>
            <button id="add-testimonial" class="btn btn-outline btn-sm">+ Add Testimonial</button>
        </div>
    `;
}

/**
 * Generates form for stats counter customization
 */
function generateStatsForm(wrapper) {
    const stats = Array.from(wrapper.querySelectorAll('div[style*="text-align: center"]')).filter(el => el.querySelector('div[style*="font-size: 3.5rem"]')).map(stat => ({
        number: stat.querySelector('div[style*="font-size: 3.5rem"]')?.textContent || '',
        label: stat.querySelector('div[style*="font-size: 1.1rem"]')?.textContent || ''
    }));

    return `
        <div class="form-group">
            <label>Stats</label>
            <div id="stats-list" class="list-editor">
                ${stats.map((stat, index) => `
                    <div class="list-item" style="flex-direction: column; align-items: stretch; gap: 0.5rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 1rem;" data-index="${index}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: 700; font-size: 0.75rem; text-transform: uppercase; color: #64748b;">Stat ${index + 1}</span>
                            <button class="btn-remove" data-index="${index}">×</button>
                        </div>
                        <input type="text" class="form-control" value="${stat.number}" placeholder="Number (e.g. 10K+)" data-stat-number="${index}">
                        <input type="text" class="form-control" value="${stat.label}" placeholder="Label" data-stat-label="${index}">
                    </div>
                `).join('')}
            </div>
            <button id="add-stat" class="btn btn-outline btn-sm">+ Add Stat</button>
        </div>
    `;
}

/**
 * Generates form for footer customization
 */
function generateFooterForm(wrapper) {
    const companyName = wrapper.querySelector('div[style*="font-weight: 900"]')?.textContent || '';
    const description = wrapper.querySelector('p')?.textContent || '';
    const columns = Array.from(wrapper.querySelectorAll('div[style*="display: flex; flex-direction: column"]')).map(col => ({
        heading: col.querySelector('span')?.textContent || '',
        links: Array.from(col.querySelectorAll('a')).map(a => ({
            text: a.textContent,
            href: a.getAttribute('href') || '#'
        }))
    }));

    return `
        <div class="form-group">
            <label>Company Name</label>
            <input type="text" id="footer-company" class="form-control" value="${companyName}">
        </div>
        
        <div class="form-group">
            <label>Description</label>
            <textarea id="footer-description" class="form-control" rows="3">${description}</textarea>
        </div>
        
        <div class="form-group">
            <label>Link Columns</label>
            <div id="footer-columns-list" class="list-editor">
                ${columns.map((col, cIndex) => `
                    <div class="list-item" style="flex-direction: column; align-items: stretch; gap: 0.5rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 1rem;" data-index="${cIndex}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <input type="text" class="form-control form-control-sm" style="font-weight: 700; width: 70%;" value="${col.heading}" data-footer-col-heading="${cIndex}">
                            <button class="btn-remove" data-index="${cIndex}">×</button>
                        </div>
                        
                        <div class="footer-links-editor" style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px dashed #e2e8f0;">
                            ${col.links.map((link, lIndex) => `
                                <div style="display: flex; gap: 0.5rem; margin-bottom: 0.25rem;">
                                    <input type="text" class="form-control form-control-sm" value="${link.text}" data-footer-link-text="${cIndex}" data-link-index="${lIndex}">
                                    <button class="btn-remove-footer-link" data-col-index="${cIndex}" data-link-index="${lIndex}">×</button>
                                </div>
                            `).join('')}
                            <button class="add-footer-link btn btn-outline btn-sm" data-col-index="${cIndex}" style="width: 100%; border-style: dashed; margin-top: 0.25rem;">+ Add Link</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button id="add-footer-column" class="btn btn-outline btn-sm">+ Add Column</button>
        </div>
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
            attachStatsListeners(wrapper);
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

    // Button text inputs
    const buttonInputs = document.querySelectorAll('[data-btn-index]');
    buttonInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-btn-index'));
            const buttons = wrapper.querySelectorAll('.btn');
            if (buttons[index]) {
                buttons[index].textContent = e.target.value;
            }
        });
    });

    // Remove button handlers
    const removeButtons = document.querySelectorAll('#hero-buttons-list .btn-remove');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            const buttons = wrapper.querySelectorAll('.btn');
            if (buttons[index]) {
                buttons[index].remove();
                // Regenerate form
                const panelContent = document.getElementById('panel-content');
                const type = wrapper.getAttribute('data-type');
                panelContent.innerHTML = generateCustomizationForm(type, wrapper);
                attachCustomizationListeners(type, wrapper);
            }
        });
    });

    // Add button handler
    const addButton = document.getElementById('add-hero-button');
    if (addButton) {
        addButton.addEventListener('click', () => {
            const btnGroup = wrapper.querySelector('.tmp-btn-group') || wrapper.querySelector('div[style*="display: flex"]');
            if (btnGroup) {
                const newBtn = document.createElement('a');
                newBtn.href = '#';
                newBtn.className = 'btn btn-primary';
                newBtn.textContent = 'New Button';
                newBtn.style.padding = '1rem 2rem';
                btnGroup.appendChild(newBtn);

                // Regenerate form
                const panelContent = document.getElementById('panel-content');
                const type = wrapper.getAttribute('data-type');
                panelContent.innerHTML = generateCustomizationForm(type, wrapper);
                attachCustomizationListeners(type, wrapper);
            }
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

    // Button text inputs
    const buttonInputs = document.querySelectorAll('[data-btn-index]');
    buttonInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-btn-index'));
            const buttons = wrapper.querySelectorAll('.btn');
            if (buttons[index]) {
                buttons[index].textContent = e.target.value;
            }
        });
    });

    // Remove button handlers
    const removeButtons = document.querySelectorAll('#cta-buttons-list .btn-remove');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            const buttons = wrapper.querySelectorAll('.btn');
            if (buttons[index]) {
                buttons[index].remove();
                // Regenerate form
                const panelContent = document.getElementById('panel-content');
                const type = wrapper.getAttribute('data-type');
                panelContent.innerHTML = generateCustomizationForm(type, wrapper);
                attachCustomizationListeners(type, wrapper);
            }
        });
    });

    // Add button handler
    const addButton = document.getElementById('add-cta-button');
    if (addButton) {
        addButton.addEventListener('click', () => {
            const btnGroup = wrapper.querySelector('div[style*="display: flex"]');
            if (btnGroup) {
                const newBtn = document.createElement('a');
                newBtn.href = '#';
                newBtn.className = 'btn btn-primary';
                newBtn.textContent = 'New Button';
                newBtn.style.background = '#fff';
                newBtn.style.color = '#667eea';
                newBtn.style.padding = '1rem 2.5rem';
                newBtn.style.fontSize = '1.05rem';
                newBtn.style.fontWeight = '700';
                btnGroup.appendChild(newBtn);

                // Regenerate form
                const panelContent = document.getElementById('panel-content');
                const type = wrapper.getAttribute('data-type');
                panelContent.innerHTML = generateCustomizationForm(type, wrapper);
                attachCustomizationListeners(type, wrapper);
            }
        });
    }
}

/**
 * Attaches listeners for pricing customization
 */
function attachPricingListeners(wrapper) {
    const panelContent = document.getElementById('panel-content');
    const headingInput = document.getElementById('pricing-heading');
    const descInput = document.getElementById('pricing-description');

    if (headingInput) {
        headingInput.addEventListener('input', (e) => {
            const h2 = wrapper.querySelector('h2');
            if (h2) h2.textContent = e.target.value;
        });
    }

    if (descInput) {
        descInput.addEventListener('input', (e) => {
            const p = wrapper.querySelector('p[style*="color: #64748b"]');
            if (p) p.textContent = e.target.value;
        });
    }

    // Tier Name inputs
    const nameInputs = document.querySelectorAll('[data-tier-name]');
    nameInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-tier-name'));
            const cards = Array.from(wrapper.querySelectorAll('div[style*="border-radius: 16px"]'));
            if (cards[index]) {
                const h3 = cards[index].querySelector('h3');
                if (h3) h3.textContent = e.target.value;
            }
        });
    });

    // Tier Price inputs
    const priceInputs = document.querySelectorAll('[data-tier-price]');
    priceInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-tier-price'));
            const cards = Array.from(wrapper.querySelectorAll('div[style*="border-radius: 16px"]'));
            if (cards[index]) {
                const priceSpan = cards[index].querySelector('span[style*="font-weight: 800"]');
                if (priceSpan) priceSpan.textContent = e.target.value;
            }
        });
    });

    // Tier Feature inputs
    const featureInputs = document.querySelectorAll('[data-tier-feature]');
    featureInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const tierIndex = parseInt(e.target.getAttribute('data-tier-feature'));
            const featIndex = parseInt(e.target.getAttribute('data-feature-index'));
            const cards = Array.from(wrapper.querySelectorAll('div[style*="border-radius: 16px"]'));
            if (cards[tierIndex]) {
                const li = cards[tierIndex].querySelectorAll('ul li')[featIndex];
                if (li) li.innerHTML = `<span style="color: inherit; font-weight: 700;">✓</span> ${e.target.value}`;
            }
        });
    });

    // Remove Tier feature handler
    const removeFeatBtns = document.querySelectorAll('.btn-remove-feature');
    removeFeatBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tIndex = parseInt(btn.getAttribute('data-tier-index'));
            const fIndex = parseInt(btn.getAttribute('data-feature-index'));
            const cards = Array.from(wrapper.querySelectorAll('div[style*="border-radius: 16px"]'));
            if (cards[tIndex]) {
                const li = cards[tIndex].querySelectorAll('ul li')[fIndex];
                if (li) li.remove();
                panelContent.innerHTML = generatePricingForm(wrapper);
                attachPricingListeners(wrapper);
            }
        });
    });

    // Add Tier feature handler
    const addFeatBtns = document.querySelectorAll('.add-tier-feature');
    addFeatBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tIndex = parseInt(btn.getAttribute('data-tier-index'));
            const cards = Array.from(wrapper.querySelectorAll('div[style*="border-radius: 16px"]'));
            if (cards[tIndex]) {
                const ul = cards[tIndex].querySelector('ul');
                if (ul) {
                    const newLi = document.createElement('li');
                    newLi.style.cssText = 'padding: 0.75rem 0; color: inherit; display: flex; align-items: center; gap: 0.75rem;';
                    newLi.innerHTML = '<span style="color: inherit; font-weight: 700;">✓</span> New Feature';
                    ul.appendChild(newLi);
                    panelContent.innerHTML = generatePricingForm(wrapper);
                    attachPricingListeners(wrapper);
                }
            }
        });
    });

    // Remove Tier handler
    const removeTierBtns = document.querySelectorAll('#pricing-list > .list-item > div > .btn-remove');
    removeTierBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.getAttribute('data-index'));
            const cards = Array.from(wrapper.querySelectorAll('div[style*="border-radius: 16px"]'));
            if (cards[index]) {
                cards[index].remove();
                panelContent.innerHTML = generatePricingForm(wrapper);
                attachPricingListeners(wrapper);
            }
        });
    });

    // Add Tier handler
    const addTierBtn = document.getElementById('add-pricing-tier');
    if (addTierBtn) {
        addTierBtn.addEventListener('click', () => {
            const grid = wrapper.querySelector('div[style*="display: grid"]');
            if (grid) {
                const newCard = document.createElement('div');
                newCard.style.cssText = 'background: #fff; padding: 2.5rem; border-radius: 16px; border: 2px solid #e2e8f0; transition: all 0.3s;';
                newCard.innerHTML = `
                    <h3 style="font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;">New Plan</h3>
                    <p style="color: #64748b; margin-bottom: 1.5rem;">Plan description</p>
                    <div style="margin-bottom: 2rem;">
                        <span style="font-size: 3rem; font-weight: 800; color: #0f172a;">$0</span>
                        <span style="color: #64748b; font-size: 1.1rem;">/month</span>
                    </div>
                    <ul style="list-style: none; padding: 0; margin: 0 0 2rem 0;">
                        <li style="padding: 0.75rem 0; color: #334155; display: flex; align-items: center; gap: 0.75rem;"><span style="color: #10b981; font-weight: 700;">✓</span> Feature 1</li>
                    </ul>
                    <a href="#" class="btn btn-outline" style="width: 100%; text-align: center; padding: 1rem;">Get Started</a>
                `;
                grid.appendChild(newCard);
                panelContent.innerHTML = generatePricingForm(wrapper);
                attachPricingListeners(wrapper);
            }
        });
    }
}

/**
 * Attaches listeners for contact form customization
 */
function attachContactFormListeners(wrapper) {
    const panelContent = document.getElementById('panel-content');
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

    // Field Label inputs
    const labelInputs = document.querySelectorAll('[data-field-label]');
    labelInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-field-label'));
            const divs = wrapper.querySelectorAll('form > div');
            if (divs[index]) {
                const label = divs[index].querySelector('label');
                if (label) label.textContent = e.target.value;
            }
        });
    });

    // Field Placeholder inputs
    const placeholderInputs = document.querySelectorAll('[data-field-placeholder]');
    placeholderInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-field-placeholder'));
            const divs = wrapper.querySelectorAll('form > div');
            if (divs[index]) {
                const inner = divs[index].querySelector('input') || divs[index].querySelector('textarea');
                if (inner) inner.placeholder = e.target.value;
            }
        });
    });

    // Field Type selects
    const typeSelects = document.querySelectorAll('[data-field-type]');
    typeSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            const index = parseInt(e.target.getAttribute('data-field-type'));
            const divs = wrapper.querySelectorAll('form > div');
            if (divs[index]) {
                const label = divs[index].querySelector('label')?.textContent || '';
                const placeholder = divs[index].querySelector('input')?.placeholder || divs[index].querySelector('textarea')?.placeholder || '';
                const newType = e.target.value;

                let newInner;
                if (newType === 'textarea') {
                    newInner = document.createElement('textarea');
                    newInner.rows = 5;
                    newInner.style.cssText = 'width: 100%; padding: 0.875rem 1rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 1rem; resize: vertical; font-family: inherit; transition: border-color 0.2s;';
                } else {
                    newInner = document.createElement('input');
                    newInner.type = newType;
                    newInner.style.cssText = 'width: 100%; padding: 0.875rem 1rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 1rem; transition: border-color 0.2s;';
                }

                newInner.placeholder = placeholder;
                newInner.setAttribute('onfocus', "this.style.borderColor='#667eea'");
                newInner.setAttribute('onblur', "this.style.borderColor='#e2e8f0'");

                const oldInner = divs[index].querySelector('input') || divs[index].querySelector('textarea');
                if (oldInner) oldInner.replaceWith(newInner);

                panelContent.innerHTML = generateContactFormCustomization(wrapper);
                attachContactFormListeners(wrapper);
            }
        });
    });

    // Remove handlers
    const removeBtns = document.querySelectorAll('#contact-fields-list .btn-remove');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            const divs = wrapper.querySelectorAll('form > div');
            if (divs[index]) {
                divs[index].remove();
                panelContent.innerHTML = generateContactFormCustomization(wrapper);
                attachContactFormListeners(wrapper);
            }
        });
    });

    // Add handler
    const addBtn = document.getElementById('add-contact-field');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const form = wrapper.querySelector('form');
            if (form) {
                const btn = form.querySelector('button[type="submit"]');
                const newDiv = document.createElement('div');
                newDiv.style.marginBottom = '1.5rem';
                newDiv.innerHTML = `
                    <label style="display: block; font-weight: 600; color: #334155; margin-bottom: 0.5rem;">New Field</label>
                    <input type="text" placeholder="Enter text..." style="width: 100%; padding: 0.875rem 1rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 1rem; transition: border-color 0.2s;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e2e8f0'">
                `;
                if (btn) {
                    form.insertBefore(newDiv, btn);
                } else {
                    form.appendChild(newDiv);
                }
                panelContent.innerHTML = generateContactFormCustomization(wrapper);
                attachContactFormListeners(wrapper);
            }
        });
    }
}

/**
 * Attaches listeners for features grid customization
 */
function attachFeaturesListeners(wrapper) {
    const panelContent = document.getElementById('panel-content');
    const headingInput = document.getElementById('features-heading');
    const descInput = document.getElementById('features-description');

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

    // Individual feature headings
    const featHeadings = document.querySelectorAll('[data-feat-heading]');
    featHeadings.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-feat-heading'));
            const cards = wrapper.querySelectorAll('.tmp-feat-card');
            if (cards[index]) {
                const h3 = cards[index].querySelector('h3');
                if (h3) h3.textContent = e.target.value;
            }
        });
    });

    // Individual feature descriptions
    const featDescs = document.querySelectorAll('[data-feat-desc]');
    featDescs.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-feat-desc'));
            const cards = wrapper.querySelectorAll('.tmp-feat-card');
            if (cards[index]) {
                const p = cards[index].querySelector('p');
                if (p) p.textContent = e.target.value;
            }
        });
    });

    // Remove feature handlers
    const removeButtons = document.querySelectorAll('#features-list .btn-remove');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            const cards = wrapper.querySelectorAll('.tmp-feat-card');
            if (cards[index]) {
                cards[index].remove();
                // Regenerate form
                panelContent.innerHTML = generateFeaturesForm(wrapper);
                attachFeaturesListeners(wrapper);
            }
        });
    });

    // Add feature handler
    const addBtn = document.getElementById('add-feature');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const grid = wrapper.querySelector('.tmp-grid');
            if (grid) {
                const newCard = document.createElement('div');
                newCard.className = 'tmp-feat-card';
                newCard.innerHTML = `
                    <div class="tmp-feat-icon" style="background: #eff6ff;"></div>
                    <h3>New Feature</h3>
                    <p>Description of the new feature goes here.</p>
                `;
                grid.appendChild(newCard);
                // Regenerate form
                panelContent.innerHTML = generateFeaturesForm(wrapper);
                attachFeaturesListeners(wrapper);
            }
        });
    }
}

/**
 * Attaches listeners for testimonial grid customization
 */
function attachTestimonialListeners(wrapper) {
    const panelContent = document.getElementById('panel-content');
    const headingInput = document.getElementById('testimonial-heading');
    const descInput = document.getElementById('testimonial-description');

    if (headingInput) {
        headingInput.addEventListener('input', (e) => {
            const h2 = wrapper.querySelector('h2');
            if (h2) h2.textContent = e.target.value;
        });
    }

    if (descInput) {
        descInput.addEventListener('input', (e) => {
            const p = wrapper.querySelector('p[style*="color: #64748b"]');
            if (p) p.textContent = e.target.value;
        });
    }

    // Quote inputs
    const quoteInputs = document.querySelectorAll('[data-t-quote]');
    quoteInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-t-quote'));
            const cards = Array.from(wrapper.querySelectorAll('div[style*="background: #fff"]')).filter(el => el.querySelector('p[style*="font-style: italic"]'));
            if (cards[index]) {
                const quote = cards[index].querySelector('p[style*="font-style: italic"]');
                if (quote) quote.textContent = e.target.value;
            }
        });
    });

    // Name inputs
    const nameInputs = document.querySelectorAll('[data-t-name]');
    nameInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-t-name'));
            const cards = Array.from(wrapper.querySelectorAll('div[style*="background: #fff"]')).filter(el => el.querySelector('p[style*="font-style: italic"]'));
            if (cards[index]) {
                const infoDivs = cards[index].querySelectorAll('div > div > div');
                if (infoDivs[0]) infoDivs[0].textContent = e.target.value;
            }
        });
    });

    // Role inputs
    const roleInputs = document.querySelectorAll('[data-t-role]');
    roleInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-t-role'));
            const cards = Array.from(wrapper.querySelectorAll('div[style*="background: #fff"]')).filter(el => el.querySelector('p[style*="font-style: italic"]'));
            if (cards[index]) {
                const infoDivs = cards[index].querySelectorAll('div > div > div');
                if (infoDivs[1]) infoDivs[1].textContent = e.target.value;
            }
        });
    });

    // Remove handlers
    const removeBtns = document.querySelectorAll('#testimonial-list .btn-remove');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            const cards = Array.from(wrapper.querySelectorAll('div[style*="background: #fff"]')).filter(el => el.querySelector('p[style*="font-style: italic"]'));
            if (cards[index]) {
                cards[index].remove();
                panelContent.innerHTML = generateTestimonialForm(wrapper);
                attachTestimonialListeners(wrapper);
            }
        });
    });

    // Add handler
    const addBtn = document.getElementById('add-testimonial');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const grid = wrapper.querySelector('div[style*="display: grid"]');
            if (grid) {
                const newT = document.createElement('div');
                newT.style.cssText = 'background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;';
                newT.innerHTML = `
                    <p style="font-size: 1.05rem; line-height: 1.7; color: #334155; margin-bottom: 1.5rem; font-style: italic;">"New testimonial quote goes here."</p>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%;"></div>
                        <div>
                            <div style="font-weight: 700; color: #0f172a;">New User</div>
                            <div style="font-size: 0.9rem; color: #64748b;">Role, Company</div>
                        </div>
                    </div>
                `;
                grid.appendChild(newT);
                panelContent.innerHTML = generateTestimonialForm(wrapper);
                attachTestimonialListeners(wrapper);
            }
        });
    }
}

/**
 * Attaches listeners for footer customization
 */
function attachFooterListeners(wrapper) {
    const panelContent = document.getElementById('panel-content');
    const companyInput = document.getElementById('footer-company');
    const descInput = document.getElementById('footer-description');

    if (companyInput) {
        companyInput.addEventListener('input', (e) => {
            const companyEl = wrapper.querySelector('div[style*="font-weight: 900"]');
            if (companyEl) companyEl.textContent = e.target.value;
        });
    }

    if (descInput) {
        descInput.addEventListener('input', (e) => {
            const p = wrapper.querySelector('p');
            if (p) p.textContent = e.target.value;
        });
    }

    // Column Heading inputs
    const colHeadingInputs = document.querySelectorAll('[data-footer-col-heading]');
    colHeadingInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-footer-col-heading'));
            const columns = wrapper.querySelectorAll('div[style*="display: flex; flex-direction: column"]');
            if (columns[index]) {
                const span = columns[index].querySelector('span');
                if (span) span.textContent = e.target.value;
            }
        });
    });

    // Link Text inputs
    const linkTextInputs = document.querySelectorAll('[data-footer-link-text]');
    linkTextInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const cIndex = parseInt(e.target.getAttribute('data-footer-link-text'));
            const lIndex = parseInt(e.target.getAttribute('data-link-index'));
            const columns = wrapper.querySelectorAll('div[style*="display: flex; flex-direction: column"]');
            if (columns[cIndex]) {
                const link = columns[cIndex].querySelectorAll('a')[lIndex];
                if (link) link.textContent = e.target.value;
            }
        });
    });

    // Remove Column handlers
    const removeColBtns = document.querySelectorAll('#footer-columns-list > .list-item > div > .btn-remove');
    removeColBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.getAttribute('data-index'));
            const columns = wrapper.querySelectorAll('div[style*="display: flex; flex-direction: column"]');
            if (columns[index]) {
                columns[index].remove();
                panelContent.innerHTML = generateFooterForm(wrapper);
                attachFooterListeners(wrapper);
            }
        });
    });

    // Remove Link handlers
    const removeLinkBtns = document.querySelectorAll('.btn-remove-footer-link');
    removeLinkBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cIndex = parseInt(btn.getAttribute('data-col-index'));
            const lIndex = parseInt(btn.getAttribute('data-link-index'));
            const columns = wrapper.querySelectorAll('div[style*="display: flex; flex-direction: column"]');
            if (columns[cIndex]) {
                const link = columns[cIndex].querySelectorAll('a')[lIndex];
                if (link) link.remove();
                panelContent.innerHTML = generateFooterForm(wrapper);
                attachFooterListeners(wrapper);
            }
        });
    });

    // Add Link handler
    const addLinkBtns = document.querySelectorAll('.add-footer-link');
    addLinkBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cIndex = parseInt(btn.getAttribute('data-col-index'));
            const columns = wrapper.querySelectorAll('div[style*="display: flex; flex-direction: column"]');
            if (columns[cIndex]) {
                const newLink = document.createElement('a');
                newLink.href = '#';
                newLink.style.cssText = 'color: #475569; text-decoration: none; font-size: 0.9rem;';
                newLink.textContent = 'New Link';
                columns[cIndex].appendChild(newLink);
                panelContent.innerHTML = generateFooterForm(wrapper);
                attachFooterListeners(wrapper);
            }
        });
    });

    // Add Column handler
    const addColBtn = document.getElementById('add-footer-column');
    if (addColBtn) {
        addColBtn.addEventListener('click', () => {
            const container = wrapper.querySelector('div[style*="display: flex; gap: 4rem"]');
            if (container) {
                const newCol = document.createElement('div');
                newCol.style.cssText = 'display: flex; flex-direction: column; gap: 0.75rem;';
                newCol.innerHTML = `
                    <span style="font-weight: 700; font-size: 0.85rem; text-transform: uppercase; color: #111;">New Column</span>
                    <a href="#" style="color: #475569; text-decoration: none; font-size: 0.9rem;">New Link</a>
                `;
                container.appendChild(newCol);
                panelContent.innerHTML = generateFooterForm(wrapper);
                attachFooterListeners(wrapper);
            }
        });
    }
}

function attachStatsListeners(wrapper) {
    const panelContent = document.getElementById('panel-content');

    // Stat number inputs
    const numInputs = document.querySelectorAll('[data-stat-number]');
    numInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-stat-number'));
            const stats = Array.from(wrapper.querySelectorAll('div[style*="text-align: center"]')).filter(el => el.querySelector('div[style*="font-size: 3.5rem"]'));
            if (stats[index]) {
                const numEl = stats[index].querySelector('div[style*="font-size: 3.5rem"]');
                if (numEl) numEl.textContent = e.target.value;
            }
        });
    });

    // Stat label inputs
    const labelInputs = document.querySelectorAll('[data-stat-label]');
    labelInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-stat-label'));
            const stats = Array.from(wrapper.querySelectorAll('div[style*="text-align: center"]')).filter(el => el.querySelector('div[style*="font-size: 3.5rem"]'));
            if (stats[index]) {
                const labelEl = stats[index].querySelector('div[style*="font-size: 1.1rem"]');
                if (labelEl) labelEl.textContent = e.target.value;
            }
        });
    });

    // Remove handlers
    const removeBtns = document.querySelectorAll('#stats-list .btn-remove');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            const stats = Array.from(wrapper.querySelectorAll('div[style*="text-align: center"]')).filter(el => el.querySelector('div[style*="font-size: 3.5rem"]'));
            if (stats[index]) {
                stats[index].remove();
                panelContent.innerHTML = generateStatsForm(wrapper);
                attachStatsListeners(wrapper);
            }
        });
    });

    // Add handler
    const addBtn = document.getElementById('add-stat');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const grid = wrapper.querySelector('div[style*="display: grid"]');
            if (grid) {
                const newStat = document.createElement('div');
                newStat.style.textAlign = 'center';
                newStat.innerHTML = `
                    <div style="font-size: 3.5rem; font-weight: 900; margin-bottom: 0.5rem; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">0</div>
                    <div style="font-size: 1.1rem; color: #94a3b8; font-weight: 500;">New Stat</div>
                `;
                grid.appendChild(newStat);
                panelContent.innerHTML = generateStatsForm(wrapper);
                attachStatsListeners(wrapper);
            }
        });
    }
}

/**
 * Attaches listeners for centered content customization
 */
function attachContentListeners(wrapper) {
    const headingInput = document.getElementById('content-heading');
    const contentInput = document.getElementById('content-text');

    if (headingInput) {
        headingInput.addEventListener('input', (e) => {
            const h2 = wrapper.querySelector('h2');
            if (h2) h2.textContent = e.target.value;
        });
    }

    if (contentInput) {
        contentInput.addEventListener('input', (e) => {
            const p = wrapper.querySelector('p');
            if (p) p.textContent = e.target.value;
        });
    }
}
