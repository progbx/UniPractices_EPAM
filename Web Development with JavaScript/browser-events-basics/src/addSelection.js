export function addSelection() {
    const addSelectionContainer = document.querySelector('.add-selection');

    addSelectionContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('selectable-item')) {
            const isCtrlPressed = event.ctrlKey || event.metaKey;

            if (!isCtrlPressed) {
                deselectAllItems();
            }

            toggleSelection(event.target);
        }
    });

    function deselectAllItems() {
        const selectableItems = document.querySelectorAll('.selectable-item');
        selectableItems.forEach(item => {
            item.classList.remove('selected');
        });
    }

    function toggleSelection(item) {
        item.classList.toggle('selected');
    }
}
