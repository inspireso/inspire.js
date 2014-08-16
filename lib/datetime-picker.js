/*!
 * datetime-picker.js
 *
 * https://github.com/inspireso
 *
 * Copyright 2014 Inspireso and/or its affiliates.
 * Licensed under the Apache 2.0 License.
 *
 */

var $ = window.jQuery;

$.fn.datetimepicker.dates['zh-CN'] = {
    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    daysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    daysMin: ['日', '一', '二', '三', '四', '五', '六', '日'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    today: '今日',
    suffix: [],
    meridiem: []
};

var init = function(selector) {
    var $selector = $(selector);
    if ($selector.size() > 0) {
        $selector.each(function() {
            var $this = $(this);
            var format = $this.data('format') || 'yyyy/mm/dd';
            $this.datetimepicker({
                format: format
            });
        });
    }

}

$doc.bind('ajaxSuccess', function(e) {
    init('input[role*=datetime]:visible');
});