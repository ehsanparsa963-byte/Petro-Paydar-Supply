document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  var filterBtns = document.querySelectorAll(".filter-btn");
  var equipmentCards = document.querySelectorAll(".equipment-card");

  if (filterBtns.length && equipmentCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");

        var category = btn.getAttribute("data-filter");

        equipmentCards.forEach(function (card) {
          var show = category === "همه" || card.getAttribute("data-category") === category;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  var rfqForm = document.querySelector(".rfq-form");
  var GOOGLE_SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbx2noOeLUYaLTflnqq70dsdAI7tri68Kv-b40mM-HOno4SkJU3b1mRp0IRIPYT8Loj9/exec";

  if (rfqForm) {
    rfqForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var existingNote = rfqForm.querySelector(".form-success");
      if (existingNote) {
        existingNote.remove();
      }

      var submitBtn = rfqForm.querySelector("button[type=submit]");
      var originalBtnText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "در حال ارسال...";
      }

      var formData = new FormData(rfqForm);

      fetch(GOOGLE_SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: formData
      })
        .catch(function (err) {
          console.error("خطا در ارسال درخواست به شیت:", err);
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
          }

          var success = document.createElement("p");
          success.className = "form-success";
          success.textContent = "درخواست شما با موفقیت ثبت شد. کارشناسان ما به‌زودی با شما تماس می‌گیرند.";
          rfqForm.appendChild(success);

          rfqForm.reset();
        });
    });
  }
});
