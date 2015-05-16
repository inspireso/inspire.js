# pagination.js

## 功能

pagination.js 自动适配分页控件。


## 使用

html:
```html
<strong id="pagination" class="btn btn-link text" data-target="${target}"
        data-text-format="${textFormat}" role="pager">${text}</strong>

<a id="pagination-previous-link" class="pager-previous btn disabled" data-target="${previous}">
    <i class="icon-chevron-left"/>
    ${message:pagination.newer-label}
</a>

<a id="pagination-next-link" class="pager-next btn disabled" data-target="${next}">
    ${message:pagination.older-label}
    <i class="icon-chevron-right"/>
</a>

<div class="hide">
    <a class="query-preview-link" t:type="eventlink" t:event="previous"
       t:context="model" t:zone="^"/>
    <a class="query-next-link" t:type="eventlink" t:event="next"
       t:context="model" t:zone="^"/>
</div>

<table id="table" class="table">

</table>
```


## 说明

- role=decimal：标识这个输入框作为decimal类型
- scale=2： 指定小数位数

