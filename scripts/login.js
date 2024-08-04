document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const userEmail = localStorage.getItem("userEmail");
  const userMenu = document.getElementById("user-menu");
  const loginOptions = document.getElementById("login-options");
  const loginTextNodes = document.querySelectorAll(".loginText");
  const registerTextNodes = document.querySelectorAll(".registerText");
  const financeText = document.getElementById("financeText");
  const userMoney = parseFloat(document.getElementById("userMoney")).value;
  const userMoneyText = document.getElementById("userMoneyText");


  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputEmail = document.getElementById("email").value;
        const inputPassword = document.getElementById("password").value;

        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (inputEmail === storedEmail && inputPassword === storedPassword) {
            console.log("Login Successful");
            window.location.href = "index.html";
            localStorage.setItem("userEmail", inputEmail);
            localStorage.setItem("userMoney", userMoney);
    
        } else {
            console.log("Incorrect email or password");
            alert("Incorrect email or password");
        }
    });
}

  if (document.getElementById("guest")) {
    document.getElementById("guest").addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }

  if (userEmail) {
    const userMoney = localStorage.getItem("userMoney");
    if (loginOptions) {
      loginOptions.innerHTML = `${userEmail}`;
    }
    if (userMoneyText) {
      userMoneyText.innerHTML = `Balance: $${userMoney}`;
    }
    loginTextNodes.forEach(function (loginText) {
      loginText.innerHTML = "Settings";
      loginText.removeEventListener("click", handleLoginClick);
      loginText.addEventListener("click", function () {
        window.location.href = "settings.html";
      });
    });

    registerTextNodes.forEach(function (registerText) {
      registerText.innerHTML = "Profile";
      registerText.removeEventListener("click", handleRegisterClick);
      registerText.addEventListener("click", function () {
        window.location.href = "profile.html";
      });
    });
    if (financeText) {
      financeText.innerHTML = `Welcome Back : ${userEmail}`;
    }
  } else {
    if (loginOptions) {
      loginOptions.innerHTML = "Guest";
    }
    loginTextNodes.forEach(function (loginText) {
      loginText.innerHTML = "Login";
      loginText.removeEventListener("click", handleLoginClick);
      loginText.addEventListener("click", handleLoginClick);
    });
    registerTextNodes.forEach(function (registerText) {
      registerText.innerHTML = "Register";
      registerText.removeEventListener("click", handleRegisterClick);
      registerText.addEventListener("click", handleRegisterClick);
    });
  }

  document.querySelectorAll(".log-out").forEach(function (logOutBtn) {
    logOutBtn.addEventListener("click", function () {
      localStorage.removeItem("userEmail");
      window.location.href = "login.html";
      localStorage.removeItem("userMoney");
    });
  });

  // Event handler functions
  function handleLoginClick() {
    window.location.href = "login.html";
  }

  function handleRegisterClick() {
    window.location.href = "register.html";
  }
});
