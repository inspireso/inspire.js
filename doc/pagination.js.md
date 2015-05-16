# decimal.js

## 功能

decimal.js 扩展input，支持自动格式化为decimal类型的文本,限制是只能输入0~9 . -


## 使用
在input元素或者a元素上添加role="decimal"

html:

```html
<a role="confirm" data-target="#realTarget" data-message="确认提示消息">test confirm </a>
<a class="hide" id="realTarget" href="http://www.baidu.com"/>
```


## 说明

- role=decimal：标识这个输入框作为decimal类型
- scale=2： 指定小数位数

