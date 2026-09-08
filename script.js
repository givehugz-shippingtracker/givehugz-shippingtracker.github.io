const locations = [
  { file: "edinburgh.png", city: "EDINBURGH", date: "2026-09-03" },
  { file: "london.png",    city: "LONDON", date: "2026-09-04" },
  { file: "paris.png",     city: "PARIS", date: "2026-09-06" },
  { file: "rome.png",      city: "ROME", date: "2026-09-07" },
  { file: "giza.png",    city: "GIZA", date: "2026-09-08" },
  { file: "afghanistan.png",  city: "AFGHANISTAN", date: "2026-09-09" },
  { file: "mumbai.png",     city: "MUMBAI", date: "2026-09-10" },
  { file: "hong-kong.png",    city: "HONG KONG", date: "2026-09-11" },
  { file: "sydney.png",    city: "SYDNEY", date: "2026-09-12" },
  { file: "buenosaires.png",   city: "BUENOS AIRES", date: "2026-09-13" },
  { file: "mexicocity.png",   city: "MEXICO CITY", date: "2026-09-14" },
  { file: "ohio.png",   city: "OHIO", date: "2026-09-15" },
  { file: "newyork.png", city: "NEW YORK CITY", date: "2026-09-16" },
  { file: "washington.png",   city: "WASHINGTON, D.C.", date: "2026-09-17" },
];

const timeline = document.querySelector("#timeline");

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

function todayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createStop(location, index, isActive) {
  const stop = document.createElement("article");
  stop.className = "stop " + (isActive ? "active" : "complete");

  const marker = document.createElement("div");
  marker.className = "marker";
  marker.setAttribute("aria-hidden", "true");

  const card = document.createElement("div");
  card.className = "location-card";

  const header = document.createElement("header");
  header.className = "location-header";

  const title = document.createElement("h2");
  title.className = "location-name";
  title.textContent = isActive
      ? `Your cow is currently in ${location.city.toUpperCase()}`
      : location.city.toUpperCase();

  const dateEl = document.createElement("p");
  dateEl.className = "date";
  dateEl.textContent = formatDate(location.date) + " · EST";

  const photoWrap = document.createElement("div");
  photoWrap.className = "photo-wrap";

  const image = document.createElement("img");
  image.src = `cow/${location.file}`;
  image.alt = `Cow in ${location.city}`;
  image.loading = index === 0 ? "eager" : "lazy";
  image.decoding = "async";

  image.addEventListener("error", () => {
    photoWrap.hidden = true;
  });

  header.append(title, dateEl);
  photoWrap.append(image);
  card.append(header, photoWrap);
  stop.append(marker, card);

  return stop;
}

const today = todayISO();

const visibleStops = locations
    .filter((location) => location.date <= today)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      return a.file.localeCompare(b.file);
    });

visibleStops.reverse().forEach((location, index) => {
  const isActive = index === 0;
  timeline.appendChild(createStop(location, index, isActive));
});