
console.log("Привет от трансформера");
chrome.extension.sendMessage({ cmd: 'OpenTheSite', host: window.location.hostname });
