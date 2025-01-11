export function createTip(tipText) {
    const section = document.createElement('section');
    section.classList.add('tip');
    const title = document.createElement('h3');
    title.classList.add('tip__title');
    title.textContent = '💡 Tip of the day:';
    section.appendChild(title);
    const text = document.createElement('p');
    text.classList.add('tip__text');
    text.textContent = tipText;
    section.appendChild(text);
    const check = document.createElement('p');
    check.classList.add('tip__check', 'hidden');
    check.textContent = '✅Got it!';
    section.appendChild(check);
    section.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            check.classList.toggle('hidden');
        } else if (event.key === 'Escape') {
            if (confirm('Are you sure you want remove this tip?')) {
                section.remove();
            }
        }
    });
    return section;
}