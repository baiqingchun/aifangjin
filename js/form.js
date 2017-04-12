/**
 * Created by Administrator on 2017/4/11.
 */
/**
 * Created by tanlu on 2016/3/28.
 */

var Form = function () {
    var inst = null;
    var lastPage_record=null;
    var modal = null;
    var placeholder = "1. 线路计划：  \n2. 装备物资：  \n3. 应急预案：  \n4. 其他事项：";
    /**
     * 手机号验证
     * */
    var  telRuleCheck = function (string) {
        var pattern = /^1[34578]\d{9}$/;
        if (pattern.test(string)) {
            return true;
        }
        console.log('check mobile phone ' + string + ' failed.');
        return false;
    };
    /**
     * 报名表的表单验证
     *
     */
    /*{
     name:{required:true},
     age:{
     required: true,
     number:true
     },
     idcardno:{
     required: true,
     identityCheck:true
     },
     phone:{
     phoneCheck: true,
     required: true
     },
     mycity:"required",
     startcity:"required",
     endcity:"required",
     starttime:"required",
     endtime:"required",
     daynumber:{
     required: true,
     number:true
     },
     match           :"required",
     content:"required"
     }*/
    /*{
     name:{
     required:"请输入姓名"
     },
     age:{
     required: "请输入年龄",
     number:'请输入数字'
     },
     idcardno:{
     required: '请输入身份证号',
     identityCheck:'输入有误，请重新输入'
     },
     phone:{
     phoneCheck: '输入有误，请重新输入',
     required: '请输入手机号'
     },
     mycity:"请输入所在地",
     startcity:"请输入出发地",
     endcity:"请输入目的地",
     starttime:"请输入起始时间",
     endtime:"请输入结束时间",
     daynumber:{
     required: '请输入行程天数',
     number:'请输入数字'
     },
     match           :"&nbsp;",
     content:"&nbsp;"
     }*/
    function applicationForm(node,ruleo,messageo) {

        $.validator.addMethod("phoneCheck",function(value,element){
            return telRuleCheck(value)
        },"<font color='#E47068'>手机号有误</font>");
        node.validate({
            rules :ruleo,

            messages : messageo,
            errorPlacement : function(error, element) {
                /*   if(element.attr("name")=="jcaptcha"){
                 error.appendTo(element.parent().next().next());
                 }else{
                 error.appendTo(element.parent().next());
                 }
                 error.addClass("ico_error");*/
                element.parent().append(error)
            },
            unhighlight: function (element) { // revert the change done by hightlight

                $(element).removeClass('error')
                // set error class to the control group
            },
            submitHandler: function() {


            }
        });
    }




    return{
           init:function (node,ruleo,messageo) {
               applicationForm(node,ruleo,messageo)
           }
    }
}();
