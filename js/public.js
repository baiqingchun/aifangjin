/**
 * Created by Administrator on 2017/4/19.
 */
var Public = function () {
    var min_height =  600;
    var nodeTop  = $('#goTop');
    var goTop = function () {
        //滑动条事件
        $(window).scroll(function () {
            //获取窗口的滚动条的垂直位置
            var s = $(window).scrollTop();
            //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
            if( s > min_height){
                nodeTop.fadeIn(100);
            }else{
                nodeTop.fadeOut(100);
            }
        })
        //点击到达顶部按钮
        $('#goTop').on('touchstart',function(){
            // $(this).removeClass().addClass('clickafter');
            $('html,body').animate({
                scrollTop:0
            },140,function () {
                // $('#goTop').removeClass().addClass('clickbefore');
            })
        });
    }
    var goBack = function () {
        //回退功能
        $('.return').on('touchstart',function(){
            $(this).css('background-image','img/productList/click.png');
            history.back(-1);
        })
    }
    return {
        init:function () {
            goBack();
        },
        goTop:function () {
            goTop();
        }
    }
}()