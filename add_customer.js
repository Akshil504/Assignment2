document.getElementById("addCustomerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const customerData = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        street: document.getElementById("street").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    // Replace 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp' with the actual create customer API URL
    fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("bearerToken")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cmd: "create", ...customerData })
        })
        .then(response => {
            if (response.ok) {
                alert("Customer created successfully!");
                window.location.href = "customer_list_screen.html";
            } else if (response.status === 401) {
                throw new Error("Invalid Authorization");
            } else if (response.status === 400) {
                throw new Error("First Name or Last Name is missing");
            } else {
                throw new Error("Failed to create customer");
            }
        })
        .catch(error => {
            alert(error.message);
        });
});