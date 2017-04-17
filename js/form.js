/**
 * Created by Administrator on 2017/4/11.
 */
/**
 * Created by tanlu on 2016/3/28.
 */

var Form = function () {
   var VerifyFlag = false;
   var SubmitFlag = false;
    var Message = {
        tel:{required:'手机号为空',phone:'请输入正确的手机号'},
        captcha:{required:'验证码不能为空',remote:'请输入正确的短信验证码',have:'您已注册过，请重新登录'},
        password:{required:'密码不能为空'}
    };
    var ErrorNode = $('.error_tip .info');
    var TimeFlag = true;
    /**
     * 手机号验证
     * */
    var  telRuleCheck = function (string) {
        var pattern = /^1[34578]\d{9}$/;
        if (pattern.test(string)) {
            return true;
        }
        // console.log('check mobile phone ' + string + ' failed.');
        return false;
    };
    var verify = function (name,val) {
        var node =  ErrorNode.closest('.error_tip')
        if(val){
            if(name=='tel'&&!telRuleCheck(val)){
                ErrorNode.text(Message[name].phone);
                node.show();
                return false;
            }
        }else{
            ErrorNode.text( Message[name].required) ;
            node.show();
            return false;
        }
        node.hide();
        return true;
    }
    var errorTip = function () {
       /* var rule = {tel:{required:true,phone:true},captcha:{required:true}}*/
        var flag = true;
        $('input').each(function (k,v) {
            var val = $.trim($(v).val());
            var name = $(v).attr('name');
            if(!verify(name,val)){
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
    var timecount = function (second,callback) {
        var node = $('.get_code');


            setTimeout(function () {
                second--;
                if(second>0){
                    timecount(second,callback);
                    node.css('color','#666666');
                    node.text(second+'S');
                    node.attr('disabled','true');
                }else{
                    node.css('color','#ea592e');
                    node.text('获取验证码');
                    if(callback){
                        console.log(12312)
                        callback();
                    }
                }

            },1000)


    }
    /**
     * 表单验证初始化
     */
    var formValidate = function (fun) {
        //表单输入的时候验证
        $('input').each(function (k,v) {
            var _this = this;
           $(this).on('input propertychange',function () {
               var val = $(_this).val();
               var name = $(_this).attr('name');
               var flag = false;
                if(SubmitFlag){
                    errorTip();
                }
           })
        });
        //给提交按钮添加事件
        $('.submit').click(function (e) {
            e.preventDefault();
            var flag = false;
            flag= errorTip();
            SubmitFlag = true;
            if(flag){
                if(fun){
                    fun();
                }

            }
        });

        //给验证码添加事件
        $('.get_code').click(function () {
            console.log(TimeFlag)
            var time = 60;
            if(TimeFlag){

                timecount(time, function () {
                    TimeFlag=true;
                    console.log(234)
                });
                TimeFlag = false;
            }

        })
    }





    return{
           init:function (fun) {
               formValidate(fun);

           },
           validate:function (node,ruleo,messageo) {

           }
    }
}();
