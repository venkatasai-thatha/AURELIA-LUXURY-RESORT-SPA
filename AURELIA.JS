   document.querySelector("#sectionBooking form").addEventListener("submit", function(e)  {
        e.preventDefault();

        const checkIn = document.getElementById('CHECK-IN').value;
        const checkOut = document.getElementById('CHECK-OUT').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const guests = document.getElementById('guests').value;
        const roomType = document.getElementById('ROOMTYPE').value;
        const requests = document.getElementById('requests').value;

        const formatDate = (d) => {
            if (!d) return 'Not specified';
            const date = new Date(d);
            return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        };

        // Unique booking number generate
        const bookingNumber = 'AUR-' + Date.now().toString().slice(-6);

        const message = 
    `🏨 *AURELIA Resort — Booking Request*
    🔖 *Booking ID: ${bookingNumber}*

    👤 *Guest Details*
    - Name: ${name}
    - Email: ${email}
    - Phone: ${phone}

    📅 *Stay Details*
    - Check-In: ${formatDate(checkIn)}
    - Check-Out: ${formatDate(checkOut)}
    - Guests: ${guests}
    - Room Type: ${roomType}

    ${requests ? `📝 *Special Requests*\n${requests}` : ''}

    _Sent from AURELIA website_`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = '918340096039';
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });
    