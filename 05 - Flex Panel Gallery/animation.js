const panels = Array.from(document.querySelectorAll('.panel'));

function toggleOpen(){
    //在元素中切换类名。第一个参数为要在元素中移除的类名，并返回false，如果该类名不存在则在元素中添加类名，并返回true
    this.classList.toggle('open');
}

function toggleActive(e){
    if(e.propertyName.includes('flex')){
        this.classList.toggle('open-active');
    }
}
panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend',toggleActive));