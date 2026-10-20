import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import {
  loadListings,
  loadSaved,
  saveListings,
  saveFavourites,
  validPhoto,
} from "../src/storage.js";
import { categories, demoListings } from "../src/data.js";

let store;
beforeEach(() => {
  store = new Map();
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key) => store.get(key) ?? null,
      setItem: (key, value) => store.set(key, value),
    },
  });
});
const listing = (overrides = {}) => ({
  id: 1234,
  name: "Marketing Management",
  price: 650,
  category: "Books & notes",
  seller: "Aditi Sharma",
  description: "A clean used textbook.",
  ...overrides,
});

test("corrupt or unexpected storage shapes do not break startup", () => {
  for (const value of ["{broken", "null", "true", '"hello"', "{}"]) {
    store.set("fms-listings", value);
    store.set("fms-saved", value);
    assert.deepEqual(loadListings(), []);
    assert.deepEqual([...loadSaved()], []);
  }
});
test("restores valid listings and rejects unusable item data", () => {
  store.set(
    "fms-listings",
    JSON.stringify([
      null,
      {},
      listing(),
      listing({ id: "bad" }),
      listing({ price: -1 }),
      listing({ name: " " }),
      listing({ seller: null }),
    ]),
  );
  const rows = loadListings();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].local, true);
  assert.equal(rows[0].pickup, "Arrange with seller");
  assert.equal(rows[0].condition, "Good");
});
test("legacy listings keep their description and contact data", () => {
  store.set(
    "fms-listings",
    JSON.stringify([
      listing({
        description: undefined,
        title: "Some useful notes",
        contact: "student@example.com",
      }),
    ]),
  );
  const [row] = loadListings();
  assert.equal(row.description, "Some useful notes");
  assert.equal(row.contact, "student@example.com");
});
test("normalizes large text and rejects executable photo sources", () => {
  store.set(
    "fms-listings",
    JSON.stringify([
      listing({
        name: "A".repeat(200),
        description: "B".repeat(2000),
        image: "javascript:alert(1)",
        condition: "<script>",
      }),
    ]),
  );
  const [row] = loadListings();
  assert.equal(row.name.length, 80);
  assert.equal(row.description.length, 800);
  assert.equal(row.image, "");
  assert.equal(row.condition, "Good");
});
test("allows supported local photos and bundled assets only", () => {
  assert(validPhoto("./images/books.webp"));
  assert(validPhoto("data:image/png;base64,aGVsbG8="));
  for (const value of [
    "https://example.com/a.jpg",
    "data:image/svg+xml;base64,PHN2Zz4=",
    "../private.png",
    "javascript:alert(1)",
    null,
  ])
    assert.equal(validPhoto(value), false);
});
test("favourites and listings round-trip without losing zero-price items", () => {
  saveListings([listing({ price: 0 })]);
  saveFavourites(new Set([1234]));
  assert.equal(loadListings()[0].price, 0);
  assert.deepEqual([...loadSaved()], [1234]);
});
test("storage failures propagate so the UI can show a recovery message", () => {
  localStorage.setItem = () => {
    throw new Error("QuotaExceededError");
  };
  assert.throws(() => saveListings([listing()]), /QuotaExceededError/);
  assert.throws(() => saveFavourites(new Set([1234])), /QuotaExceededError/);
});
test("demonstration inventory has unique ids and supported categories", () => {
  assert.equal(
    new Set(demoListings.map((item) => item.id)).size,
    demoListings.length,
  );
  const names = new Set(categories.map((category) => category.name));
  for (const item of demoListings) {
    assert(names.has(item.category));
    assert(item.price >= 0);
    assert(validPhoto(item.image));
  }
});
