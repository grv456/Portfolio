const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    const activeTab = button.dataset.tab;

    document.querySelectorAll(".tab-button").forEach((tabButton) => {
      tabButton.classList.toggle("active", tabButton === button);
    });

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.toggle("hidden", panel.id !== `${activeTab}-panel`);
    });
  });
});

const animateCounters = () => {
  document.querySelectorAll("[data-count]").forEach((counter) => {
    const target = Number(counter.dataset.count);
    let current = 0;
    const suffix = target === 60 ? "%" : "+";
    const step = Math.max(1, Math.round(target / 42));

    const tick = () => {
      current = Math.min(target, current + step);
      counter.textContent = `${current}${suffix}`;
      if (current < target) requestAnimationFrame(tick);
    };

    tick();
  });
};

const terminalMessages = [
  "Correlating IOC signals across SIEM sources...",
  "Enriching phishing cases with Python automation...",
  "Shipping Kibana dashboards for real-time visibility...",
  "Reducing response time with automated triage...",
];

const terminalLine = document.querySelector("#terminal-line");
let terminalIndex = 0;

if (terminalLine) {
  setInterval(() => {
    terminalIndex = (terminalIndex + 1) % terminalMessages.length;
    terminalLine.textContent = terminalMessages[terminalIndex];
  }, 2200);
}

const observer = new IntersectionObserver(
  (entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      animateCounters();
      observer.disconnect();
    }
  },
  { threshold: 0.35 },
);

const counter = document.querySelector("[data-count]");
if (counter) observer.observe(counter);
