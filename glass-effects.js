// Enhanced spotlight effect for glass morphism
document.addEventListener("mousemove", (e) => {
  // Update spotlight position with enhanced glow effect
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  // Create a more pronounced spotlight effect for glass morphism
  spotlight.style.setProperty("--x", `${x}%`);
  spotlight.style.setProperty("--y", `${y}%`);

  // Add additional sparkle effect on mouse movement
  addSparkle(e.clientX, e.clientY);

  // Update cursor position with smoother animation
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Function to create sparkle effects
function addSparkle(x, y) {
  // Only add sparkles occasionally
  if (Math.random() > 0.97) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";

    // Random position near the cursor
    const offsetX = Math.random() * 40 - 20;
    const offsetY = Math.random() * 40 - 20;

    sparkle.style.left = `${x + offsetX}px`;
    sparkle.style.top = `${y + offsetY}px`;

    // Random size
    const size = Math.random() * 5 + 3;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    // Add to document
    document.body.appendChild(sparkle);

    // Remove after animation completes
    setTimeout(() => {
      document.body.removeChild(sparkle);
    }, 1000);
  }
}

// Enhanced hover effect for glass cards
const glassCards = document.querySelectorAll(".project-card, .blog-card");

glassCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    // Calculate position of mouse relative to card
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentage position
    const percentX = x / rect.width;
    const percentY = y / rect.height;

    // Calculate rotation (subtle tilt effect)
    const tiltAmount = 5; // adjust for more/less tilt
    const rotateX = (0.5 - percentY) * tiltAmount;
    const rotateY = (percentX - 0.5) * tiltAmount;

    // Apply the transform
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-5px)
    `;

    // Add highlight effect based on cursor position
    card.style.background = `
      linear-gradient(
        135deg,
        rgba(255,255,255,${0.1 + percentY * 0.05}) 0%,
        rgba(255,255,255,${0.1 + percentX * 0.05}) 100%
      )
    `;
  });

  // Reset card on mouse leave
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.background = "";
  });
});

// Add CSS for sparkle animation
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  .sparkle {
    position: fixed;
    pointer-events: none;
    background: white;
    border-radius: 50%;
    z-index: 9999;
    opacity: 0;
    animation: sparkleAnimation 1s ease-in-out forwards;
  }
  
  @keyframes sparkleAnimation {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
  
  /* Enhanced cursor for glass morphism */
  .cursor {
    transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease,
      transform 0.1s ease, opacity 0.3s ease;
  }
  
  .cursor.clickable {
    width: 35px;
    height: 35px;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
`;

document.head.appendChild(styleSheet);

// Update theme toggle to include glass morphism changes
globalThemeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  // Update theme toggle icon
  const isLightTheme = document.body.classList.contains("light-theme");

  if (isLightTheme) {
    globalThemeToggle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;

    // Add light theme specific glass effects
    document.documentElement.style.setProperty(
      "--glass-bg",
      "rgba(240, 240, 245, 0.7)"
    );
    document.documentElement.style.setProperty(
      "--glass-border",
      "rgba(255, 255, 255, 0.3)"
    );
  } else {
    globalThemeToggle.innerHTML = `
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

    // Add dark theme specific glass effects
    document.documentElement.style.setProperty(
      "--glass-bg",
      "rgba(15, 15, 20, 0.7)"
    );
    document.documentElement.style.setProperty(
      "--glass-border",
      "rgba(255, 255, 255, 0.2)"
    );
  }

  // Save theme preference
  localStorage.setItem("theme", isLightTheme ? "light" : "dark");
});

// Initialize glass morphism effects on page load
window.addEventListener("DOMContentLoaded", () => {
  // Set initial glass properties based on theme
  const isLightTheme = document.body.classList.contains("light-theme");
  if (isLightTheme) {
    document.documentElement.style.setProperty(
      "--glass-bg",
      "rgba(240, 240, 245, 0.7)"
    );
    document.documentElement.style.setProperty(
      "--glass-border",
      "rgba(255, 255, 255, 0.3)"
    );
  } else {
    document.documentElement.style.setProperty(
      "--glass-bg",
      "rgba(15, 15, 20, 0.7)"
    );
    document.documentElement.style.setProperty(
      "--glass-border",
      "rgba(255, 255, 255, 0.2)"
    );
  }

  // Start with a little animation on page load
  setTimeout(() => {
    document
      .querySelectorAll(".project-card, .blog-card, .experience-item")
      .forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity = "0";
          el.style.transform = "translateY(20px)";

          setTimeout(() => {
            el.style.transition = "all 0.5s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, 100);
        }, i * 100);
      });
  }, 300);
});
