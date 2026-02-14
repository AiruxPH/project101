// script-templates.js

document.addEventListener('DOMContentLoaded', () => {
    let previewBox = document.getElementById('preview-box');
    const previewContainer = document.getElementById('preview-container');
    const inputs = document.querySelectorAll('.property-input');
    const typeSelect = document.getElementById('elementType');

    // Content Inputs
    const textInput = document.getElementById('innerText');
    const textGroup = document.getElementById('text-group');
    const srcGroup = document.getElementById('src-group');
    const placeholderGroup = document.getElementById('placeholder-group');
    const elementIdInput = document.getElementById('elementId');
    const elementClassInput = document.getElementById('elementClass');

    // Layout Specifics
    const displaySelect = document.getElementById('display');
    const flexGridProps = document.getElementById('flex-grid-props');
    const widthGroup = document.getElementById('width-group');
    const heightGroup = document.getElementById('height-group');

    // Slider Sync
    const sliders = document.querySelectorAll('input[type="range"]');
    const syncedInputs = document.querySelectorAll('input[type="number"].synced-input');

    // Property Tabs
    const propTabs = document.querySelectorAll('.prop-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Color Pickers
    const colorInputs = document.querySelectorAll('input[type="color"]');

    // Manual Transform Logic
    const manualTransformCheck = document.getElementById('manualTransformInfo');
    const transformPresetMode = document.getElementById('transform-preset-mode');
    const transformManualMode = document.getElementById('transform-manual-mode');

    // Modal elements
    const modal = document.getElementById('codeModal');
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const copyBtn = document.querySelector('.copy-btn');
    const codeTabs = document.querySelectorAll('.tab-btn');
    const codeBlocks = {
        html: document.getElementById('code-html'),
        css: document.getElementById('code-css'),
        js: document.getElementById('code-js')
    };
    let activeCodeTab = 'html';

    // Website Layout Templates Data
    const layoutTemplates = {
        hero: {
            tag: 'section',
            class: 'hero-template',
            content: `
<h1>Elevate Your Brand</h1>
<p>Create stunning experiences with our award-winning design components. Built for scale, performance, and impact.</p>
<button class="hero-btn">Get Started Now</button>`,
            innerText: 'Hero Section Content'
        },
        navbar: {
            tag: 'nav',
            class: 'navbar-template',
            content: `
<div class="navbar-logo">
    <div class="logo-dot"></div>
    <span class="logo-text">DESIGNER</span>
</div>
<div class="navbar-links">
    <a href="#">Showcase</a>
    <a href="#">Resources</a>
    <a href="#">About</a>
</div>
<button class="navbar-cta">Contact</button>`,
            innerText: 'Navigation Bar Content'
        },
        feature: {
            tag: 'div',
            class: 'feature-template',
            content: `
<div class="feature-icon">
    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
</div>
<h3>Rapid Development</h3>
<p>Ship features faster with pre-built modules that integrate seamlessly into any existing workflow.</p>`,
            innerText: 'Feature Card Content'
        },
        clear: {
            tag: 'div',
            class: '',
            content: 'Preview Object',
            innerText: 'Preview Object'
        }
    };

    // Interaction Builder Elements
    const interactionTrigger = document.getElementById('interactionTrigger');
    const interactionEffect = document.getElementById('interactionEffect');
    const addInteractionBtn = document.getElementById('addInteractionBtn');
    const interactionListItems = document.getElementById('interaction-list-items');

    // --- DATA STORES --- //

    let baseStyles = {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#ffffff',
        color: '#1a1a1a',
        display: 'block',
        padding: '20px',
        fontSize: '16px'
    };

    let manualTransformData = { rotate: 0, scale: 1, skewX: 0, translateX: 0, translateY: 0 };
    let interactions = [];

    // Create Dynamic Style Sheet
    const dynamicStyle = document.createElement('style');
    dynamicStyle.id = 'dynamic-preview-style';
    document.head.appendChild(dynamicStyle);


    // --- 1. Interaction Logic --- //

    const effectMap = {
        'grow': { type: 'transform', value: 'scale(1.1)', transition: 'transform 0.3s ease' },
        'shrink': { type: 'transform', value: 'scale(0.9)', transition: 'transform 0.3s ease' },
        'rotate': { type: 'transform', value: 'rotate(5deg)', transition: 'transform 0.3s ease' },
        'lift': { type: 'transform', value: 'translateY(-5px)', extras: 'box-shadow: 0 5px 15px rgba(0,0,0,0.3);', transition: 'all 0.3s ease' },
        'shake': { type: 'animation', value: 'shake 0.5s ease-in-out' },
        'pulse': { type: 'animation', value: 'pulse 1s infinite' },
        'rainbow': { type: 'animation', value: 'rainbow 3s linear infinite' },
        'glow': { type: 'animation', value: 'glow 2s ease-in-out infinite' }
    };

    addInteractionBtn.addEventListener('click', () => {
        const trigger = interactionTrigger.value;
        const effect = interactionEffect.value;
        const feedback = document.getElementById('interactionFeedback');
        const isDuplicate = interactions.some(i => i.trigger === trigger && i.effect === effect);
        if (isDuplicate) {
            feedback.innerText = `Duplicate: You already have ${effect} on ${trigger}.`;
            return;
        }
        feedback.innerText = '';
        interactions.push({ id: Date.now(), trigger: trigger, effect: effect });
        renderInteractionsList();
        updatePreview();
    });

    function renderInteractionsList() {
        interactionListItems.innerHTML = '';
        if (interactions.length === 0) {
            interactionListItems.innerHTML = '<div class="empty-state" style="font-size: 0.8rem; color: #888; text-align: center; padding: 0.5rem; background: #fff; border-radius: 4px; border: 1px dashed #ced4da;">No interactions added.</div>';
            return;
        }
        interactions.forEach(item => {
            const div = document.createElement('div');
            div.className = 'interaction-item';
            const triggerLabel = item.trigger.charAt(0).toUpperCase() + item.trigger.slice(1);
            const effectLabel = item.effect.charAt(0).toUpperCase() + item.effect.slice(1);
            div.innerHTML = `<span><strong>${triggerLabel}</strong> &rarr; ${effectLabel}</span><button class="remove-btn" data-id="${item.id}" style="background:none; border:none; color:#e74c3c; cursor:pointer; font-weight:bold;">&times;</button>`;
            interactionListItems.appendChild(div);
            div.querySelector('.remove-btn').addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                interactions = interactions.filter(i => i.id !== id);
                renderInteractionsList();
                updatePreview();
            });
        });
    }

    // --- 2. Base Input Handling --- //

    function loadInputs() {
        inputs.forEach(input => {
            const prop = input.getAttribute('data-property');
            if (prop && baseStyles[prop]) input.value = baseStyles[prop].replace('px', '').replace('rem', '');
            if (input.hasAttribute('data-sync') || input.classList.contains('synced-input')) syncInputVisuals(input);
        });
        colorInputs.forEach(input => {
            const wrapper = input.closest('.color-picker-wrapper');
            if (wrapper) wrapper.querySelector('.color-code').innerText = input.value;
        });
    }

    function syncInputVisuals(source) {
        const value = source.value;
        const key = source.getAttribute('data-sync');
        if (key) {
            if (source.type === 'range') {
                const target = document.querySelector(`input[type="number"][data-property="${key}"]`);
                if (target) target.value = value;
            } else if (source.type === 'number') {
                const target = document.querySelector(`input[type="range"][data-sync="${key}"]`);
                if (target) target.value = value;
            }
        }
    }

    function handleInput(target) {
        const prop = target.getAttribute('data-property');
        const unit = target.getAttribute('data-unit') || '';
        let value = target.value;
        if (target.classList.contains('manual-transform')) { updateManualTransform(); return; }
        if (prop) {
            syncInputVisuals(target);
            if (value && value !== 'none') {
                if (unit && !isNaN(value) && value !== '') value += unit;
                baseStyles[prop] = value;
            } else {
                if (value === 'none') baseStyles[prop] = 'none';
                else delete baseStyles[prop];
            }
            updatePreview();
        }
    }

    function updateManualTransform() {
        const r = document.getElementById('rotate-slider').value;
        const s = document.getElementById('scale-slider').value;
        const k = document.getElementById('skewX-slider').value;
        const tx = document.getElementById('translateX-slider').value;
        const ty = document.getElementById('translateY-slider').value;
        const transformString = `rotate(${r}deg) scale(${s}) skewX(${k}deg) translate(${tx}px, ${ty}px)`;
        baseStyles['transform'] = transformString;
        updatePreview();
    }

    // --- 3. Preview & CSS Generation --- //

    function updatePreview() {
        let cssString = `#preview-box {\n`;
        for (const [key, val] of Object.entries(baseStyles)) {
            cssString += `    ${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${val};\n`;
        }
        cssString += `}\n`;

        // Simplified Hover/Active for templates
        if (interactions.some(i => i.trigger === 'hover')) {
            cssString += `#preview-box:hover {\n`;
            interactions.filter(i => i.trigger === 'hover').forEach(i => {
                const data = effectMap[i.effect];
                if (data.type === 'transform') cssString += `    transform: ${data.value};\n`;
            });
            cssString += `}\n`;
        }

        dynamicStyle.innerHTML = cssString;
        updateSmartControls();
        generateCode();
    }

    function updateSmartControls() {
        const display = displaySelect.value;
        flexGridProps.style.display = (display === 'flex' || display === 'grid') ? 'block' : 'none';
        const tag = typeSelect.value;
        srcGroup.style.display = (tag === 'img') ? 'block' : 'none';
        textGroup.style.display = (tag === 'img' || tag === 'input') ? 'none' : 'block';
        placeholderGroup.style.display = (tag === 'input') ? 'block' : 'none';
    }

    function generateCode() {
        const tag = previewBox.tagName.toLowerCase();
        let selector = `#preview-box`;
        if (elementIdInput.value.trim()) selector = `#${elementIdInput.value.trim()}`;
        else if (elementClassInput.value.trim()) selector = `.${elementClassInput.value.trim().split(' ')[0]}`;

        let cssOutput = `<span class="code-tag">${selector}</span> {\n`;
        for (const [key, val] of Object.entries(baseStyles)) {
            cssOutput += `    <span class="code-prop">${key.replace(/([A-Z])/g, "-$1").toLowerCase()}</span>: <span class="code-val">${val}</span>;\n`;
        }
        cssOutput += `}\n`;

        codeBlocks.css.innerHTML = cssOutput;
        codeBlocks.html.innerHTML = `<span class="code-tag">&lt;${tag}</span> id="${previewBox.id}" class="${previewBox.className}"<span class="code-tag">&gt;</span>\n    ${previewBox.innerHTML}\n<span class="code-tag">&lt;/${tag}&gt;</span>`;
    }

    // --- 4. Event Listeners --- //

    inputs.forEach(input => input.addEventListener('input', (e) => handleInput(e.target)));
    colorInputs.forEach(input => input.addEventListener('input', (e) => {
        const wrapper = input.closest('.color-picker-wrapper');
        if (wrapper) wrapper.querySelector('.color-code').innerText = e.target.value;
        handleInput(e.target);
    }));

    manualTransformCheck.addEventListener('change', () => {
        transformPresetMode.style.display = manualTransformCheck.checked ? 'none' : 'block';
        transformManualMode.style.display = manualTransformCheck.checked ? 'block' : 'none';
    });

    textInput.addEventListener('input', updateContent);
    elementIdInput.addEventListener('input', updateContent);
    elementClassInput.addEventListener('input', updateContent);

    function updateContent() {
        if (previewBox.children.length === 0) previewBox.innerText = textInput.value;
        previewBox.id = elementIdInput.value || 'preview-box';
        // Class is tricky with templates, we usually want to keep template class
        generateCode();
    }

    // Template Selector
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const templateId = btn.getAttribute('data-template');
            if (layoutTemplates[templateId]) {
                const template = layoutTemplates[templateId];
                typeSelect.value = template.tag;
                elementClassInput.value = template.class;
                textInput.value = template.innerText;

                const newElement = document.createElement(template.tag);
                newElement.id = 'preview-box';
                newElement.className = template.class;
                newElement.innerHTML = template.content;

                previewContainer.innerHTML = '';
                previewContainer.appendChild(newElement);
                previewBox = newElement;

                // Reset base styles for template containers
                baseStyles = { width: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', padding: '0px' };
                if (templateId === 'clear') baseStyles = { width: '200px', height: '200px', backgroundColor: '#3498db', color: '#fff', padding: '20px' };

                updatePreview();
                document.querySelector('.prop-tab[data-target="tab-element"]').click();
            }
        });
    });

    // Modal & Tabs
    openModalBtn.onclick = () => { generateCode(); modal.style.display = 'flex'; };
    closeModalBtn.onclick = () => { modal.style.display = 'none'; };
    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            codeTabs.forEach(t => t.classList.remove('active'));
            Object.values(codeBlocks).forEach(b => b.classList.remove('active'));
            tab.classList.add('active');
            activeCodeTab = tab.getAttribute('data-tab');
            codeBlocks[activeCodeTab].classList.add('active');
        });
    });

    propTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            propTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-target')).classList.add('active');
        });
    });

    typeSelect.addEventListener('change', () => {
        const newElem = document.createElement(typeSelect.value);
        newElem.id = 'preview-box';
        newElem.innerText = textInput.value;
        previewContainer.innerHTML = '';
        previewContainer.appendChild(newElem);
        previewBox = newElem;
        updatePreview();
    });

    loadInputs();
    updatePreview();
});
