   (function () {
            "use strict";

            const WHATSAPP_NUMBER = "918340096039";

            function getElement(id) {
                return document.getElementById(id);
            }

            function getValue(id) {
                const el = getElement(id);
                return el ? String(el.value || "").trim() : "";
            }

            function formatDate(dateValue) {
                if (!dateValue) return "Not specified";
                const parts = dateValue.split("-");
                if (parts.length !== 3) return dateValue;
                return `${parts[2]}-${parts[1]}-${parts[0]}`;
            }

            function showError(message) {
                const errorBox = getElement("bookingError");
                if (!errorBox) return;
                errorBox.textContent = message;
                errorBox.classList.add("show");
                errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
            }

            function clearError() {
                const errorBox = getElement("bookingError");
                if (!errorBox) return;
                errorBox.textContent = "";
                errorBox.classList.remove("show");
            }

            function buildWhatsAppUrl() {
                const checkIn = getValue("CHECK-IN");
                const checkOut = getValue("CHECK-OUT");
                const name = getValue("name");
                const email = getValue("email");
                const phone = getValue("phone");
                const guests = getValue("guests");
                const roomType = getValue("ROOMTYPE");
                const requests = getValue("requests");

                const bookingNumber = "AUR-" + Date.now().toString().slice(-6);

                const message = `🏨 *AURELIA Resort & Spa - Booking Request*

🔖 *Booking ID:* ${bookingNumber}

👤 *Guest Details*
Name: ${name || "Not filled"}
Email: ${email || "Not filled"}
Phone: ${phone || "Not filled"}

📅 *Stay Details*
Check-In: ${formatDate(checkIn)}
Check-Out: ${formatDate(checkOut)}
Guests: ${guests || "Not filled"}
Room Type: ${roomType || "Not selected"}

${requests ? `📝 *Special Requests*\n${requests}\n\n` : ""}_Sent from AURELIA website_`;

                return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            }

            function isBookingValid() {
                const requiredIds = ["CHECK-IN", "CHECK-OUT", "name", "email", "phone", "guests", "ROOMTYPE"];

                for (const id of requiredIds) {
                    const el = getElement(id);
                    if (!el || !String(el.value || "").trim()) {
                        if (el) el.focus();
                        showError("Please fill all booking details, then click Book via WhatsApp.");
                        return false;
                    }
                }

                const checkIn = getValue("CHECK-IN");
                const checkOut = getValue("CHECK-OUT");
                if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
                    getElement("CHECK-OUT").focus();
                    showError("Check-out date must be after check-in date.");
                    return false;
                }

                return true;
            }

            function openWhatsApp(event) {
                if (event) event.preventDefault();
                clearError();

                if (!isBookingValid()) return false;

                const url = buildWhatsAppUrl();

                // Works on GitHub Pages, mobile browser, desktop browser, and WhatsApp Web.
                window.location.assign(url);
                return false;
            }

            function updateFallbackLink() {
                const btn = getElement("whatsappBookingBtn");
                if (btn) btn.href = buildWhatsAppUrl();
            }

            document.addEventListener("DOMContentLoaded", function () {
                const form = getElement("bookingForm");
                const btn = getElement("whatsappBookingBtn");

                if (form) {
                    form.addEventListener("submit", function (event) {
                        event.preventDefault();
                        openWhatsApp(event);
                    });
                }

                if (btn) {
                    btn.addEventListener("click", openWhatsApp);
                }

                ["CHECK-IN", "CHECK-OUT", "name", "email", "phone", "guests", "ROOMTYPE", "requests"].forEach(function (id) {
                    const el = getElement(id);
                    if (el) el.addEventListener("input", updateFallbackLink);
                    if (el) el.addEventListener("change", updateFallbackLink);
                });

                updateFallbackLink();
            });
        })();
    
