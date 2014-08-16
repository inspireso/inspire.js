define("inspire-js/1.0.1/index",["inspire-js/1.0.1/lib/string","inspire-js/1.0.1/lib/submit","inspire-js/1.0.1/lib/checkbox","inspire-js/1.0.1/lib/confirm","inspire-js/1.0.1/lib/jump","inspire-js/1.0.1/lib/link","inspire-js/1.0.1/lib/number","inspire-js/1.0.1/lib/money","inspire-js/1.0.1/lib/decimal","inspire-js/1.0.1/lib/pagination","inspire-js/1.0.1/lib/required","inspire-js/1.0.1/lib/roles","inspire-js/1.0.1/lib/trim","inspire-js/1.0.1/lib/validity","inspire-js/1.0.1/lib/dialog","inspire-js/1.0.1/lib/async","inspire-js/1.0.1/lib/typeahead","inspire-js/1.0.1/lib/messenger"],function(e,i,n){var t=window.jQuery;window.$doc||(window.$doc=t(document)),i=n.exports,i.messenger=e("inspire-js/1.0.1/lib/string"),i.submit=e("inspire-js/1.0.1/lib/submit"),i.checkbox=e("inspire-js/1.0.1/lib/checkbox"),i.checkbox=e("inspire-js/1.0.1/lib/confirm"),i.jump=e("inspire-js/1.0.1/lib/jump"),i.link=e("inspire-js/1.0.1/lib/link"),i.number=e("inspire-js/1.0.1/lib/number"),i.money=e("inspire-js/1.0.1/lib/money"),i.decimal=e("inspire-js/1.0.1/lib/decimal"),i.pagination=e("inspire-js/1.0.1/lib/pagination"),i.required=e("inspire-js/1.0.1/lib/required"),i.roles=e("inspire-js/1.0.1/lib/roles"),i.submit=e("inspire-js/1.0.1/lib/submit"),i.trim=e("inspire-js/1.0.1/lib/trim"),i.validity=e("inspire-js/1.0.1/lib/validity"),i.dialog=e("inspire-js/1.0.1/lib/dialog"),i.async=e("inspire-js/1.0.1/lib/async"),i.typeahead=e("inspire-js/1.0.1/lib/typeahead"),i.messenger=e("inspire-js/1.0.1/lib/messenger")}),define("inspire-js/1.0.1/lib/string",[],function(){var e=window.jQuery,i={init:function(e){return this.separator=e||",",this},join:function(i){var n=e.isArray(i)?i:[i];return n.join(this.separator)}};i.init.prototype=i,window.Joiner={on:function(e){return new i.init(e)}};var n={init:function(e){return this.separator=e||",",this},split:function(e){return e.split(this.separator)}};n.init.prototype=n,window.Spliter={on:function(e){return new n.init(e)}}}),define("inspire-js/1.0.1/lib/submit",[],function(){var e=window.jQuery;$doc.on("click",":submit",function(i){var n=e(this),t=n.parents("form");1==t.length&&(i.preventDefault(),i.stopPropagation(),n.attr("disabled","disabled"),t.submit())})}),define("inspire-js/1.0.1/lib/checkbox",[],function(){function e(e){$doc.on("change",e,function(){var e=t(this),i=e.data("target"),n=e.data("value-changed");if(i){var r=t(i).val(),a=e.parents("tr");if(e.prop("checked")){var o=e.attr("id");r.indexOf(o)<0&&(r=o+";"+r),a.addClass("info")}else r=r.replace(e.attr("id")+";","").replace(e.attr("id"),""),a.removeClass("info");t(i).val(r);var s=window[n];s&&"function"==typeof s&&s(r)}})}function i(e){$doc.on("change",e,function(){var e=t(this),i=e.parents("table");i&&i.children("tbody").find("input:checkbox[role=table-selected]").prop("checked",e.prop("checked")||!1).trigger("change")})}function n(){e("input:checkbox[role*=table-selected]"),i("input:checkbox[role*=table-selected-all]")}var t=window.jQuery;n()}),define("inspire-js/1.0.1/lib/confirm",[],function(e,i,n){function t(e){var i=o(this);if(!i.parent().attr("disabled"))if(window.confirm(i.data("message"))){var n=o(this).data("target");n&&o(n).click()}else e.preventDefault(),e.stopPropagation()}function r(e){o(e).each(function(){o(this).off("click").click(t)})}function a(){o.each(["span[role*=confirm]","a[role*=confirm]"],function(e,i){r(i),$doc.bind("ajaxSuccess",function(){r(i)})})}var o=window.jQuery;a(),n.exports={init:r,applyAll:a}}),define("inspire-js/1.0.1/lib/jump",[],function(e,i,n){function t(e,i){window.setTimeout(function(){i-=1,i>0?(e.children(".js-num").text(i),t(e,i)):location.href=e.data("target")},1e3)}function r(e){var i=o(e).first();i.size()>0&&(i.children(".js-num").text(i.data("timeout")),o(document).ready(function(){t(i,i.data("timeout"))}))}function a(){r("div[role*=jump]"),$doc.bind("ajaxSuccess",function(){r("div[role*=jump]")})}var o=window.jQuery;a(),n.exports={init:r,applyAll:a}}),define("inspire-js/1.0.1/lib/link",[],function(e,i,n){function t(e){a(e).each(function(){var e=a(this);e.unbind("click"),e[e.hasClass("disabled")?"unbind":"bind"]("click",function(){a(a(this).data("target")).click()})})}function r(){var e="[role*=button]";$doc.bind("ajaxSuccess",function(){t(e)})}var a=window.jQuery;r(),n.exports=t}),define("inspire-js/1.0.1/lib/number",[],function(e,i,n){function t(){return 37==event.keyCode||8==event.keyCode||9==event.keyCode||39==event.keyCode||46==event.keyCode||190==event.keyCode||110==event.keyCode||event.keyCode>=48&&event.keyCode<=57||event.keyCode>=96&&event.keyCode<=105?void 0:!1}function r(e){$doc.on("keydown",e,t)}function a(){r("input[role*=number]:visible")}window.jQuery;a(),n.exports={init:r,applyAll:a}}),define("inspire-js/1.0.1/lib/money",["inspire-js/1.0.1/lib/number"],function(e,i,n){function t(){this.value=o(this.value)}function r(){var e=clipboardData.getData("text");return a(e)?void clipboardData.setData("text",e):!1}function a(e){var i=0,n=e.length;for(i=0;n>i;i++){var t=e.charCodeAt(i);if(!(37==t||8==t||39==t||46==t||190==t||110==t||t>=48&&57>=t||t>=96&&105>=t))return!1}return!0}function o(e){if(/[^0-9\.]/.test(e))return e;e=e.replace(/^(\d*)$/,"$1."),e=(e+"00").replace(/(\d*\.\d\d)\d*/,"$1"),e=e.replace(".",",");for(var i=/(\d)(\d{3},)/;i.test(e);)e=e.replace(i,"$1,$2");return e=e.replace(/,(\d\d)$/,".$1"),e.replace(/^\./,"0.")}function s(e){d.init(e),$doc.on("blur",e,t),$doc.on("paste",e,r)}function l(){s("input[role*=money]:visible")}var d=(window.jQuery,e("inspire-js/1.0.1/lib/number"));l(),n.exports={init:s,applyAll:l}}),define("inspire-js/1.0.1/lib/decimal",[],function(e,i,n){function t(){return 189==event.keyCode||37==event.keyCode||8==event.keyCode||9==event.keyCode||39==event.keyCode||46==event.keyCode||190==event.keyCode||110==event.keyCode||event.keyCode>=48&&event.keyCode<=57||event.keyCode>=96&&event.keyCode<=105?void 0:!1}function r(){var e=c(this),i=e.attr("scale");this.value=s(this.value,i)}function a(){var e=clipboardData.getData("text");return o(e)?void clipboardData.setData("text",e):!1}function o(e){var i=0,n=e.length;for(i=0;n>i;i++){var t=e.charCodeAt(i);if(!(37==t||8==t||39==t||46==t||190==t||110==t||t>=48&&57>=t||t>=96&&105>=t))return!1}return!0}function s(e,i,n){i=i>0&&20>=i?i:2;var t;if(i=Number(i),1>i)t=Math.round(e).toString();else{var r=e.toString(),a="";r.indexOf("-")&&(a=r.substring(0,1),r=r.substring(1,r.length)),-1==r.lastIndexOf(".")&&(r+=".");var o=r.lastIndexOf(".")+i,s=Number(r.substring(o,o+1)),l=Number(r.substring(o+1,o+2));if(n&&l>=5){if(9==s&&o>0)for(;o>0&&(9==s||isNaN(s));)"."!=s?(o-=1,s=Number(r.substring(o,o+1))):o-=1;s+=1}if(10==s){r=r.substring(0,r.lastIndexOf("."));var d=Number(r)+1;t=d.toString()+"."}else t=r.substring(0,o)+s.toString()}-1==t.lastIndexOf(".")&&(t+=".");for(var c=t.substring(t.lastIndexOf(".")+1).length,u=0;i-c>u;u++)t+="0";return a+t}function l(e){c(e).each(function(e,i){c(i).trigger("blur")})}function d(){var e="input[role*=decimal]:visible";$doc.on("keydown",e,t),$doc.on("blur",e,r),$doc.on("paste",e,a),l(e),$doc.bind("ajaxSuccess",function(){l(e)})}var c=window.jQuery;d(),n.exports={init:l,applyAll:d}}),define("inspire-js/1.0.1/lib/pagination",[],function(e,i,n){function t(e,i){for(var n in i)i.hasOwnProperty(n)&&(e=e.replace(RegExp("{"+n+"}","g"),i[n]));return e}function r(e){var i=e.data("target"),n=s(i);if(n&&n.size()>0){var r=n.data("offset"),a=n.data("limit"),o=n.data("total"),l=e;l.text(t(l.data("text-format"),{offset:r,limit:a,total:o}));var d=e.parent().parent().find("#pagination-previous-link"),c=e.parent().parent().find("#pagination-next-link");d[1>=r?"addClass":"removeClass"]("disabled"),c[a===o?"addClass":"removeClass"]("disabled"),d.unbind("click"),r>1&&d.bind("click",function(){return s(d.data("target")||n.data("previous")).click()}),c.unbind("click"),a!=o&&c.bind("click",function(){return s(c.data("target")||n.data("next")).click()})}}function a(e){var i=s(e);i.size()<1||i.each(function(e,i){var n=s(i);n.data("pending")||(n.data("pending",!0),r(n),n.removeData("pending"))})}function o(){s.each(["#pagination",".pagination"],function(e,i){a(i),$doc.bind("ajaxSuccess",function(){a(i)})})}var s=window.jQuery;o(),n.exports={init:a,applyAll:o}}),define("inspire-js/1.0.1/lib/required",[],function(e,i,n){function t(){var e=o(this);e.tooltip(e.val().length<1?"show":"hide")}function r(e){o(e).each(function(){var e=o(this),i=e.nextAll().filter("span.help-inline"),n=e.data("title")||i.text()||"此字段必须填写",t={placement:s,trigger:"manual",title:n};e.tooltip(t)})}function a(){var e="input[required]:not(input[role]):visible";r(e),$doc.bind("ajaxSuccess",function(){r(e)}),$doc.on("blur",e,t)}var o=window.jQuery,s="right";a(),n.exports={init:r,applyAll:a}}),define("inspire-js/1.0.1/lib/roles",[],function(e,i,n){function t(){for(var e=o(this),i=(e.attr("role")+",").split(","),n=0;n<i.length;n++)if(!(i[n].length<1)){var t=l[i[n]],r=t.pattern;if(r){var a=new RegExp(r);if(!a.test(e.val())){var d=e.nextAll().filter("span.help-inline"),c=e.data("title")||d.text()||e.attr("placeholder")||t.placeholder||"格式不正确";return e.data("title",c),e.data("placement")||e.data("placement",s),e.data("trigger")||e.data("trigger","manual"),e.tooltip("show"),void(e.attr("force")&&e.focus())}}}e.tooltip("hide")}function r(){o("form").each(function(){o(this).attr("novalidate","novalidate")})}function a(){r("input[role]:visible"),$doc.bind("ajaxSuccess",function(){r("input[role]:visible")}),$doc.on("blur","input[role]:visible",t)}var o=window.jQuery,s="right",l={number:{pattern:"^[0-9]*$",placeholder:"请输入正确数字"},"positive-integer":{pattern:"^\\+?[1-9][0-9]*$",placeholder:"请输入正确的正整数"},email:{pattern:"[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?",placeholder:"example@example.com"},url:{pattern:"[a-zA-z]+://[^s]*",placeholder:"http://example.com"},website:{pattern:"^\\s*((([a-zA-z]+://)(www\\.))|([a-zA-z]+://)|(www\\.))\\w+\\.\\w{2,}\\s*$",placeholder:"http://example.com"},tel:{pattern:"(^(0[0-9]{2,3}\\-)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$)|(^((\\(\\d{3}\\))|(\\d{3}\\-))?(1[358]\\d{9})$)|(^86((\\(\\d{3}\\))|(\\d{3}\\-))?(1[358]\\d{9})$)|(^\\+86((\\(\\d{3}\\))|(\\d{3}\\-))?(1[358]\\d{9})$)",placeholder:"0592-8888888 | 13588888888"},mobile:{pattern:"1\\d{10}",placeholder:"13588888888"},zipcode:{pattern:"[1-9]\\d{5}(?!\\d)",placeholder:"请输入正确的邮编"},idc:{pattern:"\\d{15}|\\d{18}",placeholder:"请输入正确的身份证"},ip:{pattern:"((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)",placeholder:"请输入正确的IP,如192.168.1.1"},datetime:{pattern:"^((?!0000)[0-9]{4}\\-((0[1-9]|1[0-2])\\-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)\\-02\\-29)(\\s)*((([0-1]?[0-9])|([2][0-3]))\\:([0-5]?[0-9])(\\:([0-5]?[0-9]))?)?$",placeholder:"(2013-01-01)或(2013-01-01 11:26:00)"},tsrn:{pattern:"^[\\d|X|x]{15}$"},passwd:{pattern:"^[\\w\\W]{6,}$",placeholder:"建议密码大于6位"},account:{pattern:"^[A-Za-z0-9]+$"},money:{pattern:"^[0-9]+(.[0-9]{2})?$"},decimal:{pattern:"^-?[0-9]+(.[0-9]\\d*)?$"}};a(),n.exports={init:r,applyAll:a,validators:l}}),define("inspire-js/1.0.1/lib/trim",[],function(e,i,n){function t(){var e=a(this);e.val(a.trim(e.val()))}function r(){$doc.on("blur",":text",t),$doc.on("blur",":password",t)}var a=window.jQuery;r(),n.exports={applyAll:r}}),define("inspire-js/1.0.1/lib/validity",[],function(e,i,n){function t(e){a(e).each(function(){this.setCustomValidity&&this.setCustomValidity(a(this).data("title"))})}function r(){t("input[data-title]"),$doc.bind("ajaxSuccess",function(){t("input[data-title]:visible")})}var a=window.jQuery;r(),n.exports={init:t,applyAll:r}}),define("inspire-js/1.0.1/lib/dialog",[],function(e,i,n){function t(e,i){var n=a(e),t=!i&&n.is(":hidden");n.length>0&&!t&&n.modal({backdrop:!1})}function r(){t("div[role*=dialog]",!1),t("div[role*=cdialog]",!0),$doc.bind("ajaxSuccess",function(){t("div[role*=dialog]",!1),t("div[role*=cdialog]",!0)})}var a=window.jQuery;r(),n.exports={init:t,applyAll:r}}),define("inspire-js/1.0.1/lib/async",[],function(e,i,n){function t(e){var i=document.getElementsByTagName(e);if(i.length>0){for(var n=[],t=0;t<i.length;t++){var r=i[t].getAttribute("src");n[t]=r}d(n)}}function r(){t("require"),$doc.bind("ajaxSuccess",function(){t("require")})}var a=(window.jQuery,/^(?:loaded|complete|undefined)$/),o=/\.(?:(css|gzcss))(?:\?|$)/i,s=document.getElementById("inspnode"),l=("true"===s.getAttribute("debug")||!1,Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}),d=function(e,i){l(e)||(e=[e]);for(var n=document.getElementsByTagName("head")[0]||doc.documentElement,t=e.length-1,r=0;t>=r;r++){var s=e[r],d=o.test(s),c=document.createElement(d?"link":"script");t==r&&"function"==typeof i&&(c.onload=c.onerror=c.onreadystatechange=function(){a.test(c.readyState)&&(c.onload=c.onerror=c.onreadystatechange=null,d||n.removeChild(c),c=null,i())}),d?(c.rel="stylesheet",c.href=s):(c.async=!0,c.src=s),n.appendChild(c)}};r(),n.exports={init:t,applyAll:r,async:d}}),define("inspire-js/1.0.1/lib/typeahead",[],function(e,i,n){function t(e){var i=a(e);"undefined"!=i.typeahead&&i.typeahead({source:s,updater:l,highlighter:function(e){return this.__proto__.highlighter.call(this,e.name)},matcher:function(e){return this.__proto__.matcher.call(this,e.name)}})}function r(){var e="input[role*=typeahead]:visible",i=a(e);0==i.length||i.attr("disabled")||"undefined"==i.typeahead||(t(e),$doc.bind("ajaxComplete",function(){t(e)}))}var a=window.jQuery,o=function(e){return a.isFunction(e)?e:a.isFunction(window[e])?window[e]:null},s=function(e,i){var n=o(r);if(n)return n(e,i);var t=this,r=this.$element.data("source"),s=this.$element.data("params"),l=r.replace("//","/");a.post(l,{start:e,params:s}).done(function(e){return e=a(e).map(function(e,i){return{value:i.value,name:i.name,toString:function(){return JSON.stringify(this)}}}),t.render(e.slice(0,t.options.items)).show()})},l=function(e){var i=this.$element.data("updater"),n=JSON.parse(e);if(i){var t=o(i);if(t)t(n);else{var r=i.replace("//","/");a.post(r,{item:n.value}).done(function(){})}}return n.name};r(),n.exports={init:t,applyAll:r}}),define("inspire-js/1.0.1/lib/messenger",[],function(e,i,n){function t(){Messenger.options={extraClasses:"messenger-fixed messenger-on-bottom messenger-on-right",theme:"future"}}function r(e){var i=o(e),n=i.data("message"),t=i.data("target"),r=i.data("label"),a=Messenger().post({message:n,type:"info",actions:{run:{label:r,action:function(){location.href=t}},cancel:{label:"取消",action:function(){return a.cancel()}}}})}function a(){var e="div[role*=messenger]",i=o(e);0==i.length||i.attr("disabled")||r(e)}var o=window.jQuery;"undefined"!=typeof Messenger&&(t(),a()),n.exports={init:r,applyAll:a}});