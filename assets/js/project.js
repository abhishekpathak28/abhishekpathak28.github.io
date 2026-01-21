const projects = [
  {
    title: "Car Dash 3D (2024)",
    video: "https://www.youtube.com/embed/E3h5uP7CM5A",
    tags: ["Unity", "Gameplay", "Addressables", "Optimization"],
    desc: "Hyper-casual driving game for Android. Built gameplay systems, save/load architecture and optimized for low-end devices.",
    bullets: [
      "Core vehicle gameplay & progression",
      "Save & Load persistent systems",
      "Dynamic level loading using Addressables",
      "Mobile performance optimization"
    ]
  },
  {
    title: "HyperRally 3D (2024)",
    video: "https://www.youtube.com/embed/VOLKJJvfAbg",
    tags: ["Unity", "Racing", "Cinemachine", "Camera"],
    desc: "Arcade racing game with collectible-based scoring and smooth camera transitions.",
    bullets: [
      "Racing mechanics & level flow",
      "Cinemachine camera system",
      "Score & collectibles logic",
      "Multi-character setup"
    ]
  },
  {
    title: "Ludo Rally (2024)",
    video: "https://youtu.be/nrebb6pxPrk?si=dYgYM9ix8jtSChAL",
    tags: ["Unity", "AI Bots", "Turn System", "UI"],
    desc: "Turn-based Ludo game with offline AI and multiple game modes.",
    bullets: [
      "Complete Ludo game logic",
      "Offline AI bot system",
      "Turn state machine",
      "DOTween UI animations"
    ]
  },
  {
    title: "Zombie Killer (2025 | UE5)",
    video: "https://youtu.be/-YlmnPh-6rE?si=Ivd1yFYswXHWZ82i",
    tags: ["Unreal Engine 5", "FPS", "AI", "Spawning"],
    desc: "First-person zombie shooter with wave-based spawning and progressive difficulty.",
    bullets: [
      "Wave based enemy spawner",
      "Zombie AI behavior",
      "Weapon & damage systems",
      "Blueprint based gameplay flow"
    ]
  }
];

let currentIndex = 0;
let isTransitioning = false;

const video = document.getElementById("projectVideo");
const title = document.getElementById("projectTitle");
const desc = document.getElementById("projectDesc");
const tagsDiv = document.getElementById("projectTags");
const bulletList = document.getElementById("projectBullets");
const thumbs = document.querySelectorAll(".project-strip img");

function renderProject(index) {
  if (isTransitioning) return;
  isTransitioning = true;

  const p = projects[index];

  video.style.opacity = 0;
  title.style.opacity = 0;
  desc.style.opacity = 0;

  
  setTimeout(() => {
      const shimmer = document.querySelector(".video-shimmer");
      shimmer.style.opacity = 1;

      video.src = p.video;
      title.textContent = p.title;
      desc.textContent = p.desc;
      
      video.classList.add("fade-scale-enter");
      requestAnimationFrame(() => video.classList.add("fade-scale-active"));
    
      title.classList.add("slide-down-enter");
    requestAnimationFrame(() => title.classList.add("slide-down-active"));
    
    tagsDiv.innerHTML = "";
    p.tags.forEach(tag => {
      const span = document.createElement("span");
      span.textContent = tag;
      tagsDiv.appendChild(span);
    });

    bulletList.innerHTML = "";
    p.bullets.forEach(bullet => {
      const li = document.createElement("li");
      li.textContent = bullet;
      bulletList.appendChild(li);
    });

    highlightThumb(index);

    video.style.opacity = 1;
    title.style.opacity = 1;
    desc.style.opacity = 1;
    shimmer.style.opacity=0;

      const videoContainer = document.querySelector(".viewer-video");
      videoContainer.classList.remove("active-glow");
      void videoContainer.offsetWidth; // reflow
      videoContainer.classList.add("active-glow");

    currentIndex = index;
    isTransitioning = false;
  }, 250);
}

function highlightThumb(index) {
  thumbs.forEach((thumb, i) => {
    thumb.style.opacity = i === index ? "1" : "0.6";
    thumb.style.borderColor = i === index ? "#00fff0" : "transparent";
  });

  const underline = document.querySelector(".thumb-underline");
  const activeThumb = thumbs[index];

  const stripRect = document.querySelector(".project-strip").getBoundingClientRect();
  const thumbRect = activeThumb.getBoundingClientRect();

  const x = thumbRect.left - stripRect.left;

  underline.style.transform = `translateX(${x}px)`;
}








function nextProject() {
  const next = (currentIndex + 1) % projects.length;
  renderProject(next);
}

function prevProject() {
  const prev = (currentIndex - 1 + projects.length) % projects.length;
  renderProject(prev);
}

thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => renderProject(index));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextProject();
  if (e.key === "ArrowLeft") prevProject();
});

/* Section reveal animation */
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});
sections.forEach(section => observer.observe(section));

/* Initial state */
renderProject(0);

/* ===== Subtle Parallax ===== */
const bg = document.querySelector(".parallax-bg");

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  bg.style.transform = `translate(${x}px, ${y}px)`;
});

