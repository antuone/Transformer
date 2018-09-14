
removeElementById('ads');
removeFirstElementByClassName('col240');

var h1 = document.getElementsByTagName('h1')[0];

h1.addEventListener('click', function () {
    var video = $('tvPlayerObj0').contentDocument.getElementById('tvigle_player');

    //console.log(video.firstChild.src);
    window.open(video.firstChild.src);
    //window.open();
});
