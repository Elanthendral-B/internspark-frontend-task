const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});


const navigationLinks = document.querySelectorAll(
    ".nav-links a"
);

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.textContent = "☰";
    });
});


const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();


const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formMessage.textContent =
            "Please fill in all the fields.";

        formMessage.style.color = "#fca5a5";

        return;
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        formMessage.textContent =
            "Please enter a valid email address.";

        formMessage.style.color = "#fca5a5";

        return;
    }

    formMessage.textContent =
        `Thank you, ${name}! Your message has been submitted.`;

    formMessage.style.color = "#86efac";

    contactForm.reset();
});