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

// Load all components
export async function loadAllComponents() {
    const components = [
        { id: 'about-me-section', path: 'components/about-me-section.html' },
        { id: 'skills-section', path: 'components/skills-section.html' },
        { id: 'educational-journey-section', path: 'components/educational-journey-section.html' },
        { id: 'contact-section', path: 'components/contact-section.html' }
    ];

    for (const component of components) {
        await loadComponent(component.id, component.path);
    }
}
