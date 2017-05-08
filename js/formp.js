/**
 * Created by Administrator on 2017/5/8.
 */
(function ($) {
    $.alertBottom = function (element,option) {
        var defaults = {
            //……
        };
        //step03-b 合并用户自定义属性，默认属性
        var options = $.extend(defaults, option);
        var $element = $(element);
        var node = null;
        $element.click(function () {
            node =  this;
           $(node).find('.loan_wrapper').addClass('active');
           // $('.loan_wrapper').addClass('active');

        });
        $('.loan_mask').click(function (e) {
            e.stopPropagation();//阻止冒泡
            $('.loan_wrapper').removeClass('active');
        });
        //step4 支持JQuery选择器
        //step5 支持链式调用
        $('.loan_wrapper .dropdown-menu li').click(function (e) {
            e.stopPropagation();//阻止冒泡
            var li = $(this).closest('.dropdown-menu').find('li');
            var text = $(this).text();
            console.log(e)
            $(node).find('em').html(text);
            li.removeClass('active');
            $(this).addClass('active');
            $('.loan_wrapper').removeClass('active');
        })
    };

    //step02 插件的扩展方法名称
    $.fn.alertBottom = function (options) {
        $(this).data('alert', new  $.alertBottom(this,options));
    }
})(jQuery);