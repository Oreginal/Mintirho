document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("booking-form").addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Clicked");

        // Collect form data
        let parms = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            DOB: document.getElementById("datepicker1").value,
            date: document.getElementById("datepicker2").value,
            message: document.getElementById("message").value,
            therapyDrips: document.getElementById("therapy-drips").value,
        };

        // Validate form data
        if (!parms.name || !parms.phone || !parms.email || !parms.DOB || !parms.date || !parms.message || !parms.therapyDrips) {
            alert("Please fill out all fields.");
            return;
        }

        // Send email
        emailjs.send("service_de8t36s","template_gd2ec9q", parms)
            .then(function(response) {
                console.log("SUCCESS!", response.status, response.text);
                alert("Email Sent");
            }, function(error) {
                console.error("FAILED...", error);
                alert("Email Failed to Send: " + error.text);
            });
    });
});
