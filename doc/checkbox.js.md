# checkbox.js

## 功能

checkbox.js 扩展checkbox元素，定义了表格多选功能，可用 [multiselect](multiselect.js.md) 代替 。


## 使用
在页面上添加如下标签，页面加载完成后会自动异步加载指定的资源。一般是 `js` 资源，
不建议用于 `css` ，css最好在 `head` 位置就使用`<link/>`标签加载，可以提高页面渲染的性能。
html:

```html
<table>
    <thead>
        <tr>
            <th>
                <input type="checkbox" role="table-selected-all"/>
            </th>
            <th/>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
               <input id="checkbox-id" 
                        type="checkbox" 
                        role="table-selected"
                        data-target="#valueStore" 
                        data-value-changed="afterChanged"/>
            </td>
            <td/>
        </tr>
    </tbody>
</table>

<input id="valueStore" type="hidden"/>
```
js:
```js
 function afterChanged(val) {
    //do something
}
```


## 说明

- role=table-selected-all: 多选和反选，会自动遍历当前table下的素有checkbox，然后执行选中或者反选的动作
- role=table-selected: 标记checkbox作为表格选择框
- data-target=selector： 在用户选中该选择框的时候，要存储id对应的值到指定的位置，多个值使用分号分隔
- data-value-changed=afterChangedfunction：用户选中后触发的事件，接收的参数是选中的所有值

