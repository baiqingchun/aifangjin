/**
 * Created by Administrator on 2017/4/11.
 */
/**
 * Created by tanlu on 2016/3/28.
 */

var Form = function () {
    (function () {
        $('.cover').css('height',$('body').height());
        $('.return').on('click',function () {
            window.history.back()
        })
    }());
    var VerifyFlag = false;
    var SubmitFlag = false;
    var Message = {
        name: {required: '请输入姓名'},
        tel: {required: '手机号为空', phone: '请输入正确的手机号'},
        captcha: {required: '验证码不能为空', remote: '请输入正确的短信验证码', have: '您已注册过，请重新登录'},
        password: {required: '密码不能为空'}
    };
    var ErrorNode = $('.error_bottom');
    var TimeFlag = true;
    /**
     * 手机号验证
     * */
    var telRuleCheck = function (string) {
        var pattern = /^1[34578]\d{9}$/;
        if (pattern.test(string)) {
            return true;
        }
        // console.log('check mobile phone ' + string + ' failed.');
        return false;
    };
    var verify = function (name, val) {
        var node = ErrorNode.find('span')
        if (val) {
            if (name == 'tel' && !telRuleCheck(val)) {
                node.text(Message[name].phone);
                ErrorNode.show();
                return false;
            }
        } else {
            node.text(Message[name].required);
            ErrorNode.show();
            return false;
        }
        ErrorNode.hide();
        return true;
    }
    var errorTip = function () {
        /* var rule = {tel:{required:true,phone:true},captcha:{required:true}}*/
        var flag = true;
        $('input').each(function (k, v) {
            var val = $.trim($(v).val());
            var name = $(v).attr('name');
            if (!verify(name, val)) {
                flag = false;
                return false;
            }
            /*if(name='tel'){
             if(!val){
             errorNode.text(message[name].required);
             }else if(!telRuleCheck(val)){
             errorNode.text(message[name].phone);
             }
             }else if(name='captcha'){
             errorNode.text(message[name].required);
             }*/

        })

        return flag;
    };
    var authCode = function (second, callback) {
        var node = $('.get_code');
        node.css('color', '#666666');
        node.text(second + 'S');
        node.attr('disabled', 'true');
        var timecount = function (second, callback) {
            setTimeout(function () {
                second--;
                if (second > 0) {
                    timecount(second, callback);
                    node.css('color', '#666666');
                    node.text(second + 'S');
                    node.attr('disabled', 'true');
                } else {
                    node.css('color', '#ea592e');
                    node.text('重新获取');
                    if (callback) {
                        console.log(12312)
                        callback();
                    }
                }

            }, 1000)


        }
        timecount(second, callback)
    }

    /**
     * 表单验证初始化
     */
    var formValidate = function (fun) {
        //表单输入的时候验证
        $('input').each(function (k, v) {
            var _this = this;
            $(this).on('input propertychange', function () {
                var val = $(_this).val();
                var name = $(_this).attr('name');
                var flag = false;
                if (SubmitFlag) {
                    errorTip();
                }
            })
        });
        //给提交按钮添加事件
        $('.submit').click(function (e) {
            e.preventDefault();
            var flag = false;
            flag = errorTip();
            SubmitFlag = true;
            if (flag) {
                if (fun) {
                    fun();
                }
            }
        });

        //给验证码添加事件
        $('.get_code').on('touchstart', function () {
            console.log(TimeFlag)
            var time = 60;
            if (TimeFlag) {

                authCode(time, function () {
                    TimeFlag = true;
                    console.log(234)
                });
                TimeFlag = false;
            }
        })
        /*  $('.get_code').click(function () {
         console.log(TimeFlag)
         var time = 60;
         if(TimeFlag){

         timecount(time, function () {
         TimeFlag=true;
         console.log(234)
         });
         TimeFlag = false;
         }

         })*/
    }
    /*
     * 自定义select
     * */
    var selectCostum = function () {
        var hideUl = function () {
            $('.form_group_select').removeClass('active');
            $('.cover_white').hide();
        }
        $('.select').click(function () {
            var _this = this;
            var ulNode = $(_this).closest('.form_group_select')

            if (ulNode.hasClass('active')) {
                ulNode.removeClass('active');
            } else {
                $('.form_group_select').removeClass('active')
                ulNode.addClass('active');
                $('.cover_white').show();
            }

        });
        $('.cover_white').on('touchstart', function () {
            hideUl();
        })
        $('.select_ul li').click(function () {
            var val = $(this).text();
            var pnode=$(this).closest('.form_group_select');
            console.log(val)
            $(this).closest('.select_ul').find('li').removeClass('active');
            $(this).addClass('active');
            pnode.find('strong').css('visibility', 'hidden')
            pnode.find('em').html(val);
            selectIsNotChoose(this);
            hideUl();
        })
    }
    /*
    * 自定义的select是否选择，如果选择则加上class='selected'
    * */
    var selectIsNotChoose= function (node,flag) {
        var pnode = $(node).closest('.form_group_select');
        if(flag){
            pnode.removeClass('selected');//下拉框未选择
        }else{
            pnode.addClass('selected');//下拉框选择
        }

    }
    /*
    * 是否同意协议
    * */
   var agreement = function () {
       $('.input_check input').on('click', function () {
           if ($('.input_check input').is(':checked')) {

               $('.submit').removeClass('disabled').attr('disabled',false)
           }else{

               $('.submit').addClass('disabled').attr('disabled',true);

           }
       })
   }
    return {
        init: function (fun) {
            formValidate(fun);
            agreement();//点击是否同意爱房金协议
        },
        validate: function (node, ruleo, messageo) {

        },
        select: function () {
            selectCostum();//自定义select
            agreement();//点击是否同意爱房金协议
            //点击提交信息按钮
            $('.submit').on('click', function (e) {
                e.preventDefault();
                var _this = this;
                var falg = $(_this).hasClass('disabled');
                var input_flag = true;
                $('.form_group_select').each(function (k,v) {
                      if(!$(v).hasClass('selected')){
                          input_flag= false;
                      }
                })
                // input_flag = true;
                console.log(input_flag)
                if(!falg&&input_flag){
                    $('.form_group_select').removeClass('active');
                    $('.alert').show();
                    $('.cover').show();
                }

            })
            //点击弹窗的确定按钮
            $('.alert a').on('touchstart', function () {
                window.location.href = './'
            })
            //年龄单独处理
            $('[name=age]').on('input propertychange',function () {
              var val = $.trim($(this).val());
              var node = $(this).prev().prev();
              if(val){
                  node.css('visibility','hidden')
                  selectIsNotChoose(this);
              }else{
                  node.css('visibility','')
                  selectIsNotChoose(this,true);
              }
            })
            //点击蒙布
            $('.cover').on('click', function () {
                $(this).hide();
                $('.alert').hide()
            })
        }
    }
}();
