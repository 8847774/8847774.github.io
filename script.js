/* ===== SETTINGS: the only lines you normally edit ===== */
var WHATSAPP_NUMBER = "923318847774";  // country code + number, no + or spaces (Pakistan: drop the leading 0, add 92)
var INSTAGRAM_URL = "https://instagram.com/janmoissanite";  // leave "" to hide Instagram buttons
/* ======================================================= */

(function () {
  var numberOk = /^\d{10,15}$/.test(WHATSAPP_NUMBER);

  // Every link with data-enquire becomes a WhatsApp link with a ready-typed message.
  // data-enquire="JAN001 ..." names the product; empty means a general enquiry.
  document.querySelectorAll("[data-enquire]").forEach(function (a) {
    if (!numberOk) { a.hidden = true; return; }
    var product = a.getAttribute("data-enquire");
    var msg = product
      ? "Hello JAN Moissanite, I am interested in " + product + ". Could you please share more details and current availability?"
      : "Hello JAN Moissanite, I would like to ask about your jewellery.";
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
