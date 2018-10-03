class Search {
    constructor(el) {
        this.$el = el
        this.$input = this.$el.querySelector("#search")
        this.$input.addEventListener('keyup', this.onInput.bind(this))
        this.$songs = this.$el.querySelector(".song-list")
        this.keyword = ''
        this.page = 1
        this.perpage = 20
        this.songs = []
        this.nomore = false
        this.fetching = false
        this.onscroll = this.onScroll.bind(this)
        window.addEventListener('scroll', this.onscroll)
    }
    onScroll(event) {
        if (this.nomre) return window.removeEventListener('scroll', this.onscroll)
        if (document.documentElement.clientHeight + document.documentElement.scrollTop > document.documentElement.scrollHeight - 50) {
            this.search(this.keyword, this.page + 1)
        }
    }
    onInput(event) {
        let keyword = event.target.value.trim();
        if (!keyword) return this.reset()
        if (event.keyCode !== 13) return
        this.search(keyword)
    }
    reset() {
        this.page = 1
        this.keyword = ''
        this.songs = []
        this.$songs.innerHTML = ''
    }
    search(keyword, page) {
        if (this.fetching) return
        this.keyword = keyword
        this.fetching = true
        this.loading()
        fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${page || this.page}`)
            .then(res => res.json())
            .then((json) => {
                this.page = (json.data.song.curpage === 0 ? this.page : json.data.song.curpage) //防止接口返回query error将page置为0
                this.nomore = (json.message === 'no results')
                this.songs.push(...json.data.song.list)
                return json.data.song.list
            })
            .then(songs => this.append(songs))
            .then(() => this.fetching = false)
            .catch(() => this.fetching = false)
    }
    append(songs) {
        let html = songs.map(song => {
            let artist = song.singer.map(s => s.name).join(' ')//改成songmid，不然无法播放
            return `
            <a class="song-item" href="#player?artist=${artist}&songmid=${song.songmid}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
                <i class="icon icon-music"></i>
                <div class="song-name ellipsis">${song.songname}</div>
                <div class="song-artist ellipsis">${song.singer.map(s => s.name).join('')}</div>
            </a>
        `
        }).join("")
        this.$songs.insertAdjacentHTML('beforeEnd', html)
    }
    loading() {
        this.fetching = true
        this.$el.querySelector('.search-loading').classList.add('show')
    }

    done() {
        this.fetching = false
        if (this.nomore) {
            this.$el.querySelector('.loading-icon').style.display = 'none'
            this.$el.querySelector('.loading-text').style.display = 'none'
            this.$el.querySelector('.loading-done').style.display = 'block'
            this.$el.querySelector('.search-loading').classList.add('show')
        } else {
            this.$el.querySelector('.search-loading').classList.remove('show')
        }
    }
}