// Always (re)load at the top: disable browser scroll-restoration, and clear any
// lingering #hash (from tapping a nav link) so reload doesn't jump to a section.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
function forceScrollTop() {
  if (location.hash) {
    history.replaceState(null, "", location.pathname + location.search);
  }
  window.scrollTo(0, 0);
}
window.addEventListener("pageshow", forceScrollTop);
window.addEventListener("load", () => {
  forceScrollTop();
  requestAnimationFrame(forceScrollTop);
  window.setTimeout(forceScrollTop, 80);
});

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const wellnessSteps = [
  {
    title: "Everything, in one place",
    body:
      "See your whole wellness picture at a glance—cycle, sleep, nutrition, biomarkers, fitness, and skin, working together as one system.",
  },
  {
    title: "Built around your cycle",
    body:
      "Understand your cycle, mood, and energy through every phase. Receive personalized guidance on nutrition, movement, recovery, and daily care.",
  },
  {
    title: "Cycle & mood, in rhythm",
    body:
      "Track your phases and mood together, and see how your natural rhythm shapes each day.",
  },
  {
    title: "Personalized Nutrition",
    body:
      "Nourish your body with personalized meal recommendations that adapt to your cycle, movement, and everyday lifestyle.",
  },
  {
    title: "Personalized Fitness",
    body:
      "Move with your body, not against it. Get weekly workout recommendations based on your cycle, energy, goals, and recovery.",
  },
  {
    title: "Your Biomarkers Over Time",
    body:
      "Understand long-term changes, identify trends, and make more informed wellness decisions.",
  },
  {
    title: "Skincare Intelligence",
    body:
      "Know exactly what to use and when. Ritalu creates personalized morning and evening routines using the skincare products you already own.",
  },
  {
    title: "Ask Ritalu anything",
    body:
      "Talk to your wellness companion in plain language. Ritalu answers using your full context—cycle, labs, sleep, nutrition, and more.",
  },
];

const wellnessStory = document.querySelector(".wellness-story");
const wellnessNavItems = document.querySelectorAll(".wellness-module__nav li");
const wellnessBgLayers = document.querySelectorAll(".wm-layer");
const wellnessCopy = document.querySelector(".wellness-module__copy");
const wellnessTitle = wellnessCopy?.querySelector("h2");
const wellnessBody = wellnessCopy?.querySelector("p");
const wellnessAppEls = document.querySelectorAll(".wellness-module .app");
const wellnessImg = document.querySelector(".phone-device__img");
// Optional real-screenshot per category (index matches nav order). null = use HTML mock.
const wellnessScreens = [
  "assets/cycle-intelligence-screen-4.webp?v=final3", // Home (dashboard)
  "assets/biomarker-tracking-screen-3.webp?v=final3", // Cycle Guidance (moon + guidance)
  "assets/nutrition-screen-v4.webp?v=final3",         // Cycle & Mood (calendar + mood)
  "assets/fitness-screen.webp?v=final4",              // Nutrition (meal plan)
  "assets/sleep-recovery-screen-2.webp?v=final4",     // Fitness (workout plan)
  "assets/skin-health-screen.webp?v=final3",          // Biomarkers
  "assets/skincare-screen.webp?v=final3",             // Skincare
  "assets/ask-ritalu-screen.webp?v=final4",           // Ask Ritalu
];
function applyWellnessScreen(index) {
  if (!wellnessImg) return;
  const src = wellnessScreens[index];
  if (src) {
    wellnessImg.src = src;
    wellnessImg.style.display = "block";
    wellnessAppEls.forEach((a) => (a.style.display = "none"));
  } else {
    wellnessImg.style.display = "none";
    wellnessAppEls.forEach((a) => (a.style.display = ""));
  }
}
let activeWellnessStep = 0;

const wellnessApp = [
  {
    title: "Cycle Intelligence", tag: "Ovulatory", metric: "Day 14",
    sub: "Fertile window · high energy",
    spark: "M2 24 C24 22 34 8 54 12 S92 28 112 10 148 16",
    chips: [["Energy", "High"], ["Mood", "Calm"], ["Temp", "36.7°"]],
    focus: ["Schedule key workouts", "Hydrate +500ml"],
  },
  {
    title: "Biomarker Tracking", tag: "Optimal", metric: "Vitamin D 42",
    sub: "ng/mL · within optimal range",
    spark: "M2 20 C24 24 40 30 60 18 S96 6 118 18 148 12",
    chips: [["Ferritin", "58"], ["CRP", "0.6"], ["HbA1c", "5.2"]],
    focus: ["Lab retest in 21 days", "Iron-rich meals"],
  },
  {
    title: "Nutrition", tag: "On track", metric: "Protein 86g",
    sub: "of 110g goal · steady glucose",
    spark: "M2 26 C20 18 36 22 56 14 S92 22 112 12 148 8",
    chips: [["Fiber", "24g"], ["Glucose", "92"], ["Omega-3", "Good"]],
    focus: ["Add leafy greens", "Protein at breakfast"],
  },
  {
    title: "Sleep & Recovery", tag: "Recovered", metric: "7h 52m",
    sub: "Readiness 88 · deep sleep strong",
    spark: "M2 14 C22 18 38 10 58 16 S96 26 116 14 148 20",
    chips: [["HRV", "64"], ["Resting HR", "52"], ["Deep", "1h40"]],
    focus: ["Wind down by 22:30", "Magnesium PM"],
  },
  {
    title: "Fitness", tag: "Window open", metric: "Readiness 88",
    sub: "Great day for strength work",
    spark: "M2 28 C22 20 40 24 60 10 S96 18 116 8 148 12",
    chips: [["VO₂", "47"], ["Steps", "8.2k"], ["Strain", "6.4"]],
    focus: ["Strength: lower body", "Mobility 10 min"],
  },
  {
    title: "Skin Health", tag: "Clear phase", metric: "Skin score 91",
    sub: "Hydration up · low inflammation",
    spark: "M2 18 C24 14 38 20 58 12 S94 18 116 10 148 14",
    chips: [["Hydration", "↑"], ["Inflam.", "Low"], ["Breakout", "Low"]],
    focus: ["Barrier cream PM", "SPF reapply midday"],
  },
  {
    title: "Skincare", tag: "AM + PM", metric: "Routine ready",
    sub: "Personalized to your skin today",
    spark: "M2 18 C24 14 38 20 58 12 S94 18 116 10 148 14",
    chips: [["AM", "3 steps"], ["PM", "4 steps"], ["SPF", "Due"]],
    focus: ["Vitamin C in the AM", "Retinoid in the PM"],
  },
  {
    title: "Ask Ritalu", tag: "AI companion", metric: "Ask anything",
    sub: "Answers from your full context",
    spark: "M2 20 C24 16 38 22 58 14 S94 20 116 12 148 16",
    chips: [["Cycle", "linked"], ["Labs", "linked"], ["Sleep", "linked"]],
    focus: ["“How should I train today?”", "“Why is my energy low?”"],
  },
];

function paintWellnessApp(c) {
  wellnessAppEls.forEach((app) => {
    const set = (key, value) =>
      app
        .querySelectorAll(`[data-app="${key}"]`)
        .forEach((el) => (el.textContent = value));
    set("title", c.title);
    set("tag", c.tag);
    set("metric", c.metric);
    set("sub", c.sub);
    app
      .querySelectorAll('[data-app="spark"]')
      .forEach((s) => s.setAttribute("d", c.spark));
    c.chips.forEach((chip, ci) => {
      set(`c${ci}k`, chip[0]);
      set(`c${ci}v`, chip[1]);
    });
    app
      .querySelectorAll('[data-app="focus"]')
      .forEach((ul) => (ul.innerHTML = c.focus.map((f) => `<li>${f}</li>`).join("")));
  });
}

function setWellnessStep(index) {
  if (!wellnessCopy || !wellnessTitle || !wellnessBody || index === activeWellnessStep) return;

  activeWellnessStep = index;
  wellnessNavItems.forEach((item, itemIndex) => {
    item.classList.toggle("is-active", itemIndex === index);
  });
  wellnessBgLayers.forEach((layer, layerIndex) => {
    layer.classList.toggle("is-active", layerIndex === index);
  });

  // On mobile, keep the active category pill centered in the horizontal strip
  const navWrap = document.querySelector(".wellness-module__nav");
  const activeItem = wellnessNavItems[index];
  if (navWrap && activeItem && navWrap.scrollWidth > navWrap.clientWidth + 4) {
    navWrap.scrollTo({
      left: activeItem.offsetLeft - navWrap.clientWidth / 2 + activeItem.clientWidth / 2,
      behavior: "smooth",
    });
  }

  wellnessCopy.classList.add("is-changing");
  wellnessAppEls.forEach((a) => a.classList.add("is-changing"));
  window.setTimeout(() => {
    wellnessTitle.textContent = wellnessSteps[index].title;
    wellnessBody.textContent = wellnessSteps[index].body;
    if (wellnessApp[index]) paintWellnessApp(wellnessApp[index]);
    applyWellnessScreen(index);
    wellnessCopy.classList.remove("is-changing");
    wellnessAppEls.forEach((a) => a.classList.remove("is-changing"));
  }, 140);
}

function updateWellnessStory() {
  if (!wellnessStory || window.matchMedia("(max-width: 640px)").matches) return;

  const rect = wellnessStory.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  if (scrollable <= 0) return;

  const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
  const index = Math.min(
    wellnessSteps.length - 1,
    Math.floor(progress * wellnessSteps.length)
  );
  setWellnessStep(index);
}

applyWellnessScreen(0);
window.addEventListener("scroll", updateWellnessStory, { passive: true });
window.addEventListener("resize", updateWellnessStory);
updateWellnessStory();

// Clickable nav — jump straight to a category (keeps scroll-driven state in sync)
wellnessNavItems.forEach((item, index) => {
  item.setAttribute("role", "button");
  item.setAttribute("tabindex", "0");
  const goToStep = () => {
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    if (wellnessStory && !isMobile) {
      const scrollable = wellnessStory.offsetHeight - window.innerHeight;
      if (scrollable > 0) {
        const sectionTop =
          wellnessStory.getBoundingClientRect().top + window.scrollY;
        const progress = (index + 0.5) / wellnessSteps.length;
        window.scrollTo({
          top: sectionTop + progress * scrollable,
          behavior: "smooth",
        });
        return;
      }
    }
    setWellnessStep(index);
  };
  item.addEventListener("click", goToStep);
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToStep();
    }
  });
});

const faqItems = Array.from(document.querySelectorAll(".faq__item"));

faqItems.forEach((item) => {
  const button = item.querySelector(".faq__q");
  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");
    faqItems.forEach((other) => {
      other.classList.remove("is-open");
      other.querySelector(".faq__q").setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const lifestyleTrack = document.querySelector(".lifestyle__track");
const lifestyleArrows = document.querySelectorAll(".lifestyle__arrow");

if (lifestyleTrack) {
  const stepSize = () => lifestyleTrack.clientWidth * 0.8;

  const updateArrows = () => {
    const max = lifestyleTrack.scrollWidth - lifestyleTrack.clientWidth - 1;
    lifestyleArrows.forEach((btn) => {
      const dir = Number(btn.dataset.dir);
      btn.disabled =
        dir < 0
          ? lifestyleTrack.scrollLeft <= 0
          : lifestyleTrack.scrollLeft >= max;
    });
  };

  lifestyleArrows.forEach((btn) => {
    btn.addEventListener("click", () => {
      lifestyleTrack.scrollBy({ left: Number(btn.dataset.dir) * stepSize() });
    });
  });

  lifestyleTrack.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  updateArrows();

  // Drag to scroll (pointer)
  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  lifestyleTrack.addEventListener("pointerdown", (e) => {
    isDown = true;
    moved = false;
    startX = e.clientX;
    startScroll = lifestyleTrack.scrollLeft;
  });

  lifestyleTrack.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    const delta = e.clientX - startX;
    if (Math.abs(delta) > 4) {
      moved = true;
      lifestyleTrack.classList.add("is-dragging");
      lifestyleTrack.setPointerCapture(e.pointerId);
    }
    if (moved) lifestyleTrack.scrollLeft = startScroll - delta;
  });

  const endDrag = () => {
    isDown = false;
    lifestyleTrack.classList.remove("is-dragging");
  };

  lifestyleTrack.addEventListener("pointerup", endDrag);
  lifestyleTrack.addEventListener("pointercancel", endDrag);
  lifestyleTrack.addEventListener("click", (e) => {
    if (moved) e.preventDefault();
  });
}

// Dashboard category switcher (click-based, reuses wellnessSteps)
const dashButtons = document.querySelectorAll(".dashboard__nav button");
const dashCopy = document.querySelector(".dashboard__copy");
const dashTitle = dashCopy?.querySelector("h3");
const dashBody = dashCopy?.querySelector("p");
let dashActive = 0;

dashButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const index = Number(btn.dataset.dash);
    if (index === dashActive || !dashCopy) return;
    dashActive = index;
    dashButtons.forEach((b) =>
      b.classList.toggle("is-active", Number(b.dataset.dash) === index)
    );
    dashCopy.classList.add("is-changing");
    window.setTimeout(() => {
      dashTitle.textContent = wellnessSteps[index].title;
      dashBody.textContent = wellnessSteps[index].body;
      dashCopy.classList.remove("is-changing");
    }, 140);
  });
});

// Apply-for-product questionnaire
const applyModal = document.getElementById("apply");

if (applyModal) {
  const form = document.getElementById("apply-form");
  const steps = Array.from(form.querySelectorAll(".apply__step"));
  const progress = applyModal.querySelector(".apply__progress i");
  const backBtn = form.querySelector("[data-apply-back]");
  const nextBtn = form.querySelector("[data-apply-next]");
  const lastIndex = steps.length - 1;
  const submitIndex = steps.length - 2;
  let current = 0;

  const showStep = (i) => {
    steps.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
    progress.style.width = ((i + 1) / steps.length) * 100 + "%";
    backBtn.hidden = i === 0 || i === lastIndex;
    nextBtn.textContent =
      i === submitIndex ? "Submit" : i === lastIndex ? "Done" : "Continue";
    const field = steps[i].querySelector("input, textarea");
    if (field) window.setTimeout(() => field.focus(), 60);
  };

  const openApply = () => {
    applyModal.hidden = false;
    document.body.style.overflow = "hidden";
    current = 0;
    showStep(0);
  };

  const closeApply = () => {
    applyModal.hidden = true;
    document.body.style.overflow = "";
  };

  const validateStep = (i) => {
    const required = steps[i].querySelectorAll("[required]");
    for (const field of required) {
      const value = field.value.trim();
      const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
      if (!value || (field.type === "email" && !emailOk)) {
        field.classList.add("is-invalid");
        field.focus();
        return false;
      }
      field.classList.remove("is-invalid");
    }
    return true;
  };

  document
    .querySelectorAll("[data-open-apply]")
    .forEach((b) => b.addEventListener("click", openApply));
  document
    .querySelectorAll("[data-close-apply]")
    .forEach((b) => b.addEventListener("click", closeApply));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !applyModal.hidden) closeApply();
  });

  nextBtn.addEventListener("click", () => {
    if (current === lastIndex) {
      closeApply();
      return;
    }
    if (!validateStep(current)) return;
    if (current === submitIndex) {
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        focus: Array.from(
          form.querySelectorAll("input[name='focus']:checked")
        ).map((c) => c.value),
        notes: form.notes.value.trim(),
        submittedAt: new Date().toISOString(),
      };
      try {
        const all = JSON.parse(
          localStorage.getItem("ritalu_applications") || "[]"
        );
        all.push(data);
        localStorage.setItem("ritalu_applications", JSON.stringify(all));
      } catch (err) {
        /* storage unavailable — proceed anyway */
      }
      console.log("Ritalu application:", data);
    }
    current += 1;
    showStep(current);
  });

  backBtn.addEventListener("click", () => {
    if (current > 0) {
      current -= 1;
      showStep(current);
    }
  });
}

// Nav: promo banner slides up under the row on scroll, then the row condenses
// into a frosted bar once the hero is behind it (superpower-style behavior).
(function () {
  const siteNav = document.querySelector("[data-nav]");
  if (!siteNav) return;
  const banner = siteNav.querySelector(".promo");
  const navRow = siteNav.querySelector(".nav");
  const hero = document.querySelector(".hero");
  let ticking = false;

  function update() {
    const y = window.scrollY;
    const bannerH = banner ? banner.offsetHeight : 0;
    // 1) Slide the whole component up by the banner height, tied 1:1 to scroll.
    const shift = Math.min(y, bannerH);
    siteNav.style.transform = "translateY(" + -shift + "px)";
    // 2) Condense + frost once scrolled past the hero.
    const navH = navRow ? navRow.offsetHeight : 0;
    const threshold = hero
      ? hero.offsetTop + hero.offsetHeight - navH
      : bannerH;
    siteNav.classList.toggle("is-scrolled", y > threshold);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", update, { passive: true });
  update();
})();

// Our Beliefs — switch between three statements with the arrows
(function () {
  const root = document.querySelector("[data-beliefs]");
  if (!root) return;
  const textEl = root.querySelector("[data-belief-text]");
  const numEl = document.querySelector("[data-belief-num]");
  const panelEl = document.querySelector(".beliefs__panel");
  const prevBtn = root.querySelector('[data-belief="prev"]');
  const nextBtn = root.querySelector('[data-belief="next"]');

  const beliefs = [
    {
      num: "I.",
      text:
        "We believe every body holds <em>its own wisdom</em>. Learning to listen changes the way we live.",
      bg: "assets/beliefs-texture.webp",
    },
    {
      num: "II.",
      text:
        "We believe the best guidance begins with <em>understanding yourself</em>.",
      bg: "assets/beliefs-portrait-3.webp",
    },
    {
      num: "III.",
      text:
        "We believe <em>small daily choices</em> shape long-term well-being.",
      bg: "assets/beliefs-bg-3.webp",
    },
  ];

  function setBeliefBg(index) {
    if (panelEl && beliefs[index].bg) {
      panelEl.style.setProperty("--belief-bg", `url("${beliefs[index].bg}")`);
    }
  }
  setBeliefBg(0);

  let i = 0;
  function show(n) {
    i = (n + beliefs.length) % beliefs.length;
    root.classList.add("is-changing");
    window.setTimeout(() => {
      textEl.innerHTML = beliefs[i].text;
      if (numEl) numEl.textContent = beliefs[i].num;
      setBeliefBg(i);
      root.classList.remove("is-changing");
    }, 200);
  }

  prevBtn.addEventListener("click", () => show(i - 1));
  nextBtn.addEventListener("click", () => show(i + 1));
})();

/* ---------- Waitlist modal ---------- */
(function () {
  const modal = document.querySelector("[data-waitlist-modal]");
  if (!modal) return;

  const openers = document.querySelectorAll(
    '.nav__cta, .plans__button, .mobile-menu__cta, a.button--dark[href="#membership"]'
  );
  const form = modal.querySelector("[data-waitlist-form]");
  const stepForm = modal.querySelector('[data-step="form"]');
  const stepThanks = modal.querySelector('[data-step="thanks"]');
  const emailInput = modal.querySelector('input[name="email"]');
  let lastFocused = null;

  function openModal(e) {
    if (e) e.preventDefault();
    lastFocused = document.activeElement;
    stepForm.hidden = false;
    stepThanks.hidden = true;
    if (form) form.reset();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    window.setTimeout(() => emailInput && emailInput.focus(), 80);
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  openers.forEach((btn) => btn.addEventListener("click", openModal));

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-waitlist-close]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = (emailInput && emailInput.value.trim()) || "";
      if (!email || !email.includes("@")) {
        emailInput.focus();
        return;
      }
      // TODO: send { name, email } to your email backend here
      // (Formspree / Tally / Mailchimp / your API). Example:
      // fetch("https://formspree.io/f/XXXX", { method: "POST", body: new FormData(form) });
      stepForm.hidden = true;
      stepThanks.hidden = false;
    });
  }
})();

/* ---------- Mobile menu ---------- */
(function () {
  const btn = document.querySelector(".nav__menu");
  const menu = document.querySelector("[data-mobile-menu]");
  if (!btn || !menu) return;
  const links = menu.querySelectorAll("[data-mobile-link]");
  const closeBtn = menu.querySelector("[data-mobile-close]");

  function openMenu() {
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    // don't unlock scroll if the waitlist modal is taking over
    const modalOpen = document.querySelector("[data-waitlist-modal].is-open");
    if (!modalOpen) document.body.style.overflow = "";
  }

  btn.addEventListener("click", () => {
    menu.classList.contains("is-open") ? closeMenu() : openMenu();
  });
  links.forEach((l) => l.addEventListener("click", closeMenu));
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) closeMenu();
  });
})();

/* ---------- Module 3 mobile: dots + swipe/tap ---------- */
(function () {
  const dotsWrap = document.querySelector("[data-wm-dots]");
  const phone = document.querySelector(".wellness-module__device");
  if (typeof setWellnessStep !== "function" || !Array.isArray(wellnessSteps)) return;
  const n = wellnessSteps.length;

  const dots = [];
  if (dotsWrap) {
    for (let i = 0; i < n; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "wm-dot" + (i === activeWellnessStep ? " is-active" : "");
      dot.setAttribute("aria-label", "Go to screen " + (i + 1));
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    }
  }

  function updateDots() {
    dots.forEach((d, i) => d.classList.toggle("is-active", i === activeWellnessStep));
  }
  function goTo(index) {
    setWellnessStep(index);
    updateDots();
  }
  function stepBy(delta) {
    const target = (activeWellnessStep + delta + n) % n;
    setWellnessStep(target);
    updateDots();
  }

  // Side arrows
  const prevArrow = document.querySelector("[data-wm-prev]");
  const nextArrow = document.querySelector("[data-wm-next]");
  if (prevArrow) prevArrow.addEventListener("click", () => stepBy(-1));
  if (nextArrow) nextArrow.addEventListener("click", () => stepBy(1));

  if (phone) {
    let startX = null, startY = null, moved = false;
    phone.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      moved = false;
    }, { passive: true });
    phone.addEventListener("touchend", (e) => {
      if (startX === null) return;
      // ignore taps that land on the side arrows (they have their own handler)
      if (e.target.closest(".wm-arrow")) { startX = startY = null; return; }
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        stepBy(dx < 0 ? 1 : -1); // swipe left = next, right = previous
        moved = true;
      } else if (Math.abs(dx) < 12 && Math.abs(dy) < 12) {
        stepBy(1); // tap on the screen = next
      }
      startX = startY = null;
    }, { passive: true });
    // tap for non-touch / fallback (ignored right after a swipe)
    phone.addEventListener("click", () => {
      if (!moved) return;
      moved = false;
    });
  }
})();

/* ---------- Hero video: force muted autoplay (mobile/iOS) ---------- */
(function () {
  const v = document.querySelector(".hero__image");
  if (!v || v.tagName !== "VIDEO") return;
  v.muted = true;
  v.setAttribute("muted", "");
  v.playsInline = true;
  const tryPlay = () => {
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };
  tryPlay();
  // retry when the tab becomes visible or on first user interaction (iOS Low Power Mode)
  document.addEventListener("visibilitychange", () => { if (!document.hidden) tryPlay(); });
  ["touchstart", "click"].forEach((evt) =>
    document.addEventListener(evt, tryPlay, { once: true, passive: true })
  );
})();
