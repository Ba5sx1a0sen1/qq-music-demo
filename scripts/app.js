(function () {
    fetch("/json/rec.json")
        .then(res => res.json())
        .then(render)
    fetch("/json/rank.json")
        .then(res => res.json())
        .then(json => json.data.topList)
        .then(renderTopList)

    function render(json) {
        renderSlider(json.data.slider)
        renderRadios(json.data.radioList)
        renderPlayLists(json.data.songList)
        lazyload(document.querySelectorAll(".lazyload"))
    }

    function renderSlider(slides) {
        let slidess = slides.map(slide => {
            return {
                link: slide.linkUrl,
                image: slide.picUrl
            }
        })
        new Slider({
            el: document.querySelector("#slider"),
            slides: slidess,
        })
    }

    function renderRadios(radios) {
        let list = document.querySelector(".radios .list")
        list.innerHTML = radios.map(radio => `
            <div class="list-item">
                <div class="list-media">
                    <img class="lazyload" data-src=${radio.picUrl} alt="">
                    <span class="icon icon-play"></span>
                </div>
                <div class="list-title">
                    ${radio.Ftitle}
                </div>
            </div>
            `).join('')
    }

    function renderPlayLists(playLists) {
        let list = document.querySelector(".hotlists .list")
        list.innerHTML = playLists.map(radio => `
            <div class="list-item">
                <div class="list-media">
                    <img class="lazyload" data-src=${radio.picUrl} alt="">
                    <span class="icon icon-play"></span>
                </div>
                <div class="list-title">
                    ${radio.songListDesc}
                </div>
            </div>
            `).join('')
    }
    
    function renderTopList(List) {
        document.querySelector("#rank-view .toplist").innerHTML = List.map(item => `
        <li class="top-item">
        <div class="top-item-media">
            <a href="#">
                <img class="lazyload" data-src="${item.picUrl}" alt="">
            </a>
        </div>
        <div class="top-item-info">
            <h3 class="top-item-title ellipsis">${item.topTitle}</h3>
            <ul class="top-item-list">
                ${songlist(item.songList)}
            </ul>
        </div>
    </li>`).join("")
    lazyload(document.querySelectorAll("#rank-view .toplist .lazyload"))
    function songlist(songs){
        return songs.map((song,i) => `
        <li class="top-item-song">
            <i class="song-index">${i+1}</i>
            <span class="song-name">${song.songname}</span>- ${song.singername}
        </li>
        `).join("")
    }
    }
})()