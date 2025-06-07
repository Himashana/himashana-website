export function capitalizeText(selector) {
    document.querySelectorAll(selector).forEach((el) => {
        el.textContent = el.textContent
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    });
}