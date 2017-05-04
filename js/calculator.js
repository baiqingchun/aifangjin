
    $(document).ready(function() {
        /*tab栏切换*/
        //初始化默认操作
        $(".tab_content").hide();
        $("ul.tabs li:first").addClass("active").show();
        $(".tab_content:first").show();

        $("ul.tabs li").click(function(){
            $(this).addClass("active").siblings().removeClass('active');
            /*var activeTab = $(this).find("a").attr("href");
            $(activeTab).fadeIn(); //Fade in the active content
            return false;*/
        });
        /*点击贷款期限出现弹框*/
        $('#business-loan-period').on('click',function(){

        });
        //解决ios下，弹出输入界面挡住input的问题
        $('#loan-input').on('click',function(){
            var target = this;

            setTimeout(function(){
                //scrollIntoView滚动浏览器窗口或者容器元素，以便在当前视窗的可见范围看见当前元素
                target.scrollIntoView(true);
            },100);
            $('.loan_cont').attr('position','static');
        })
    });