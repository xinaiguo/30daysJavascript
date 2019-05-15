function spacingChange(){
    const spacing = document.querySelector("#spacing");
    document.body.style.setProperty('--spacing',spacing.value+'px');

}

function blurChange() {  
    const spacing = document.querySelector("#blur");
    document.body.style.setProperty('--blur',blur.value+'px');
}

function baseChange(){
    const spacing = document.querySelector("#base");
    document.body.style.setProperty('--base',base.value);
}