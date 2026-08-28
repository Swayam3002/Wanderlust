let pattern = /^[A-Za-z][A-Za-z0-9_]{2,29}$/;

const usernameInput = document.querySelector("#username");
const form = document.querySelector("form");

usernameInput.addEventListener("input", () => {
     let username = usernameInput.value;

    let isValid = pattern.test(username);

    if (isValid) {
        usernameInput.classList.add("is-valid");
        usernameInput.classList.remove("is-invalid");
    } else {
        usernameInput.classList.add("is-invalid");
        usernameInput.classList.remove("is-valid");
    }
});

form.addEventListener("submit", (event) => {
    let username = usernameInput.value;
    let isValid = pattern.test(username);

    if (!isValid) {
        event.preventDefault();

        usernameInput.classList.add("is-invalid");
        usernameInput.classList.remove("is-valid");
    } else {
        usernameInput.classList.add("is-valid");
        usernameInput.classList.remove("is-invalid");
    }
});

