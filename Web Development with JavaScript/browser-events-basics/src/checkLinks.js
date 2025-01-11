export function checkLinks() {
    let checkLinksElement = document.querySelector(".check-links");
    checkLinksElement.addEventListener("click", confirmLink);
}

function confirmLink(event) {
    let clickedLink = event.target;
    if (clickedLink.tagName === "A") {
        let linkHref = clickedLink.getAttribute("href");
        if (linkHref.startsWith("http")) {
            const userChoice = confirm("Do you want to proceed and leave our cool website?");
            if (!userChoice) {
                event.preventDefault();
            }
        }
    }
}
