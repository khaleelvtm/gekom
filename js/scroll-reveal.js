(function () {
    var targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
        targets.forEach(function (el) {
            el.classList.add("is-visible");
        });
        return;
    }

    document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
        group.querySelectorAll(".reveal").forEach(function (el, i) {
            el.style.setProperty("--reveal-i", Math.min(i, 6));
        });
    });

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -80px" }
    );

    targets.forEach(function (el) {
        observer.observe(el);
    });
})();
