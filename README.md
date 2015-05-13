# inspire.js

---inspire-js 是一个使用HTML扩展属性来扩展原生HTML标签的功能，比如input的校验、自动去空格、自动完成等功能。

tag: inspire inspireso

An awesome spm package!

---

## 安装

```
$ spm install inspire-js --save
```

## 使用

```js
var inspire = require('inspire-js');
// use inspiresoControls
```
或者直接在 `html` 页面中引入脚本

```html
<script type="text/javascript" src="https://github.com/inspireso/inspire.js/tree/master/dist/inspire-js/x.x.x/inspire.js"></script>
```

## 详情

- [asnyc](./doc/asnyc.js.md): 异步加载资源
- [checkbox](./doc/checkbox.js.md)： 表格多选功能，可用 multiselect 代替
- [confirm](./doc/confirm.js.md)： 确认框的扩展，避免禁用脚本后确认提示框失效
- [datetime-picker](./doc/datetime-picker.js.md)：时间控件
- [decimal](./doc/decimal.js.md)： 设置decimal的自动格式化功能
- [dialog](./doc/dialog.js.md)：弹出框控件
- [jump](./doc/jump.js.md)： 几秒后自动跳转到指定链接功能
- [link](./doc/link.js.md)： 扩展链接的click事件
- [messenger](./doc/messenger.js.md)： 自动配置消息提示功能
- [money](./doc/money.js.md)： 设置和钱有关的自动格式化，可以用decimal.js代替
- [multiselect](https://github.com/inspireso/inspire.js/tree/master/doc/multiselect.js.md)： 多选框，使用于任何checkbox的多选
- [number](./doc/number.js.md)： 控制数字的输入和格式化
- [pagination](./doc/pagination.js.md)： 自动配置分页控件
- [required](./doc/required.js.md)： 校验必填字段
- [roles](./doc/roles.js.md)： 扩展 `<input>`控件，预定义角色用于调整input的行为，比如role=email,role=url 等
- [string case](./doc/StringCase.js.md)： 自动大小写
- [double submit](./doc/submit.js.md)： 在页面段控制重复提交
- [table sorter](./doc/table-sorter.js.md)： 表格自动排序（仅限于浏览器端的数据）
- [input trim](./doc/trim.js.md)： 自动删除前后的空格
- [typeahead](./doc/typeahead.js.md)： 自动完成（输入自动联想）
- [validity](./doc/validity.js.md)： 自动校验消息的设置