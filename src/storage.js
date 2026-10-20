// Keep persistence separate from views so a shared API can replace it later.
const KEYS = { listings: "fms-listings", saved: "fms-saved" };
export const MAX_PHOTO_BYTES = 3 * 1024 * 1024;
export function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}
export function validPhoto(value) {
  return (
    typeof value === "string" &&
    (/^data:image\/(png|jpeg|webp|gif);base64,[a-z\d+/=\s]+$/i.test(value) ||
      /^\.\/images\/[a-z-]+\.(png|webp)$/.test(value))
  );
}
export function loadListings() {
  const rows = readJSON(KEYS.listings, []);
  if (!Array.isArray(rows)) return [];
  return rows
    .filter(
      (row) =>
        row &&
        Number.isSafeInteger(row.id) &&
        typeof row.name === "string" &&
        row.name.trim() &&
        Number.isFinite(row.price) &&
        row.price >= 0 &&
        typeof row.category === "string" &&
        typeof row.seller === "string",
    )
    .map((row) => ({
      ...row,
      name: row.name.slice(0, 80),
      description: String(row.description || row.title || "").slice(0, 800),
      seller: row.seller.slice(0, 60),
      batch: String(row.batch || "").slice(0, 60),
      contact: String(row.contact || "").slice(0, 150),
      pickup: String(row.pickup || "Arrange with seller").slice(0, 80),
      condition: ["Like new", "Good", "Well loved"].includes(row.condition)
        ? row.condition
        : "Good",
      image: validPhoto(row.image) ? row.image : "",
      local: true,
    }));
}
export function loadSaved() {
  const value = readJSON(KEYS.saved, []);
  return new Set(
    Array.isArray(value) ? value.filter(Number.isSafeInteger) : [],
  );
}
export function saveListings(items) {
  localStorage.setItem(KEYS.listings, JSON.stringify(items));
}
export function saveFavourites(ids) {
  localStorage.setItem(KEYS.saved, JSON.stringify([...ids]));
}
