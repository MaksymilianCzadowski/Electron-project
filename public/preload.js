// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge } = require("electron");
const sound = require("sound-play");

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
process.once("loaded", () => {
  contextBridge.exposeInMainWorld("versions", process.versions);
  contextBridge.exposeInMainWorld("electron", {
    alertNotification: (sender, content) => {
      sound.play("./public/sounds/discord-notification.mp3");
      new Notification(`You just receive new message from ${sender}`, {
        body: content,
      });
    }
  });
});