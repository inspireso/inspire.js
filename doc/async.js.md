# async.js

## 功能

async.js 定义了 `<require src="xxx">` 标签来提供异步加载资源的功能。包括 `js` ，和 `css` 。


## 使用
在页面上添加如下标签，页面加载完成后会自动异步加载指定的资源。一般是 `js` 资源，
不建议用于 `css` ，css最好在 'head' 位置就使用'<link/>'标签加载，可以提高页面渲染的性能。
html:
```html
<require src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"/>
```


## 参数说明

- src: 要异步加载的资源。
