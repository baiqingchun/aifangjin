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

        $('input').each(function (k,v) {
            var val = $.trim($(v).val());
            var name = $(v).attr('name');
            if(!verify(name,val)){

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
        return true;
    }
    var formValidate = function () {
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
        })
        $('.submit').click(function (e) {
            e.preventDefault();
            errorTip();
            SubmitFlag = true;
            if(VerifyFlag){

            }

        })
    }





    return{
           init:function () {
               formValidate();
           },
           validate:function (node,ruleo,messageo) {

           }
    }
}();
