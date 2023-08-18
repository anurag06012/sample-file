const viewer = document.querySelector('.viewer');
const zoomableImage = document.getElementById('zoomable-image');

let scale = 1;
let isDragging = false;
let startX, startY, translateX, translateY;

viewer.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // Ignore other mouse buttons
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    translateX = parseFloat(getComputedStyle(zoomableImage).getPropertyValue('--translate-x')) || 0;
    translateY = parseFloat(getComputedStyle(zoomableImage).getPropertyValue('--translate-y')) || 0;
    viewer.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    zoomableImage.style.setProperty('--translate-x', `${deltaX + translateX}px`);
    zoomableImage.style.setProperty('--translate-y', `${deltaY + translateY}px`);
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    viewer.style.cursor = 'grab';
});

viewer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const deltaY = e.deltaY;
    if (e.ctrlKey || e.metaKey) {
        // Zoom with Ctrl key or Command key (for Mac)
        const scaleDelta = deltaY > 0 ? 0.9 : 1.1;
        scale *= scaleDelta;
        scale = Math.min(Math.max(1, scale), 3); // Limit zoom scale
        zoomableImage.style.setProperty('--scale', scale);
    } else {
        // Scroll when Ctrl key or Command key is not pressed
        viewer.scrollLeft += deltaY;
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        viewer.scrollTop -= 10; // Scroll up
    } else if (e.key === 'ArrowDown') {
        viewer.scrollTop += 10; // Scroll down
    } else if (e.key === 'ArrowLeft') {
        viewer.scrollLeft -= 10; // Scroll left
    } else if (e.key === 'ArrowRight') {
        viewer.scrollLeft += 10; // Scroll right
    } else if (e.key === 'a') {
        scale *= 1.1; // Zoom in
        zoomableImage.style.transform = `scale(${scale})`;
    } else if (e.key === 'b') {
        scale *= 0.9; // Zoom out
        zoomableImage.style.transform = `scale(${scale})`;
    }
});
