/**
 * layout-lab.js - Parent/Child Layout Explorer
 * Interactive tool for experimenting with CSS Flexbox and Grid layouts
 */

// ========== CONSTANTS ==========
const DEFAULT_GAP = 20;
const MAX_GAP = 100;
const MIN_GAP = 0;

// ========== MAIN APPLICATION ==========
document.addEventListener('DOMContentLoaded', () => {
    const parent = document.getElementById('parent-container');
    const addBtn = document.getElementById('add-block');
    const displaySelect = document.getElementById('parent-display');
    const gapInput = document.getElementById('parent-gap');
    const columnsInput = document.getElementById('parent-columns');
    const directionSelect = document.getElementById('parent-direction');
    const wrapSelect = document.getElementById('parent-wrap');
    const gapValueDisplay = document.getElementById('gap-value');

    // UI Panels
    const flexPanel = document.getElementById('flex-only-controls');
    const gridPanel = document.getElementById('grid-only-controls');
    const childContainer = document.getElementById('child-controls-container');
    const childTemplate = document.getElementById('child-controls-template');

    // New Buttons
    const deleteBtn = document.getElementById('delete-block-btn');
    const copyCodeBtn = document.getElementById('copy-code-btn');

    let blockCount = 0;
    let selectedBlock = null;

    // --- PARENT LOGIC --- //

    function updateParent() {
        const display = displaySelect.value;
        parent.style.display = display;

        // GAP SLIDER LOGIC (Layman's Terms)
        // 1. We get the number from the slider (e.g., "50")
        // 2. We add "px" to it (e.g., "50px")
        // 3. We tell the parent container: "Set your gap to 50px"
        // 4. We also show the number on the screen so you know what you picked.
        const currentGap = gapInput.value + 'px';
        parent.style.gap = currentGap;
        gapValueDisplay.innerText = currentGap;


        // Toggle Panels
        flexPanel.style.display = display === 'flex' ? 'block' : 'none';
        gridPanel.style.display = display === 'grid' ? 'block' : 'none';

        if (display === 'grid') {
            // Use default if input is empty
            const columnValue = columnsInput.value.trim() || 'repeat(3, 1fr)';
            parent.style.gridTemplateColumns = columnValue;
            // Update input if it was empty
            if (!columnsInput.value.trim()) {
                columnsInput.value = columnValue;
            }
        } else {
            parent.style.gridTemplateColumns = '';
        }


        if (display === 'flex') {
            parent.style.flexDirection = directionSelect.value;
            parent.style.flexWrap = wrapSelect.value;
        } else {
            parent.style.flexDirection = '';
            parent.style.flexWrap = '';
        }

        // Parent controls overflow: auto via CSS, but we ensure it's functional
        parent.style.overflow = 'auto';
    }

    displaySelect.addEventListener('change', updateParent);
    gapInput.addEventListener('input', updateParent); // 'input' fires immediately when sliding
    columnsInput.addEventListener('input', updateParent);
    directionSelect.addEventListener('change', updateParent);
    wrapSelect.addEventListener('change', updateParent);

    // Initial state
    updateParent();

    // --- CHILD LOGIC --- //

    /**
     * Adds a new block to the parent container
     */
    function addBlock() {
        try {
            blockCount++;
            const block = document.createElement('div');
            block.className = 'lab-block';
            block.id = `block-${blockCount}`;
            block.innerText = `Block ${blockCount}`;
            block.setAttribute('role', 'button');
            block.setAttribute('tabindex', '0');
            block.setAttribute('aria-label', `Block ${blockCount}. Click to select and edit properties.`);

            // Click handler
            block.onclick = (e) => {
                e.stopPropagation();
                selectBlock(block);
            };

            // Keyboard accessibility
            block.onkeydown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectBlock(block);
                }
            };

            parent.appendChild(block);
        } catch (error) {
            console.error('Error adding block:', error);
        }
    }

    /**
     * Selects a block and displays its controls
     * @param {HTMLElement} el - The block element to select
     */
    function selectBlock(el) {
        if (!el) {
            console.warn('Attempted to select null or undefined block');
            return;
        }

        try {
            if (selectedBlock) {
                selectedBlock.classList.remove('active');
                selectedBlock.setAttribute('aria-selected', 'false');
            }
            selectedBlock = el;
            selectedBlock.classList.add('active');
            selectedBlock.setAttribute('aria-selected', 'true');

            // Show delete button
            deleteBtn.style.display = 'block';

            renderChildControls();
        } catch (error) {
            console.error('Error selecting block:', error);
        }
    }

    function renderChildControls() {
        childContainer.innerHTML = '';
        const controls = childTemplate.cloneNode(true);
        controls.style.display = 'block';

        // Setup values
        const labelInp = controls.querySelector('.child-label-input');
        const growInp = controls.querySelector('.child-grow-input');
        const spanInp = controls.querySelector('.child-span-input');

        labelInp.value = selectedBlock.innerText;
        growInp.value = selectedBlock.style.flexGrow || 0;
        spanInp.value = selectedBlock.style.gridColumn || '';

        // Contextual visibility
        const currentDisplay = displaySelect.value;
        controls.querySelector('.flex-child-controls').style.display = currentDisplay === 'flex' ? 'block' : 'none';
        controls.querySelector('.grid-child-controls').style.display = currentDisplay === 'grid' ? 'block' : 'none';

        // Listeners
        labelInp.oninput = () => selectedBlock.innerText = labelInp.value;
        growInp.oninput = () => selectedBlock.style.flexGrow = growInp.value;
        spanInp.oninput = () => selectedBlock.style.gridColumn = spanInp.value;

        childContainer.appendChild(controls);
    }

    // DELETE BLOCK LOGIC (Layman's Terms)
    // 1. Check if a block is actually selected.
    // 2. We ask the DOM (Document Object Model) to 'remove' the specific element we stored in 'selectedBlock'.
    // 3. We clear the variable 'selectedBlock' so the code knows nothing is selected anymore.
    // 4. We hide the delete button and show the intro message again.
    deleteBtn.addEventListener('click', () => {
        if (selectedBlock) {
            selectedBlock.remove();
            selectedBlock = null;
            childContainer.innerHTML = '<p class="no-selection-msg">Click a block on the right to edit its properties.</p>';
            deleteBtn.style.display = 'none';
        }
    });

    addBtn.addEventListener('click', addBlock);

    // Click canvas to deselect
    parent.onclick = () => {
        if (selectedBlock) {
            selectedBlock.classList.remove('active');
            selectedBlock = null;
            childContainer.innerHTML = '<p class="no-selection-msg">Click a block on the right to edit its properties.</p>';
            deleteBtn.style.display = 'none';
        }
    };

    // --- CODE EXPORT MODAL --- //
    const modal = document.getElementById('codeModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const copyBtn = document.querySelector('.copy-btn');

    /**
     * Opens the code export modal and generates HTML/CSS code
     */
    copyCodeBtn.addEventListener('click', () => {
        // Generate parent styles
        const parentStyle = parent.style.cssText;

        // Generate child blocks HTML and CSS
        const blocks = parent.querySelectorAll('.lab-block');
        let childHTML = '';
        let childCSS = '';

        blocks.forEach((block, index) => {
            const blockId = `block-${index + 1}`;
            const blockText = block.innerText;
            const blockStyle = block.style.cssText;

            // HTML
            childHTML += `    <div class="${blockId}">${blockText}</div>\n`;

            // CSS
            if (blockStyle) {
                childCSS += `.${blockId} {\n`;
                // Convert inline styles to CSS properties
                const styles = blockStyle.split(';').filter(s => s.trim());
                styles.forEach(style => {
                    const [prop, value] = style.split(':').map(s => s.trim());
                    if (prop && value) {
                        childCSS += `    ${prop}: ${value};\n`;
                    }
                });
                childCSS += `}\n\n`;
            }
        });

        // Generate HTML code
        const htmlCode = `<!-- Layout Lab Result -->\n<div id="parent">\n${childHTML}</div>`;

        // Generate CSS code
        let cssCode = `/* Parent Container Styles */\n#parent {\n`;
        const parentStyles = parentStyle.split(';').filter(s => s.trim());
        parentStyles.forEach(style => {
            const [prop, value] = style.split(':').map(s => s.trim());
            if (prop && value) {
                cssCode += `    ${prop}: ${value};\n`;
            }
        });
        cssCode += `}\n\n/* Child Block Styles */\n${childCSS}`;

        // Populate modal
        document.getElementById('code-html').textContent = htmlCode;
        document.getElementById('code-css').textContent = cssCode;

        // Show modal
        modal.style.display = 'flex';
    });

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active content
            document.querySelectorAll('.code-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`code-${targetTab}`).classList.add('active');
        });
    });

    // Copy active tab to clipboard
    copyBtn.addEventListener('click', () => {
        const activeContent = document.querySelector('.code-content.active');
        const code = activeContent.textContent;

        navigator.clipboard.writeText(code).then(() => {
            const original = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => copyBtn.textContent = original, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard');
        });
    });

    /**
     * Converts RGB color string to hexadecimal format
     * @param {string} rgb - RGB color string (e.g., "rgb(52, 152, 219)")
     * @returns {string} Hexadecimal color code
     */
    function rgbToHex(rgb) {
        // Default fallback color
        const defaultColor = '#3498db';

        if (!rgb || typeof rgb !== 'string') return defaultColor;
        if (rgb.startsWith('#')) return rgb;

        try {
            const match = rgb.match(/\d+/g);
            if (!match || match.length < 3) return defaultColor;

            const [r, g, b] = match.map(num => {
                const parsed = parseInt(num, 10);
                // Validate RGB values are in valid range (0-255)
                return isNaN(parsed) ? 0 : Math.max(0, Math.min(255, parsed));
            });

            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        } catch (error) {
            console.error('Error converting RGB to Hex:', error);
            return defaultColor;
        }
    }
});
