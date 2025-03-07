// components-binder.js
export async function loadComponent(containerId, componentPath, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        container.innerHTML = html;

        // Execute the callback function after loading
        if (callback) callback();
    } catch (error) {
        console.error("Error loading component:", error);
    }
}
