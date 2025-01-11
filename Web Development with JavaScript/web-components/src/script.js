class MyCounter extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const container = document.createElement('div');
        const countSpan = document.createElement('span');
        const incrementButton = document.createElement('button');
        const decrementButton = document.createElement('button');
        this.count = 0;
        countSpan.id = 'count';
        countSpan.textContent = this.count;
        incrementButton.id = 'increment';
        incrementButton.textContent = '+';
        decrementButton.id = 'decrement';
        decrementButton.textContent = '-';
        incrementButton.addEventListener('click', () => this.increment(countSpan));
        decrementButton.addEventListener('click', () => this.decrement(countSpan));
        container.appendChild(countSpan);
        container.appendChild(incrementButton);
        container.appendChild(decrementButton);
        shadow.appendChild(container);
    }
    increment(countSpan) {
        this.count += 1;
        countSpan.textContent = this.count;
    }
    decrement(countSpan) {
        if (this.count > 0) {
            this.count -= 1;
            countSpan.textContent = this.count;
        }
    }
}
customElements.define('my-counter', MyCounter);


class DrawSquare extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const square = document.createElement('div');
        square.style.width = '100px';
        square.style.height = '100px';
        square.style.backgroundColor = 'red';
        shadow.appendChild(square);
    }
}
customElements.define('draw-square', DrawSquare);


class UserCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const card = document.createElement('div');
        const firstNameSlot = document.createElement('slot');
        firstNameSlot.name = 'firstname';
        const lastNameSlot = document.createElement('slot');
        lastNameSlot.name = 'lastname';
        card.appendChild(firstNameSlot);
        card.appendChild(lastNameSlot);
        shadow.appendChild(card);
    }
}
customElements.define('user-card', UserCard);