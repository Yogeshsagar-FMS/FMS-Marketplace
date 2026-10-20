import { icon } from "./icons.js";

export function landingIntro() {
  return `
  <section class="campus-hero" aria-labelledby="hero-title">
    <div class="campus-orbit orbit-one" aria-hidden="true"></div><div class="campus-orbit orbit-two" aria-hidden="true"></div>
    <div class="campus-hero-inner">
      <h1 id="hero-title" class="campus-headline"><span class="headline-row"><span class="headline-fms">FMS.</span> <span>FULL</span></span><span class="headline-row headline-circle">CIRCLE<span class="headline-dot">.</span></span></h1>
      <div class="hero-centre"><p>The Kotler you need. The lamp they’re leaving.<br>Buy, sell & pass it on. <strong>Right here at FMS.</strong></p>
        <form class="hero-search" role="search" aria-label="Find a campus listing"><label class="sr-only" for="hero-query">Search the campus marketplace</label>${icon("search")}<input id="hero-query" type="search" placeholder="What’s your next good find?" autocomplete="off"/><button type="submit" aria-label="Search listings">${icon("arrow")}</button></form>
        <button class="hero-list-link" data-sell>Got something good? Pass it on ${icon("diagonal")}</button>
      </div>
      <button class="hero-find floating-books" data-open="1" aria-label="Explore the sample Kotler textbook listing"><span class="object-parallax" data-depth="14"><span class="object-float"><img src="./images/books-cutout.webp" alt="" width="600" height="600" fetchpriority="high"/></span></span><span class="object-ticket"><strong>THE OG CASE COMPANION</strong><span>From a senior’s shelf <b>₹650</b></span></span></button>
      <button class="hero-find floating-headphones" data-open="3" aria-label="Explore the sample noise-cancelling headphones listing"><span class="object-parallax" data-depth="-18"><span class="object-float"><img src="./images/headphones-cutout.webp" alt="" width="600" height="600" fetchpriority="high"/></span></span><span class="object-ticket"><strong>DO NOT DISTURB. CASE TIME.</strong><span>Headphones, pre-loved <b>₹8,500</b></span></span></button>
      <button class="hero-find floating-lamp" data-open="6" aria-label="Explore the sample study lamp listing"><span class="object-parallax" data-depth="9"><span class="object-float"><img src="./images/lamp-cutout.webp" alt="" width="600" height="600" fetchpriority="high"/></span></span><span class="lamp-label">For your 2 a.m. self.</span></button>
      <div class="hero-floor"><div class="institute-lockup"><img src="./images/fms-identity.png" alt="FMS eagle identity" width="225" height="225"/><span>Faculty of Management Studies<small>University of Delhi · North Campus</small></span></div><a class="hero-scroll" href="#collections">A whole campus of possibility ${icon("down")}</a><button class="motion-toggle" aria-pressed="false" aria-label="Pause decorative motion"><span class="pause-bars" aria-hidden="true"></span><span class="motion-label">Pause motion</span></button></div>
    </div>
  </section>
  <div class="campus-ticker" role="group" aria-label="Books, late-night case studies, coffee and campus handovers"><div class="ticker-track" aria-hidden="true">${Array.from({ length: 4 }, () => `<span>LESS MRP.</span>${icon("exchange")}<span>MORE FMS.</span>${icon("exchange")}<span>KEEP IT IN THE CIRCLE.</span>${icon("exchange")}`).join("")}</div></div>
  <section class="collections-section shell" id="collections" aria-labelledby="collections-title"><div class="collections-heading"><h2 id="collections-title">Big campus energy.<br><span>Smaller price tags.</span></h2><p>For the first case.<br>The last all-nighter.<br>And everything in between.</p></div><div class="collection-posters">
    <button class="collection-poster collection-books" data-category="Books & notes" data-collection><span class="poster-category">BOOKS & NOTES ${icon("diagonal")}</span><span class="poster-title">CASE<br>CLOSED.</span><img src="./images/books-cutout.webp" alt="A stack of well-loved books" width="600" height="600" loading="lazy"/><span class="poster-foot">Your senior did the highlighting.</span></button>
    <button class="collection-poster collection-room" data-category="Room essentials" data-collection><span class="poster-category">ROOM ESSENTIALS ${icon("diagonal")}</span><span class="poster-title">2 A.M.<br>CLUB.</span><img src="./images/lamp-cutout.webp" alt="Green adjustable study lamp" width="600" height="600" loading="lazy"/><span class="poster-foot">For the light-bulb moments.</span></button>
    <button class="collection-poster collection-tech" data-category="Tech & gadgets" data-collection><span class="poster-category">TECH & GADGETS ${icon("diagonal")}</span><span class="poster-title">TUNE IN.<br>ZONE OUT.</span><img src="./images/headphones-cutout.webp" alt="Black over-ear headphones" width="600" height="600" loading="lazy"/><span class="poster-foot">Big focus. A little less spend.</span></button>
  </div></section>`;
}

export function landingEnding() {
  return `
  <section class="batch-story" aria-labelledby="batch-title"><div class="shell story-layout"><div class="story-copy"><h2 id="batch-title">One batch<br>moves on.<br><span>The good<br>stays here.</span></h2><p>You came for the MBA. You’re leaving with stories.<br>Let your stuff be part of someone else’s.</p><span class="story-aside">That’s the circle. That’s FMS.</span></div><div class="handoff-demo"><div class="handoff-people"><div><span class="batch-avatar senior-avatar">S</span><strong>Your senior</strong><small>The next chapter</small></div><div class="handoff-path" aria-hidden="true">${icon("arrow")}</div><div><span class="batch-avatar junior-avatar">J</span><strong>Your junior</strong><small>The first semester</small></div></div><div class="handoff-object" aria-hidden="true"><img src="./images/books-cutout.webp" alt="" width="600" height="600" loading="lazy"/></div><div class="handoff-caption" aria-live="polite"><strong id="handoff-caption-title">A casebook. A hundred memories.</strong><p id="handoff-caption-copy">You’ve made your notes. Now it’s ready for someone else’s.</p></div><div class="chapter-controls" aria-label="Explore a campus handover"><button data-chapter="0" class="selected" aria-pressed="true"><span>1</span> Pack less</button><button data-chapter="1" aria-pressed="false"><span>2</span> Pass it on</button><button data-chapter="2" aria-pressed="false"><span>3</span> Start fresh</button></div><p class="chapter-hint">Tap a chapter. See the circle happen.</p></div></div></section>
  <section class="circle-finale" aria-labelledby="finale-title"><div class="shell"><div class="finale-top"><span>Not another group-chat scroll.<br>Your own campus exchange.</span><span class="finale-exchange" aria-hidden="true">${icon("exchange")}</span></div><h2 id="finale-title">YOUR TURN.<br><span>PASS IT ON.</span></h2><div class="finale-bottom"><button class="button finale-button" data-sell>Put it in the circle ${icon("diagonal")}</button><p>A photo. A price. A familiar pickup spot.<br>Your next chapter starts with a handover.</p></div></div></section>`;
}

export function initLanding({ onSearch }) {
  const hero = document.querySelector(".campus-hero");
  const motionButton = document.querySelector(".motion-toggle");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let manuallyPaused = false;
  const updateMotion = () => {
    const paused = manuallyPaused || reduceMotion.matches;
    document.documentElement.classList.toggle("motion-paused", paused);
    motionButton.setAttribute("aria-pressed", String(paused));
    motionButton.setAttribute(
      "aria-label",
      paused ? "Resume decorative motion" : "Pause decorative motion",
    );
    motionButton.querySelector(".motion-label").textContent = paused
      ? "Motion paused"
      : "Pause motion";
    document
      .querySelectorAll(".object-parallax")
      .forEach((element) => (element.style.transform = ""));
  };
  motionButton.addEventListener("click", () => {
    manuallyPaused = !manuallyPaused;
    updateMotion();
  });
  reduceMotion.addEventListener("change", updateMotion);
  updateMotion();
  document.querySelector(".hero-search").addEventListener("submit", (event) => {
    event.preventDefault();
    onSearch(document.querySelector("#hero-query").value);
  });
  const layers = [...hero.querySelectorAll(".object-parallax")];
  let heroBox;
  hero.addEventListener("pointerenter", () => {
    heroBox = hero.getBoundingClientRect();
  });
  hero.addEventListener("pointermove", (event) => {
    if (
      !heroBox ||
      reduceMotion.matches ||
      manuallyPaused ||
      event.pointerType !== "mouse"
    )
      return;
    const x = (event.clientX - heroBox.left) / heroBox.width - 0.5;
    const y = (event.clientY - heroBox.top) / heroBox.height - 0.5;
    for (const layer of layers) {
      const depth = Number(layer.dataset.depth);
      layer.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    }
  });
  hero.addEventListener("pointerleave", () =>
    layers.forEach((layer) => (layer.style.transform = "")),
  );
  const captions = [
    [
      "A casebook. A hundred memories.",
      "You’ve made your notes. Now it’s ready for someone else’s.",
    ],
    [
      "One campus. One easy handover.",
      "Find each other, pick a public campus spot, and pass the good on.",
    ],
    [
      "Same book. A whole new story.",
      "One less thing to buy new. One more reason to love your circle.",
    ],
  ];
  document.querySelectorAll("[data-chapter]").forEach((button) =>
    button.addEventListener("click", () => {
      const chapter = Number(button.dataset.chapter);
      document.querySelectorAll("[data-chapter]").forEach((item) => {
        item.classList.toggle("selected", item === button);
        item.setAttribute("aria-pressed", String(item === button));
      });
      document.querySelector("#handoff-caption-title").textContent =
        captions[chapter][0];
      document.querySelector("#handoff-caption-copy").textContent =
        captions[chapter][1];
      document.querySelector(".handoff-object").style.transform =
        `translateX(${[-90, 0, 90][chapter]}px) rotate(${[-10, 0, 10][chapter]}deg)`;
    }),
  );
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(
        ".collections-heading, .collection-poster, .story-copy, .handoff-demo, .finale-top, .circle-finale h2, .finale-bottom",
      )
      .forEach((element) => {
        element.classList.add("reveal-ready");
        observer.observe(element);
      });
  }
}
