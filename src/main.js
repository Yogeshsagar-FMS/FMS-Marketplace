import "./style.css";
import { icon } from "./icons.js";
import { categories, demoListings } from "./data.js";
import {
  loadListings,
  loadSaved,
  saveListings,
  saveFavourites,
  MAX_PHOTO_BYTES,
} from "./storage.js";

const escape = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const money = (value) =>
  Number(value) === 0
    ? "Free"
    : "₹" + new Intl.NumberFormat("en-IN").format(value);
const initials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => [...part][0])
    .filter(Boolean)
    .filter((_, i, parts) => i === 0 || i === parts.length - 1)
    .join("")
    .toUpperCase();
let localListings = loadListings();
let saved = loadSaved();
const state = {
  view: "explore",
  category: "Everything",
  query: "",
  sort: "recommended",
  budget: false,
  condition: "all",
};
let previouslyFocused;
let toastTimer;
let previewURL;
let photoFile;
let submitting = false;

const app = document.querySelector("#app");
app.innerHTML = `
<a class="skip-link" href="#market">Skip to listings</a>
<header class="site-header"><div class="header-inner">
  <a class="brand" href="#" aria-label="FMS Circle home">${icon("exchange", "brand-mark")}<span>fms<span class="brand-circle">circle</span><span class="brand-period">.</span></span></a>
  <nav class="desktop-nav" aria-label="Main navigation"><button data-view="explore" class="nav-button active">The marketplace</button><button data-view="saved" class="nav-button">Saved <span class="saved-count">0</span></button><button data-view="mine" class="nav-button">My listings</button></nav>
  <div class="header-actions"><span class="campus-label">${icon("pin")} FMS, Delhi</span><button class="button button-accent header-sell" data-sell>${icon("plus")} List an item</button></div>
</div></header>
<main>
  <section class="hero shell" aria-labelledby="hero-title">
    <div class="hero-copy"><h1 id="hero-title">New batch.<br><em>Same good stuff.</em></h1><p>Your senior’s bookshelf. Your next study lamp.<br>A little less new. A lot more campus.</p><a class="hero-link" href="#market">Find your next good thing <span>${icon("down")}</span></a>
      <div class="hero-footnote"><span class="mini-exchange">${icon("exchange")}</span><span>The campus marketplace for<br><strong>FMS Delhi students.</strong></span></div>
    </div>
    <div class="hero-visual"><img class="hero-image" src="./images/campus-still-life.webp" alt="Books, headphones, a green lamp and a coffee mug ready for a new study corner" width="1536" height="1024" fetchpriority="high"/><span class="exchange-stamp" aria-hidden="true"><span>GOOD THINGS</span>${icon("exchange")}<span>GO AROUND</span></span><div class="hero-caption"><span>Pre-loved. Campus-ready.</span><span>Keep the good going. ${icon("diagonal")}</span></div></div>
  </section>
  <div class="principles shell"><span>${icon("pin")} Find it on campus.</span><span>${icon("exchange")} Give it a second chapter.</span><span>${icon("heart")} Keep it in the circle.</span></div>
  <section class="market shell" id="market" tabindex="-1" aria-labelledby="feed-title">
    <div class="market-heading"><div><h2 id="feed-title">The good stuff<span>.</span></h2><p id="feed-description">From one campus life to the next.</p></div><button class="demo-label" data-about>${icon("info")} Demo marketplace <span>How it works ${icon("diagonal")}</span></button></div>
    <div class="search-row"><label class="search-box" for="search">${icon("search")}<input id="search" type="search" placeholder="Books, a lamp, your next good find…" autocomplete="off"/><span class="search-shortcut" aria-hidden="true">/</span></label><button class="budget-button" id="budget" aria-pressed="false">Under ₹1,000 ${icon("plus")}</button><label class="condition-select">${icon("filter")}<span class="sr-only">Filter by condition</span><select id="condition"><option value="all">Any condition</option><option>Like new</option><option>Good</option><option>Well loved</option></select></label></div>
    <div class="filter-row"><div class="categories" aria-label="Listing categories">${categories.map((category) => `<button class="category ${category.name === "Everything" ? "selected" : ""}" data-category="${escape(category.name)}" aria-pressed="${category.name === "Everything"}">${icon(category.icon)}${escape(category.name)}</button>`).join("")}</div></div>
    <div class="results-row"><p id="result-count" role="status" aria-live="polite"></p><label class="sort-label">Sort by <select id="sort" aria-label="Sort listings"><option value="recommended">Campus picks</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="new">Newest first</option></select></label></div>
    <div id="grid" class="product-grid"></div>
    <div class="inventory-end" id="inventory-end"><span></span><p>Good finds deserve a second look.</p><span></span></div>
  </section>
  <section class="handover shell" aria-labelledby="handover-title"><div class="handover-mark" aria-hidden="true">${icon("exchange")}</div><div class="handover-copy"><h2 id="handover-title">Moving on?<br><em>Pass something good on.</em></h2><p>That book you aced. The lamp that saw you through.<br>Someone’s first semester could use it.</p></div><div class="handover-action"><button class="button button-dark" data-sell>Give it a next chapter ${icon("arrow")}</button><span>A photo. A price. A new beginning.</span></div></section>
</main>
<footer class="shell site-footer"><a class="brand footer-brand" href="#">${icon("exchange", "brand-mark")}<span>fms<span class="brand-circle">circle</span>.</span></a><p>Less stuff left behind.<br>More good passed around.</p><div class="footer-links"><button data-about>About the circle ${icon("diagonal")}</button><span>Made for FMS, Delhi.</span></div><div class="prototype-note">A campus marketplace prototype. Sample inventory; your listings and saves stay in this browser.</div></footer>
<nav class="mobile-nav" aria-label="Mobile navigation"><button data-view="explore" class="active">${icon("grid")}<span>Explore</span></button><button data-view="saved">${icon("heart")}<span>Saved <span class="saved-count">0</span></span></button><button class="mobile-sell" data-sell>${icon("plus")}<span>List an item</span></button><button data-view="mine">${icon("bag")}<span>My listings</span></button></nav>
<dialog id="modal" aria-labelledby="dialog-title"></dialog>
<div id="toast" role="status" aria-live="polite"></div>
`;

const grid = document.querySelector("#grid");
const modal = document.querySelector("#modal");
const search = document.querySelector("#search");
function allListings() {
  return [...localListings, ...demoListings];
}
function render() {
  const query = state.query.trim().toLocaleLowerCase();
  const items = allListings().filter(
    (item) =>
      (state.view !== "saved" || saved.has(item.id)) &&
      (state.view !== "mine" || item.local) &&
      (state.category === "Everything" || item.category === state.category) &&
      (!state.budget || item.price < 1000) &&
      (state.condition === "all" || item.condition === state.condition) &&
      `${item.name} ${item.title || ""} ${item.category} ${item.description}`
        .toLocaleLowerCase()
        .includes(query),
  );
  if (state.sort === "low") items.sort((a, b) => a.price - b.price);
  if (state.sort === "high") items.sort((a, b) => b.price - a.price);
  if (state.sort === "new") items.sort((a, b) => b.id - a.id);
  document
    .querySelectorAll(".saved-count")
    .forEach((element) => (element.textContent = saved.size));
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.view);
    if (button.dataset.view === state.view)
      button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  document.querySelectorAll("[data-category]").forEach((button) => {
    const selected = button.dataset.category === state.category;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", selected);
  });
  document.querySelector("#budget").setAttribute("aria-pressed", state.budget);
  document.querySelector("#feed-title").innerHTML = {
    explore: "The good stuff<span>.</span>",
    saved: "Worth keeping<span>.</span>",
    mine: "Your little corner<span>.</span>",
  }[state.view];
  document.querySelector("#feed-description").textContent = {
    explore: "From one campus life to the next.",
    saved: "The finds you have your eye on.",
    mine: "Good things you’re ready to pass on.",
  }[state.view];
  const activeFilters =
    state.category !== "Everything" ||
    query ||
    state.budget ||
    state.condition !== "all";
  document.querySelector("#result-count").innerHTML =
    `${items.length} ${items.length === 1 ? "find" : "finds"}${state.view === "mine" ? " listed by you" : state.view === "saved" ? " in your collection" : " in the circle"}${activeFilters ? '<button class="clear-filters" data-reset>Clear filters</button>' : ""}`;
  document.querySelector("#inventory-end").hidden = !items.length;
  grid.innerHTML = items.length
    ? items
        .map(
          (item) => `
    <article class="product-card" data-item="${item.id}">
      <div class="product-photo ${item.image ? "" : "no-photo"}"><button class="photo-open" data-open="${item.id}" aria-label="View ${escape(item.name)}">${item.image ? `<img src="${escape(item.image)}" alt="${escape(item.title || item.name)}" loading="lazy" width="700" height="700"/>` : `<span class="photo-placeholder">${icon(categories.find((category) => category.name === item.category)?.icon || "bag")}<span>A good find,<br>photo coming later.</span></span>`}</button>
        <span class="condition-badge">${escape(item.condition)}</span><button class="save-button ${saved.has(item.id) ? "is-saved" : ""}" data-save="${item.id}" aria-label="${saved.has(item.id) ? "Unsave" : "Save"} ${escape(item.name)}" aria-pressed="${saved.has(item.id)}">${icon("heart")}</button>
        ${item.tag ? `<span class="photo-note">${escape(item.tag)}</span>` : ""}
      </div>
      <div class="product-meta"><span>${escape(item.category)}</span>${item.local ? '<span class="local-label">Your listing</span>' : ""}</div>
      <div class="product-title-row"><button class="product-title" data-open="${item.id}" title="${escape(item.title || item.name)}">${escape(item.title || item.name)}</button><strong class="product-price">${money(item.price)}</strong></div>
      <p class="product-subtitle">${escape(item.title ? item.name : item.description)}</p>
      <div class="seller-row"><span class="seller-avatar" aria-hidden="true">${escape(initials(item.seller))}</span><span class="seller-name">${escape(item.seller)}<small>${escape(item.batch)}</small></span><span class="pickup">${icon("pin")} ${escape(item.pickup)}</span></div>
    </article>`,
        )
        .join("")
    : emptyState(activeFilters);
  grid.querySelectorAll("img").forEach((image) =>
    image.addEventListener(
      "error",
      () => {
        image.hidden = true;
        image.parentElement.insertAdjacentHTML(
          "beforeend",
          `<span class="photo-placeholder">${icon("bag")}<span>This photo couldn’t load.<br>The good find is still here.</span></span>`,
        );
      },
      { once: true },
    ),
  );
}
function emptyState(filtered) {
  const title = filtered
    ? "No finds this time."
    : state.view === "saved"
      ? "Something will catch your eye."
      : "Your next chapter starts here.";
  const copy = filtered
    ? "Try a different search or clear your filters. The right find might be one click away."
    : state.view === "saved"
      ? "Tap the heart on any listing. We’ll keep your favourites right here."
      : "A book, a lamp, a spare bit of room. List something you’re ready to pass on.";
  return `<div class="empty-state">${icon(filtered ? "search" : state.view === "saved" ? "heart" : "exchange")}<h3>${title}</h3><p>${copy}</p><button class="button button-dark" ${filtered ? "data-reset" : state.view === "saved" ? "data-browse" : "data-sell"}>${filtered ? "Clear filters" : state.view === "saved" ? "Explore the marketplace" : "List your first item"} ${icon("arrow")}</button></div>`;
}
function toast(message) {
  const element = document.querySelector("#toast");
  clearTimeout(toastTimer);
  element.innerHTML = `${icon("check")}<span>${escape(message)}</span>`;
  element.classList.add("show");
  toastTimer = setTimeout(() => element.classList.remove("show"), 3500);
}
function showDialog(content, className = "") {
  if (!modal.open) previouslyFocused = document.activeElement;
  modal.className = className;
  modal.innerHTML = `<button class="dialog-close" aria-label="Close dialog">${icon("close")}</button>${content}`;
  if (!modal.open) modal.showModal();
  else modal.querySelector(".dialog-close").focus({ preventScroll: true });
  document.body.classList.add("modal-open");
  modal.querySelector(".dialog-close").onclick = () => modal.close();
}
modal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  if (previewURL) URL.revokeObjectURL(previewURL);
  previewURL = undefined;
  photoFile = undefined;
  (previouslyFocused?.isConnected
    ? previouslyFocused
    : document.querySelector("#market")
  ).focus({ preventScroll: true });
});
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    const rect = modal.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      modal.close();
  }
});
function showDetail(id) {
  const item = allListings().find((row) => row.id === id);
  if (!item) return;
  showDialog(
    `<div class="detail-layout"><div class="detail-photo">${item.image ? `<img src="${escape(item.image)}" alt="${escape(item.title || item.name)}"/>` : `<span class="photo-placeholder">${icon("bag")}<span>A good find, photo coming later.</span></span>`}</div><div class="detail-copy"><h2 id="dialog-title">${escape(item.name)}</h2><p class="detail-subtitle">${escape(item.title || "")}</p><div class="detail-price-row"><strong>${money(item.price)}</strong><span class="detail-condition">${escape(item.condition)}</span><span class="detail-taxonomy">${escape(item.category)}</span></div><p class="detail-description">${escape(item.description)}</p><div class="detail-seller"><span class="seller-avatar">${escape(initials(item.seller))}</span><div><strong>${escape(item.seller)}</strong><span>${escape(item.batch)}</span></div></div><p class="detail-pickup">${icon("pin")} Pick up: ${escape(item.pickup)}</p><div class="contact-area">${item.local ? `<button class="button button-dark contact-button">View contact details ${icon("arrow")}</button>` : `<div class="sample-notice">${icon("info")}<p>This is a sample listing.<br><span>Seller contact is available on listings you add.</span></p></div>`}</div><button class="detail-save" data-save="${item.id}" aria-pressed="${saved.has(item.id)}">${icon("heart")} ${saved.has(item.id) ? "Saved to your finds" : "Save for later"}</button><p class="meet-note">Meet in a public campus spot. Check the item before paying.</p>${item.local ? `<button class="delete-listing" data-delete="${item.id}">Remove your listing</button>` : ""}</div></div>`,
    "detail-dialog",
  );
  modal.querySelector(".contact-button")?.addEventListener("click", () => {
    const area = modal.querySelector(".contact-area");
    area.innerHTML = `<p class="contact-heading">Get in touch with ${escape(item.seller.split(" ")[0])}</p><div class="contact-value">${escape(item.contact || "No contact details provided.")}</div><button class="copy-contact">${icon("copy")} Copy contact</button>`;
    area.querySelector(".copy-contact").onclick = async () => {
      try {
        await navigator.clipboard.writeText(item.contact);
        toast("Contact copied. Say hello.");
      } catch {
        toast("Select the contact details above and copy them.");
      }
    };
  });
}
function showAbout() {
  showDialog(
    `<div class="about-dialog"><div class="about-symbol">${icon("exchange")}</div><h2 id="dialog-title">A small campus.<br>A little more circle.</h2><p>FMS Circle is a marketplace concept for students at FMS Delhi. Find a book, save a little on room essentials, or give something useful its next chapter.</p><ol class="how-steps"><li><span>Find your good thing</span><p>Search, filter, and save the items you like.</p></li><li><span>Make the handover</span><p>For your own listings, contact details appear on the item page. Agree a public pickup spot and inspect before paying.</p></li><li><span>Keep it in the circle</span><p>A photo and a few details are all you need to list.</p></li></ol><div class="about-prototype"><strong>A note about this prototype</strong><p>Starter listings and sellers are examples, with illustrative AI-generated photos. Your listings and favourites stay in this browser; they are not shared with other students. There are no verified accounts, private messages, or payments yet. Don’t enter sensitive contact details on a shared device.</p></div><button class="button button-dark" data-sell>Pass something on ${icon("arrow")}</button></div>`,
    "about-modal",
  );
}
function showSell() {
  photoFile = undefined;
  showDialog(
    `<form id="listing-form" novalidate><div class="form-heading"><span class="form-symbol">${icon("exchange")}</span><h2 id="dialog-title">Goodbye, good thing.<br><em>Hello, next chapter.</em></h2><p>Tell the circle what you’re passing on.</p></div><div class="form-layout"><div class="photo-section"><label class="photo-upload" for="photo"><span id="photo-preview">${icon("plus")}<strong>Add a photo</strong><small>JPG, PNG, WebP or GIF · up to 3 MB</small></span><input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp,image/gif"/><span class="upload-note">Good light. Your actual item. No filter needed.</span></label><button type="button" class="remove-photo" hidden>Remove photo</button><p class="field-error" id="photo-error" role="alert"></p></div><div class="form-fields"><label class="field">What are you passing on? <input name="name" required maxlength="80" placeholder="e.g. Marketing Management by Kotler"/></label><div class="form-pair"><label class="field">Asking price (₹)<input name="price" type="number" min="0" max="999999" step="1" required placeholder="650"/><small>Passing it on for free? Enter 0.</small></label><label class="field">Category<select name="category" required><option value="">Choose a category</option>${categories
      .slice(1)
      .map((category) => `<option>${escape(category.name)}</option>`)
      .join(
        "",
      )}</select></label></div><div class="form-pair"><label class="field">Condition<select name="condition"><option>Like new</option><option>Good</option><option>Well loved</option></select></label><label class="field">Pickup location<select name="pickup"><option>FMS campus</option><option>North Campus</option><option>Arrange with seller</option></select></label></div><label class="field">A little about it<textarea name="description" required minlength="10" maxlength="800" rows="3" placeholder="Condition, what’s included, and anything the next owner should know…"></textarea></label><div class="form-pair"><label class="field">Your name<input name="seller" required maxlength="60" autocomplete="name" placeholder="Your name"/></label><label class="field">Your batch<input name="batch" required maxlength="60" placeholder="MBA · 2027"/></label></div><label class="field">How can the buyer reach you?<input name="contact" required maxlength="150" placeholder="An email or phone number"/><small>Visible to anyone using this browser. Use a contact you’re happy to share.</small></label><p class="form-error" id="form-error" role="alert" tabindex="-1"></p><button class="button button-accent publish-button" type="submit">Put it in the circle ${icon("arrow")}</button><p class="form-scope">Saved in this browser only. No account needed for this prototype.</p></div></div></form>`,
    "sell-dialog",
  );
  const form = modal.querySelector("form");
  const input = form.elements.photo;
  const preview = modal.querySelector("#photo-preview");
  input.onchange = () => {
    const file = input.files[0];
    const error = modal.querySelector("#photo-error");
    error.textContent = "";
    if (!file) return;
    if (
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
        file.type,
      ) ||
      file.size > MAX_PHOTO_BYTES
    ) {
      error.textContent =
        file.size > MAX_PHOTO_BYTES
          ? "That photo is over 3 MB. Choose a smaller one."
          : "Choose a JPG, PNG, WebP, or GIF photo.";
      input.value = "";
      return;
    }
    photoFile = file;
    if (previewURL) URL.revokeObjectURL(previewURL);
    previewURL = URL.createObjectURL(file);
    preview.innerHTML = `<img src="${previewURL}" alt="Your listing photo preview"/><span class="change-photo">Change photo</span>`;
    modal.querySelector(".remove-photo").hidden = false;
  };
  modal.querySelector(".remove-photo").onclick = () => {
    if (previewURL) URL.revokeObjectURL(previewURL);
    previewURL = undefined;
    photoFile = undefined;
    input.value = "";
    preview.innerHTML = `${icon("plus")}<strong>Add a photo</strong><small>JPG, PNG, WebP or GIF · up to 3 MB</small>`;
    modal.querySelector(".remove-photo").hidden = true;
    modal.querySelector("#photo-error").textContent = "";
  };
  form.onsubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    const error = modal.querySelector("#form-error");
    error.textContent = "";
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form));
    for (const key of ["name", "seller", "batch", "contact", "description"]) {
      values[key] = String(values[key]).trim();
      if (!values[key]) {
        error.textContent = "Please fill in each field with a little detail.";
        form.elements[key].focus();
        return;
      }
    }
    if (values.description.length < 10) {
      error.textContent =
        "Add at least 10 characters about the item’s condition or what’s included.";
      form.elements.description.focus();
      return;
    }
    const button = form.querySelector('[type="submit"]');
    submitting = true;
    button.disabled = true;
    button.textContent = "Saving your listing…";
    try {
      let image = "";
      if (photoFile)
        image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("photo"));
          reader.readAsDataURL(photoFile);
        });
      const item = {
        id: Date.now(),
        name: values.name,
        price: Number(values.price),
        category: values.category,
        condition: values.condition,
        pickup: values.pickup,
        description: values.description,
        seller: values.seller,
        batch: values.batch,
        contact: values.contact,
        image,
        local: true,
      };
      saveListings([item, ...localListings]);
      localListings.unshift(item);
      resetFilters();
      state.view = "mine";
      render();
      modal.close();
      document.querySelector("#market").scrollIntoView();
      toast("Listed. Ready for its next chapter.");
    } catch (issue) {
      error.textContent =
        issue.message === "photo"
          ? "We couldn’t read that photo. Try another image or list without one."
          : "This browser couldn’t save your listing. Storage may be full or unavailable. Try a smaller photo or remove an older listing.";
      error.focus();
    } finally {
      submitting = false;
      if (button.isConnected) {
        button.disabled = false;
        button.innerHTML = `Put it in the circle ${icon("arrow")}`;
      }
    }
  };
}
function resetFilters() {
  state.category = "Everything";
  state.query = "";
  state.budget = false;
  state.condition = "all";
  search.value = "";
  document.querySelector("#condition").value = "all";
}
function navigate(view) {
  state.view = view;
  resetFilters();
  render();
  document.querySelector("#market").scrollIntoView();
}
function toggleSaved(id, button) {
  const next = new Set(saved);
  next.has(id) ? next.delete(id) : next.add(id);
  try {
    saveFavourites(next);
  } catch {
    toast("Couldn’t save this find. Browser storage may be unavailable.");
    return;
  }
  saved = next;
  const wasInDialog = !!button.closest("dialog");
  const label = button.getAttribute("aria-label");
  render();
  if (wasInDialog) {
    button.setAttribute("aria-pressed", saved.has(id));
    button.innerHTML = `${icon("heart")} ${saved.has(id) ? "Saved to your finds" : "Save for later"}`;
  } else {
    const replacement = grid.querySelector(`[data-save="${id}"]`);
    replacement?.focus({ preventScroll: true });
    if (
      saved.has(id) &&
      !document.documentElement.classList.contains("keyboard-navigation") &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      replacement?.animate(
        [{ transform: "scale(.85)" }, { transform: "scale(1)" }],
        { duration: 220, easing: "cubic-bezier(.23,1,.32,1)" },
      );
    if (!replacement && label) {
      const visibleSavedNav = [
        ...document.querySelectorAll('[data-view="saved"]'),
      ].find((element) => element.getClientRects().length > 0);
      (visibleSavedNav || document.querySelector("#market")).focus({
        preventScroll: true,
      });
    }
  }
}
document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a");
  if (!target) return;
  if (target.matches("[data-sell]")) {
    showSell();
    return;
  }
  if (target.matches("[data-save]")) {
    toggleSaved(Number(target.dataset.save), target);
    return;
  }
  if (target.matches("[data-open]")) {
    showDetail(Number(target.dataset.open));
    return;
  }
  if (target.matches("[data-category]")) {
    state.category = target.dataset.category;
    render();
    return;
  }
  if (target.matches("[data-view]")) {
    navigate(target.dataset.view);
    return;
  }
  if (target.matches("[data-reset]")) {
    resetFilters();
    render();
    return;
  }
  if (target.matches("[data-browse]")) {
    navigate("explore");
    return;
  }
  if (target.matches("[data-about]")) {
    showAbout();
    return;
  }
  if (target.matches(".brand")) {
    event.preventDefault();
    navigate("explore");
    window.scrollTo({ top: 0 });
    return;
  }
  if (target.matches("[data-delete]")) {
    const id = Number(target.dataset.delete);
    showDialog(
      `<div class="confirm-delete"><h2 id="dialog-title">Ready to take it down?</h2><p>This removes your listing from this browser. It can’t be undone.</p><div><button class="button button-light" id="cancel-delete">Keep listing</button><button class="button button-accent" id="confirm-delete">Remove listing</button></div><p id="delete-error" role="alert"></p></div>`,
    );
    modal.querySelector("#cancel-delete").onclick = () => showDetail(id);
    modal.querySelector("#confirm-delete").onclick = () => {
      try {
        const next = localListings.filter((item) => item.id !== id);
        saveListings(next);
        localListings = next;
        saved.delete(id);
        try {
          saveFavourites(saved);
        } catch {}
        modal.close();
        render();
        toast("Listing removed. Thanks for keeping things tidy.");
      } catch {
        modal.querySelector("#delete-error").textContent =
          "Couldn’t remove the listing. Browser storage may be unavailable.";
      }
    };
  }
});
search.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});
document.querySelector("#sort").onchange = (event) => {
  state.sort = event.target.value;
  render();
};
document.querySelector("#condition").onchange = (event) => {
  state.condition = event.target.value;
  render();
};
document.querySelector("#budget").onclick = () => {
  state.budget = !state.budget;
  render();
};
document.addEventListener("pointerdown", () =>
  document.documentElement.classList.remove("keyboard-navigation"),
);
document.addEventListener("keydown", (event) => {
  document.documentElement.classList.add("keyboard-navigation");
  if (
    event.key === "/" &&
    !event.ctrlKey &&
    !event.metaKey &&
    !modal.open &&
    !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
  ) {
    event.preventDefault();
    search.focus();
    search.scrollIntoView({ block: "center" });
  }
});
window.addEventListener("storage", (event) => {
  if (
    event.key === "fms-listings" ||
    event.key === "fms-saved" ||
    event.key === null
  ) {
    localListings = loadListings();
    saved = loadSaved();
    render();
  }
});
render();
