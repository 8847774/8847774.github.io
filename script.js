/* ===== SETTINGS: the only lines you normally edit ===== */
var WHATSAPP_NUMBER = "923318847774";  // country code + number, no + or spaces (Pakistan: drop the leading 0, add 92)
var INSTAGRAM_URL = "https://instagram.com/janmoissanite";  // leave "" to hide Instagram buttons

/* ===== PRICES (Rs.): change a number here and every price, savings line and WhatsApp message updates ===== */
var PRICES = { JAN001: 12000, JAN002: 10000, JAN003: 8500, JAN004: 4500, SET: 12500 };
/* ======================================================================================================== */

(function () {
  function money(key) {
    return typeof PRICES[key] === "number" ? "Rs. " + PRICES[key].toLocaleString("en-US") : "";
  }

  // Fill in prices from PRICES. A price that is not listed is hidden, never guessed.
  document.querySelectorAll("[data-price]").forEach(function (el) {
    var t = money(el.getAttribute("data-price"));
    if (t) { el.textContent = t; } else { el.hidden = true; }
  });
  var saving = (PRICES.JAN003 || 0) + (PRICES.JAN004 || 0) - (PRICES.SET || 0);
  document.querySelectorAll("[data-saving]").forEach(function (el) {
    if (saving > 0) { el.textContent = "Save Rs. " + saving.toLocaleString("en-US") + " compared with buying both separately."; }
    else { el.hidden = true; }
  });

  var numberOk = /^\d{10,15}$/.test(WHATSAPP_NUMBER);

  // Every link with data-enquire becomes a WhatsApp link with a ready-typed message.
  // data-enquire="JAN001 ..." names the product; empty means a general enquiry.
  document.querySelectorAll("[data-enquire]").forEach(function (a) {
    if (!numberOk) { a.hidden = true; return; }
    var product = a.getAttribute("data-enquire");
    var price = money(a.getAttribute("data-price-key") || "");
    var msg = product
      ? "Hello JAN Moissanite, I am interested in " + product + (price ? ", listed at " + price : "") + ". Could you please share more details and current availability?"
      : "Hello JAN Moissanite, I would like to ask about your jewellery.";
    var custom = a.getAttribute("data-message");  // optional: a fully written message
    if (custom) msg = custom;
    a.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
    a.target = "_blank";
    a.rel = "noopener";
  });

  document.querySelectorAll("[data-instagram]").forEach(function (a) {
    if (!INSTAGRAM_URL) { a.hidden = true; return; }
    a.href = INSTAGRAM_URL;
    a.target = "_blank";
    a.rel = "noopener";
  });

  // If WhatsApp is not configured, show a clear message instead of broken buttons.
  if (!numberOk) document.getElementById("cfg-note").hidden = false;

  // Photo switcher: a button with data-alt swaps between its two photos.
  document.querySelectorAll(".swap").forEach(function (b) {
    var img = b.querySelector("img");
    var first = img.getAttribute("src");
    var second = b.getAttribute("data-alt");
    b.addEventListener("click", function () {
      img.src = (img.getAttribute("src") === first) ? second : first;
    });
  });

  // Mobile menu
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  btn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setMenu(false); btn.focus(); } });
})();
