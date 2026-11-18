
// DISPLAY SUCCESS MESSAGES

function showToast(message) {

    const oldToast = document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}


// MOBILE HAMBURGER MENU

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";

});


// CLOSE MENU AFTER CLICKING A NAVIGATION LINK

document.querySelectorAll("#nav-links a").forEach(link => {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

    });

});


// FILTER MATCHES BY TEAM

const teamFilter = document.getElementById("team-filter");

const matchCards = document.querySelectorAll(".match-card");

const noMatches = document.getElementById("no-matches");

teamFilter.addEventListener("change", function () {

    const selectedTeam = teamFilter.value;

    let visibleCount = 0;

    matchCards.forEach(card => {

        const teams = card.dataset.team.split(" ");

        if (
            selectedTeam === "all" ||
            teams.includes(selectedTeam)
        ) {

            card.style.display = "";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });

    noMatches.hidden = visibleCount !== 0;

});


// SWITCH BETWEEN GRID AND LIST VIEW

const matchContainer = document.getElementById("match-container");

const gridButton = document.getElementById("grid-view");

const listButton = document.getElementById("list-view");

gridButton.addEventListener("click", function () {

    matchContainer.classList.remove("list-view");

    gridButton.classList.add("active-view");

    listButton.classList.remove("active-view");

});

listButton.addEventListener("click", function () {

    matchContainer.classList.add("list-view");

    listButton.classList.add("active-view");

    gridButton.classList.remove("active-view");

});


// BOOKING FORM ELEMENTS

const bookingForm = document.getElementById("booking-form");

const matchSelect = document.getElementById("match");

const standSelect = document.getElementById("stand");

const quantityInput = document.getElementById("quantity");


// TICKET PRICE DETAILS

const ticketPrices = {

    "RCB vs CSK": {
        "General": 1500,
        "Premium": 3000,
        "VIP": 5000
    },

    "MI vs KKR": {
        "General": 2000,
        "Premium": 3500,
        "VIP": 6000
    }

};


// UPDATE BOOKING SUMMARY

function updateBookingSummary() {

    const selectedMatch = matchSelect.value;

    const selectedStand = standSelect.value;

    const quantity = Number(quantityInput.value);

    const price = ticketPrices[selectedMatch][selectedStand];

    const total = price * quantity;

    document.getElementById("summary-match").textContent =
        selectedMatch;

    document.getElementById("summary-stand").textContent =
        selectedStand;

    document.getElementById("summary-price").textContent =
        "₹" + price.toLocaleString("en-IN");

    document.getElementById("summary-quantity").textContent =
        quantity;

    document.getElementById("summary-total").textContent =
        "₹" + total.toLocaleString("en-IN");

}


// UPDATE SUMMARY WHEN USER CHANGES SELECTIONS

matchSelect.addEventListener("change", updateBookingSummary);

standSelect.addEventListener("change", updateBookingSummary);

quantityInput.addEventListener("input", updateBookingSummary);


// BOOK MATCH BUTTONS

document.querySelectorAll(".book-match").forEach(button => {

    button.addEventListener("click", function () {

        const selectedMatch = button.dataset.match;

        matchSelect.value = selectedMatch;

        updateBookingSummary();

        document.getElementById("booking").scrollIntoView({
            behavior: "smooth"
        });

        showToast("Ready to book your IPL tickets!");

    });

});


// CONFIRM BOOKING

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!bookingForm.reportValidity()) {
        return;
    }

    updateBookingSummary();

    const selectedMatch = matchSelect.value;

    const selectedStand = standSelect.value;

    const quantity = Number(quantityInput.value);

    const price = ticketPrices[selectedMatch][selectedStand];

    const total = price * quantity;

    const bookingId = "IPL" + Date.now().toString().slice(-6);

    const bookingRecords = document.getElementById("booking-records");

    const emptyRow = document.getElementById("empty-bookings");

    if (emptyRow) {
        emptyRow.remove();
    }

    const newRow = document.createElement("tr");

    const values = [
        bookingId,
        selectedMatch,
        selectedStand,
        quantity,
        "₹" + total.toLocaleString("en-IN"),
        "Confirmed"
    ];

    values.forEach(value => {

        const cell = document.createElement("td");

        cell.textContent = value;

        newRow.appendChild(cell);

    });

    bookingRecords.appendChild(newRow);

    showToast("Booking details confirmed successfully!");

});


// RESET FORM

bookingForm.addEventListener("reset", function () {

    setTimeout(() => {

        updateBookingSummary();

        showToast("Booking form has been reset!");

    }, 0);

});


// INITIAL BOOKING SUMMARY

updateBookingSummary();
