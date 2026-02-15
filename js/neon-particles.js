/**
 * Neon Particle Effect for Headers
 * Creates particle emission effect on h1 hover
 */

class NeonParticle {
    constructor(x, y, container) {
        this.x = x;
        this.y = y;
        this.container = container;
        this.element = this.createElement();
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.life = 100;
        this.maxLife = 100;
        this.size = Math.random() * 4 + 2;

        // Random purple/cyan colors for neon effect
        const colors = ['#D0BCFF', '#7F67BE', '#6750A4', '#B8A4E5', '#E0D1FF'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    createElement() {
        const particle = document.createElement('div');
        particle.className = 'neon-particle';
        particle.style.cssText = `
            position: absolute;
            pointer-events: none;
            border-radius: 50%;
            z-index: 9999;
        `;
        this.container.appendChild(particle);
        return particle;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 2;

        const opacity = this.life / this.maxLife;
        const scale = (this.life / this.maxLife) * this.size;

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${scale}px`;
        this.element.style.height = `${scale}px`;
        this.element.style.opacity = opacity;
        this.element.style.background = this.color;
        this.element.style.boxShadow = `0 0 ${scale * 2}px ${this.color}`;

        return this.life > 0;
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

class NeonParticleSystem {
    constructor(element) {
        this.element = element;
        this.particles = [];
        this.isActive = false;
        this.animationFrame = null;
        this.particleInterval = null;

        // Create particle container
        this.container = document.createElement('div');
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
        `;
        document.body.appendChild(this.container);

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.element.addEventListener('mouseenter', () => this.start());
        this.element.addEventListener('mouseleave', () => this.stop());
        this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    onMouseMove(e) {
        if (!this.isActive) return;

        const rect = this.element.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;

        // Emit particles from random positions around the text
        for (let i = 0; i < 2; i++) {
            const offsetX = (Math.random() - 0.5) * rect.width;
            const offsetY = (Math.random() - 0.5) * rect.height;
            this.particles.push(new NeonParticle(
                x + offsetX,
                y + offsetY,
                this.container
            ));
        }
    }

    start() {
        this.isActive = true;
        this.animate();

        // Emit particles continuously
        this.particleInterval = setInterval(() => {
            if (!this.isActive) return;

            const rect = this.element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Emit from edges of the text
            for (let i = 0; i < 3; i++) {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.max(rect.width, rect.height) / 2;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                this.particles.push(new NeonParticle(x, y, this.container));
            }
        }, 50);
    }

    stop() {
        this.isActive = false;
        if (this.particleInterval) {
            clearInterval(this.particleInterval);
            this.particleInterval = null;
        }
    }

    animate() {
        // Update all particles
        this.particles = this.particles.filter(particle => {
            const alive = particle.update();
            if (!alive) {
                particle.destroy();
            }
            return alive;
        });

        // Continue animation if active or particles still exist
        if (this.isActive || this.particles.length > 0) {
            this.animationFrame = requestAnimationFrame(() => this.animate());
        }
    }

    destroy() {
        this.stop();
        this.particles.forEach(particle => particle.destroy());
        this.particles = [];
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Initialize particle systems for all h1 elements in headers
function initNeonParticles() {
    const headerH1s = document.querySelectorAll('header h1');
    const particleSystems = [];

    headerH1s.forEach(h1 => {
        particleSystems.push(new NeonParticleSystem(h1));
    });

    return particleSystems;
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNeonParticles);
} else {
    initNeonParticles();
}
