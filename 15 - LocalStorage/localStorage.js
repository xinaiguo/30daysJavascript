const addItem = document.querySelector(".addItems");
const plates = document.querySelector(".plates");
const buttons = document.querySelector(".buttons")
let items = JSON.parse(localStorage.getItem('items')) || []; //从localStorage中获取key值为items的值，并转换为json格式，若有则赋值，不存在则赋值为空。

window.onbeforeunload = function (e) {
    localStorage.removeItem('items');
    e.returnValue = false;
};

function handleAddItem(e) {
    //阻止submit默认的页面刷新行为
    e.preventDefault();
    const itemsValue = this.querySelector('[name=item]').value;
    const item = {
        itemsValue,
        checked: false
    }

    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));//存到localStorage中
    showPlates(items, plates);
    this.reset();//添加完数据之后，表单进行重置。
}

//将输入框获取到的值显示到ul中
function showPlates(items, plates) {
    plates.innerHTML = items.map((item, index) => {
        return `
        <li>
            <input type="checkbox" id=item${index} data-index=${index} ${item.checked ? 'checked' : ''}>
            <label for="item${index}">${item.itemsValue}</label>
        </li>
        `
    }).join('');
}

function toggleChecked(e) {
    if (e.target.matches('input')) return;//只处理label
    const itemIndex = e.target.dataset.index;
    items[itemIndex].checked = !items[itemIndex].checked;
    localStorage.setItem(items, JSON.stringify(items));
    showPlates(items, plates);
}

function handleButtons(e) {
    const action = e.target.dataset.action;
    switch (action) {
        case "clear":
            items = [];
            break;
        case "check":
            items.map((item) => item.checked = true);
            break;
        case "uncheck":
            items.map((item) => item.checked = false);
            break;
        default:
            return;
    }

    localStorage.setItem(items, JSON.stringify(items));
    showPlates(items, plates);
}

addItem.addEventListener('submit', handleAddItem);
plates.addEventListener('click', toggleChecked);
buttons.addEventListener('click', handleButtons);
showPlates(items, plates);
