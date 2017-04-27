/**
 * Created by Administrator on 2017/4/11.
 */
/**
 * Created by tanlu on 2016/3/28.
 */

var Form = function () {
    (function () {
        $('.cover').css('height',$(document).height());
        $('.return').on('click',function () {
            window.history.back()
        });
        $('input').focus(function () {
            $('.submit').removeClass('disabled');
        })
    }());
    var VerifyFlag = false;
    var SubmitFlag = false;
    var TelFlag = false;//判断手机号是否输入到11位，11之后开始验证手机号
    var CaptchaFlag = false;//判断验证码是否输入到4位，4位之后开始验证验证码
    var CaptchaCheckFlag = false;
    // var URL = 'http://192.168.85.48:8080';
    var URL = 'http://192.168.85.253:8081';
    var Message = {
        name: {required: '请输入姓名'},
        tel: {required: '手机号为空', phone: '请输入正确的手机号'},
        captcha: {required: '验证码不能为空', remote: '请输入正确的图形验证码', have: '您已注册过，请重新登录'},
        smscaptcha: {required: '验证码不能为空', remote: '请输入正确的图形验证码', have: '您已注册过，请重新登录'},
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
    //显示错误信息
    var showError = function (errornode,info) {
        var node  = errornode.find('span');
        node.text(info);
        errornode.show();
    }
    //隐藏错误信息
    var hideError = function (errornode) {

        errornode.hide();
    }
    //图形验证码验证是否正确ajax请求
    var captchafun = function (fun) {
        var nodeerror =  $('.error_bottom');//公共的错误
        var val = $('.captcha').val();
        $.ajax({
            type: "POST",
            url: URL+"/userRegister/picVerification",
            data: {
                picVerification:val
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data);
                if(data.code==0){
                    CaptchaCheckFlag= true;
                    hideError(nodeerror);
                    if(fun){
                        fun();
                    }
                }else{
                    CaptchaCheckFlag = false;
                    showError(nodeerror,Message.captcha.remote)
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.error(msg);
            }
        });
    };
    //发送短信验证码ajax请求
    var smsAjax = function (fun) {
        var time = 60;
        var phone = $('.tel').val();
        var val = $('.captcha').val();
        $.ajax({
            type: "POST",
            url: URL+"/userRegister/sendPhoneValidate",
            data: {
                phone:phone,
                picVerification:val
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data)
                if(data.code==0||data.code==-300){
                    hideError(ErrorNode)
                    if (TimeFlag) {

                        authCode(time, function () {
                            TimeFlag = true;
                            console.log(234)
                        });
                        TimeFlag = false;
                    }
                }else{
                    showError(ErrorNode,Message.captcha.remote)
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.error(msg);
            }
        });
    };
    //注册ajax请求
    var registerAjax = function () {
        var phone = $('.tel').val();
        var pass = $('#password').val();
        var piccode = $('.captcha').val();
        var smscode = $('.smscaptcha').val();
        $.ajax({
            type: "POST",
            url: URL+"/userRegister/register",
            data: {
                phone:phone,
                password:pass,
                pic_code:piccode,
                sms_code:smscode
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data)
                $('.alert').show();
                $('.cover').show();
                if(data.code==0){

                }else{
                    // showError(ErrorNode,Message.captcha.remote)
                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.info(msg);
                $('.alert').show();
                $('.cover').show();
            }
        });
    };
    //密码登录ajax请求
    var loginFirAjax = function () {
        var phone = $('.tel').val();
        var pass = $('#password').val();
        $.ajax({
            type: "POST",
            url: URL+"/Login/loginByA",
            data: {
                phone:phone,
                password:pass
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data)
                if(data.code==0){

                }else{

                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.error(msg);
            }
        });
    };
    //验证码登录ajax请求
    var loginSecAjax = function () {
        var phone = $('.tel').val();
        var pass = $('.smscaptcha').val();
        $.ajax({
            type: "POST",
            url: URL+"/Login/loginByB",
            data: {
                phone:phone,
                smscode:pass
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data)
                if(data.code==0){

                }else{

                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.error(msg);
            }
        });
    };
    //找回密码第一步
    var findPassFir = function () {
        var phone = $('.tel').val();
        var pass = $('.smscaptcha').val();
        $.ajax({
            type: "POST",
            url: URL+"/userRegister/checkPhoneValidateMethod",
            data: {
                phone:phone,
                content:pass
            },
            dataType: "jsonp",
            jsonp: 'jsonpcallback',
            success: function (data) {
                console.log(data)
                if(data.code==0){

                }else{

                }
                // Play with returned data in JSON format
            },
            error: function (msg) {
                console.error(msg);
            }
        });
    };
    //加上ajax验证
    var verifyAjax = function (name, val) {
        var nodeerror =  $('.error_bottom');//公共的错误
        if (val) {
            hideError(nodeerror);
            if(name == 'tel'){
                if(val.length>=11){
                    TelFlag = true;
                }
                if(TelFlag){
                    if (!telRuleCheck(val)) {
                        showError(nodeerror,Message[name].phone)
                        return false;
                    }else{
                        hideError(nodeerror);
                    }
                }
            }
            if(name=='captcha'){
                console.log('aaaa'+val.length,":"+CaptchaFlag)
                if(val.length>=4){
                    CaptchaFlag = true;
                }
                if(CaptchaFlag){
                    if(val.length<4){
                        CaptchaCheckFlag = false;
                        showError(nodeerror,Message[name].remote)
                        return false;
                    }else{
                        captchafun();//图形验证码ajax请求验证
                    }
                }

            }

        } else {
            if(Message[name]){
                showError(nodeerror,Message[name].required)
                return false;
            }

        }

        return true;
    };
    //没有ajax的验证
    var verify = function (name, val) {
        var nodeerror =  $('.error_bottom');//公共的错误
        if (val) {
            if (name === 'tel' && !telRuleCheck(val)) {
                showError(nodeerror,Message[name].phone);
                return false;
            }
             if(name==='captcha') {
                 if (val.length < 4) {
                     showError(nodeerror, Message[name].remote)
                     return false;
                 }
             }
        } else {
            if(Message[name]){
                showError(nodeerror,Message[name].required)
                return false;
            }

        }
        hideError(nodeerror);
        return true;
    };
    var errorTip = function () {
        /* var rule = {tel:{required:true,phone:true},captcha:{required:true}}*/
        var flag = true;
        $('input').each(function (k, v) {
            var val = $.trim($(v).val());
            var name = $(v).attr('name');
            if (!verify(name, val)) {
                flag = false;
                console.log(name)
                return false;
            }


        })

        return flag;
    };
    //60秒倒计时
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
     * 点击输入验证码
     * */
    var changeCaptcha = function () {
        $('.get_picCode').click(function () {
            console.log(1)
            var node  = $('.jcaptcha');
            var timestamp = Date.parse(new Date());
            node.attr('src',URL+'/userRegister/getPic_code?time='+timestamp)
        })
    };
    var entiretyVerify = function (node) {
        var flag = false;
        var cssError = $('.error_bottom ').css('display');
        if($(node).hasClass('disabled')){
            return false;

        }
        if(!CaptchaCheckFlag){
            showError(ErrorNode,Message.captcha.remote)
            return false;
        }
        if(cssError==='block'){
            return false;
        }
        flag = errorTip();
        SubmitFlag = true;
        return flag
    };
    /**
     * 注册点击提交按钮
     * */
    var register = function () {
        //给提交按钮添加事件
        $('.submit').click(function (e) {
            e.preventDefault();
            if(entiretyVerify(this)){
                registerAjax();
            }
        });
    };
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
                console.log(name,":"+val)
                verifyAjax(name,val);
            })
        });


        //给验证码添加事件
        $('.get_code').on('click', function () {
            console.log(TimeFlag)
            var phone = $('.tel').val();
            var code = $('.captcha ').val();
            console.log(code)
            if(!telRuleCheck(phone)){
                showError(ErrorNode,Message.tel.phone);
                return;
            }
            if(TimeFlag){
                if(CaptchaCheckFlag){
                    captchafun(function () {
                        smsAjax();
                    })
                }else{
                    showError(ErrorNode,Message.captcha.remote)
                }
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
                ulNode.find('.select_ul').fadeOut();
            } else {
                $('.form_group_select').removeClass('active')
                 $('.select_ul').hide()
                ulNode.find('.select_ul').fadeIn(10);
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
            $(this).closest('.select_ul').fadeOut()
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
   /**
    * 申请第二步，点击确定提交申请
    * */
   var applyAjaxSec = function () {
    var selectParameter={userName:'啊啊啊',phone:"1503290822"};
    $('.form_group_select').each(function (k,v) {
        var option = $(v).data('parameter');
        if(option=='age'){
            selectParameter[option] = $(v).find('input').val()
        }else {
            selectParameter[option] = $(v).find('em').text();
        }

    })
       console.log(selectParameter)
       $.ajax({
           type: "POST",
           url: "http://192.168.85.54:8080/SignPo/SubmitApplication",
           data: selectParameter,
           dataType: "jsonp",
           jsonp: 'jsonpcallback',
           success: function (data) {
               console.log(data)
               // Play with returned data in JSON format
           },
           error: function (msg) {
               console.error(msg);
           }
       });
   }
    return {
        init: function (fun) {
            $('input').val('');
            $('.submit').addClass('disabled');
            formValidate(fun);
            agreement();//点击是否同意爱房金协议
            changeCaptcha();//点击图形验证码
        },
        register:function () {
            register();
        },
        loginFir:function () {
            //给提交按钮添加事件
            $('.submit').click(function (e) {
                e.preventDefault();
                if(entiretyVerify(this)){
                    loginFirAjax();
                }
            });
        },
        loginSec:function () {
            //给提交按钮添加事件
            $('.submit').click(function (e) {
                e.preventDefault();
                if(entiretyVerify(this)){
                    loginSecAjax();
                }
            });
        },
        findPassFir:function () {
            //给提交按钮添加事件
            $('.submit').click(function (e) {
                e.preventDefault();
                if(entiretyVerify(this)){
                    findPassFir();
                }
            });
        },
        validate: function (node, ruleo, messageo) {

        },
        select: function () {

            selectCostum();//自定义select
            agreement();//点击是否同意爱房金协议
            //点击提交信息按钮
            $('.submit').on('click', function (e) {
                e.preventDefault();
                applyAjaxSec();
                var _this = this;
                var falg = $(_this).hasClass('disabled');
                var input_flag = true;//true代表所有输入框都已输入  false代表还有 没有选择的
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
              var node = $(this).siblings('strong');

              if(val){
                  node.css('visibility','hidden')
                  selectIsNotChoose(this);
              }else{
                  node.css('visibility','')
                  selectIsNotChoose(this,true);
              }
            })
            $('[name=age]').focus(function () {
                $('.form_group_select').removeClass('active')
                $('.select_ul').hide();
            })
            //点击蒙布
            $('.cover').on('click', function () {
                $(this).hide();
                $('.alert').hide()
            })
            //年龄扩大点击范围
            $('.age_form').on('click',function () {
                $('.age_form input').focus()
            })
        }
    }
}();
