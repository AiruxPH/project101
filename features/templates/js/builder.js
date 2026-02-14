// builder.js - Custom Layout Builder Logic

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas-frame');
    const compItems = document.querySelectorAll('.comp-item');
    const clearBtn = document.getElementById('clear-canvas');
    const exportBtn = document.getElementById('export-code');
    const modal = document.getElementById('codeModal');
    const closeModal = document.getElementById('close-modal');
    const codeDisplay = document.getElementById('exported-html');
    const copyBtn = document.getElementById('copy-exported');

    // --- COMPONENT TEMPLATES --- //

    const components = {
        navbar_simple: {
            name: "Simple Navbar",
            html: `
<nav class="tmp-navbar">
    <div class="tmp-logo">BRAND</div>
    <ul class="tmp-nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Features</a></li>
        <li><a href="#">About</a></li>
    </ul>
</nav>`
        },
        hero_centered: {
            name: "Centered Hero",
            html: `
<header class="tmp-hero">
    <h1>Create Something Amazing</h1>
    <p>A simple, centered hero section to capture attention and deliver your core message effectively.</p>
    <div class="tmp-btn-group">
        <a href="#" class="btn btn-primary">Get Started</a>
    </div>
</header>`
        },
        hero_split: {
            name: "Split Hero",
            html: `
<header style="display: flex; align-items: center; padding: 6rem 5%; gap: 4rem;">
    <div style="flex: 1;">
        <h1 style="font-size: 3rem; margin-bottom: 1.5rem;">Productivity first, always.</h1>
        <p style="font-size: 1.1rem; color: #666; margin-bottom: 2rem;">Stop wasting time on configuration. Start building features that matter to your users today.</p>
        <div style="display: flex; gap: 1rem;">
            <a href="#" class="btn btn-primary">Join for Free</a>
        </div>
    </div>
    <div style="flex: 1; aspect-ratio: 4/3; background: #f1f5f9; border-radius: 12px; border: 1px dashed #cbd5e1; display: flex; align-items: center; justify-content: center; color: #94a3b8;">
        <span>Illustration / Image Placeholder</span>
    </div>
</header>`
        },
        features_grid: {
            name: "Features Grid",
            html: `
<section class="tmp-features">
    <div style="text-align: center; margin-bottom: 3rem;"><h2>Why Choose Us</h2></div>
    <div class="tmp-grid">
        <div class="tmp-feat-card">
            <div class="tmp-feat-icon"></div>
            <h3>Fast Performance</h3>
            <p>Optimized for speed and efficiency across all devices.</p>
        </div>
        <div class="tmp-feat-card">
            <div class="tmp-feat-icon"></div>
            <h3>Secure by Design</h3>
            <p>Your data is encrypted and protected with industry standards.</p>
        </div>
        <div class="tmp-feat-card">
            <div class="tmp-feat-icon"></div>
            <h3>24/7 Support</h3>
            <p>Our team is always here to help you solve any issues.</p>
        </div>
    </div>
</section>`
        },
        content_center: {
            name: "Centered Content",
            html: `
<section style="padding: 5rem 5%; text-align: center; max-width: 800px; margin: 0 auto;">
    <h2 style="margin-bottom: 1.5rem;">Build with confidence</h2>
    <p style="font-size: 1.1rem; color: #555; line-height: 1.6;">Our toolkit provides all the essential components you need to build professional websites quickly. Focus on your content and let us handle the layout logic.</p>
</section>`
        },
        footer_simple: {
            name: "Simple Footer",
            html: `
<footer style="padding: 3rem 5%; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 0.9rem;">
    <p>© 2026 Your Company. All rights reserved.</p>
    <div style="display: flex; justify-content: center; gap: 2rem; margin-top: 1rem;">
        <a href="#" style="color: inherit; text-decoration: none;">Twitter</a>
        <a href="#" style="color: inherit; text-decoration: none;">LinkedIn</a>
        <a href="#" style="color: inherit; text-decoration: none;">GitHub</a>
    </div>
</footer>`
        }
    };

    // --- CORE LOGIC --- //

    function addComponent(type) {
        if (!components[type]) return;

        // Remove empty state message
        const emptyMsg = canvas.querySelector('.empty-canvas-msg');
        if (emptyMsg) emptyMsg.remove();

        const wrapper = document.createElement('div');
        wrapper.className = 'section-wrapper';
        wrapper.setAttribute('data-type', type);

        // Add Controls
        const controls = document.createElement('div');
        controls.className = 'section-controls';
        controls.innerHTML = `
            <button class="control-btn move-up" title="Move Up">↑</button>
            <button class="control-btn move-down" title="Move Down">↓</button>
            <button class="control-btn delete" title="Remove">&times;</button>
        `;

        wrapper.innerHTML = components[type].html;
        wrapper.appendChild(controls);
        canvas.appendChild(wrapper);

        // Event Listeners for controls
        controls.querySelector('.delete').addEventListener('click', () => {
            wrapper.remove();
            if (canvas.children.length === 0) {
                canvas.innerHTML = '<div class="empty-canvas-msg"><p>Select components from the left to start building your layout.</p></div>';
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
    }

    // Sidebar interaction
    compItems.forEach(item => {
        item.addEventListener('click', () => {
            addComponent(item.getAttribute('data-type'));
        });
    });

    // Toolbar actions
    clearBtn.addEventListener('click', () => {
        if (confirm('Clear entire layout?')) {
            canvas.innerHTML = '<div class="empty-canvas-msg"><p>Select components from the left to start building your layout.</p></div>';
        }
    });

    exportBtn.addEventListener('click', () => {
        const sections = canvas.querySelectorAll('.section-wrapper');
        if (sections.length === 0) {
            alert('Add some components first!');
            return;
        }

        let fullHtml = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>My Custom Website</title>\n    <style>\n        body { margin: 0; font-family: system-ui, sans-serif; }\n        /* Copy paste styles from layouts.css here */\n    </style>\n</head>\n<body>\n`;

        sections.forEach(sec => {
            // Clone and remove controls from the clone
            const clone = sec.cloneNode(true);
            const ctrl = clone.querySelector('.section-controls');
            if (ctrl) ctrl.remove();
            fullHtml += clone.innerHTML.trim() + '\n';
        });

        fullHtml += `</body>\n</html>`;

        codeDisplay.textContent = fullHtml;
        modal.style.display = 'flex';
    });

    // Modal
    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeDisplay.textContent).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "Copied!";
            setTimeout(() => copyBtn.innerText = originalText, 2000);
        });
    });
});
