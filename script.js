let req = new XMLHttpRequest();
let aside = document.getElementsByTagName('aside')[0]
let divContent = document.getElementById('content')
let image = document.getElementById('image')
let leftArrow = document.getElementsByClassName('left-arrow')[0]
let rightArrow = document.getElementsByClassName('right-arrow')[0]
let srcImages = []
let cntImage = 0

function goToContent(id) {
    sessionStorage.setItem('selectedID', id);
    window.location.href = "../content/index.html";
}



function addContent(src){
    if(src.includes("youtube")){
        src = src.split("/")[4]
        divContent.innerHTML = `<iframe  width="100%" height="400px" src="https://www.youtube.com/embed/${src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }else 
        divContent.innerHTML = `<img id="image" src=${src}>`
}

leftArrow.addEventListener('click', function(){
    if(cntImage == 0)
        cntImage = 3
    else
        cntImage--
    addContent(srcImages[cntImage])
})

rightArrow.addEventListener('click', function(){
    cntImage = (cntImage + 1) % 4
    addContent(srcImages[cntImage])
})

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    let data = JSON.parse(req.responseText);
    let i = 0
    data.record.forEach(element => {
        if(i<4){
            let words = element.descrizione.split(/\s+/);
            let descrizione = words.length > 15 ? 
                                words.slice(0, 15).join(' ') + '...' : 
                                element.descrizione; 
            aside.innerHTML += '<div> <img src='+element.contenuto+'><h3>'
                                + element.titolo +'</h3><p>'+descrizione+'</p><button onclick="goToContent('+i+')">Esplora</button></div>'
            srcImages[i] = element.contenuto
        }
        i++
    });
    addContent(srcImages[0])
    

  }
};

req.open("GET", "https://api.jsonbin.io/v3/b/65eb0f271f5677401f3a4a74/latest", true);
req.setRequestHeader("X-Master-Key", "$2b$10$nptEQV7BQ.JZcnJ0sWwfIOpydX/kY2umc3BeOHriEvvHHBMmG0QB6");
req.send();
document.addEventListener('DOMContentLoaded', function() {
    var breadcrumbs = [
        { name: "Home", url: "index.html" },
    ];

    var container = document.getElementById('breadcrumbsNav');
    container.innerHTML = breadcrumbs.map(function(crumb, index) {
        if (index < breadcrumbs.length - 1) {
            return '<a href="' + crumb.url + '">' + crumb.name + '</a> <span> > </span> ';
        } else {
            return '<span>' + crumb.name + '</span>';
        }
    }).join('');
});
