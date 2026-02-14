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
    <div class="tmp-logo">VELOCITY</div>
    <ul class="tmp-nav-links">
        <li><a href="#">Products</a></li>
        <li><a href="#">Solutions</a></li>
        <li><a href="#">Resources</a></li>
    </ul>
    <div style="display: flex; gap: 1rem; align-items: center;">
        <a href="#" style="text-decoration: none; color: #555; font-size: 0.9rem;">Sign In</a>
        <a href="#" class="btn btn-primary">Get Started</a>
    </div>
</nav>`
        },
        hero_centered: {
            name: "Centered Hero",
            html: `
<header class="tmp-hero" style="background: linear-gradient(to bottom, #f8fafc, #ffffff);">
    <h1 style="max-width: 900px; margin-left: auto; margin-right: auto;">Architecting the future of digital experience.</h1>
    <p>A unified platform that empowers developers to build, scale, and deliver exceptional software with unprecedented speed and reliability.</p>
    <div class="tmp-btn-group">
        <a href="#" class="btn btn-primary" style="padding: 1rem 2rem;">Explore the Platform</a>
        <a href="#" class="btn btn-outline" style="padding: 1rem 2rem;">Watch Overview</a>
    </div>
</header>`
        },
        hero_split: {
            name: "Split Hero",
            html: `
<header style="display: flex; align-items: center; padding: 6rem 5%; gap: 6rem; background: #fff;">
    <div style="flex: 1.2;">
        <span style="color: #2563eb; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.8rem; display: block; margin-bottom: 1rem;">Engineering Excellence</span>
        <h1 style="font-size: 3.5rem; margin-bottom: 1.5rem; line-height: 1.1;">Focus on what matters most.</h1>
        <p style="font-size: 1.15rem; color: #475569; margin-bottom: 2.5rem; line-height: 1.6;">Eliminate technical debt and streamline your workflow with our production-ready infrastructure components designed for enterprise performance.</p>
        <div style="display: flex; gap: 1.25rem;">
            <a href="#" class="btn btn-primary" style="padding: 1rem 2rem;">Start Building</a>
            <a href="#" class="btn btn-outline" style="padding: 1rem 2rem;">View Components</a>
        </div>
    </div>
    <div style="flex: 1; aspect-ratio: 16/10; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; color: #94a3b8; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
        <div style="text-align: center;">
            <div style="width: 48px; height: 48px; background: #e2e8f0; border-radius: 12px; margin: 0 auto 1rem;"></div>
            <span style="font-size: 0.9rem;">Visual Asset Placeholder</span>
        </div>
    </div>
</header>`
        },
        features_grid: {
            name: "Features Grid",
            html: `
<section class="tmp-features" style="background: #ffffff;">
    <div style="text-align: center; margin-bottom: 4rem;">
        <h2 style="font-size: 2.25rem;">Designed for modern performance</h2>
        <p style="color: #64748b; max-width: 600px; margin: 1rem auto 0;">Powerful tools to help you manage every aspect of your application lifecycle.</p>
    </div>
    <div class="tmp-grid">
        <div class="tmp-feat-card">
            <div class="tmp-feat-icon" style="background: #eff6ff;"></div>
            <h3>Intelligent Analytics</h3>
            <p>Gain deep insights into your user behavior with real-time data processing and reporting.</p>
        </div>
        <div class="tmp-feat-card">
            <div class="tmp-feat-icon" style="background: #f0fdf4;"></div>
            <h3>Collaborative Workflow</h3>
            <p>Ship faster with built-in collaboration tools designed for distributed engineering teams.</p>
        </div>
        <div class="tmp-feat-card">
            <div class="tmp-feat-icon" style="background: #fefce8;"></div>
            <h3>Scalable Infrastructure</h3>
            <p>Our global edge network ensures sub-millisecond latency for your users in over 100 regions.</p>
        </div>
    </div>
</section>`
        },
        content_center: {
            name: "Centered Content",
            html: `
<section style="padding: 6rem 5%; text-align: center; max-width: 850px; margin: 0 auto;">
    <h2 style="margin-bottom: 1.5rem; font-size: 2rem;">Security you can trust</h2>
    <p style="font-size: 1.1rem; color: #475569; line-height: 1.7;">Infrastructure is critical, which is why we've built security into every layer. From hardware-level isolation to automated encryption, we ensure your data and applications are always protected by industry-leading standards.</p>
</section>`
        },
        footer_simple: {
            name: "Simple Footer",
            html: `
<footer style="padding: 4rem 5%; border-top: 1px solid #f1f5f9; background: #fff;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 2rem;">
        <div style="flex: 1; min-width: 200px;">
            <div style="font-weight: 900; font-size: 1.25rem; margin-bottom: 1rem;">VELOCITY</div>
            <p style="font-size: 0.9rem; color: #64748b; line-height: 1.5;">Building the foundational blocks for the next generation of web applications.</p>
        </div>
        <div style="display: flex; gap: 4rem;">
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <span style="font-weight: 700; font-size: 0.85rem; text-transform: uppercase; color: #111;">Product</span>
                <a href="#" style="color: #64748b; text-decoration: none; font-size: 0.9rem;">Features</a>
                <a href="#" style="color: #64748b; text-decoration: none; font-size: 0.9rem;">Integrations</a>
                <a href="#" style="color: #64748b; text-decoration: none; font-size: 0.9rem;">Pricing</a>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <span style="font-weight: 700; font-size: 0.85rem; text-transform: uppercase; color: #111;">Company</span>
                <a href="#" style="color: #64748b; text-decoration: none; font-size: 0.9rem;">About</a>
                <a href="#" style="color: #64748b; text-decoration: none; font-size: 0.9rem;">Blog</a>
                <a href="#" style="color: #64748b; text-decoration: none; font-size: 0.9rem;">Careers</a>
            </div>
        </div>
    </div>
    <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: #94a3b8;">
        <div>© 2026 Velocity Systems. All rights reserved.</div>
        <div style="display: flex; gap: 2rem;">
            <a href="#" style="color: inherit; text-decoration: none;">Privacy Policy</a>
            <a href="#" style="color: inherit; text-decoration: none;">Terms of Service</a>
        </div>
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
