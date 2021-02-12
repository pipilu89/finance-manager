//https://developers.google.com/web/tools/workbox/guides/get-started
console.log("Hello from service-worker.js");
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

const { registerRoute } = workbox.routing;
const { NetworkFirst } = workbox.strategies;
const { StaleWhileRevalidate } = workbox.strategies;

//https://developers.google.com/web/tools/workbox/modules/workbox-strategies
//For requests that are updating frequently, the network first strategy is the ideal solution. By default, it will try to fetch the latest response from the network. If the request is successful, it’ll put the response in the cache. If the network fails to return a response, the cached response will be used.
registerRoute(/\.js$/, new NetworkFirst()); //best for development? quicker to update
//registerRoute(/\.js$/, new StaleWhileRevalidate()); //cache js file
registerRoute(/\.html$/, new StaleWhileRevalidate());
registerRoute(/\.css$/, new StaleWhileRevalidate());
registerRoute(/\.json$/, new StaleWhileRevalidate());
registerRoute(/\.png$/, new StaleWhileRevalidate());
registerRoute(/\.ico$/, new StaleWhileRevalidate());
//The stale-while-revalidate pattern allows you to respond to the request as quickly as possible with a cached response if available, falling back to the network request if it’s not cached. The network request is then used to update the cache. This is a fairly common strategy where having the most up-to-date resource is not vital to the application.
//Offline web apps will rely heavily on the cache, but for assets that are non-critical and can be gradually cached, a cache first is the best option.If there is a Response in the cache, the Request will be fulfilled using the cached response and the network will not be used at all. If there isn't a cached response, the Request will be fulfilled by a network request and the response will be cached so that the next request is served directly from the cache.

//To create a Workbox Background Sync Queue you need to construct it with a queue name (which must be unique to your origin):
//https://developers.google.com/web/tools/workbox/modules/workbox-background-sync
// const { Queue } = workbox.backgroundSync;

// const queue = new Queue("myQueueName");

// self.addEventListener("fetch", event => {
//   // Clone the request to ensure it's safe to read when
//   // adding to the Queue.
//   const promiseChain = fetch(event.request.clone()).catch(err => {
//     return queue.pushRequest({ request: event.request });
//   });

//   event.waitUntil(promiseChain);
// });
