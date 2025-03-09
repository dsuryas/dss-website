// DOM Elements
const themeToggle = document.getElementById("theme-toggle");
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");
const spotlight = document.getElementById("spotlight");
const resumeBtn = document.getElementById("resume-btn");
const callBtn = document.getElementById("call-btn");

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  // Update theme toggle icon
  const isLightTheme = document.body.classList.contains("light-theme");

  if (isLightTheme) {
    themeToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;
  } else {
    themeToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        `;
  }

  // Save theme preference
  localStorage.setItem("theme", isLightTheme ? "light" : "dark");
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
    `;
}

// Tab Switching
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all tabs
    tabButtons.forEach((tab) => tab.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked tab
    button.classList.add("active");

    // Show corresponding content
    const tabId = button.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("active");
  });
});

// Spotlight/Torch Effect and Custom Cursor
const cursor = document.getElementById("cursor");
const clickableElements = document.querySelectorAll(
  "a, button, .tab-button, .project-card, .blog-card"
);

document.addEventListener("mousemove", (e) => {
  // Update spotlight position
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  spotlight.style.setProperty("--x", `${x}%`);
  spotlight.style.setProperty("--y", `${y}%`);

  // Update cursor position
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Make cursor glow when hovering over clickable elements
clickableElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("clickable");
  });

  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("clickable");
  });
});

// Make sure cursor is visible when mouse enters document
document.addEventListener("mouseenter", () => {
  cursor.style.opacity = "1";
});

// Hide cursor when mouse leaves document
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
});

// Resume Download
resumeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Resume downloading...");
  // In a real implementation, you would link to an actual resume file
  // or trigger a download through an API
});

// Schedule a Call
callBtn.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Redirecting to scheduling page...");
  // In a real implementation, you would redirect to a calendar scheduling tool
  // like Calendly, Cal.com, etc.
});
