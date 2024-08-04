document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Kayıtlı e-posta ve şifreyi yerel depolamaya kaydet
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);

            console.log("Registration Successful");
            window.location.href = "login.html";
        });
    }
});
