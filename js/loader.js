/**
 * loader.js
 * Simply finds elements with [data-include] and fetches the HTML into them.
 */
document.addEventListener("DOMContentLoaded", () => {
    const includes = document.querySelectorAll('[data-include]');

    includes.forEach(async (el) => {
        const file = el.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (response.ok) {
                el.innerHTML = await response.text();
            } else {
                el.innerHTML = `<p style="color:red">Error loading ${file}</p>`;
            }
        } catch (err) {
            console.error(`Error fetching ${file}:`, err);
            el.innerHTML = `<p style="color:red">Error. Check local server (CORS).</p>`;
        }
    });
});
