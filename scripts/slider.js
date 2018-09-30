class Slider{
    constructor(options={}){
        this.$el = options.el
        this.slides = options.slides
        this.interval = options.interval || 3000
        this.index = 0
        this.render()
        this.start()
    }
    render(){
        this.$el.innerHTML = '<div class="qq-slider-wrap"></div>'
        this.$wrap = this.$el.firstElementChild
        this.$wrap.style.width = `${this.slides.length *100}%`
        this.$wrap.innerHTML = this.slides.map(
            slides=>
            `<div class="qq-slider-item">
                <a href="${slides.link}">
                    <img src="${slides.image}" alt="">
                </a>
            </div>
            `
        ).join("")
    }
    start(){
        setInterval(this.next.bind(this),this.interval)
    }
    next(){
        this.index += 1;
        if(this.index == this.slides.length){
            this.index = 0;
        }
        let x = `-${this.index * 100/this.slides.length}%`
        this.$wrap.style.transform = `translateX(${x})`
    }
}