function showTab(id) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.createElement("button");
  installBtn.innerText = "Install App";
  installBtn.className = "install-btn";
  document.body.appendChild(installBtn);

  installBtn.addEventListener("click", () => {
    installBtn.style.display = "none";
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});

function askPermissionAndNotify() {
  if (Notification.permission === "granted") {
    setTimeout(() => {
      new Notification("Corporate Alert 🚨", {
        body: "Reminder: Approve vendor payment before 5 PM.",
        icon: "icon-192.png",
      });
    }, 90000);
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