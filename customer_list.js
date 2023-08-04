document.addEventListener("DOMContentLoaded", function() {
    // Check if the user is authenticated (has a bearer token)
    const bearerToken = localStorage.getItem("bearerToken");
    if (!bearerToken) {
        window.location.href = "login.html"; // Redirect to Login Screen if not authenticated
    } else {
        // Replace 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list' with the actual get customer list API URL
        fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${bearerToken}`
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 401) {
                    throw new Error("Invalid Authorization");
                } else {
                    throw new Error("Failed to fetch customer list");
                }
            })
            .then(data => {
                const customerTable = document.getElementById("customerTable");
                const tbody = customerTable.getElementsByTagName("tbody")[0];
                tbody.innerHTML = "";

                data.forEach(customer => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                    <td>${customer.first_name}</td>
                    <td>${customer.last_name}</td>
                    <td>${customer.street}</td>
                    <td>${customer.address}</td>
                    <td>${customer.city}</td>
                    <td>${customer.state}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>
                        <button onclick="editCustomer('${customer.uuid}')">Edit</button>
                        <button onclick="deleteCustomer('${customer.uuid}')">Delete</button>
                    </td>
                `;
                    tbody.appendChild(row);
                });
            })
            .catch(error => {
                alert(error.message);
            });
    }
});

function editCustomer(uuid) {
    window.location.href = `edit_customer.html?uuid=${uuid}`;
}

function deleteCustomer(uuid) {
    if (confirm("Are you sure you want to delete this customer?")) {
        // Replace 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp' with the actual delete customer API URL
        fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("bearerToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ cmd: "delete", uuid })
            })
            .then(response => {
                if (response.ok) {
                    alert("Customer deleted successfully!");
                    window.location.reload();
                } else if (response.status === 401) {
                    throw new Error("Invalid Authorization");
                } else if (response.status === 400) {
                    throw new Error("UUID not found");
                } else {
                    throw new Error("Failed to delete customer");
                }
            })
            .catch(error => {
                alert(error.message);
            });
    }
}