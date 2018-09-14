
function get_video_links(responseText) {
    let video_info = responseText.match(/url_encoded_fmt_stream_map=([^&]+?)\&/i)[1];
    video_info = decodeURIComponent(video_info);
    video_info = video_info.split(/[&,]/);
    let video_links = {};
    for (let i = 0; i < video_info.length; i += 4) {
        let obj = {};
        let itag = 0;
        for (let j = 0; j < 4; j++) {
            let arr = video_info[i + j].split('=');
            if (arr[0] == 'itag') {
                itag = arr[1];
            } else {
                obj[arr[0]] = decodeURIComponent(arr[1]);
            }
        }
        video_links[itag] = obj;
    }
    return video_links;
}

function add_elements_on_page(video_links) {
    let container = document.querySelector('#info-contents #container');
    let button = document.createElement('button');
    button.style.cssFloat = 'right';
    button.style.height = '20px';
    button.textContent = 'Скачать';
    let select = document.createElement('select');

    button.addEventListener('click', function () {
        let title = document.querySelector('#container > h1').textContent;
        let a = document.createElement('a');
        a.href = select.value + '&title=' + title;
        a.textContent = title;
        a.download = 'download';
        a.click();
    }.bind(this));

    for (const key in video_links) {
        let option = document.createElement('option');
        option.textContent = video_links[key].quality + ' (format ' + key + ')';
        option.value = video_links[key].url;
        if (key == 22) {
            option.selected = 'selected';
        }
        select.append(option);
    }
    select.style.cssFloat = 'right';
    select.style.height = '20px';
    select.style.marginRight = '10px';

    select.id = 'download_select';
    button.id = 'download_button';

    container.prepend(select);
    container.prepend(button);
}

var id_interval = setInterval(function (params) {
    let h1 = document.querySelector('#container > h1');
    if (h1 && window.location.search && h1.textContent) {
        clearInterval(id_interval);
        listener_h1();
        function listener_h1() {
            let select = document.getElementById('download_select');
            let button = document.getElementById('download_button');
            if (select) {
                select.remove();
            }
            if (button) {
                button.remove();
            }
            let id = window.location.search.match(/\?v=([^&]+)/i)[1];

            let request = new XMLHttpRequest();
            request.open("POST", 'https://www.youtube.com/get_video_info', true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.send('video_id=' + id);

            request.onreadystatechange = function () {
                if (this.status == 200 && this.readyState === XMLHttpRequest.DONE) {
                    let links = get_video_links(request.responseText);
                    add_elements_on_page(links);
                }
            }
        }

        h1.addEventListener('DOMSubtreeModified', listener_h1);
    }
}.bind(this), 500);

var id_interval_2 = setInterval(function (event) {
    var videoAdContainer = document.querySelector('.video-ads');
    if (videoAdContainer) {
        clearInterval(id_interval_2);
        videoAdContainer.style.display = 'none';
        videoAdContainer.addEventListener('DOMSubtreeModified', function () {
            if (videoAdContainer.firstElementChild) {
                document.querySelector('#movie_player > div.html5-video-container > video').src = '';
                console.log('Реклама убрана.');
            }
        });
        console.log('Обработчик рекламы добавлен.');
    }
}.bind(this), 500);
