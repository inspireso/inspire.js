# table-sortable.js

## 功能

table-sortable.js 扩展table，支持在页面自动排序的功能，依赖于[tablesorter](https://github.com/christianbach/tablesorter)插件.


## 使用
在table元素上添加class="sortable"即可完成自动适配

html:

```html
 <table class="sortable">
    ...
 </table>
```


## 说明
- class=sortable：系统会自动适配table.sortable的元素，完成自动排序的功能适配。
- class={sorter: parser}: 在列上添加类型解析，引用表头;

**内置解析器**:
- class="{sorter: false}":表示该列不排序，比如` <th class="{sorter: false}">operator</th>`
- class="{sorter: 'text'}":表示该列按照字符串解析排序
- class="{sorter: 'digit'}":数字
- class="{sorter: 'currency'}":货币
- class="{sorter: 'ipAddress'}":IP地址
- class="{sorter: 'isoDate'}":IOS时间格式
- class="{sorter: 'url'}":URL地址
- class="{sorter: 'percent'}":百分数
- class="{sorter: 'usLongDate'}":长日期
- class="{sorter: 'shortDate'}":短日期
- class="{sorter: 'time'}":时间


