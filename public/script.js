const form = document.getElementById("contactForm");
const strength = document.getElementById("strength");
const result = document.getElementById("result");
const password = document.getElementById("password");

password.addEventListener("input", () => {
    const value = password.value;

    if (value.length < 6) {
        strength.innerHTML = "Weak Password";
        strength.style.color = "red";
    } else if (value.length < 10) {
        strength.innerHTML = "Medium Password";
        strength.style.color = "orange";
    } else {
        strength.innerHTML = "Strong Password";
        strength.style.color = "green";
    }
});

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;
    const message = document.getElementById("message").value.trim();

    if (name === "") {
        alert("Enter Name");
        return;
    }

    if (!email.includes("@")) {
        alert("Enter Valid Email");
        return;
    }

    if (pass !== confirm) {
        alert("Passwords do not match");
        return;
    }

    // Changed endpoint from /api/messages to /api/contact
    const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            message
        })
    });

    const data = await response.json();

    result.innerHTML = `
        <div class="alert alert-success">
            <h4>${data.message}</h4>
            <p><b>Name:</b> ${data.data.name}</p>
            <p><b>Email:</b> ${data.data.email}</p>
            <p><b>Message:</b> ${data.data.message}</p>
        </div>
    `;

    form.reset();
    strength.innerHTML = "";
});

async function registerUser() {

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });

    const data = await response.json();

    document.getElementById("authResult").innerHTML =
        `<div class="alert alert-info">${data.message}</div>`;
}

async function loginUser() {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    document.getElementById("authResult").innerHTML =
        `<div class="alert alert-success">${data.message}</div>`;
}