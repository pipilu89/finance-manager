//--from https://developers.google.com/web/fundamentals/primers/service-workers
//inspect sw from within chrome: chrome://inspect/#service-workers
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    // navigator.serviceWorker.register("./service-worker.js").then(
    navigator.serviceWorker.register("/service-worker.js").then(
      function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}
