// layouts.js - Whole-Page Layout Engine

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('preview-canvas');
    const layoutCards = document.querySelectorAll('.layout-card');
    const copyBtn = document.getElementById('copy-code');
    const downloadBtn = document.getElementById('download-bundle');

    // --- TEMPLATE DEFINITIONS --- //

    const pages = {
        landing: {
            name: "SaaS Landing Page",
            html: `
                <nav class="tmp-navbar">
                    <div class="tmp-logo">CLOUD-X</div>
                    <ul class="tmp-nav-links">
                        <li><a href="#">Solutions</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Company</a></li>
                    </ul>
                    <a href="#" class="btn btn-primary">Start Trial</a>
                </nav>
                <header class="tmp-hero">
                    <h1>Scale your business<br>without the complexity.</h1>
                    <p>The all-in-one platform for modern teams to build, deploy, and manage distributed applications at global scale.</p>
                    <div class="tmp-btn-group">
                        <a href="#" class="btn btn-primary tmp-btn-lg">View Demo</a>
                        <a href="#" class="btn btn-outline tmp-btn-lg">Read Docs</a>
                    </div>
                </header>
                <section class="tmp-features">
                    <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                        <span style="color: var(--primary); font-weight: 700; text-transform: uppercase; font-size: 0.8rem;">Features</span>
                        <h2 style="font-size: 2.5rem; margin-top: 1rem;">Everything you need to grow</h2>
                    </div>
                    <div class="tmp-grid">
                        <div class="tmp-feat-card">
                            <div class="tmp-feat-icon" style="background: #dbeafe;"></div>
                            <h3>Global Edge</h3>
                            <p>Deploy your code to over 300 locations worldwide for sub-millisecond latency.</p>
                        </div>
                        <div class="tmp-feat-card">
                            <div class="tmp-feat-icon" style="background: #dcfce7;"></div>
                            <h3>Auto-Scaling</h3>
                            <p>Our infrastructure adjusts dynamically to your traffic, so you only pay for what you use.</p>
                        </div>
                        <div class="tmp-feat-card">
                            <div class="tmp-feat-icon" style="background: #fef9c3;"></div>
                            <h3>Enterprise Security</h3>
                            <p>Built-in DDoS protection, automated SSL, and isolation by default.</p>
                        </div>
                    </div>
                </section>
                <footer style="padding: 4rem 5%; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; color: #666; font-size: 0.9rem;">
                    <div>© 2026 CLOUD-X Inc. All rights reserved.</div>
                    <div style="display: flex; gap: 2rem;">
                        <a href="#" style="color: inherit; text-decoration: none;">Privacy</a>
                        <a href="#" style="color: inherit; text-decoration: none;">Terms</a>
                    </div>
                </footer>
            `
        },
        portfolio: {
            name: "Minimalist Portfolio",
            html: `
                <div style="max-width: 900px; margin: 0 auto; padding: 5rem 2rem;">
                    <header style="margin-bottom: 5rem;">
                        <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem;">Alex Rivera</h1>
                        <p style="font-size: 1.25rem; color: #555;">Product Designer & Creative Developer</p>
                    </header>
                    <section>
                        <h2 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.2em; color: #999; margin-bottom: 3rem;">Selected Work</h2>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;">
                            <div>
                                <div style="aspect-ratio: 1; background: #eee; border-radius: 4px; margin-bottom: 1.5rem;"></div>
                                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Nova Banking App</h3>
                                <p style="color: #666; font-size: 0.9rem;">Visual Identity & Mobile Experience</p>
                            </div>
                            <div>
                                <div style="aspect-ratio: 1; background: #eee; border-radius: 4px; margin-bottom: 1.5rem;"></div>
                                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Ember E-commerce</h3>
                                <p style="color: #666; font-size: 0.9rem;">Interface Design & Web Development</p>
                            </div>
                        </div>
                    </section>
                    <footer style="margin-top: 8rem; border-top: 1px solid #eee; padding-top: 4rem;">
                        <h2 style="font-size: 1.5rem; margin-bottom: 2rem;">Let's work together.</h2>
                        <a href="mailto:hello@alexrivera.com" style="font-size: 1.1rem; color: #111; font-weight: 600;">hello@alexrivera.com</a>
                    </footer>
                </div>
            `
        },
        dashboard: {
            name: "Enterprise Dashboard",
            html: `
                <div class="tmp-dash-container">
                    <aside class="tmp-dash-sidebar">
                        <div style="font-weight: 900; font-size: 1.25rem; margin-bottom: 3rem;">CORE-OS</div>
                        <nav style="display: flex; flex-direction: column; gap: 1rem;">
                            <a href="#" style="color: #fff; text-decoration: none; padding: 0.75rem 1rem; background: rgba(255,255,255,0.1); border-radius: 6px;">Overview</a>
                            <a href="#" style="color: #94a3b8; text-decoration: none; padding: 0.75rem 1rem;">Analytics</a>
                            <a href="#" style="color: #94a3b8; text-decoration: none; padding: 0.75rem 1rem;">Reports</a>
                            <a href="#" style="color: #94a3b8; text-decoration: none; padding: 0.75rem 1rem;">Settings</a>
                        </nav>
                    </aside>
                    <main class="tmp-dash-content">
                        <header class="tmp-dash-header">
                            <h1 style="font-size: 1.5rem; font-weight: 700;">System Overview</h1>
                            <div style="display: flex; gap: 1rem; align-items: center;">
                                <div style="text-align: right;">
                                    <div style="font-size: 0.85rem; font-weight: 600;">Admin User</div>
                                    <div style="font-size: 0.75rem; color: #64748b;">Premium Account</div>
                                </div>
                                <div style="width: 40px; height: 40px; background: #cbd5e1; border-radius: 50%;"></div>
                            </div>
                        </header>
                        <div class="tmp-dash-grid">
                            <div class="tmp-dash-stat">
                                <div class="label">Total Revenue</div>
                                <div class="value">$45,231.89</div>
                                <div style="font-size: 0.75rem; color: #10b981; margin-top: 0.5rem;">+20.1% from last month</div>
                            </div>
                            <div class="tmp-dash-stat">
                                <div class="label">Subscriptions</div>
                                <div class="value">+2,350</div>
                                <div style="font-size: 0.75rem; color: #10b981; margin-top: 0.5rem;">+180.1% from last month</div>
                            </div>
                            <div class="tmp-dash-stat">
                                <div class="label">Active Users</div>
                                <div class="value">12,234</div>
                                <div style="font-size: 0.75rem; color: #10b981; margin-top: 0.5rem;">+19% from last month</div>
                            </div>
                            <div class="tmp-dash-stat">
                                <div class="label">Bounce Rate</div>
                                <div class="value">42.5%</div>
                                <div style="font-size: 0.75rem; color: #ef4444; margin-top: 0.5rem;">+4.3% from last month</div>
                            </div>
                        </div>
                        <div style="margin-top: 2rem; background: #fff; border-radius: 12px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); min-height: 300px;">
                            <h3 style="margin-bottom: 1.5rem;">Recent Activity</h3>
                            <div style="color: #64748b; font-size: 0.9rem; text-align: center; margin-top: 4rem;">Activity logs will appear here.</div>
                        </div>
                    </main>
                </div>
            `
        }
    };

    // --- CORE LOGIC --- //

    function switchLayout(layoutKey) {
        if (!pages[layoutKey]) return;

        // Update UI
        layoutCards.forEach(card => card.classList.remove('active'));
        document.querySelector(`.layout-card[data-layout="${layoutKey}"]`).classList.add('active');

        // Apply Template
        canvas.innerHTML = pages[layoutKey].html;

        // Basic Entrance Animation
        canvas.style.opacity = '0';
        canvas.style.transform = 'translateY(10px)';
        setTimeout(() => {
            canvas.style.transition = 'all 0.4s ease';
            canvas.style.opacity = '1';
            canvas.style.transform = 'translateY(0)';
        }, 50);
    }

    // Event Listeners
    layoutCards.forEach(card => {
        card.addEventListener('click', () => {
            switchLayout(card.getAttribute('data-layout'));
        });
    });

    copyBtn.addEventListener('click', () => {
        const activeLayout = document.querySelector('.layout-card.active').getAttribute('data-layout');
        const code = `
<!-- PROJECT 101 - ${pages[activeLayout].name} -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pages[activeLayout].name}</title>
    <!-- Include styles here -->
    <style>
        /* Base Styles */
        body { margin: 0; font-family: sans-serif; }
        ${document.querySelector('link[href*="layouts.css"]').innerHTML || '/* Styles recorded in layouts.css */'}
    </style>
</head>
<body>
    ${pages[activeLayout].html}
</body>
</html>`;

        navigator.clipboard.writeText(code).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "Copied!";
            setTimeout(() => copyBtn.innerText = originalText, 2000);
        });
    });

    // Default Layout
    switchLayout('landing');
});
