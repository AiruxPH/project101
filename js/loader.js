/**
 * loader.js
 * Simply finds elements with [data-include] and fetches the HTML into them.
 */
document.addEventListener("DOMContentLoaded", () => {
    const includes = document.querySelectorAll('[data-include]');

    includes.forEach(async (el) => {
        const file = el.getAttribute('data-include');
        const root = el.getAttribute('data-root') || ''; // e.g. "../../"

        try {
            const response = await fetch(file);
            if (response.ok) {
                let html = await response.text();

                // If a root is provided, we prefix all relative links (not starting with http or /)
                if (root) {
                    // This is a simple regex to prefix href and src that don't look absolute or external
                    html = html.replace(/(href|src)="(?!(http|https|#|\/))(.*?)"/g, `$1="${root}$3"`);
                }

                el.innerHTML = html;
            } else {
                el.innerHTML = `<p style="color:red">Error loading ${file}</p>`;
            }
        } catch (err) {
            console.error(`Error fetching ${file}:`, err);
            el.innerHTML = `<p style="color:red">Error. Check local server (CORS).</p>`;
        }
    });
});
