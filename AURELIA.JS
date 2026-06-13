
        document.addEventListener('DOMContentLoaded', function () {
            const bookingForm = document.getElementById('bookingForm');
            const errorBox = document.getElementById('bookingError');
            const whatsappNumber = '918340096039';

            function showError(message) {
                if (errorBox) {
                    errorBox.textContent = message;
                    errorBox.classList.add('show');
                }
            }

            function clearError() {
                if (errorBox) {
                    errorBox.textContent = '';
                    errorBox.classList.remove('show');
                }
            }

            function getValue(id) {
                const element = document.getElementById(id);
                return element ? element.value.trim() : '';
            }

            function formatDate(dateValue) {
                if (!dateValue) return 'Not specified';
                const parts = dateValue.split('-');
                if (parts.length !== 3) return dateValue;
                return `${parts[2]}-${parts[1]}-${parts[0]}`;
            }

            function buildWhatsAppMessage() {
                const checkIn = getValue('CHECK-IN');
                const checkOut = getValue('CHECK-OUT');
                const name = getValue('name');
                const email = getValue('email');
                const phone = getValue('phone');
                const guests = getValue('guests');
                const roomType = getValue('ROOMTYPE');
                const requests = getValue('requests');

                if (!checkIn || !checkOut || !name || !email || !phone || !guests || !roomType) {
                    return { error: 'Please fill all required booking details before opening WhatsApp.' };
                }

                if (new Date(checkOut) <= new Date(checkIn)) {
                    return { error: 'Check-out date must be after check-in date.' };
                }

                const bookingNumber = 'AUR-' + Date.now().toString().slice(-6);

                const message = `🏨 *AURELIA Resort & Spa - Booking Request*

🔖 *Booking ID:* ${bookingNumber}

👤 *Guest Details*
Name: ${name}
Email: ${email}
Phone: ${phone}

📅 *Stay Details*
Check-In: ${formatDate(checkIn)}
Check-Out: ${formatDate(checkOut)}
Guests: ${guests}
Room Type: ${roomType}

${requests ? `📝 *Special Requests*\n${requests}\n\n` : ''}_Sent from AURELIA website_`;

                return { url: `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}` };
            }

            if (bookingForm) {
                bookingForm.addEventListener('submit', function (event) {
                    event.preventDefault();
                    clearError();

                    const result = buildWhatsAppMessage();
                    if (result.error) {
                        showError(result.error);
                        return;
                    }

                    // Same-tab redirect is the most reliable option on GitHub Pages and mobile browsers.
                    window.location.href = result.url;
                });
            }
        });
