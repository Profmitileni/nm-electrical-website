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
  // Independent four-image project slideshows.
  document.querySelectorAll('[data-slideshow]').forEach((slideshow) => {
    const images = Array.from(slideshow.querySelectorAll('.slide-image'));
    const dots = Array.from(slideshow.querySelectorAll('.slide-dot'));
    const previous = slideshow.querySelector('.slide-prev');
    const next = slideshow.querySelector('.slide-next');
    if (images.length !== 4 || dots.length !== 4) return;
    let current = 0;
    let timer;
    const show = (index) => {
      current = (index + images.length) % images.length;
      images.forEach((image, i) => image.classList.toggle('is-active', i === current));
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
        if (i === current) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    };
    const stop = () => window.clearInterval(timer);
    const start = () => {
      stop();
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        timer = window.setInterval(() => show(current + 1), 4000);
      }
    };
    previous.addEventListener('click', () => { show(current - 1); start(); });
    next.addEventListener('click', () => { show(current + 1); start(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));
    slideshow.addEventListener('mouseenter', stop);
    slideshow.addEventListener('mouseleave', start);
    slideshow.addEventListener('focusin', stop);
    slideshow.addEventListener('focusout', start);
    show(0);
    start();
  });

});
