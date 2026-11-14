


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




document.querySelectorAll('a[href="#booking"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const bookingSection = document.getElementById("booking");

        if (bookingSection) {
            event.preventDefault();

            bookingSection.scrollIntoView({
                behavior: "smooth"
            });

            showToast("Ready to book your IPL tickets!");
        }

    });

});
