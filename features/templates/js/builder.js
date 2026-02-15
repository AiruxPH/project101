// builder.js - Custom Layout Builder Logic

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas-frame');
    const compItems = document.querySelectorAll('.comp-item');
    const clearBtn = document.getElementById('clear-canvas');
    const exportBtn = document.getElementById('export-code');
    const modal = document.getElementById('codeModal');
    const closeModal = document.getElementById('modal-close-x');
    const codeDisplay = document.getElementById('exported-html');
    const copyBtn = document.getElementById('copy-exported');

    // --- COMPONENT TEMPLATES --- //

    let components = {};

    // LAYMAN'S EXPLANATION: fetch()
    // Think of fetch() like a waiter at a restaurant:
    // 1. You (the scripts) ask for a 'menu' (the JSON file).
    // 2. The waiter (fetch) goes to the kitchen (server) to get it.
    // 3. Since the kitchen might be busy, you get a 'Promise' (a buzzer that will go off when ready).
    // 4. Once ready (.then), you get the raw data, turn it into JSON (.json()), and then start building!

    fetch('data/components.json')
        .then(response => response.json())
        .then(data => {
            components = data;
            console.log("Components loaded successfully:", components);
            // Now that components are loaded, we can enable the sidebar clicks
            initSidebar();
        })
        .catch(error => console.error("Error loading component data:", error));

    // --- CORE LOGIC --- //

    function addComponent(type) {
        if (!components || !components[type]) {
            console.warn(`Component type "${type}" not loaded yet or doesn't exist.`);
            return;
        }

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

    // Sidebar interaction - wrapped in a function to call AFTER fetch
    function initSidebar() {
        compItems.forEach(item => {
            item.addEventListener('click', () => {
                addComponent(item.getAttribute('data-type'));
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
