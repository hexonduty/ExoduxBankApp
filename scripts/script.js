"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const userSearchText = document.getElementById("userSearch");
  const userSearchButton = document.getElementById("userSearchButton");
  const userSearchForm = document.getElementById("userSearchForm");

  if (userSearchForm) {
    userSearchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (userSearchText.value === "finance" || userSearchText.value === "Finance") {
        window.location.href = "finance.html";
      }
      if (userSearchText.value === "exchange" || userSearchText.value === "Exchange") {
        window.location.href = "exchange.html";
      }
      if (userSearchText.value === "contact" || userSearchText.value === "Contact") {
        window.location.href = "contact.html";
      }
      if (userSearchText.value === "login" || userSearchText.value === "Login") {
        window.location.href = "login.html";
      }
      if (userSearchText.value === "home" || userSearchText.value === "Home") {
        window.location.href = "index.html";
      }
      if (userSearchText.value === "register" || userSearchText.value === "Register") {
        window.location.href = "register.html";
      }
    });
  }
});
