/**
 * builder.js - Custom Layout Builder Logic
 * Allows users to build custom layouts by dragging and dropping components
 */

// ========== SECURITY ==========
/**
 * Sanitizes HTML to prevent XSS attacks
 * @param {string} html - Raw HTML string
 * @returns {string} Sanitized HTML
 */
function sanitizeHTML(html) {
    const temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
}

/**
 * Validates component type against allowed types
 * @param {string} type - Component type to validate
 * @param {object} components - Available components object
 * @returns {boolean} True if valid
 */
function isValidComponentType(type, components) {
    return type && typeof type === 'string' && components.hasOwnProperty(type);
}

// ========== MAIN APPLICATION ==========
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas-frame');
    const compItems = document.querySelectorAll('.comp-item');
    const clearBtn = document.getElementById('clear-canvas');
    const exportBtn = document.getElementById('export-code');
    const modal = document.getElementById('codeModal');
    const closeModal = document.getElementById('modal-close-x');

    // --- COMPONENT TEMPLATES --- //

    let components = {};

    /**
     * Loads component data from JSON file
     * LAYMAN'S EXPLANATION: fetch()
     * Think of fetch() like a waiter at a restaurant:
     * 1. You (the script) ask for a 'menu' (the JSON file).
     * 2. The waiter (fetch) goes to the kitchen (server) to get it.
     * 3. Since the kitchen might be busy, you get a 'Promise' (a buzzer that will go off when ready).
     * 4. Once ready (.then), you get the raw data, turn it into JSON (.json()), and then start building!
     */
    fetch('data/components.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            components = data;
            console.log("Components loaded successfully:", components);
            // Now that components are loaded, we can enable the sidebar clicks
            initSidebar();
        })
        .catch(error => {
            console.error("Error loading component data:", error);
            alert('Failed to load components. Please refresh the page.');
        });

    // --- CORE LOGIC --- //

    /**
     * Adds a component to the canvas
     * @param {string} type - Component type identifier
     */
    function addComponent(type) {
        // Validate component type
        if (!isValidComponentType(type, components)) {
            console.warn(`Component type "${type}" not loaded yet or doesn't exist.`);
            return;
        }

        try {
            // Remove empty state message
            const emptyMsg = canvas.querySelector('.empty-canvas-msg');
            if (emptyMsg) emptyMsg.remove();

            // Create wrapper with proper attributes
            const wrapper = document.createElement('div');
            wrapper.className = 'section-wrapper';
            wrapper.setAttribute('data-type', type);
            wrapper.setAttribute('data-component-id', `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
            wrapper.setAttribute('role', 'article');
            wrapper.setAttribute('aria-label', `${components[type].name} component`);

            // Set innerHTML with component HTML FIRST (already validated)
            wrapper.innerHTML = components[type].html;

            // NOW create and add controls (after innerHTML is set)
            const controls = document.createElement('div');
            controls.className = 'section-controls';
            controls.innerHTML = `
                <button class="control-btn move-up" title="Move Up" aria-label="Move component up">↑</button>
                <button class="control-btn move-down" title="Move Down" aria-label="Move component down">↓</button>
                <button class="control-btn duplicate" title="Duplicate" aria-label="Duplicate component">⧉</button>
                <button class="control-btn edit" title="Edit" aria-label="Edit component">⚙️</button>
                <button class="control-btn delete" title="Remove" aria-label="Remove component">&times;</button>
            `;

            wrapper.appendChild(controls);
            canvas.appendChild(wrapper);

            // Event Listeners for controls (attached to live DOM elements)
            controls.querySelector('.delete').addEventListener('click', () => {
                wrapper.remove();
                if (canvas.children.length === 0) {
                    canvas.innerHTML = '<div class="empty-canvas-msg"><p>Select components from the left to start building your layout.</p></div>';
                }
            });

            controls.querySelector('.duplicate').addEventListener('click', () => {
                const clone = wrapper.cloneNode(true);
                // Generate new unique ID for cloned component
                clone.setAttribute('data-component-id', `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

                // Re-attach event listeners to cloned controls
                const clonedControls = clone.querySelector('.section-controls');

                clonedControls.querySelector('.delete').addEventListener('click', () => {
                    clone.remove();
                    if (canvas.children.length === 0) {
                        canvas.innerHTML = '<div class="empty-canvas-msg"><p>Select components from the left to start building your layout.</p></div>';
                    }
                });

                clonedControls.querySelector('.duplicate').addEventListener('click', () => {
                    addComponent(type); // Recursively add another copy
                });

                clonedControls.querySelector('.edit').addEventListener('click', () => {
                    openCustomizationPanel(clone);
                });

                clonedControls.querySelector('.move-up').addEventListener('click', () => {
                    if (clone.previousElementSibling && !clone.previousElementSibling.classList.contains('empty-canvas-msg')) {
                        canvas.insertBefore(clone, clone.previousElementSibling);
                    }
                });

                clonedControls.querySelector('.move-down').addEventListener('click', () => {
                    if (clone.nextElementSibling) {
                        canvas.insertBefore(clone.nextElementSibling, clone);
                    }
                });

                canvas.insertBefore(clone, wrapper.nextElementSibling);
            });

            controls.querySelector('.edit').addEventListener('click', () => {
                console.log('Edit button clicked!', wrapper);
                console.log('openCustomizationPanel function exists?', typeof openCustomizationPanel);
                if (typeof openCustomizationPanel === 'function') {
                    openCustomizationPanel(wrapper);
                } else {
                    console.error('openCustomizationPanel is not defined!');
                }
            });

            controls.querySelector('.move-up').addEventListener('click', () => {
                if (wrapper.previousElementSibling && !wrapper.previousElementSibling.classList.contains('empty-canvas-msg')) {
                    canvas.insertBefore(wrapper, wrapper.previousElementSibling);
                }
            });

            controls.querySelector('.move-down').addEventListener('click', () => {
                if (wrapper.nextElementSibling) {
                    canvas.insertBefore(wrapper.nextElementSibling, wrapper);
                }
            });
        } catch (error) {
            console.error('Error adding component:', error);
        }
    }

    /**
     * Initializes sidebar component interactions
     * Called after components are loaded from JSON
     */
    function initSidebar() {
        compItems.forEach(item => {
            // Add keyboard accessibility
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');

            // Click handler
            item.addEventListener('click', () => {
                addComponent(item.getAttribute('data-type'));
            });

            // Keyboard handler
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    addComponent(item.getAttribute('data-type'));
                }
            });
        });
    }

    // Toolbar actions
    clearBtn.addEventListener('click', () => {
        if (confirm('Clear entire layout?')) {
            canvas.innerHTML = '<div class="empty-canvas-msg"><p>Select components from the left to start building your layout.</p></div>';
        }
    });

    exportBtn.addEventListener('click', () => {
        const sections = canvas.querySelectorAll('.section-wrapper');
        if (sections.length === 0) {
            alert('No components to export. Add some components first!');
            return;
        }

        let htmlContent = '';
        sections.forEach(section => {
            const clone = section.cloneNode(true);
            clone.querySelector('.section-controls')?.remove();
            htmlContent += clone.innerHTML;
        });

        // Generate full HTML
        const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Layout - PROJECT 101</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
${htmlContent}
</body>
</html>`;

        // Generate CSS
        const cssContent = `/* Custom Layout Styles - PROJECT 101 */

/* Base Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    color: #0f172a;
}

/* Button Styles */
.btn {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
    text-decoration: none;
    display: inline-block;
}

.btn-primary {
    background: #2563eb;
    color: #fff;
}

.btn-primary:hover {
    background: #1d4ed8;
}

.btn-outline {
    background: transparent;
    border-color: #e2e8f0;
    color: #0f172a;
}

.btn-outline:hover {
    background: #f8fafc;
}

/* Navbar Styles */
.tmp-navbar {
    padding: 1rem 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    background: #ffffff;
}

.tmp-logo {
    font-weight: 900;
    font-size: 1.5rem;
    color: #111;
}

.tmp-nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}

.tmp-nav-links a {
    text-decoration: none;
    color: #334155;
    font-size: 0.9rem;
}

/* Hero Section */
.tmp-hero {
    padding: 8rem 5%;
    text-align: center;
    background: #ffffff;
}

.tmp-hero h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    color: #111;
}

.tmp-hero p {
    font-size: 1.25rem;
    color: #475569;
    max-width: 700px;
    margin: 0 auto 2.5rem;
    line-height: 1.6;
}

.tmp-btn-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

/* Feature Grid */
.tmp-features {
    padding: 5rem 5%;
    background: #f9f9f9;
}

.tmp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    margin-top: 3rem;
}

.tmp-feat-card {
    text-align: left;
}

.tmp-feat-icon {
    width: 50px;
    height: 50px;
    background: #eee;
    border-radius: 12px;
    margin-bottom: 1.5rem;
}

.tmp-feat-card h3 {
    margin-bottom: 1rem;
}

.tmp-feat-card p {
    color: #666;
    line-height: 1.5;
    font-size: 0.95rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .tmp-hero h1 {
        font-size: 2.5rem;
    }
    
    .tmp-grid {
        grid-template-columns: 1fr;
    }
    
    .tmp-nav-links {
        display: none;
    }
}`;

        // Populate both tabs
        document.getElementById('exported-html').textContent = fullHTML;
        document.getElementById('exported-css').textContent = cssContent;

        // Show modal
        modal.style.display = 'flex';
    });

    // Tab switching logic
    const tabButtons = document.querySelectorAll('.code-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Update active tab button
            tabButtons.forEach(b => {
                b.classList.remove('active');
                b.style.borderBottom = '2px solid transparent';
                b.style.color = '#64748b';
            });
            btn.classList.add('active');
            btn.style.borderBottom = '2px solid #2563eb';
            btn.style.color = '#2563eb';

            // Show corresponding content
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            document.getElementById(`${targetTab}-tab-content`).style.display = 'block';
        });
    });

    // Copy button for HTML tab
    document.getElementById('copy-html').addEventListener('click', () => {
        const htmlCode = document.getElementById('exported-html').textContent;
        navigator.clipboard.writeText(htmlCode).then(() => {
            const btn = document.getElementById('copy-html');
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = originalText, 2000);
        });
    });

    // Copy button for CSS tab
    document.getElementById('copy-css').addEventListener('click', () => {
        const cssCode = document.getElementById('exported-css').textContent;
        navigator.clipboard.writeText(cssCode).then(() => {
            const btn = document.getElementById('copy-css');
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = originalText, 2000);
        });
    });

    // Modal close handlers
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // ========== CUSTOMIZATION SYSTEM INITIALIZATION ==========
    // Initialize customization system (defined in customization.js)
    console.log('Initializing customization system...');
    console.log('Components object:', components);
    console.log('initCustomization function exists?', typeof initCustomization);
    if (typeof initCustomization === 'function') {
        initCustomization(components);
        console.log('Customization system initialized!');
    } else {
        console.error('initCustomization function not found!');
    }
});
