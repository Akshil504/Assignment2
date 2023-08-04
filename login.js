document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const loginData = {
        login_id: document.getElementById("login_id").value,
        password: document.getElementById("password").value
    };

    // Replace 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp' with the actual authentication API URL
    fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', {
            method: "POST",
            //mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "no-cors",
                // "Access-Control-Allow-Origin": "https://developer.mozilla.org",
                "Vary": "Origin"
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            // console.log(response);
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error("Invalid Authorization");
            } else {
                throw new Error("Authentication Failed");
            }
        })
        .then(data => {
            // Save the bearer token to local storage
            localStorage.setItem("bearerToken", data.token);

            // Redirect to the Customer List Screen
            window.location.href = "customer_list_screen.html";
        })
        .catch(error => {
            alert(error.message);
        });
});