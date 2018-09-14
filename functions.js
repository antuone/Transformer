function autoClearContainer(selector, log) {
    var id_interval = setInterval(function (event) {
        var adContainer = document.querySelector(selector);
        if (adContainer) {
            clearInterval(id_interval);
            adContainer.style.display = 'none';
            adContainer.addEventListener('DOMSubtreeModified', function () {
                if (adContainer.firstElementChild) {
                    adContainer.firstElementChild.remove()
                    console.log('Реклама убрана.');
                }
            });
            console.log(log);
        }
    }.bind(this), 500);        
}

function $(id) {
    return document.getElementById(id);
}

function getElementByClassName(className, n) {
    return document.getElementsByClassName(className)[n];
}

function removeElement(element) {
    if (element) {
        element.parentNode.removeChild(element);
    }
}

function changeStyleElement(element, parameter, value) {
    if (element) {
        element.style[parameter] = value;
    }
}

function changeStyleFirstElementByClassName(className, parameter, value) {
    changeStyleElement(getElementByClassName(className, 0), parameter, value);
}

function removeFirstElementByClassName(className) {
    removeElement(getElementByClassName(className, 0));
}

function removeElementByClassName(className, n) {
    removeElement(getElementByClassName(className, n));
}

function removeElementById(id) {
    removeElement($(id));
}

function removeAllElementsByClassName(className) {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        removeElement(elements[i]);
    }
}

function removeAllElementsByTagName(tag) {
    var elements = document.getElementsByTagName(tag)
    for (var i = 0; i < elements.length; i++) {
        removeElement(elements[i]);
    }
}

var allow = {
    blur: false,
    click: false,
    transitionend: false,
    mouseout: false,
    pointerout: false,
    mousemove: false,
    pointermove: false,
    pointerover: false,
    mouseover: false,
    wheel: false,
    scroll: false,
    animationiteration: false,
    animationstart: false,
    animationend: false,
    focus: false,
    pointerdown: false,
    mousedown: false,
    pointerup: false,
    mouseup: false
};

function addAllEventListeners() {
    for (const key in window) {
        if (key.search(/\bon/) == 0) {
            window.addEventListener(key.slice(2), function (event) {
                if (event.type in allow) {
                    return;
                }
                console.log(event);
            }.bind(this));
        }
    }
}