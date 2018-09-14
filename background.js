
chrome.runtime.onMessage.addListener(
    function (message) {
        if (message.cmd == 'OpenTheSite') {
            chrome.tabs.executeScript({ file: 'Sites/' + message.host + '.js' });
        }
    });
