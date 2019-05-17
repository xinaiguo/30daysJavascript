# Day05 - Flex 实现可伸缩的图片墙 中文指南

## 实现效果

点击任意一张图片，图片展开，同时从图片上下两方分别移入文字。点击已经展开的图片后，图片被压缩，同时该图片上下两端的文字被挤走。

![](http://om1c35wrq.bkt.clouddn.com/day5_00.gif)



## HTML源码

```html
  <div class="panels">
    <div class="panel panel1">
      <p>Hey</p>
      <p>Let's</p>
      <p>Dance</p>
    </div>
    <div class="panel panel2">
      <p>Give</p>
      <p>Take</p>
      <p>Receive</p>
    </div>
    <div class="panel panel3">
      <p>Experience</p>
      <p>It</p>
      <p>Today</p>
    </div>
    <div class="panel panel4">
      <p>Give</p>
      <p>All</p>
      <p>You can</p>
    </div>
    <div class="panel panel5">
      <p>Life</p>
      <p>In</p>
      <p>Motion</p>
    </div>
  </div>
```



初始文档的 DOM 结构：以 `.panels` 为父 `div` 之下，有 5 个类名为 `.panel` 的 `div`，这 5 个各含有 3 个子 `p` 标签。而相应的 CSS 样式中，动画时间等特性已经设定好，只需要完成不同状态下的页面布局以及事件监听即可。


## CSS 源码

```css
  <style>
    html {
      box-sizing: border-box;
      background: #ffc600;
      font-family:'helvetica neue';
      font-size: 20px;
      font-weight: 200;
    }
    body {
      margin: 0;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }

    .panels {
      min-height:100vh;
      overflow: hidden;
      display: flex;
    }

    .panel {
      background:#6B0F9C;
      box-shadow:inset 0 0 0 5px rgba(255,255,255,0.1);
      color:white;
      text-align: center;
      align-items:center;
      /* Safari transitionend event.propertyName === flex */
      /* Chrome + FF transitionend event.propertyName === flex-grow */
      transition:
        font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
        flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
        background 0.2s;
      font-size: 20px;
      background-size:cover;
      background-position:center;
      flex: 1;
      justify-content: center;
      display: flex;
      flex-direction: column;
    }


    .panel1 { background-image:url(https://source.unsplash.com/gYl-UtwNg_I/1500x1500); }
    .panel2 { background-image:url(https://source.unsplash.com/1CD3fd8kHnE/1500x1500); }
    .panel3 { background-image:url(https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=1500&h=1500&fit=crop&s=967e8a713a4e395260793fc8c802901d); }
    .panel4 { background-image:url(https://source.unsplash.com/ITjiVXcwVng/1500x1500); }
    .panel5 { background-image:url(https://source.unsplash.com/3MNzGlQM7qs/1500x1500); }

    /* Flex Items */
    .panel > * {
      margin:0;
      width: 100%;
      transition:transform 0.5s;
      flex: 1 0 auto;
      display:flex;
      justify-content: center;
      align-items: center;
    }

    .panel > *:first-child { transform: translateY(-100%); }
    .panel.open-active > *:first-child { transform: translateY(0); }
    .panel > *:last-child { transform: translateY(100%); }
    .panel.open-active > *:last-child { transform: translateY(0); }

    .panel p {
      text-transform: uppercase;
      font-family: 'Amatic SC', cursive;
      text-shadow:0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45);
      font-size: 2em;
    }
    .panel p:nth-child(2) {
      font-size: 4em;
    }

    .panel.open {
      flex: 5;
      font-size:40px;
    }

  </style>
```

CSS 在这个过程中占了重点，运用 `flex` 可以使各个元素按一定比例占据页面。在调试的时候，可以把边框显示出来方便查看效果。（`border: 1px solid #f00;`）

1. 将 `.panels` 设置为 `display:flex`
2. 设定每个子 `panel` 的 `flex` 值为 `1`
3. 针对每个子 `panel`，设为 `display:flex`，设置其 flex 主轴方向
4. 控制 `.panle` 的子元素 `<p>` 中的文字垂直、水平居中（单独看每个 panel，其中的文字也可以用 flex 的思路来使其三等分后居中）
	1. 设置为 `display:flex`
	2. 设置 `flex` 值
	2. 设置其子元素的布局方式：垂直水平居中（沿主轴、侧轴居中）
4. 设定点击图片后文字移动的样式
5. 设定点击图片展开后的图片的 `flex` 值


**重要：不了解CSS和Flex的童鞋必看。**

- [CSS参考手册](http://www.css88.com/book/css/properties/flex/flex.htm)

- [选择器（Selectors）](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started/Selectors)

- [CSS选择器笔记](http://www.ruanyifeng.com/blog/2009/03/css_selectors.html)


- [flex布局完全入门教程](http://bbs.kongyixueyuan.com/topic/10/flex布局完全入门教程)

## JS源码

```js
  <script>
    const panels = document.querySelectorAll('.panel');

    function toggleOpen() {
      console.log('Hello');
      this.classList.toggle('open');
    }

    function toggleActive(e) {
      console.log(e.propertyName);
      if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
      }
    }

    panels.forEach(panel => panel.addEventListener('click', toggleOpen));
    panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
  </script>
```

1. 获取所有类名为 `panel` 的元素
2. 为其添加 `click` 事件监听，编写触发事件调用的函数（给触发的 DOM 元素添加/去掉样式，实现拉伸/压缩的效果）
3. 为其添加 `transitionend` 事件监听，编写调用的函数（添加/去掉样式，实现文字的飞入/飞出效果）






