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
                    <div class="tmp-logo">VELOCITY</div>
                    <ul class="tmp-nav-links">
                        <li><a href="#">Solutions</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Enterprise</a></li>
                    </ul>
                    <a href="#" class="btn btn-primary">Start Building</a>
                </nav>
                <header class="tmp-hero">
                    <h1>Build the future of<br>software, today.</h1>
                    <p>The unified platform for modern engineering teams to architect, deploy, and scale high-performance applications with global reach.</p>
                    <div class="tmp-btn-group">
                        <a href="#" class="btn btn-primary tmp-btn-lg">Start Free Trial</a>
                        <a href="#" class="btn btn-outline tmp-btn-lg">Book a Demo</a>
                    </div>
                </header>
                <section class="tmp-features">
                    <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                        <span style="color: var(--primary); font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;">Infrastructure</span>
                        <h2 style="font-size: 2.5rem; margin-top: 1rem;">Optimized for Enterprise</h2>
                    </div>
                    <div class="tmp-grid">
                        <div class="tmp-feat-card">
                            <div class="tmp-feat-icon" style="background: #eff6ff;"></div>
                            <h3>Global Edge Network</h3>
                            <p>Deploy to over 300 locations worldwide for sub-millisecond latency and high availability.</p>
                        </div>
                        <div class="tmp-feat-card">
                            <div class="tmp-feat-icon" style="background: #f0fdf4;"></div>
                            <h3>Automated Scaling</h3>
                            <p>Intelligence-driven infrastructure that adjusts to your traffic patterns in real-time.</p>
                        </div>
                        <div class="tmp-feat-card">
                            <div class="tmp-feat-icon" style="background: #fffbeb;"></div>
                            <h3>End-to-End Security</h3>
                            <p>Advanced DDoS protection, automated SOC2 compliance, and hardware-level isolation.</p>
                        </div>
                    </div>
                </section>
                <footer style="padding: 4rem 5%; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; color: #64748b; font-size: 0.9rem;">
                    <div>© 2026 Velocity Technologies. All rights reserved.</div>
                    <div style="display: flex; gap: 2.5rem;">
                        <a href="#" style="color: inherit; text-decoration: none;">Security</a>
                        <a href="#" style="color: inherit; text-decoration: none;">Privacy</a>
                        <a href="#" style="color: inherit; text-decoration: none;">Terms</a>
                    </div>
                </footer>
            `
        },
        portfolio: {
            name: "Minimalist Portfolio",
            html: `
                <div style="max-width: 1000px; margin: 0 auto; padding: 6rem 2rem;">
                    <header style="margin-bottom: 6rem;">
                        <span style="display: block; margin-bottom: 1rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.8rem;">Available for projects</span>
                        <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 1.5rem; line-height: 1;">Julian Thorne</h1>
                        <p style="font-size: 1.25rem; color: #475569; max-width: 600px; line-height: 1.6;">Independent product designer and engineer focusing on high-impact digital experiences and functional aesthetics.</p>
                    </header>
                    <section>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5rem;">
                            <div>
                                <div style="aspect-ratio: 16/10; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 2rem;"></div>
                                <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Nexus Ecosystem</h3>
                                <p style="color: #64748b; font-size: 1rem;">Brand Identity & Web Core Integration</p>
                            </div>
                            <div>
                                <div style="aspect-ratio: 16/10; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 2rem;"></div>
                                <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Aura Workspace</h3>
                                <p style="color: #64748b; font-size: 1rem;">Interface Design & Engineering</p>
                            </div>
                        </div>
                    </section>
                    <footer style="margin-top: 10rem; border-top: 1px solid #f1f5f9; padding-top: 4rem; display: flex; justify-content: space-between; align-items: flex-end;">
                        <div>
                            <h2 style="font-size: 2rem; margin-bottom: 2.5rem; font-weight: 800;">Let's build something<br>extraordinary.</h2>
                            <a href="mailto:thirteen@ Thorne.studio" style="font-size: 1.25rem; color: #111; font-weight: 700; text-decoration: none; border-bottom: 2px solid #111;">hello@thorne.studio</a>
                        </div>
                        <div style="display: flex; gap: 2rem; color: #64748b; font-weight: 600;">
                            <span>LinkedIn</span>
                            <span>Read.cv</span>
                        </div>
                    </footer>
                </div>
            `
        },
        dashboard: {
            name: "Enterprise Dashboard",
            html: `
                <div class="tmp-dash-container">
                    <aside class="tmp-dash-sidebar" style="background: #0f172a;">
                        <div style="font-weight: 900; font-size: 1.5rem; margin-bottom: 4rem; letter-spacing: -0.02em;">NUCLEUS</div>
                        <nav style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <a href="#" style="color: #fff; text-decoration: none; padding: 0.85rem 1.25rem; background: #3b82f6; border-radius: 8px; font-weight: 600;">Dashboard</a>
                            <a href="#" style="color: #94a3b8; text-decoration: none; padding: 0.85rem 1.25rem; transition: 0.2s;">Analytics</a>
                            <a href="#" style="color: #94a3b8; text-decoration: none; padding: 0.85rem 1.25rem; transition: 0.2s;">Operations</a>
                            <a href="#" style="color: #94a3b8; text-decoration: none; padding: 0.85rem 1.25rem; transition: 0.2s;">Team Management</a>
                        </nav>
                    </aside>
                    <main class="tmp-dash-content">
                        <header class="tmp-dash-header">
                            <div>
                                <h1 style="font-size: 1.75rem; font-weight: 800;">System Intelligence</h1>
                                <p style="font-size: 0.9rem; color: #64748b; margin-top: 0.25rem;">Real-time performance metrics and insights</p>
                            </div>
                            <div style="display: flex; gap: 1.5rem; align-items: center;">
                                <div style="text-align: right;">
                                    <div style="font-size: 0.9rem; font-weight: 700;">Sarah Chen</div>
                                    <div style="font-size: 0.75rem; color: #3b82f6; font-weight: 700;">System Architect</div>
                                </div>
                                <div style="width: 44px; height: 44px; background: #e2e8f0; border: 2px solid #fff; border-radius: 50%; box-shadow: 0 2px 10px rgba(0,0,0,0.05);"></div>
                            </div>
                        </header>
                        <div class="tmp-dash-grid">
                            <div class="tmp-dash-stat">
                                <div class="label">Processing Power</div>
                                <div class="value">94.2%</div>
                                <div style="font-size: 0.75rem; color: #10b981; margin-top: 0.75rem; font-weight: 600;">Optimal Performance</div>
                            </div>
                            <div class="tmp-dash-stat">
                                <div class="label">Active Sessions</div>
                                <div class="value">14,892</div>
                                <div style="font-size: 0.75rem; color: #10b981; margin-top: 0.75rem; font-weight: 600;">+14% vs last week</div>
                            </div>
                            <div class="tmp-dash-stat">
                                <div class="label">Response Time</div>
                                <div class="value">18ms</div>
                                <div style="font-size: 0.75rem; color: #10b981; margin-top: 0.75rem; font-weight: 600;">Sub-threshold latency</div>
                            </div>
                            <div class="tmp-dash-stat">
                                <div class="label">Error Rate</div>
                                <div class="value">0.002%</div>
                                <div style="font-size: 0.75rem; color: #10b981; margin-top: 0.75rem; font-weight: 600;">Stable baseline</div>
                            </div>
                        </div>
                        <div style="margin-top: 2rem; background: #fff; border-radius: 16px; padding: 2.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.03); min-height: 400px; border: 1px solid #f1f5f9;">
                            <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 2rem;">Traffic Distribution</h3>
                            <div style="color: #94a3b8; font-size: 0.95rem; text-align: center; margin-top: 6rem;">Data visualization module loading...</div>
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
