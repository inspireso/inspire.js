# confirm.js

## 功能

confirm.js 扩展 `span` 远射和 `a` 远射 `click` 事件，强制添加确认动作；避免在 `js` 被禁用的时候确认框失效。该脚本通过拦截 `click` 
事件，并重新绑定到指定的 `click` 事件来成确认的动作。


## 使用
在span元素或者a元素上添加role="confirm",并通过data-target="selector"指定真正要触发的目标。data-message="message"指定要提示的消息。

html:

```html
<a role="confirm" data-target="#realTarget" data-message="确认提示消息">test confirm </a>
<a class="hide" id="realTarget" href="http://www.baidu.com"/>
```


## 说明

- role=confirm：标识这个链接点击的是时候需要确认
- data-target=selector： 在用户点击该元素的时候，真正要触发的动作
- data-message=message：用户点击后提示框要显示的消息

