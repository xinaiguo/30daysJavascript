const search = document.querySelector(".search");
const suggestions = document.querySelector(".suggestion");
search.addEventListener("change",findMatches);
search.addEventListener("keyup",findMatches);

//fetch后台数据，并进行json化
const url = 'https://gist.githubusercontent.com/liyuechun/f00bb31fb8f46ee0a283a4d182f691b4/raw/3ea4b427917048cdc596b38b67b5ed664605b76d/TangPoetry.json';
const poetrys = [];
//Response {type: "cors", url: "https://gist.githubusercontent.com/liyuechun/f00bb…7917048cdc596b38b67b5ed664605b76d/TangPoetry.json", redirected: false, status: 200, ok: true…}body: ReadableStreamlocked: (...)__proto__: ObjectbodyUsed: trueheaders: Headers__proto__: Headersok: trueredirected: falsestatus: 200statusText: "OK"type: "cors"url: "https://gist.githubusercontent.com/liyuechun/f00bb31fb8f46ee0a283a4d182f691b4/raw/3ea4b427917048cdc596b38b67b5ed664605b76d/TangPoetry.json"__proto__: Response
fetch(url)
    .then(
    response =>{
        console.log(response);
        if(response.ok){
            return response.json();
        }else{
            return Promise.reject({
                status:response.status,
                statusText:response.statusText//调用catch
            });
        }
    })
    .then(data => {poetrys.push(...data)})
    .catch(e => {
        console.log("status:",e.status);
        console.log("statusText:",e.statusText);//Promise.reject的错误写入catch语句中
    });


function findMatches(){
    //有搜索内容时，进行关键字匹配，没有的话，显示默认的两行提示
    if(this.value){
        //全局搜索忽略大小写
        let regexp = new RegExp(this.value,"gi");
        //根据标题、作者名、文本中的关键字，将数组项取出
        let matched = poetrys.filter(item => {
            return regexp.test(item.title) || regexp.test(item.detail_author) || regexp.test(item.detail_text);
        });
        if(matched.length>0){
            createDom(matched);
        }else{
            suggestions.innerHTML='';
            suggestions.innerHTML=`<li>抱歉，没有找到匹配项</li>`
        }

    }else{
        suggestions.innerHTML=`<li>输入诗人名称</li>
                                <li>输入关键字，找一首诗</li>`;
    }
}

function createDom(matched){
    let frag = document.createDocumentFragment();
    matched.forEach(item => {
        let li = document.createElement("li");
        let p = document.createElement("p");
        let regexp = new RegExp(search.value,"gi");
        let detailText = item.detail_text.replace(regexp,`<span style="color:green">${search.value}</span>`);
        let title = item.title.replace(regexp,`<span style="color:green">${search.value}</span>`);
        let author = item.detail_author[0].replace(regexp,`<span style="color:green">${search.value}</span>`);
        li.innerHTML = detailText;
        p.innerHTML = title + "-" + author;
        li.appendChild(p);
        frag.appendChild(li);
    });
    suggestions.innerHTML='';
    suggestions.appendChild(frag);
}