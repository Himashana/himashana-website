// components-binder.js
import { profile } from './data/profile.js';

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

// Load all components, then bind profile data into the DOM.
export async function loadAllComponents() {
    const components = [
        { id: 'about-me-section', path: 'components/about-me-section.html' },
        { id: 'terminal-section', path: 'components/terminal-section.html' },
        { id: 'skills-section', path: 'components/skills-section.html' },
        { id: 'educational-journey-section', path: 'components/educational-journey-section.html' },
        { id: 'contact-section', path: 'components/contact-section.html' }
    ];

    for (const component of components) {
        await loadComponent(component.id, component.path);
    }

    bindProfile(profile);
}

// -----------------------------------------------------------------------------
// Profile binding
// -----------------------------------------------------------------------------

// Resolve a dotted path like "contact.email" against the profile object.
function resolvePath(obj, path) {
    return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

// Escape text destined for innerHTML / attribute values.
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// Bind every [data-bind*] element on the page, then render the dynamic lists.
export function bindProfile(data = profile) {
    // Text content: <span data-bind="contact.email"></span>
    document.querySelectorAll('[data-bind]').forEach((el) => {
        const value = resolvePath(data, el.getAttribute('data-bind'));
        if (value != null) el.textContent = value;
    });

    // Href: <a data-bind-href="mailto:|contact.email"> -> prefix + value
    document.querySelectorAll('[data-bind-href]').forEach((el) => {
        const [prefix, path] = splitBinding(el.getAttribute('data-bind-href'));
        const value = resolvePath(data, path);
        if (value != null) el.setAttribute('href', `${prefix}${value}`);
    });

    // Src: <img data-bind-src="identity.photo">
    document.querySelectorAll('[data-bind-src]').forEach((el) => {
        const value = resolvePath(data, el.getAttribute('data-bind-src'));
        if (value != null) el.setAttribute('src', value);
    });

    // Alt: <img data-bind-alt="identity.fullName">
    document.querySelectorAll('[data-bind-alt]').forEach((el) => {
        const value = resolvePath(data, el.getAttribute('data-bind-alt'));
        if (value != null) el.setAttribute('alt', value);
    });

    renderBioParagraphs(data);
    renderSocialLinks(data);
    renderSkills(data);
    renderEducation(data);
    renderActionLinks(data);
}

// Wire the "View Resume" / "View Certificates" buttons from profile URLs.
// A missing URL leaves the button visible but inert (so you can add the link
// later in data/profile.js with nothing else to change).
function renderActionLinks(data) {
    setActionLink(document.querySelector('[data-action-resume]'), data.resumeUrl);
    setActionLink(document.querySelector('[data-action-certificates]'), data.certificatesUrl);
}

function setActionLink(el, url) {
    if (!el) return;
    if (url) {
        el.setAttribute('href', url);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
        el.classList.remove('is-disabled');
        el.removeAttribute('aria-disabled');
        el.removeAttribute('title');
    } else {
        el.removeAttribute('href');        // no href -> not an active link
        el.classList.add('is-disabled');
        el.setAttribute('aria-disabled', 'true');
        el.setAttribute('title', 'Coming soon');
    }
}

// "prefix|path" -> ["prefix", "path"]; "path" -> ["", "path"]
function splitBinding(raw) {
    const idx = raw.indexOf('|');
    return idx === -1 ? ['', raw] : [raw.slice(0, idx), raw.slice(idx + 1)];
}

function renderBioParagraphs(data) {
    const container = document.querySelector('[data-bio-paragraphs]');
    if (!container || !data.bio?.paragraphs) return;
    container.innerHTML = data.bio.paragraphs
        .map((p) => `<p class="about-text mb-4">${escapeHtml(p)}</p>`)
        .join('');
}

function renderSocialLinks(data) {
    document.querySelectorAll('[data-social-links]').forEach((container) => {
        if (!data.social) return;
        container.innerHTML = data.social
            .map((s, i) => {
                const spacing = i < data.social.length - 1 ? 'me-3' : '';
                return `<a href="${escapeHtml(s.url)}" class="social-link ${spacing}" `
                    + `aria-label="${escapeHtml(s.name)}" target="_blank" rel="noopener noreferrer">`
                    + `<i class="${escapeHtml(s.icon)}"></i></a>`;
            })
            .join('');
    });
}

function renderSkills(data) {
    const grid = document.getElementById('skills-grid');
    if (!grid || !data.skills) return;

    grid.innerHTML = data.skills
        .map((category) => {
            const items = category.items
                .map((item) => {
                    if (item.soft) {
                        return `
                <div class="skill-item">
                    <div class="skill-header">
                        <span>${escapeHtml(item.name)}</span>
                    </div>
                    <div class="soft-skill-bar">
                        <div class="soft-skill-fill" style="width: ${item.level}%"></div>
                    </div>
                </div>`;
                    }
                    return `
                <div class="skill-item">
                    <div class="skill-header">
                        <span>${escapeHtml(item.name)}</span>
                        <span class="skill-percent">${item.level}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${item.level}%"></div>
                    </div>
                </div>`;
                })
                .join('');

            return `
            <div class="skill-category">
                <h4 class="skill-category-title"><i class="${escapeHtml(category.icon)} ${escapeHtml(category.color)} me-2"></i>${escapeHtml(category.title)}</h4>
                ${items}
            </div>`;
        })
        .join('');
}

function renderEducation(data) {
    const timeline = document.getElementById('education-timeline');
    if (!timeline || !data.education) return;

    timeline.innerHTML = data.education
        .map((edu) => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-date">${escapeHtml(edu.date)}</span>
                    <h4 class="timeline-title">${escapeHtml(edu.title)}</h4>
                    <p class="timeline-institution">${escapeHtml(edu.institution)}</p>
                </div>
            </div>`)
        .join('');
    // Titles render with the exact casing from data/profile.js (so "MSc"/"BSc"
    // stay correct) — no auto-capitalization is applied.
}
