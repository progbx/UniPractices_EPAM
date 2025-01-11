export function initApp() {
   if ("serviceWorker" in navigator) {
    
        navigator.serviceWorker.register("sw.js");
   } else {
       console.log("Service Worker is not supported!");
   }
   const button = document.getElementById("notification-button");
   button.addEventListener("click", function () {
       Notification.requestPermission().then(function (permission) {
           if (permission === "granted") {
                   new Notification("Hello, there!", {
                   body: "I can send you notifications even from outer space!",
                   icon: "images/rocket.jpg",
               });
           }
       });
   });
}

