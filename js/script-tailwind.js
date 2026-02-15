// script.js

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

    // Interaction Builder Elements
    const interactionTrigger = document.getElementById('interactionTrigger');
    const interactionEffect = document.getElementById('interactionEffect');
    const addInteractionBtn = document.getElementById('addInteractionBtn');
    const interactionListItems = document.getElementById('interaction-list-items');

    // --- DATA STORES --- //

    // Normal / Base Styles (user edits these via panels)
    let baseStyles = {
        width: '200px',
        height: '200px',
        backgroundColor: '#3498db',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontSize: '16px'
    };

    // Manual Transform Data
    let manualTransformData = {
        rotate: 0, scale: 1, skewX: 0, translateX: 0, translateY: 0
    };

    // Interaction Store 
    // Array of objects: { id, trigger, effect }
    let interactions = [];

    // Create Dynamic Style Sheet
    const dynamicStyle = document.createElement('style');
    dynamicStyle.id = 'dynamic-preview-style';
    document.head.appendChild(dynamicStyle);


    // --- DATA STORES & STORAGE --- //
    const STORAGE_KEY = 'project101_design_tailwind';

    function saveProject() {
        const projectData = {
            baseStyles: baseStyles,
            manualTransformData: manualTransformData,
            interactions: interactions
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projectData));
    }

    // Effect Definitions (Structured for Merging)
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

    // Effect Categories (Optional now, mainly for reference)

    addInteractionBtn.addEventListener('click', () => {
        const trigger = interactionTrigger.value;
        const effect = interactionEffect.value;
        const feedback = document.getElementById('interactionFeedback');

        // 1. Check for Exact Duplicate (Still Forbidden)
        const isDuplicate = interactions.some(i => i.trigger === trigger && i.effect === effect);
        if (isDuplicate) {
            feedback.innerText = `Duplicate: You already have ${effect} on ${trigger}.`;
            return;
        }

        // 2. Category Conflict REMOVED! Merging is now supported.

        // Valid
        feedback.innerText = ''; // Clear error
        interactions.push({
            id: Date.now(),
            trigger: trigger,
            effect: effect
        });

        renderInteractionsList();
        updatePreview();
        saveProject();
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

            // Format labels for display
            const triggerLabel = item.trigger.charAt(0).toUpperCase() + item.trigger.slice(1);
            const effectLabel = item.effect.charAt(0).toUpperCase() + item.effect.slice(1);

            div.innerHTML = `
                <span><strong>${triggerLabel}</strong> → ${effectLabel}</span>
                <button class="remove-btn" data-id="${item.id}">&times;</button>
            `;
            interactionListItems.appendChild(div);

            div.querySelector('.remove-btn').addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                interactions = interactions.filter(i => i.id !== id);
                renderInteractionsList();
                updatePreview();
                saveProject();
            });
        });
    }

    // --- 2. Base Input Handling --- //

    // Load inputs from baseStyles
    function loadInputs() {
        // Load from storage if available
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const projectData = JSON.parse(saved);
                if (projectData.baseStyles) baseStyles = projectData.baseStyles;
                if (projectData.manualTransformData) manualTransformData = projectData.manualTransformData;
                if (projectData.interactions) interactions = projectData.interactions;

                renderInteractionsList();
            } catch (e) {
                console.error("Failed to parse saved design:", e);
            }
        }

        inputs.forEach(input => {
            const prop = input.getAttribute('data-property');
            if (prop && baseStyles[prop]) {
                input.value = baseStyles[prop];
                // Initialize CSS Variable
                document.documentElement.style.setProperty(`--p-${prop}`, baseStyles[prop]);
            } else if (input.type === 'range' || input.type === 'number') {
                // Keep current
            }

            // Sync Visuals
            if (input.hasAttribute('data-sync') || input.classList.contains('synced-input')) {
                syncInputVisuals(input);
            }
        });

        // Color Picker text sync
        colorInputs.forEach(input => {
            const wrapper = input.closest('.color-picker-wrapper');
            if (wrapper) wrapper.querySelector('.color-code').innerText = input.value;
        });

        // Load Manual Transforms
        const rs = document.getElementById('rotate-slider');
        const ss = document.getElementById('scale-slider');
        const skx = document.getElementById('skewX-slider');
        const txs = document.getElementById('translateX-slider');
        const tys = document.getElementById('translateY-slider');

        if (rs) rs.value = manualTransformData.rotate;
        if (ss) ss.value = manualTransformData.scale;
        if (skx) skx.value = manualTransformData.skewX;
        if (txs) txs.value = manualTransformData.translateX;
        if (tys) tys.value = manualTransformData.translateY;
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

        // Manual Transform
        if (target.classList.contains('manual-transform')) {
            updateManualTransform();
            return;
        }

        if (prop) {
            syncInputVisuals(target);

            if (value && value !== 'none') {
                if (unit && !isNaN(value) && value !== '') value += unit;
                baseStyles[prop] = value;

                // Update CSS Variable
                const varName = `--p-${prop}`;
                document.documentElement.style.setProperty(varName, value);
            } else {
                if (value === 'none') {
                    baseStyles[prop] = 'none';
                    document.documentElement.style.setProperty(`--p-${prop}`, 'none');
                } else {
                    delete baseStyles[prop];
                    document.documentElement.style.removeProperty(`--p-${prop}`);
                }
            }

            // If using preset transform, clear manual transform
            if (prop === 'transform' && !manualTransformCheck.checked) {
                manualTransformData = { rotate: 0, scale: 1, skewX: 0, translateX: 0, translateY: 0 };
            }

            updatePreview();
            saveProject();
        }
    }

    function updateManualTransform() {
        const r = document.getElementById('rotate-slider').value;
        const s = document.getElementById('scale-slider').value;
        const k = document.getElementById('skewX-slider').value;
        const tx = document.getElementById('translateX-slider').value;
        const ty = document.getElementById('translateY-slider').value;

        manualTransformData = { rotate: r, scale: s, skewX: k, translateX: tx, translateY: ty };

        const transformString = `rotate(${r}deg) scale(${s}) skewX(${k}deg) translate(${tx}px, ${ty}px)`;
        baseStyles['transform'] = transformString;

        // Update CSS Variable
        document.documentElement.style.setProperty('--p-transform', transformString);

        // Sync visuals
        const active = document.activeElement;
        if (active && active.classList.contains('manual-transform')) {
            const id = active.id;
            if (id.includes('-slider')) document.getElementById(id.replace('-slider', '-val')).value = active.value;
            if (id.includes('-val')) document.getElementById(id.replace('-val', '-slider')).value = active.value;
        }

        updatePreview();
        saveProject();
    }

    // --- 3. Preview & CSS Generation --- //

    function updatePreview() {
        let css = '';
        const idSelector = '#preview-box';

        // Helper to Generate Merged CSS for a Trigger
        const getTriggerCSS = (triggerName) => {
            const activeInteractions = interactions.filter(i => i.trigger === triggerName);

            let props = {};
            let transforms = [];
            let animations = [];
            let transitions = [];

            // 1. Base Styles (Only for 'base' or 'always' if we treat always as base modification)
            if (triggerName === 'base') {
                for (const [key, val] of Object.entries(baseStyles)) {
                    props[key] = val;
                }
            }

            // 2. Process Interactions
            activeInteractions.forEach(i => {
                const data = effectMap[i.effect];
                if (!data) return;

                if (data.type === 'transform') {
                    transforms.push(data.value);
                    if (data.extras) {
                        // extras like box-shadow need to be added to props
                        // Parse "prop: val;" string roughly or just append?
                        // For 'lift', extras is 'box-shadow: ...'
                        let [p, v] = data.extras.replace(';', '').split(':');
                        props[p.trim()] = v.trim();
                    }
                    if (data.transition) transitions.push(data.transition);
                } else if (data.type === 'animation') {
                    animations.push(data.value);
                }
            });

            // 3. Construct CSS String
            let cssBlock = '';

            // Standard Props
            for (const [key, val] of Object.entries(props)) {
                cssBlock += `    ${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${val};\n`;
            }

            // Merged Transform
            // If base has transform (manual), we should include it?
            // Current manual logic puts it in 'baseStyles'. merging might be tricky.
            // If baseStyles['transform'] exists, we should add it to transforms list.
            if (triggerName === 'base' && baseStyles['transform']) {
                // Prepend base transform to list? or Append?
                // Usually interaction transforms happen ON TOP of base state.
                transforms.unshift(baseStyles['transform']);
                delete props['transform']; // Remove from standard props to avoid duplication
            }

            if (transforms.length > 0) {
                cssBlock += `    transform: ${transforms.join(' ')};\n`;
            }

            // Merged Animation
            if (animations.length > 0) {
                cssBlock += `    animation: ${animations.join(', ')};\n`;
            }

            // Merged Transition
            if (transitions.length > 0) {
                // Unique transitions only
                const unique = [...new Set(transitions)];
                cssBlock += `    transition: ${unique.join(', ')};\n`;
            }

            return cssBlock;
        };

        // 1. Base Block (Standard + Always)
        // 'Always' interactions are effectively base state modifications
        let baseCSS = getTriggerCSS('base');

        // Add 'Always' effects to base block
        // We technically need to merge 'base' params with 'always' effects.
        // Let's modify the helper or just handle it here.
        // Actually, 'always' means it's ALWAYS active, effectively part of base.
        // So we can pass 'always' interactions to the base generator?
        // Let's refine the helper call.
        const alwaysInteractions = interactions.filter(i => i.trigger === 'always');

        // Refined Strategy:
        // We need to merge baseStyles + Always Effects into the main block.
        let baseProps = { ...baseStyles };
        let baseTransforms = [];
        if (baseProps.transform) {
            baseTransforms.push(baseProps.transform);
            delete baseProps.transform;
        }
        let baseAnimations = [];
        let baseTransitions = [];

        alwaysInteractions.forEach(i => {
            const data = effectMap[i.effect];
            if (data.type === 'transform') {
                baseTransforms.push(data.value);
                if (data.extras) {
                    let [p, v] = data.extras.replace(';', '').split(':');
                    baseProps[p.trim()] = v.trim();
                }
                if (data.transition) baseTransitions.push(data.transition);
            } else if (data.type === 'animation') {
                baseAnimations.push(data.value);
            }
        });

        let cssString = `${idSelector} {\n`;
        // Base properties are now handled by CSS Variables in style.css + :root
        // We only need to inject bits that are merged or dynamic (like interactions)

        if (baseAnimations.length > 0) cssString += `    animation: ${baseAnimations.join(', ')};\n`;
        if (baseTransitions.length > 0) cssString += `    transition: ${[...new Set(baseTransitions)].join(', ')};\n`;
        cssString += `}\n`;


        // 2. Hover Block
        const hoverCSS = getTriggerCSS('hover');
        // Note: getTriggerCSS defined above logic is slightly flawed for 'base' mixed with 'always'.
        // But for 'hover', it works: returns styles specific to hover triggers.
        // However, 'hover' usually inherits base state. 
        // If we have 'Grow' on hover, we want `transform: scale(1.1)`. 
        // IMPORTANT: If base has `transform: rotate(10deg)` and hover has `scale(1.1)`, 
        // CSS `transform` replaces the value. We lose the rotation!
        // We MUST include base transforms in hover state for continuity?
        // Or user must explicitly add "Rotate" to hover as well?
        // Standard CSS behavior: replace.
        // Smart behavior: append?
        // For this "No Code" builder, appending is usually expected. "Scale it up, but keep it rotated".
        // Let's APPEND hover transforms to base transforms.

        if (interactions.some(i => i.trigger === 'hover')) {
            let hoverTransforms = [...baseTransforms]; // Start with base params
            let hoverAnimations = [...baseAnimations];
            // ... actually animations don't cascade like transform replacement, they overlap or replace?
            // Animation property replaces.

            // Let's just create the block.
            let hoverBlock = '';
            let hTransforms = [];
            let hAnimations = [];

            // Add base transforms first so they persist
            hTransforms.push(...baseTransforms);

            interactions.filter(i => i.trigger === 'hover').forEach(i => {
                const data = effectMap[i.effect];
                if (data.type === 'transform') hTransforms.push(data.value);
                if (data.type === 'animation') hAnimations.push(data.value);
            });

            // If we have new transforms, we write the transform line
            if (hTransforms.length > 0) hoverBlock += `    transform: ${hTransforms.join(' ')};\n`;
            // If we have new animations?
            if (hAnimations.length > 0) hoverBlock += `    animation: ${hAnimations.join(', ')};\n`; // This replaces base animation

            cssString += `${idSelector}:hover {\n${hoverBlock}}\n`;
        }

        // 3. Active Block (Similar logic)
        if (interactions.some(i => i.trigger === 'active')) {
            let activeBlock = '';
            let aTransforms = [];
            let aAnimations = [];

            // Add base transforms (and maybe hover transforms if active is triggered while hovering? No, active is separate state in CSS unless chained)
            aTransforms.push(...baseTransforms);

            interactions.filter(i => i.trigger === 'active').forEach(i => {
                const data = effectMap[i.effect];
                if (data.type === 'transform') aTransforms.push(data.value);
                if (data.type === 'animation') aAnimations.push(data.value);
            });

            if (aTransforms.length > 0) activeBlock += `    transform: ${aTransforms.join(' ')};\n`;
            if (aAnimations.length > 0) activeBlock += `    animation: ${aAnimations.join(', ')};\n`;

            cssString += `${idSelector}:active {\n${activeBlock}}\n`;
        }

        dynamicStyle.innerHTML = cssString;
        updateSmartControls();
    }


    function updateSmartControls() {
        const display = displaySelect.value || baseStyles.display || 'block';
        const tag = typeSelect.value;

        if (display === 'flex' || display === 'grid') {
            flexGridProps.style.display = 'block';
        } else {
            flexGridProps.style.display = 'none';
        }

        if (display === 'inline') {
            widthGroup.classList.add('disabled-control');
            heightGroup.classList.add('disabled-control');
        } else {
            widthGroup.classList.remove('disabled-control');
            heightGroup.classList.remove('disabled-control');
        }

        if (tag === 'img') {
            if (srcGroup) srcGroup.style.display = 'block';
            if (textGroup) textGroup.style.display = 'none';
        } else {
            if (srcGroup) srcGroup.style.display = 'none';
            if (textGroup) textGroup.style.display = 'block';
        }

        if (tag === 'input') {
            if (placeholderGroup) placeholderGroup.style.display = 'block';
            if (textGroup) textGroup.style.display = 'none';
        } else {
            if (placeholderGroup) placeholderGroup.style.display = 'none';
        }
    }


    function generateCode() {
        const tag = previewBox.tagName.toLowerCase();
        let selector = `.${tag}-custom`;
        if (elementClassInput.value.trim()) selector = `.${elementClassInput.value.trim().split(' ')[0]}`;
        if (elementIdInput.value.trim()) selector = `#${elementIdInput.value.trim()}`;

        let cssOutput = '';

        // Helper
        const buildCssBlock = (propsString, suffix = '') => {
            if (!propsString.trim()) return;
            cssOutput += `<span class="code-tag">${selector}${suffix}</span> {\n${propsString}}\n\n`;
        };

        // Helper to Generate Merged CSS for Code View
        const getTriggerCSSCode = (triggerName, baseTransformsRef = [], baseAnimationsRef = []) => {
            let output = '';
            let props = {};
            let transforms = []; // Start fresh, we will manually merge base
            let animations = [];

            // If not base, we start with base values for continuity
            if (triggerName !== 'base') {
                transforms.push(...baseTransformsRef);
                // Animations usually don't cascade, they replace. So we don't push baseAnimationsRef?
                // Actually, if you hover, you might want the 'Always' animation (Rainbow) to continue?
                // CSS: 'animation' property resets if redefined.
                // So yes, we should include base animations if we want them to persist.
                animations.push(...baseAnimationsRef);
            }

            const activeInteractions = interactions.filter(i => i.trigger === triggerName);
            if (activeInteractions.length === 0 && triggerName !== 'base') {
                return { html: '', transforms: [], animations: [] };
            }

            // Process Interactions
            activeInteractions.forEach(i => {
                const data = effectMap[i.effect];
                if (!data) return;

                if (data.type === 'transform') {
                    transforms.push(data.value);
                    if (data.extras) {
                        let [p, v] = data.extras.replace(';', '').split(':');
                        props[p.trim()] = v.trim();
                    }
                } else if (data.type === 'animation') {
                    animations.push(data.value);
                }
            });

            // Base Props (if base)
            if (triggerName === 'base') {
                for (const [key, val] of Object.entries(baseStyles)) {
                    if (key !== 'transform') props[key] = val;
                }
                if (baseStyles['transform']) transforms.unshift(baseStyles['transform']);
            }

            // Construct Props String
            for (const [key, val] of Object.entries(props)) {
                output += `    <span class="code-prop">${key.replace(/([A-Z])/g, "-$1").toLowerCase()}</span>: <span class="code-val">${val}</span>;\n`;
            }

            if (transforms.length > 0) {
                output += `    <span class="code-prop">transform</span>: <span class="code-val">${transforms.join(' ')}</span>;\n`;
            }

            if (animations.length > 0) {
                output += `    <span class="code-prop">animation</span>: <span class="code-val">${animations.join(', ')}</span>;\n`;
            }

            // Return raw data for ref and formatted string
            return { html: output, transforms: transforms, animations: animations };
        };

        // 1. Base (Always + Static)
        // We need to pass 'always' as a trigger to the helper? 
        // No, 'activeInteractions' filter needs to handle 'always' mapping to base.
        // Let's pre-process base/always interactions.
        const baseResult = getTriggerCSSCode('always'); // 'always' implies base modifiers in this logic
        // Wait, baseStyles need to be involved.
        // My helper above is a bit split. Let's do it manually for Base.

        let baseCode = '';
        let baseTransforms = [];
        let baseAnimations = [];

        // Static Base Stats
        for (const [key, val] of Object.entries(baseStyles)) {
            if (key !== 'transform') {
                baseCode += `    <span class="code-prop">${key.replace(/([A-Z])/g, "-$1").toLowerCase()}</span>: <span class="code-val">${val}</span>;\n`;
            }
        }
        if (baseStyles['transform']) baseTransforms.push(baseStyles['transform']);

        // Always Interactions
        interactions.filter(i => i.trigger === 'always').forEach(i => {
            const data = effectMap[i.effect];
            if (data.type === 'transform') {
                baseTransforms.push(data.value);
                if (data.extras) {
                    let [p, v] = data.extras.replace(';', '').split(':');
                    baseCode += `    <span class="code-prop">${p.trim()}</span>: <span class="code-val">${v.trim()}</span>;\n`;
                }
            }
            if (data.type === 'animation') baseAnimations.push(data.value);
        });

        if (baseTransforms.length > 0) baseCode += `    <span class="code-prop">transform</span>: <span class="code-val">${baseTransforms.join(' ')}</span>;\n`;
        if (baseAnimations.length > 0) baseCode += `    <span class="code-prop">animation</span>: <span class="code-val">${baseAnimations.join(', ')}</span>;\n`;

        buildCssBlock(baseCode);

        // 2. Hover
        const hoverResult = getTriggerCSSCode('hover', baseTransforms, baseAnimations);
        buildCssBlock(hoverResult.html, ':hover');

        // 3. Active
        const activeResult = getTriggerCSSCode('active', baseTransforms, baseAnimations);
        buildCssBlock(activeResult.html, ':active');

        // Note: Keyframes are not generated in the snippet yet. 
        // We should add keyframes if used. 
        // Check for usage of animations
        const usedEffects = interactions.map(i => i.effect);
        const usedAnimations = ['rainbow', 'shake', 'pulse', 'glow'].filter(eff => usedEffects.includes(eff));

        if (usedAnimations.length > 0) {
            cssOutput += `/* Keyframes */\n`;
            usedAnimations.forEach(anim => {
                if (anim === 'rainbow') {
                    cssOutput += `@keyframes rainbow { 
    0% { background-color: #ffadad; color: #000; } 
    14% { background-color: #ffd6a5; } 
    28% { background-color: #fdffb6; } 
    42% { background-color: #caffbf; } 
    57% { background-color: #9bf6ff; } 
    71% { background-color: #a0c4ff; } 
    85% { background-color: #bdb2ff; } 
    100% { background-color: #ffadad; color: #000; } 
}\n`;
                }
                if (anim === 'shake') {
                    cssOutput += `@keyframes shake { 
    0%, 100% { transform: translateX(0); } 
    25%, 75% { transform: translateX(-5px) rotate(-5deg); } 
    50% { transform: translateX(5px) rotate(5deg); } 
}\n`;
                }
                if (anim === 'pulse') {
                    cssOutput += `@keyframes pulse { 
    0% { transform: scale(1); } 
    50% { transform: scale(1.05); } 
    100% { transform: scale(1); } 
}\n`;
                }
                if (anim === 'glow') {
                    cssOutput += `@keyframes glow { 
    0%, 100% { box-shadow: 0 0 5px rgba(52, 152, 219, 0.5); } 
    50% { box-shadow: 0 0 20px rgba(52, 152, 219, 0.9), 0 0 10px rgba(52, 152, 219, 0.5); } 
}\n`;
                }
            });
        }


        codeBlocks.css.innerHTML = cssOutput || '/* No styles applied */';

        // HTML & JS (Same as before)
        let htmlAttrs = '';
        if (elementIdInput.value.trim()) htmlAttrs += ` <span class="code-attr">id</span>=<span class="code-string">"${elementIdInput.value.trim()}"</span>`;
        if (elementClassInput.value.trim()) htmlAttrs += ` <span class="code-attr">class</span>=<span class="code-string">"${elementClassInput.value.trim()}"</span>`;
        if (!elementIdInput.value.trim() && !elementClassInput.value.trim()) {
            htmlAttrs += ` <span class="code-attr">class</span>=<span class="code-string">"${tag}-custom"</span>`;
        }

        let innerCode = '';
        if (tag === 'img') {
            htmlAttrs += ` <span class="code-attr">src</span>=<span class="code-string">"${document.getElementById('srcAttribute').value}"</span>`;
            innerCode = `<span class="code-tag">&lt;${tag}</span>${htmlAttrs} /<span class="code-tag">&gt;</span>`;
        } else if (tag === 'input') {
            htmlAttrs += ` <span class="code-attr">placeholder</span>=<span class="code-string">"${document.getElementById('placeholderAttribute').value}"</span>`;
            innerCode = `<span class="code-tag">&lt;${tag}</span>${htmlAttrs} /<span class="code-tag">&gt;</span>`;
        } else {
            innerCode = `<span class="code-tag">&lt;${tag}</span>${htmlAttrs}<span class="code-tag">&gt;</span>\n    ${textInput.value}\n<span class="code-tag">&lt;/${tag}&gt;</span>`;
        }
        codeBlocks.html.innerHTML = innerCode;
        codeBlocks.js.innerHTML = `<span class="code-comment">// Select the element</span>\n<span class="code-tag">const</span> el = <span class="code-tag">document</span>.querySelector(<span class="code-string">'${selector}'</span>);`;
    }


    // --- 4. Event Listeners --- //

    // Inputs
    inputs.forEach(input => input.addEventListener('input', (e) => handleInput(e.target)));
    colorInputs.forEach(input => input.addEventListener('input', (e) => {
        const wrapper = input.closest('.color-picker-wrapper');
        if (wrapper) wrapper.querySelector('.color-code').innerText = e.target.value;
        handleInput(e.target);
    }));

    manualTransformCheck.addEventListener('change', () => {
        if (manualTransformCheck.checked) {
            transformPresetMode.style.display = 'none';
            transformManualMode.style.display = 'block';
        } else {
            transformPresetMode.style.display = 'block';
            transformManualMode.style.display = 'none';
        }
        handleInput(document.getElementById('transform'));
    });

    document.querySelectorAll('.manual-transform').forEach(i => i.addEventListener('input', () => updateManualTransform()));



    // Content
    textInput.addEventListener('input', updateContent);
    elementIdInput.addEventListener('input', updateContent);
    elementClassInput.addEventListener('input', updateContent);
    document.getElementById('srcAttribute').addEventListener('input', updateContent);
    document.getElementById('placeholderAttribute').addEventListener('input', updateContent);

    function updateContent() {
        if (!previewBox) return;
        const tag = typeSelect.value;
        if (elementIdInput.value.trim()) previewBox.setAttribute('data-user-id', elementIdInput.value.trim());
        previewBox.className = elementClassInput.value.trim();
        if (tag === 'img') previewBox.src = document.getElementById('srcAttribute').value;
        else if (tag === 'input') previewBox.placeholder = document.getElementById('placeholderAttribute').value;
        else previewBox.innerText = textInput.value;
        generateCode();
    }

    // Modal
    openModalBtn.onclick = () => { generateCode(); modal.style.display = 'flex'; };
    closeModalBtn.onclick = () => { modal.style.display = 'none'; };
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            codeTabs.forEach(t => t.classList.remove('active'));
            Object.values(codeBlocks).forEach(b => b.classList.remove('active'));
            tab.classList.add('active');
            activeCodeTab = tab.getAttribute('data-tab');
            codeBlocks[activeCodeTab].classList.add('active');
        });
    });

    copyBtn.onclick = () => {
        const rawCode = codeBlocks[activeCodeTab].innerText;
        navigator.clipboard.writeText(rawCode).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'Copied!';
            copyBtn.style.background = '#27ae60';
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.background = '#007acc';
            }, 2000);
        });
    };

    // Tabs
    propTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            propTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-target')).classList.add('active');
        });
    });

    // Type Switch
    typeSelect.addEventListener('change', () => {
        const tag = typeSelect.value;
        const newElement = document.createElement(tag);
        newElement.id = 'preview-box';
        previewContainer.innerHTML = '';
        previewContainer.appendChild(newElement);
        previewBox = newElement;
        updateContent();
        updatePreview();
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const panel = document.querySelector('.preview-panel');
        panel.classList.toggle('dark-mode');

        if (panel.classList.contains('dark-mode')) {
            themeBtn.innerText = '☀️'; // Switch to Sun icon
            themeBtn.title = "Switch to Light Mode";
        } else {
            themeBtn.innerText = '🌙'; // Switch to Moon icon
            themeBtn.title = "Switch to Dark Mode";
        }
    });

    // Init
    loadInputs();
    updateContent();
    renderInteractionsList();
});
