# 3、CSS语法规范

CSS语法由两部分组成

* 选择器：找到要添加样式的元素。

* 申明块：设置具体的样式（申明块是由一个或多个申明组成的），申明的格式为：属性名: 属性值;

> 备注1：最后一个申明后的分号，理论上能省略，但最好还是写上。
>
> 备注2：选择器与申明块之间，属性名与属性值之间，均有一个空格，理论上能省略，但最好还是写上。

```
div {
    font-size: 16px;
    color: red;
}
```

```
选择器 {
    属性名: 属性值;
    属性名: 属性值；
}
```

* 注释的写法：/* 注释 */

```
/* 给 div 元素添加样式 */
div {
    /* 设置文字大小为16px */
    font-size: 16px;
    /* 设置字体颜色为红色 */
    color: red;
}
```
