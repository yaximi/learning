# 2、样式表的优先级

* 优先级规则：行内样式 > 内部样式 = 外部样式

> 1. 内部样式、外部样式，这二者之间的优先级相同，且：后面的会覆盖前面的（简记：后来者居上）。
> 2. 同一个样式表中，优先级也和编写顺序有关，且：后面的会覆盖前面的（简记：后来者居上）。

| 分类 | 优点 | 缺点 | 使用频率 | 作用范围 |
| :---: | :--- | :--- | :---: | :---: |
| 行内样式 | 优先级最高 | 1.结构与样式未分离 | 很低 | 当前标签 |
| | | 2.代码结构混乱 | | |
| | | 3.样式不能复用 | | |
| 内部样式 | 1.样式可复用 | 1.结构与样式未彻底分离 | 一般 | 当前页面 |
| | 2.代码结构清晰 | 2.样式不能多页面复用 | | |
| 外部样式 | 1.样式可多页面复用 | 需要引入才能使用 | 最高 | 多个页面 |
| | 2.代码结构清晰 | | |
| | 3.可触发浏览器缓存机制 | | |
| | 4.结构与样式彻底分离 | | |
