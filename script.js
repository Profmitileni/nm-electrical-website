// NM Electrical and Services interactions
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("customer-name").value.trim();
      const phone = document.getElementById("customer-phone").value.trim();
      const service = document.getElementById("service-type").value;
      const location = document.getElementById("job-location").value.trim();
      const details = document.getElementById("job-details").value.trim();

      if (!name || !phone || !service || !details) {
        alert("Please complete your name, phone number, service and project description.");
        return;
      }

      const message = [
        "Hello NM Electrical and Services, I would like to request a quote.",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Service: ${service}`,
        `Location: ${location || "Not provided"}`,
        `Project details: ${details}`
      ].join("\n");

      // Opens WhatsApp with the enquiry prefilled; it does not send automatically.
      const url = "https://wa.me/27715130004?text=" + encodeURIComponent(message);
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
});
