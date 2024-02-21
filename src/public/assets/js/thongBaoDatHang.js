// Hàm hiển thị thông báo tùy chỉnh
function showCustomAlert(message) {
  const alertElement = document.getElementById("custom-alert");
  const messageElement = document.getElementById("alert-message");

  // Hiển thị thông báo và đặt nội dung
  alertElement.style.display = "block";
  messageElement.innerText = message;

  // Ẩn thông báo sau một khoảng thời gian (ví dụ: 5 giây)
  setTimeout(() => {
    hideCustomAlert();
    window.location.href = "/detailt-cart-trang-moi";
  }, 2000);
}

// Hàm ẩn thông báo tùy chỉnh
function hideCustomAlert() {
  const alertElement = document.getElementById("custom-alert");

  // Ẩn thông báo
  alertElement.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("dathang");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    // Assuming you are using FormData to serialize the form data
    const formData = new FormData(form);

    // Make an AJAX request
    fetch("/dat-hang", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showCustomAlert(data.message);
        } else {
          console.error("Error in dat-hang:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error in dat-hang:", error);
      });
  });
});
