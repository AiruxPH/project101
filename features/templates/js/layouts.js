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
                <footer style="padding: 4rem 5%; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; color: #475569; font-size: 0.9rem;">
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
                                <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #0f172a;">Nexus Ecosystem</h3>
                                <p style="color: #475569; font-size: 1rem;">Brand Identity & Web Core Integration</p>
                            </div>
                            <div>
                                <div style="aspect-ratio: 16/10; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 2rem;"></div>
                                <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #0f172a;">Aura Workspace</h3>
                                <p style="color: #475569; font-size: 1rem;">Interface Design & Engineering</p>
                            </div>
                        </div>
                    </section>
                    <footer style="margin-top: 10rem; border-top: 1px solid #f1f5f9; padding-top: 4rem; display: flex; justify-content: space-between; align-items: flex-end;">
                        <div>
                            <h2 style="font-size: 2rem; margin-bottom: 2.5rem; font-weight: 800;">Let's build something<br>extraordinary.</h2>
                            <a href="mailto:thirteen@ Thorne.studio" style="font-size: 1.25rem; color: #111; font-weight: 700; text-decoration: none; border-bottom: 2px solid #111;">hello@thorne.studio</a>
                        </div>
                        <div style="display: flex; gap: 2rem; color: #475569; font-weight: 600;">
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
                    <aside class="tmp-dash-sidebar" style="background: #0f172a; color: #fff;">
                        <div style="font-weight: 900; font-size: 1.5rem; margin-bottom: 4rem; letter-spacing: -0.02em; color: #fff;">NUCLEUS</div>
                        <nav style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <a href="#" style="color: #fff; text-decoration: none; padding: 0.85rem 1.25rem; background: #3b82f6; border-radius: 8px; font-weight: 600;">Dashboard</a>
                            <a href="#" style="color: #cbd5e1; text-decoration: none; padding: 0.85rem 1.25rem; transition: 0.2s;">Analytics</a>
                            <a href="#" style="color: #cbd5e1; text-decoration: none; padding: 0.85rem 1.25rem; transition: 0.2s;">Operations</a>
                            <a href="#" style="color: #cbd5e1; text-decoration: none; padding: 0.85rem 1.25rem; transition: 0.2s;">Team Management</a>
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
        },
        // --- AUTHENTICATION PAGES --- //
        login: {
            name: "Login Page",
            html: `
                <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem;">
                    <div style="background: #fff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); width: 100%; max-width: 440px; padding: 3rem;">
                        <div style="text-align: center; margin-bottom: 2.5rem;">
                            <div style="font-weight: 900; font-size: 1.75rem; color: #0f172a; margin-bottom: 0.5rem;">Welcome Back</div>
                            <p style="color: #64748b; font-size: 0.95rem;">Sign in to continue to your account</p>
                        </div>
                        
                        <form style="display: flex; flex-direction: column; gap: 1.5rem;">
                            <div>
                                <label style="display: block; font-weight: 600; font-size: 0.9rem; color: #334155; margin-bottom: 0.5rem;">Email Address</label>
                                <input type="email" placeholder="you@example.com" style="width: 100%; padding: 0.875rem 1rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem; transition: all 0.2s;">
                            </div>
                            
                            <div>
                                <label style="display: block; font-weight: 600; font-size: 0.9rem; color: #334155; margin-bottom: 0.5rem;">Password</label>
                                <input type="password" placeholder="Enter your password" style="width: 100%; padding: 0.875rem 1rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem;">
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: #475569; cursor: pointer;">
                                    <input type="checkbox" style="width: 16px; height: 16px;">
                                    <span>Remember me</span>
                                </label>
                                <a href="#" style="color: #667eea; font-weight: 600; font-size: 0.9rem; text-decoration: none;">Forgot password?</a>
                            </div>
                            
                            <button type="submit" style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: transform 0.2s;">Sign In</button>
                        </form>
                        
                        <div style="margin: 2rem 0; text-align: center; position: relative;">
                            <div style="border-top: 1px solid #e2e8f0;"></div>
                            <span style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #fff; padding: 0 1rem; color: #94a3b8; font-size: 0.85rem;">OR CONTINUE WITH</span>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <button style="padding: 0.875rem; border: 1.5px solid #e2e8f0; border-radius: 8px; background: #fff; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                                <div style="width: 20px; height: 20px; background: #e2e8f0; border-radius: 4px;"></div>
                                Google
                            </button>
                            <button style="padding: 0.875rem; border: 1.5px solid #e2e8f0; border-radius: 8px; background: #fff; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                                <div style="width: 20px; height: 20px; background: #0f172a; border-radius: 4px;"></div>
                                GitHub
                            </button>
                        </div>
                        
                        <p style="text-align: center; margin-top: 2rem; color: #64748b; font-size: 0.9rem;">
                            Don't have an account? <a href="#" style="color: #667eea; font-weight: 700; text-decoration: none;">Sign up</a>
                        </p>
                    </div>
                </div>
            `
        },
        signup: {
            name: "Sign Up Page",
            html: `
                <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem;">
                    <div style="background: #fff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); width: 100%; max-width: 480px; padding: 3rem;">
                        <div style="text-align: center; margin-bottom: 2.5rem;">
                            <div style="font-weight: 900; font-size: 1.75rem; color: #0f172a; margin-bottom: 0.5rem;">Create Account</div>
                            <p style="color: #64748b; font-size: 0.95rem;">Join thousands of users today</p>
                        </div>
                        
                        <form style="display: flex; flex-direction: column; gap: 1.25rem;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <label style="display: block; font-weight: 600; font-size: 0.9rem; color: #334155; margin-bottom: 0.5rem;">First Name</label>
                                    <input type="text" placeholder="John" style="width: 100%; padding: 0.875rem 1rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem;">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: 600; font-size: 0.9rem; color: #334155; margin-bottom: 0.5rem;">Last Name</label>
                                    <input type="text" placeholder="Doe" style="width: 100%; padding: 0.875rem 1rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem;">
                                </div>
                            </div>
                            
                            <div>
                                <label style="display: block; font-weight: 600; font-size: 0.9rem; color: #334155; margin-bottom: 0.5rem;">Email Address</label>
                                <input type="email" placeholder="you@example.com" style="width: 100%; padding: 0.875rem 1rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem;">
                            </div>
                            
                            <div>
                                <label style="display: block; font-weight: 600; font-size: 0.9rem; color: #334155; margin-bottom: 0.5rem;">Password</label>
                                <input type="password" placeholder="Minimum 8 characters" style="width: 100%; padding: 0.875rem 1rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem;">
                                <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #64748b;">Must contain uppercase, lowercase, and number</div>
                            </div>
                            
                            <label style="display: flex; align-items: start; gap: 0.75rem; font-size: 0.85rem; color: #475569; cursor: pointer;">
                                <input type="checkbox" style="width: 18px; height: 18px; margin-top: 2px;">
                                <span>I agree to the <a href="#" style="color: #f5576c; font-weight: 600; text-decoration: none;">Terms of Service</a> and <a href="#" style="color: #f5576c; font-weight: 600; text-decoration: none;">Privacy Policy</a></span>
                            </label>
                            
                            <button type="submit" style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: #fff; border: none; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; margin-top: 0.5rem;">Create Account</button>
                        </form>
                        
                        <p style="text-align: center; margin-top: 2rem; color: #64748b; font-size: 0.9rem;">
                            Already have an account? <a href="#" style="color: #f5576c; font-weight: 700; text-decoration: none;">Sign in</a>
                        </p>
                    </div>
                </div>
            `
        },
        forgot: {
            name: "Forgot Password",
            html: `
                <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 2rem;">
                    <div style="background: #fff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); width: 100%; max-width: 440px; padding: 3rem;">
                        <div style="text-align: center; margin-bottom: 2.5rem;">
                            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 50%; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2rem; font-weight: 900;">?</div>
                            <div style="font-weight: 900; font-size: 1.75rem; color: #0f172a; margin-bottom: 0.5rem;">Forgot Password?</div>
                            <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6;">No worries! Enter your email and we'll send you reset instructions.</p>
                        </div>
                        
                        <form style="display: flex; flex-direction: column; gap: 1.5rem;">
                            <div>
                                <label style="display: block; font-weight: 600; font-size: 0.9rem; color: #334155; margin-bottom: 0.5rem;">Email Address</label>
                                <input type="email" placeholder="you@example.com" style="width: 100%; padding: 0.875rem 1rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem;">
                            </div>
                            
                            <button type="submit" style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: #fff; border: none; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer;">Send Reset Link</button>
                        </form>
                        
                        <div style="text-align: center; margin-top: 2rem;">
                            <a href="#" style="color: #4facfe; font-weight: 600; font-size: 0.9rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
                                <span style="font-size: 1.2rem;">←</span> Back to login
                            </a>
                        </div>
                    </div>
                </div>
            `
        },
        verify: {
            name: "Email Verification",
            html: `
                <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 2rem;">
                    <div style="background: #fff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); width: 100%; max-width: 480px; padding: 3rem; text-align: center;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 3rem; font-weight: 900;">✓</div>
                        
                        <div style="font-weight: 900; font-size: 2rem; color: #0f172a; margin-bottom: 1rem;">Email Verified!</div>
                        <p style="color: #64748b; font-size: 1.05rem; line-height: 1.7; margin-bottom: 2.5rem;">Your email has been successfully verified. You can now access all features of your account.</p>
                        
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem;">
                            <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 0.5rem;">Verified Email</div>
                            <div style="font-weight: 700; font-size: 1.05rem; color: #0f172a;">john.doe@example.com</div>
                        </div>
                        
                        <button style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #fff; border: none; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; margin-bottom: 1rem;">Continue to Dashboard</button>
                        
                        <p style="color: #64748b; font-size: 0.85rem;">
                            Didn't receive the email? <a href="#" style="color: #10b981; font-weight: 600; text-decoration: none;">Resend verification</a>
                        </p>
                    </div>
                </div>
            `
        },
        // --- STARTER/UTILITY PAGES --- //
        error404: {
            name: "404 Error Page",
            html: `
                <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem;">
                    <div style="text-align: center; color: #fff; max-width: 600px;">
                        <div style="font-size: 10rem; font-weight: 900; line-height: 1; margin-bottom: 1rem; opacity: 0.9;">404</div>
                        <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem;">Page Not Found</h1>
                        <p style="font-size: 1.15rem; margin-bottom: 3rem; opacity: 0.9; line-height: 1.6;">Oops! The page you're looking for seems to have wandered off into the digital void. Let's get you back on track.</p>
                        
                        <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 1.5rem; margin-bottom: 2.5rem; border: 1px solid rgba(255,255,255,0.2);">
                            <input type="text" placeholder="Search for pages..." style="width: 100%; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; background: rgba(255,255,255,0.95);">
                        </div>
                        
                        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                            <a href="#" style="padding: 1rem 2rem; background: #fff; color: #667eea; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block;">Go Home</a>
                            <a href="#" style="padding: 1rem 2rem; background: rgba(255,255,255,0.2); color: #fff; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; border: 1.5px solid rgba(255,255,255,0.3);">Contact Support</a>
                        </div>
                        
                        <div style="margin-top: 4rem; opacity: 0.7;">
                            <p style="font-size: 0.9rem;">Popular pages: <a href="#" style="color: #fff; text-decoration: underline;">Home</a> • <a href="#" style="color: #fff; text-decoration: underline;">About</a> • <a href="#" style="color: #fff; text-decoration: underline;">Contact</a></p>
                        </div>
                    </div>
                </div>
            `
        },
        comingsoon: {
            name: "Coming Soon",
            html: `
                <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 2rem;">
                    <div style="text-align: center; color: #fff; max-width: 700px;">
                        <div style="display: inline-block; padding: 0.5rem 1.5rem; background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.3); border-radius: 50px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 2rem; color: #60a5fa;">Launching Soon</div>
                        
                        <h1 style="font-size: 3.5rem; font-weight: 900; margin-bottom: 1.5rem; line-height: 1.1;">Something Amazing<br/>is on the Way</h1>
                        <p style="font-size: 1.2rem; color: #94a3b8; margin-bottom: 3rem; line-height: 1.7;">We're crafting an exceptional experience. Be the first to know when we launch.</p>
                        
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; max-width: 500px; margin: 0 auto 3rem;">
                            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.5rem 1rem;">
                                <div style="font-size: 2.5rem; font-weight: 900; margin-bottom: 0.25rem;">24</div>
                                <div style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Days</div>
                            </div>
                            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.5rem 1rem;">
                                <div style="font-size: 2.5rem; font-weight: 900; margin-bottom: 0.25rem;">18</div>
                                <div style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Hours</div>
                            </div>
                            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.5rem 1rem;">
                                <div style="font-size: 2.5rem; font-weight: 900; margin-bottom: 0.25rem;">42</div>
                                <div style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Minutes</div>
                            </div>
                            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.5rem 1rem;">
                                <div style="font-size: 2.5rem; font-weight: 900; margin-bottom: 0.25rem;">15</div>
                                <div style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Seconds</div>
                            </div>
                        </div>
                        
                        <div style="max-width: 450px; margin: 0 auto 2.5rem;">
                            <form style="display: flex; gap: 1rem;">
                                <input type="email" placeholder="Enter your email" style="flex: 1; padding: 1rem 1.25rem; border: 1.5px solid rgba(255,255,255,0.1); border-radius: 8px; background: rgba(255,255,255,0.05); color: #fff; font-size: 1rem;">
                                <button type="submit" style="padding: 1rem 2rem; background: #3b82f6; color: #fff; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; white-space: nowrap;">Notify Me</button>
                            </form>
                        </div>
                        
                        <div style="display: flex; gap: 1.5rem; justify-content: center; margin-top: 3rem;">
                            <a href="#" style="color: #94a3b8; text-decoration: none; font-size: 1.5rem;">𝕏</a>
                            <a href="#" style="color: #94a3b8; text-decoration: none; font-size: 1.5rem;">in</a>
                            <a href="#" style="color: #94a3b8; text-decoration: none; font-size: 1.5rem;">f</a>
                        </div>
                    </div>
                </div>
            `
        },
        maintenance: {
            name: "Maintenance Mode",
            html: `
                <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 2rem;">
                    <div style="text-align: center; max-width: 600px;">
                        <div style="width: 120px; height: 120px; background: rgba(255,255,255,0.2); border: 3px solid rgba(255,255,255,0.4); border-radius: 50%; margin: 0 auto 2.5rem; display: flex; align-items: center; justify-content: center; font-size: 4rem;">⚙️</div>
                        
                        <h1 style="font-size: 3rem; font-weight: 900; color: #fff; margin-bottom: 1rem;">Under Maintenance</h1>
                        <p style="font-size: 1.15rem; color: rgba(255,255,255,0.9); margin-bottom: 3rem; line-height: 1.7;">We're currently performing scheduled maintenance to improve your experience. We'll be back shortly!</p>
                        
                        <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 16px; padding: 2rem; margin-bottom: 2.5rem; border: 1px solid rgba(255,255,255,0.25);">
                            <div style="font-size: 0.9rem; color: rgba(255,255,255,0.8); margin-bottom: 0.75rem; font-weight: 600;">Estimated Completion Time</div>
                            <div style="font-size: 2rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem;">2:30 PM EST</div>
                            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7);">February 15, 2026</div>
                        </div>
                        
                        <div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.2);">
                            <div style="font-size: 0.95rem; color: #fff; line-height: 1.6;">
                                <strong>What we're working on:</strong><br/>
                                • Performance optimizations<br/>
                                • Security updates<br/>
                                • New feature deployment
                            </div>
                        </div>
                        
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.95rem; margin-bottom: 1.5rem;">Need immediate assistance?</p>
                        <a href="mailto:support@example.com" style="display: inline-block; padding: 1rem 2rem; background: #fff; color: #d97706; border-radius: 8px; font-weight: 700; text-decoration: none;">Contact Support</a>
                    </div>
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
