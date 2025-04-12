function showTab(id) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

// Request notification permission
function askPermissionAndNotify() {
  if (Notification.permission === "granted") {
    setTimeout(() => {
      new Notification("Corporate Alert 🚨", {
        body: "Reminder: Approve vendor payment before 5 PM.",
        icon: "icon-192.png",
      });
    }, 90000); // 90 seconds
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        setTimeout(() => {
          new Notification("Corporate Alert 🚨", {
            body: "Reminder: Approve vendor payment before 5 PM.",
            icon: "icon-192.png",
          });
        }, 90000);
      }
    });
  }
}

window.onload = () => {
  askPermissionAndNotify();
};
