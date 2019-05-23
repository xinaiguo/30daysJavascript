const bandArr = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
const bandList = document.querySelector("#band");
const sorters = document.querySelectorAll('.sort > a');

function sort(e){
    const asc = e.target.dataset.asc;
    displaySortArr(alphaSort(bandArr,asc,'articles'),bandList);
}

function displaySortArr(arr,bandList){
    bandList.innerHTML = arr.map((item,i) => `<li data-index=${i}>${item}</li>`).join('');

}

function alphaSort(bandArr,asc=true,excl=null){
    let sortArr = [];
    let regex = null;
    const a = asc === "true"? 1 : -1;

    if (excl==='articles') {
        excl = ['an','a','the'];
    }
    if(excl instanceof Array){
        const exclusions = excl.map((item,i) => {
            if (i===excl.length-1) {
                return item + ' ';
            }else{
                return item + ' |';
            }
        }).join('');
        // 从头开始匹配an 或 a 或the 并且捕获匹配项
        regex = new RegExp('^('+exclusions+')','i');
    }else if (typeof excl === "string") {
        regex = excl;
    }else{
        regex='';
    }

    sortArr = bandArr.sort((curr,next) => {
        const exclCurr = curr.replace(regex,'').toLowerCase();
        const exclNext = next.replace(regex,'').toLowerCase();
        return exclCurr > exclNext ? a : -a;
    });
    return sortArr;

}

displaySortArr(bandArr,bandList);
sorters[0].addEventListener('click',sort);
sorters[1].addEventListener('click',sort);
