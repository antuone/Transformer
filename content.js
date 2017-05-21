
window.addEventListener('load', function() {

    var host = window.location.hostname;

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


    if (host == 'music.yandex.ru') {
        changeStyleFirstElementByClassName('sidebar__placeholder', 'display', 'none');
        //removeFirstElementByClassName('sidebar__placeholder');
        removeFirstElementByClassName('overhead_theme_adv');
        //removeFirstElementByClassName('sidebar__under');
    }
    
    if (host == 'www.tvigle.ru') {
        removeElementById('ads');
        removeFirstElementByClassName('col240');

        var h1 = document.getElementsByTagName('h1')[0];

        h1.addEventListener('click', function(){
            var video = $('tvPlayerObj0').contentDocument.getElementById('tvigle_player');

            //console.log(video.firstChild.src);
            window.open(video.firstChild.src);
            //window.open();
        });
        

    }

    if (host == 'audioknigi.club') {
        removeFirstElementByClassName('rek-t');
        removeFirstElementByClassName('sidebar');
        removeFirstElementByClassName('rek-b');
        removeAllElementsByTagName('ins');
        removeFirstElementByClassName('rek-b');
        changeStyleFirstElementByClassName('book-info','white-space', 'normal');
    }

    if (host == 'sweetbook.net') {
        removeAllElementsByTagName('ins');
    }

});
