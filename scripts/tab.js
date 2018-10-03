initialTabView(location.hash)
document.addEventListener('click', function (event) {
    let target = event.target
    if (target.dataset.role !== 'tab') return
    let content = document.querySelector(target.dataset.view)
    location.hash = target.dataset.view
    Array.prototype.forEach.call(target.parentElement.children, tab => {
        tab.classList.remove("active")
    })
    target.classList.add("active");
    if (content) {
        Array.prototype.forEach.call(content.parentElement.children, child => child.style.display = 'none')
        content.style.display = 'block'
    }
})
console.log(location.hash)

function initialTabView(hash) {
    switch (hash) {
        case "#.rec-view":
            initialTabActive(hash);
            break;
        case "#.rank-view":
            initialTabActive(hash);
            break;
        case "#.search-view":
            initialTabActive(hash);
            break;
    }
}

function initialTabActive(hash) {
    let myhash = hash.substr(1);
    let lis = document.querySelectorAll(".nav-item")
    Array.prototype.forEach.call(lis, (li) => {
        let contentTab = document.querySelector(li.dataset.view)
        contentTab.style.display = 'none'
        li.classList.remove('active')
        if (li.dataset.view === myhash) {
            li.classList.add('active')
            contentTab.style.display = 'block'
        }
    })
}