// layout-lab.js - Parent/Child Layout Explorer

document.addEventListener('DOMContentLoaded', () => {
    const parent = document.getElementById('parent-container');
    const addBtn = document.getElementById('add-block');
    const displaySelect = document.getElementById('parent-display');
    const gapInput = document.getElementById('parent-gap');
    const columnsInput = document.getElementById('parent-columns');
    const directionSelect = document.getElementById('parent-direction');

    // UI Panels
    const flexPanel = document.getElementById('flex-only-controls');
    const gridPanel = document.getElementById('grid-only-controls');
    const childContainer = document.getElementById('child-controls-container');
    const childTemplate = document.getElementById('child-controls-template');

    let blockCount = 0;
    let selectedBlock = null;

    // --- PARENT LOGIC --- //

    function updateParent() {
        const display = displaySelect.value;
        parent.style.display = display;
        parent.style.gap = gapInput.value;

        // Toggle Panels
        flexPanel.style.display = display === 'flex' ? 'block' : 'none';
        gridPanel.style.display = display === 'grid' ? 'block' : 'none';

        if (display === 'grid') {
            parent.style.gridTemplateColumns = columnsInput.value;
        } else {
            parent.style.gridTemplateColumns = '';
        }

        if (display === 'flex') {
            parent.style.flexDirection = directionSelect.value;
        } else {
            parent.style.flexDirection = '';
        }
    }

    displaySelect.addEventListener('change', updateParent);
    gapInput.addEventListener('input', updateParent);
    columnsInput.addEventListener('input', updateParent);
    directionSelect.addEventListener('change', updateParent);

    // Initial state
    updateParent();

    // --- CHILD LOGIC --- //

    function addBlock() {
        blockCount++;
        const block = document.createElement('div');
        block.className = 'lab-block';
        block.id = `block-${blockCount}`;
        block.innerText = `Block ${blockCount}`;

        // Random subtle bg
        const colors = ['#3498db', '#9b59b6', '#e67e22', '#1abc9c', '#34495e'];
        block.style.backgroundColor = colors[blockCount % colors.length];

        block.onclick = (e) => {
            e.stopPropagation();
            selectBlock(block);
        };

        parent.appendChild(block);
    }

    function selectBlock(el) {
        if (selectedBlock) selectedBlock.classList.remove('active');
        selectedBlock = el;
        selectedBlock.classList.add('active');

        renderChildControls();
    }

    function renderChildControls() {
        childContainer.innerHTML = '';
        const controls = childTemplate.cloneNode(true);
        controls.style.display = 'block';

        // Setup values
        const labelInp = controls.querySelector('.child-label-input');
        const bgInp = controls.querySelector('.child-bg-input');
        const growInp = controls.querySelector('.child-grow-input');
        const spanInp = controls.querySelector('.child-span-input');

        labelInp.value = selectedBlock.innerText;
        bgInp.value = rgbToHex(selectedBlock.style.backgroundColor);
        growInp.value = selectedBlock.style.flexGrow || 0;
        spanInp.value = selectedBlock.style.gridColumn || '';

        // Contextual visibility
        const currentDisplay = displaySelect.value;
        controls.querySelector('.flex-child-controls').style.display = currentDisplay === 'flex' ? 'block' : 'none';
        controls.querySelector('.grid-child-controls').style.display = currentDisplay === 'grid' ? 'block' : 'none';

        // Listeners
        labelInp.oninput = () => selectedBlock.innerText = labelInp.value;
        bgInp.oninput = () => selectedBlock.style.backgroundColor = bgInp.value;
        growInp.oninput = () => selectedBlock.style.flexGrow = growInp.value;
        spanInp.oninput = () => selectedBlock.style.gridColumn = spanInp.value;

        childContainer.appendChild(controls);
    }

    addBtn.addEventListener('click', addBlock);

    // Click canvas to deselect
    parent.onclick = () => {
        if (selectedBlock) {
            selectedBlock.classList.remove('active');
            selectedBlock = null;
            childContainer.innerHTML = '<p class="no-selection-msg">Click a block on the right to edit its properties.</p>';
        }
    };

    // Helper: Component to Hex
    function rgbToHex(rgb) {
        if (!rgb) return '#3498db';
        if (rgb.startsWith('#')) return rgb;
        const match = rgb.match(/\d+/g);
        if (!match) return '#3498db';
        const [r, g, b] = match;
        return "#" + ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1);
    }
});
