function sendMail() {
    // Prevent form submission
    event.preventDefault();

    // Collect form data
    let parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    // Validate form data
    if (!parms.name || !parms.email || !parms.subject || !parms.message) {
        alert("Please fill out all fields.");
        return;
    }

    // Send email
    emailjs.send("service_de8t36s", "template_rrpoqib", parms)
        .then(function(response) {
            console.log("SUCCESS!", response.status, response.text);
            alert("Email Sent");
        }, function(error) {
            console.error("FAILED...", error);
            alert("Email Failed to Send: " + error.text);
        });
}
