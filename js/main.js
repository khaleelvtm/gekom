const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        nav.classList.toggle("is-open", !isOpen);
    });
}

document.querySelectorAll("[data-slider]").forEach((slider) => {
    const track = slider.querySelector("[data-slider-track]");
    const prev = slider.querySelector("[data-slider-prev]");
    const next = slider.querySelector("[data-slider-next]");

    if (!track) return;

    const stepSize = () => {
        const item = track.firstElementChild;
        if (!item) return track.clientWidth;

        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return item.getBoundingClientRect().width + gap;
    };

    next?.addEventListener("click", () => {
        const maxScroll = track.scrollWidth - track.clientWidth;

        if (track.scrollLeft >= maxScroll - 1) {
            track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            track.scrollBy({ left: stepSize(), behavior: "smooth" });
        }
    });

    prev?.addEventListener("click", () => {
        if (track.scrollLeft <= 0) {
            track.scrollTo({ left: track.scrollWidth - track.clientWidth, behavior: "smooth" });
        } else {
            track.scrollBy({ left: -stepSize(), behavior: "smooth" });
        }
    });
});
