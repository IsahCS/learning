var show = document.querySelector(".btn-menu")
var content = document.querySelector(".menu-ul")

show.addEventListener('click', function(){
    if (content.style.display === 'block'){
        content.style.display = 'none';
    } else {
        content.style.display = 'block'
    }
});
