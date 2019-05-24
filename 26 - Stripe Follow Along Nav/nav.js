const nav = document.querySelector('.top');
const menu = document.querySelectorAll('ul.cool > li');
const background = document.querySelector('.dropdownBackground');

function mouseEnter() {
    this.classList.add('trigger-enter');
    setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
    background.classList.add('open');

    const dropdown = this.querySelector('.dropdown');
    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();
    const coords = {
        width: dropdownCoords.width,
        height: dropdownCoords.height,
        left: dropdownCoords.left - navCoords.left,
        top: dropdownCoords.top - navCoords.top
    };
    background.style.setProperty('width', `${coords.width}px`);
    background.style.setProperty('height', `${coords.height}px`);
    background.style.setProperty('transform', `translate3D(${coords.left}px,${coords.top}px,0)`);
}

function mouseLeave() {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    background.classList.remove('open');
}
menu.forEach(ele => ele.addEventListener('mouseenter', mouseEnter));
menu.forEach(ele => ele.addEventListener('mouseleave', mouseLeave));