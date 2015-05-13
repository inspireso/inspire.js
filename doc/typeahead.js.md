# typeahead.js

tags： inspire.js

---

## 功能

typeahead.js 通过在input上添加标记定义自动完成功能的扩展。该脚本基于
[bootstrap](http://getbootstrap.com/2.3.2/)中的typeahead插件扩展。 


## 使用
通过在 `html` `<input />` 标签上添加 `role="typeahead"`和对应的属性来让脚本自动识别并完成typeahead的初始化。如下：

html:
```html
<input id="typeahead-input"
    role="typeahead"
    data-source="url or function, return [{"name":"display name", "value":"val1"},...]"
    data-params="parameters with source"
    data-updater="afterSelected"/>
```
js:
```js
/**
* 在联想输入选中后调用该函数。item结构为:
* {
*    "name":"下拉列表显示的名称，一般是name", 
*    "value":"选中后指定的值，一般是code"
* }
*/
function afterSelected(item) {
   // do something
    return item;
}
```

## 参数说明

- role=typeahead: 标记，用于脚本在加载后自动识别并初始化
- data-source: 获取数据的URL或者自定义js函数,返回一个JSON数组即可。js函数格式:function(query, callback)
- data-params: 获取数据传递的参数，数据类型可以是String 或者 JSON
- data-updater: 选中某个数据项后的更新函数，也可以是一个URL，返回选中的结果。结果格式为{"name":"display name", "value":"val1"}
