## Day17 - Sort Without Articles(无冠词排序）

##### 实现效果：对列表中列表项内容进行无冠词排序，在排序时不考虑a,an,the（大小写）的影响，点击ascending按钮进行升序，按下descending进行降序。
### 源码分析
```CSS
html{
    
    background: url(./photo.jpg) center no-repeat;
    background-size: cover;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    font-size: 20px;
    color: black;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
}
#wrap{
    margin: auto;
}

#wrap p{
    text-align: center;
    margin-bottom: 40px;

}

a{
    color: #ffc600;
    text-decoration: none;
}

#band{
    list-style: inside square;
    background: rgba(255, 255, 255, 0.75);
    padding: 0;
    width:500px;
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0.25);
}

li{
    padding: 17px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}

li:last-child{
    border-bottom: 0px;
}
```
```HTML
    <div id="wrap">
        <p class="sort">Sort <a href="#" data-asc="true">Ascending</a> | <a href="#" data-asc="false">Descending</a></p>
        <ul id="band"></ul>
    </div>
```
```JS
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
```
