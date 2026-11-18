


// ==========================================
// ACTIVITY 7: SELECTOR FORMS AND LIVE
// INTERACTION USING JAVASCRIPT
// ==========================================

// Select booking form controls using DOM selectors
const bookingForm = document.getElementById("booking-form");

const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");

// Select Booking Summary elements
const summaryMatch = document.getElementById("summary-match");
const summaryStand = document.getElementById("summary-stand");
const summaryPrice = document.getElementById("summary-price");
const summaryQuantity = document.getElementById("summary-quantity");
const summaryTotal = document.getElementById("summary-total");

// Toast notification element
const toast = document.getElementById("toast");

// Ticket prices for each match and stand category
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

// ==========================================
// SHOW TOAST NOTIFICATION
// ==========================================

let toastTimer;

function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}

// ==========================================
// UPDATE BOOKING SUMMARY
// ==========================================

function updateBookingSummary() {

    const selectedMatch = matchSelect.value;
    const selectedStand = standSelect.value;

    let quantity = Number(quantityInput.value);

    // Validate ticket quantity
    if (!Number.isFinite(quantity) || quantity < 1) {
        quantity = 1;
        quantityInput.value = 1;
    }

    if (quantity > 10) {
        quantity = 10;
        quantityInput.value = 10;
    }

    let price = 0;
    let total = 0;

    // Calculate ticket price
    if (
        selectedMatch &&
        selectedStand &&
        ticketPrices[selectedMatch] &&
        ticketPrices[selectedMatch][selectedStand] !== undefined
    ) {
        price = ticketPrices[selectedMatch][selectedStand];
        total = price * quantity;
    }

    // Display selected booking details
    summaryMatch.textContent = selectedMatch || "Not selected";
    summaryStand.textContent = selectedStand || "Not selected";

    summaryPrice.textContent =
        "₹" + price.toLocaleString("en-IN");

    summaryQuantity.textContent = quantity;

    summaryTotal.textContent =
        "₹" + total.toLocaleString("en-IN");

    showToast("Booking summary updated!");
}

// ==========================================
// ADD EVENT LISTENERS
// ==========================================

// Update summary when match changes
matchSelect.addEventListener("change", updateBookingSummary);

// Update summary when stand changes
standSelect.addEventListener("change", updateBookingSummary);

// Update summary when quantity changes
quantityInput.addEventListener("input", updateBookingSummary);

// ==========================================
// FORM SUBMISSION
// ==========================================

bookingForm.addEventListener("submit", function (event) {

    // Prevent page reload
    event.preventDefault();

    if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
    }

    if (!matchSelect.value || !standSelect.value) {
        showToast("Please select a match and stand!");
        return;
    }

    updateBookingSummary();

    showToast("Booking details confirmed successfully!");
});

// ==========================================
// RESET BOOKING FORM
// ==========================================

bookingForm.addEventListener("reset", function () {

    setTimeout(function () {

        summaryMatch.textContent = "Not selected";
        summaryStand.textContent = "Not selected";
        summaryPrice.textContent = "₹0";
        summaryQuantity.textContent = "1";
        summaryTotal.textContent = "₹0";

        showToast("Booking form has been reset!");

    }, 0);
});
