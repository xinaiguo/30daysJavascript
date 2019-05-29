let nav = document.querySelector('#main');
let navTop = nav.offsetTop;
document.addEventListener('scroll',fixNav);
function fixNav(){
    if(window.scrollY >= navTop){
        //元素的offsetHeight是一种元素CSS高度的衡量标准，包括元素的边框、内边距和元素的水平滚动条（如果存在且渲染的话），不包含:before或:after等伪类元素的高度。
        document.body.style.paddingTop = `${nav.offsetHeight}px`;
        document.body.classList.add('fixed-nav');
    }else{
        document.body.style.paddingTop = 0;
        document.body.classList.remove('fixed-nav');
    }
}