const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
checkboxes.forEach(checkbox => checkbox.addEventListener('click',handleCheck));
let lastChecked;
function handleCheck(e){
    let isBetween =false;
    if(e.shiftKey && this.checked){
        checkboxes.forEach(checkbox => {
            if(checkbox === this || checkbox === lastChecked){
                isBetween = !isBetween;
            }

            if(isBetween){
                checkbox.checked = true;
            }
        })
    }

    lastChecked = this;

}