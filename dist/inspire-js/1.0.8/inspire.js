!function(){var t,e,n,i,a,r,o,c,u,l,d,s,f,p,h,v,y,m,g,b;t=function(){"use strict";var t=window.jQuery,e={init:function(t){return this.separator=t||",",this},join:function(e){var n=t.isArray(e)?e:[e];return n.join(this.separator)}};e.init.prototype=e,window.Joiner={on:function(t){return new e.init(t)}};var n={init:function(t){return this.separator=t||",",this},split:function(t){return t.split(this.separator)}};n.init.prototype=n,window.Spliter={on:function(t){return new n.init(t)}}}(),e=function(t){"use strict";function e(){function t(){var t=i(this);t.attr("disabled","disabled").addClass("disabled")}i("a[role*=once],span[role*=once]").off("click",t),i("a[role*=once],span[role*=once]").on("click",t)}function n(){e(),$doc.bind("ajaxSuccess",function(){e()}),$doc.on("click","button[type=submit],input[type=submit]",function(t){var e=i(this),n=e.parents("form");1==n.length&&(t.preventDefault(),t.stopPropagation(),e.attr("disabled","disabled").addClass("disabled"),n.submit())}),$doc.on("keypress","form input, form select",function(t){var e=i(this);return e.parents("form").find("button[type=submit].default, input[type=submit].default").length<=0?!0:t.which&&13==t.which||t.keyCode&&13==t.keyCode?(e.parents("form").find("button[type=submit].default, input[type=submit].default").click(),!1):!0})}var i=window.jQuery;return n(),t={init:e,applyAll:n}}(),n=function(){"use strict";function t(t){$doc.on("change",t,function(){var t=i(this),e=t.data("target"),n=t.data("value-changed");if(e){var a=i(e).val(),r=t.parents("tr");if(t.prop("checked")){var o=t.attr("id");a.indexOf(o)<0&&(a=o+";"+a),r.addClass("info")}else a=a.replace(t.attr("id")+";","").replace(t.attr("id"),""),r.removeClass("info");i(e).val(a);var c=window[n];c&&"function"==typeof c&&c(a)}})}function e(t){$doc.on("change",t,function(){var t=i(this),e=t.parents("table");e&&e.children("tbody").find("input:checkbox[role=table-selected]").prop("checked",t.prop("checked")||!1).trigger("change")})}function n(){t("input:checkbox[role*=table-selected]"),e("input:checkbox[role*=table-selected-all]")}var i=window.jQuery;n()}(),i=function(){"use strict";function t(t){$doc.on("change",t,function(){var t=n(this),e=t.data("target"),i=t.data("value-changed");if(e){var a=n(e),r=a.data("array-value")||[],o=t.data("value");t.prop("checked")?n.inArray(o,r)<=0&&r.push(o):r.remove(o),a.data("array-value",r),a.val(r.join(";"));var c=window[i];c&&"function"==typeof c&&c(r,o)}})}function e(){t("input:checkbox[role*=multi-select]")}var n=window.jQuery;e()}(),a=function(t){"use strict";function e(t){var e=a(this);if(!e.parent().attr("disabled"))if(window.confirm(e.data("message"))){var n=e.data("target");n&&a(n).click()}else t.preventDefault(),t.stopPropagation()}function n(t){a(t).each(function(){a(this).off("click").click(e)})}function i(){a.each(["span[role*=confirm]","a[role*=confirm]"],function(t,e){n(e),$doc.bind("ajaxSuccess",function(){n(e)})})}var a=window.jQuery;return i(),t={init:n,applyAll:i}}(),r=function(t){"use strict";function e(t,n){window.setTimeout(function(){n-=1,n>0?(t.children(".js-num").text(n),e(t,n)):location.href=t.data("target")},1e3)}function n(t){var n=a(t).first();n.size()>0&&(n.children(".js-num").text(n.data("timeout")),a(document).ready(function(){e(n,n.data("timeout"))}))}function i(){n("div[role*=jump]"),$doc.bind("ajaxSuccess",function(){n("div[role*=jump]")})}var a=window.jQuery;return i(),t={init:n,applyAll:i}}(),o=function(t){"use strict";function e(t){i(t).each(function(){var t=i(this);t.unbind("click"),t[t.hasClass("disabled")?"unbind":"bind"]("click",function(){i(i(this).data("target")).click()})})}function n(){var t="[role*=button]";$doc.bind("ajaxSuccess",function(){e(t)})}var i=window.jQuery;return n(),t=e}(),c=function(t){function e(t){-1!==r.inArray(t.keyCode,[46,8,9,27,13,110,190])||65===t.keyCode&&t.ctrlKey===!0||t.keyCode>=35&&t.keyCode<=39||(t.shiftKey||t.keyCode<48||t.keyCode>57)&&(t.keyCode<96||t.keyCode>105)&&t.preventDefault()}function n(t){-1!==r.inArray(t.keyCode,[46,8,9,27,13,110])||65===t.keyCode&&t.ctrlKey===!0||t.keyCode>=35&&t.keyCode<=39||(t.shiftKey||t.keyCode<48||t.keyCode>57)&&(t.keyCode<96||t.keyCode>105)&&t.preventDefault()}function i(t,e){$doc.on("keydown",t,e)}function a(){i("input[role*=number]:visible",e),i("input[role*=integer]:visible",n)}var r=window.jQuery;return a(),t={keydowns:{integer:n,number:e},init:i,applyAll:a}}(),u=function(t){"use strict";function e(){this.value=a(this.value)}function n(){var t=clipboardData.getData("text");return i(t)?void clipboardData.setData("text",t):!1}function i(t){var e=0,n=t.length;for(e=0;n>e;e++){var i=t.charCodeAt(e);if(!(37===i||8===i||39===i||46===i||190===i||110===i||i>=48&&57>=i||i>=96&&105>=i))return!1}return!0}function a(t){if(/[^0-9\.]/.test(t))return t;t=t.replace(/^(\d*)$/,"$1."),t=(t+"00").replace(/(\d*\.\d\d)\d*/,"$1"),t=t.replace(".",",");for(var e=/(\d)(\d{3},)/;e.test(t);)t=t.replace(e,"$1,$2");return t=t.replace(/,(\d\d)$/,".$1"),t.replace(/^\./,"0.")}function r(t){u.init(t,u.keydowns.number),$doc.on("blur",t,e),$doc.on("paste",t,n)}function o(){r("input[role*=money]:visible")}var u=(window.jQuery,c);return o(),t={init:r,applyAll:o}}(),l=function(t){"use strict";function e(t){-1!==u.inArray(t.keyCode,[46,8,9,27,13,110,190])||65===t.keyCode&&t.ctrlKey===!0||t.keyCode>=35&&t.keyCode<=39||(t.shiftKey||t.keyCode<48||t.keyCode>57)&&(t.keyCode<96||t.keyCode>105)&&t.preventDefault()}function n(){var t=u(this),e=t.attr("scale");this.value=r(this.value,e)}function i(){var t=clipboardData.getData("text");return a(t)?void clipboardData.setData("text",t):!1}function a(t){var e=0,n=t.length;for(e=0;n>e;e++){var i=t.charCodeAt(e);if(!(37===i||8===i||39===i||46===i||190===i||110===i||i>=48&&57>=i||i>=96&&105>=i))return!1}return!0}function r(t,e,n){e=e>0&&20>=e?e:2;var i;if(e=Number(e),1>e)i=Math.round(t).toString();else{var a=t.toString(),r="";a.indexOf("-")&&(r=a.substring(0,1),a=a.substring(1,a.length)),-1==a.lastIndexOf(".")&&(a+=".");var o=a.lastIndexOf(".")+e,c=Number(a.substring(o,o+1)),u=Number(a.substring(o+1,o+2));if(n&&u>=5){if(9===c&&o>0)for(;o>0&&(9===c||isNaN(c));)"."!==c?(o-=1,c=Number(a.substring(o,o+1))):o-=1;c+=1}if(10===c){a=a.substring(0,a.lastIndexOf("."));var l=Number(a)+1;i=l.toString()+"."}else i=a.substring(0,o)+c.toString()}-1===i.lastIndexOf(".")&&(i+=".");for(var d=i.substring(i.lastIndexOf(".")+1).length,s=0;e-d>s;s++)i+="0";return r+i}function o(t){u(t).each(function(t,e){u(e).trigger("blur")})}function c(){var t="input[role*=decimal]:visible";$doc.on("keydown",t,e),$doc.on("blur",t,n),$doc.on("paste",t,i),o(t),$doc.bind("ajaxSuccess",function(){o(t)})}var u=window.jQuery;return c(),t={init:o,applyAll:c}}(),d=function(t){"use strict";function e(t,e){for(var n in e)e.hasOwnProperty(n)&&(t=t.replace(RegExp("{"+n+"}","g"),e[n]));return t}function n(t){var n=t.data("target"),i=r(n);if(i&&i.length>0){var a=i.data("offset"),o=i.data("limit"),c=i.data("total"),u=t;i.hasClass("io-page")?(a*=o,o=0===a&&0!==c?o:a+o,o=o>c?c:o,u.text(e(u.data("text-format"),{offset:0===a&&0!==c?1:a+1,limit:o,total:c}))):i.hasClass("io-slice")?(a*=o,o=0===a&&0!==c?o:a+o,o=o>a+c?a+c:o,u.hide()):u.text(e(u.data("text-format"),{offset:0===a&&0!==c?1:a,limit:o,total:c}));var l=t.parent().parent().find("#pagination-previous-link"),d=t.parent().parent().find("#pagination-next-link");l[1>=a?"addClass":"removeClass"]("disabled"),d[o===c?"addClass":"removeClass"]("disabled"),l.unbind("click"),a>1&&l.bind("click",function(){return r(l.data("target")||i.data("previous")).click()}),d.unbind("click"),o!==c&&d.bind("click",function(){return r(d.data("target")||i.data("next")).click()})}}function i(t){var e=r(t);e.length<1||e.each(function(t,e){var i=r(e);i.data("pending")||(i.data("pending",!0),n(i),i.removeData("pending"))})}function a(){r.each(["#pagination",".pagination"],function(t,e){i(e),$doc.bind("ajaxSuccess",function(){i(e)})})}var r=window.jQuery;return a(),t={init:i,applyAll:a}}(),s=function(t){"use strict";function e(){var t=a(this);t.tooltip(t.val().length<1?"show":"hide")}function n(t){a(t).each(function(){var t=a(this),e=t.nextAll().filter("span.help-inline"),n=t.data("title")||e.text()||"\u6b64\u5b57\u6bb5\u5fc5\u987b\u586b\u5199",i={placement:r,trigger:"manual",title:n};t.tooltip(i)})}function i(){var t="input[required]:not(input[role]):visible";n(t),$doc.bind("ajaxSuccess",function(){n(t)}),$doc.on("blur",t,e)}var a=window.jQuery,r="right";return i(),t={init:n,applyAll:i}}(),f=function(t){"use strict";function e(){for(var t=a(this),e=(t.attr("role")+",").split(","),n=0;n<e.length;n++)if(!(e[n].length<1)){var i=o[e[n]],c=i?i.pattern:null;if(c){var u=new RegExp(c);if(!u.test(t.val())){var l=t.nextAll().filter("span.help-inline"),d=t.data("title")||l.text()||t.attr("placeholder")||i.placeholder||"\u683c\u5f0f\u4e0d\u6b63\u786e";return t.data("title",d),t.data("placement")||t.data("placement",r),t.data("trigger")||t.data("trigger","manual"),t.tooltip("show"),void(t.attr("force")&&t.focus())}}}t.tooltip("hide")}function n(){a("form").each(function(){a(this).attr("novalidate","novalidate")})}function i(){var t=":text[role]:visible,:password[role]:visible,textarea[role]:visible";n(t),$doc.bind("ajaxSuccess",function(){n(t)}),$doc.on("blur",t,e)}var a=window.jQuery,r="right",o={number:{pattern:"^[0-9]*$",placeholder:"\u8bf7\u8f93\u5165\u6b63\u786e\u6570\u5b57"},"positive-integer":{pattern:"^\\+?[1-9][0-9]*$",placeholder:"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u6b63\u6574\u6570"},email:{pattern:"[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?",placeholder:"example@example.com"},url:{pattern:"[a-zA-z]+://[^s]*",placeholder:"http://example.com"},website:{pattern:"^\\s*((([a-zA-z]+://)(www\\.))|([a-zA-z]+://)|(www\\.))\\w+\\.\\w{2,}\\s*$",placeholder:"http://example.com"},tel:{pattern:"(^(0[0-9]{2,3}\\-)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$)|(^((\\(\\d{3}\\))|(\\d{3}\\-))?(1[358]\\d{9})$)|(^86((\\(\\d{3}\\))|(\\d{3}\\-))?(1[358]\\d{9})$)|(^\\+86((\\(\\d{3}\\))|(\\d{3}\\-))?(1[358]\\d{9})$)",placeholder:"0592-8888888 | 13588888888"},mobile:{pattern:"1\\d{10}",placeholder:"13588888888"},zipcode:{pattern:"[1-9]\\d{5}(?!\\d)",placeholder:"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u90ae\u7f16"},idc:{pattern:"\\d{15}|\\d{18}",placeholder:"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8eab\u4efd\u8bc1"},ip:{pattern:"((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)",placeholder:"\u8bf7\u8f93\u5165\u6b63\u786e\u7684IP,\u5982192.168.1.1"},datetime:{pattern:"^((?!0000)[0-9]{4}\\-((0[1-9]|1[0-2])\\-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)\\-02\\-29)(\\s)*((([0-1]?[0-9])|([2][0-3]))\\:([0-5]?[0-9])(\\:([0-5]?[0-9]))?)?$",placeholder:"(2013-01-01)\u6216(2013-01-01 11:26:00)"},tsrn:{pattern:"^[\\d|X|x]{15}$"},passwd:{pattern:"^[\\w\\W]{6,}$",placeholder:"\u5efa\u8bae\u5bc6\u7801\u5927\u4e8e6\u4f4d"},account:{pattern:"^[A-Za-z0-9]+$"},money:{pattern:"^[0-9]+(.[0-9]{2})?$"},decimal:{pattern:"^-?[0-9]+(.[0-9]\\d*)?$"}};return i(),t={init:n,applyAll:i,validators:o}}(),p=function(t){"use strict";function e(){var t=i(this);t.val(i.trim(t.val()))}function n(){$doc.on("blur",":text",e),$doc.on("blur",":password",e)}var i=window.jQuery;return n(),t={applyAll:n}}(),h=function(t){"use strict";function e(t){i(t).each(function(){this.setCustomValidity&&this.setCustomValidity(i(this).data("title"))})}function n(){e("input[data-title]"),$doc.bind("ajaxSuccess",function(){e("input[data-title]:visible")})}var i=window.jQuery;return n(),t={init:e,applyAll:n}}(),v=function(t){"use strict";function e(t,e){var n=i(t),a=!e&&n.is(":hidden");n.length>0&&!a&&n.modal({backdrop:!1})}function n(){e("div[role*=dialog]",!1),e("div[role*=cdialog]",!0),$doc.bind("ajaxSuccess",function(){e("div[role*=dialog]",!1),e("div[role*=cdialog]",!0)})}var i=window.jQuery;return n(),t={init:e,applyAll:n}}(),y=function(t){"use strict";function e(t){var e=document.getElementsByTagName(t);if(e.length>0){for(var n=[],i=0;i<e.length;i++){var a=e[i].getAttribute("src");n[i]=a}c(n)}}function n(){e("require"),$doc.bind("ajaxSuccess",function(){e("require")})}var i=(window.jQuery,/^(?:loaded|complete|undefined)$/),a=/\.(?:(css|gzcss))(?:\?|$)/i,r=document.getElementById("inspnode"),o=("true"===r.getAttribute("debug")||!1,Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}),c=function(t,e){o(t)||(t=[t]);for(var n=document.getElementsByTagName("head")[0]||document.documentElement,r=t.length-1,c=0;r>=c;c++){var u=t[c],l=a.test(u),d=document.createElement(l?"link":"script");r===c&&"function"==typeof e&&(d.onload=d.onerror=d.onreadystatechange=function(){i.test(d.readyState)&&(d.onload=d.onerror=d.onreadystatechange=null,l||n.removeChild(d),d=null,e())}),l?(d.rel="stylesheet",d.href=u):(d.async=!0,d.src=u),n.appendChild(d)}};return n(),t={init:e,applyAll:n,async:c}}(),m=function(t){"use strict";function e(t){var e=i(t);"undefined"!==e.typeahead&&e.typeahead({source:r,updater:o,highlighter:function(t){return this.__proto__.highlighter.call(this,t.name)},matcher:function(t){return this.__proto__.matcher.call(this,t.name)}})}function n(){var t="input[role*=typeahead]:visible",n=i(t);0===n.length||n.attr("disabled")||"undefined"===n.typeahead||(e(t),$doc.bind("ajaxComplete",function(){e(t)}))}var i=window.jQuery,a=function(t){return i.isFunction(t)?t:i.isFunction(window[t])?window[t]:null},r=function(t,e){var n=a(o);if(n)return n(t,e);var r=this,o=this.$element.data("source"),c=this.$element.data("params"),u=o.replace("//","/");i.post(u,{start:t,params:c}).done(function(t){return t=i(t).map(function(t,e){return{value:e.value,name:e.name,toString:function(){return JSON.stringify(this)}}}),r.render(t.slice(0,r.options.items)).show()})},o=function(t){var e=this.$element.data("updater"),n=JSON.parse(t);if(e){var r=a(e);if(r)r(n);else{var o=e.replace("//","/");i.post(o,{item:n.value}).done(function(){})}}return n.name};return n(),t={init:e,applyAll:n}}(),g=function(t){"use strict";function e(){Messenger.options={extraClasses:"messenger-fixed messenger-on-bottom messenger-on-right",theme:"future"}}function n(t){var e=a(t),n=e.data("message"),i=e.data("target"),r=e.data("label"),o=Messenger().post({message:n,type:"info",actions:{run:{label:r,action:function(){location.href=i}},cancel:{label:"\u53d6\u6d88",action:function(){return o.cancel()}}}})}function i(){var t="div[role*=messenger]",e=a(t);0===e.length||e.attr("disabled")||n(t)}var a=window.jQuery;return"undefined"!=typeof Messenger&&(e(),i()),t={init:n,applyAll:i}}(),b=function(b){"use strict";var w=window.jQuery;window.$doc||(window.$doc=w(document)),Array.prototype.remove=function(t){var e=this.indexOf(t);return e>-1?this.splice(e,1):this};var k={version:"1.0.1"};return k.string=t,k.submit=e,k.checkbox=n,k.multiselect=i,k.confirm=a,k.jump=r,k.link=o,k.number=c,k.money=u,k.decimal=l,k.pagination=d,k.required=s,k.roles=f,k.submit=e,k.trim=p,k.validity=h,k.dialog=v,k.async=y,k.typeahead=m,k.messenger=g,b=k}()}();