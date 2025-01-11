describe("Web components", () => {
    let myCounter;
    let square;
    let userCard;

    describe("MyCounter", () => {
        beforeEach(() => {
            myCounter = document.createElement("my-counter");
            document.body.appendChild(myCounter);
        });

        it("should display initial count of 0", () => {
            const countSpan = myCounter.shadowRoot.querySelector("#count");
            expect(countSpan.textContent).toBe("0");
        });

        it("should increment count when '+' button is clicked", () => {
            const incrementButton = myCounter.shadowRoot.querySelector("#increment");
            const countSpan = myCounter.shadowRoot.querySelector("#count");

            incrementButton.click();
            expect(countSpan.textContent).toBe("1");

            incrementButton.click();
            expect(countSpan.textContent).toBe("2");
        });

        it("should display current count number when decrement and increment buttons clicked", () => {
            const decrementButton = myCounter.shadowRoot.querySelector("#decrement");
            const incrementButton = myCounter.shadowRoot.querySelector("#increment");
            const countSpan = myCounter.shadowRoot.querySelector("#count");
            expect(countSpan.textContent).toBe("0");
            decrementButton.click();
            expect(countSpan.textContent).toBe("0");
            incrementButton.click();
            expect(countSpan.textContent).toBe("1");
            incrementButton.click();
            expect(countSpan.textContent).toBe("2");
            incrementButton.click();
            expect(countSpan.textContent).toBe("3");
            decrementButton.click();
            expect(countSpan.textContent).toBe("2");
        });

        it("should not decrement below zero", () => {
            const decrementButton = myCounter.shadowRoot.querySelector("#decrement");
            decrementButton.click();
            decrementButton.click();
            decrementButton.click();
            const countSpan = myCounter.shadowRoot.querySelector("#count");
            expect(countSpan.textContent).toBe("0");
        });
    })

    describe("DrawSquare", () => {
        beforeEach(() => {
            square = document.createElement("draw-square");
            document.body.appendChild(square);
        });

        it("should have a shadow root", () => {
            expect(square.shadowRoot).toBeDefined();
        });

        it("should contain a div element", () => {
            const div = square.shadowRoot.querySelector("div");

            expect(div).toBeDefined();
        });

        it("should have width of square equal to 100px", () => {
            const div = square.shadowRoot.querySelector("div");

            expect(div.style.width).toBe("100px");
        });

        it("should have height of square equal to 100px", () => {
            const div = square.shadowRoot.querySelector("div");

            expect(div.style.height).toBe("100px");
        });
    });

    describe("UserCard", () => {
        beforeEach(() => {
            userCard = document.createElement("user-card");
            const span1 = document.createElement("span");
            const span2 = document.createElement("span");
            span1.textContent += 'mock-name';
            span2.textContent += 'mock-lastname';
            span1.setAttribute("slot", "firstname");
            span2.setAttribute("slot", "lastname");
            userCard = document.createElement("user-card");
            userCard.appendChild(span1);
            userCard.appendChild(span2);

            document.body.appendChild(userCard);
        });

        it("should have a shadow root", () => {
            expect(userCard.shadowRoot).toBeDefined();
        });

        it("should contain a section element", () => {
            const section = userCard.shadowRoot.querySelector("section");
            expect(section).toBeDefined();
        });

        it("should contain slot with attribute name and value firstname", () => {
            expect(userCard.shadowRoot.innerHTML).toContain('slot');
            expect(userCard.shadowRoot.innerHTML).toContain('name="firstname"');
        });

        it("should contain slot with attribute name and value lastname", () => {
            expect(userCard.shadowRoot.innerHTML).toContain('slot');
            expect(userCard.shadowRoot.innerHTML).toContain('name="lastname"');
        });
    });
});
