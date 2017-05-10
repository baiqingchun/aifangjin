/**
 * Created by Administrator on 2017/5/9.
 */
var Calculator = function(){
    //贷款金额输入框失焦匹配
    /*必须是1到6位的正整数*/
    var businessLoanAmount = $('#loan-money');

//点击显示弹出框
    var businessLoanPeriod = $('#business-loan-period');
    var businessMaskWrapper = $('#loan-wrapper');

//选择贷款年限下拉列表内容
    var yearMenu = $('#dropdownMenu');
    var yearCont = $('#business-year');

//自定义年限输入框失焦事件
    var businessInput = $('#loan-input');
    var maskWrapper = $('.loan_cont');

//解决ios下，弹出输入界面挡住input的问题


//点击遮罩层隐藏

//点击商贷利率
    var businessLoanRate = $('#business-loan-rate');
    var businessLoanRateWrapper = $('#loan-rate-wrapper');

//选择贷款利率下拉列表内容
    var defualtRate = 4.9;
    var defualtDiscount = 0.85;
    var businessRateMenu = $('#rate-dropdownMenu');
    var businessBaseRate = $('#loan-base-rate');
    var businessRatePercent = $('#rate-percent');
//解决ios下，弹出输入界面挡住input的问题
//自定义输入年利率

//点击计算按钮
    var businessBtn = $('#loan-btn');
    var businessUrl = 'calculator_result.html';

//回退功能
    Public.init();

    /*公积金计算器*/

//贷款金额输入框失焦匹配
    /*必须是1到6位的正整数*/
    var accumulationLoanAmount = $('#accumulation-amount');

//点击显示弹出框
    var accumulationLoanPeriod = $('#accumulation-cont');
    var accumulationMaskWrapper = $('#accumulation-loan-wrapper');

//选择贷款年限下拉列表内容
    var accumulationYearMenu = $('#accumulation-dropdownMenu');
    var accumulationYearCont = $('#accumulation-period');

//自定义输入框失焦事件
    var accumulationLoanInput = $('#accumulation-loan-input');

//点击遮罩层隐藏

//点击公积金利率
    var accumulationLoanRate = $('#accumulation-loan-rate');
    var accumulationLoanRateWrapper = $('#accumulation-loan-rate-wrapper');

//选择下拉列表内容
    var accumulationRateDropdownMenu = $('#accumulation-rate-dropdownMenu');
    var accumulationRatePercent = $('#accumulation-year-rate');
    var accumulationRateBase = 'accumulation-rate-base';
    var accumulationRateBaseDiscount = 'accumulation-rate-base-discount';
    var accumulationDefualtRate = 3.25;
    var accumulationDefualtDiscount = 1.1;

//自定义输入年利率

//点击计算按钮
    var accumulationBtn = $('#accumulation-btn');
    var accumulationUrl = 'calculator_accumulation.html';

    /*组合贷款计算器*/

//点击显示弹出框
    var combindLoanPeriod = $('#combind-cont');
    var combindMaskWrapper = $('#combind-loan-wrapper');
//点击遮罩层隐藏
//选择贷款年限下拉列表内容
    var combindYearMenu = $('#combind-dropdownMenu');
    var combindYearCont = $('#combind-period');
//自定义输入框失焦事件
    var combindLoanInput = $('#combind-loan-input');
//公积金贷款金额输入框失焦匹配
    /*必须是1到6位的正整数*/
    var combindAccumulationAmount = $('#combind-accumulation-amount');
//点击公积金利率
    var combindAccumulationLoanRate = $('#combind-accumulation-loan-rate');
    var combindAccumulationLoanRateWrapper = $('#combind-accumulation-loan-rate-wrapper');
//选择下拉列表内容
    var combindAccumulationRateDropdownMenu = $('#combind-accumulation-rate-dropdownMenu');
    var combindAtionRatePercent = $('#combind-accumulation-year-rate');
    var combindAtionRateBase = 'combind-accumulation-rate-base';
    var combindAtionRateBaseDiscount = 'combind-accumulation-rate-base-discount';
//自定义输入年利率

//商业贷款金额输入框失焦匹配
    /*必须是1到6位的正整数*/
    var combindBusinessAmount = $('#combind-amount');
//点击公积金利率
    var combindBusinessLoanRate = $('#combind-loan-rate');
    var combindBusinessLoanRateWrapper = $('#combind-loan-rate-wrapper');
//选择下拉列表内容
    var combindBusinessRateDropdownMenu = $('#combind-business-rate-dropdownMenu');
    var combindBusinessRatePercent = $('#combind-year-rate');
    var combindBusinessRateBase = 'combind-business-rate-base';
    var combindBusinessRateBaseDiscount = 'combind-business-rate-base-discount';
//自定义输入年利率

//点击计算按钮
    var combindBtn = $('#combind-btn');
    var combindUrl = 'combindCalculator.html';


//方法封装
//贷款金额输入框失焦匹配
    /*必须是1到6位的正整数*/
    function loanAmount(target){
        target.on('blur',function(){
            var loanAmount = $(this).val();
            var reg = /^[1-9][0-9]{0,6}$/;
            var isValid = reg.test(loanAmount);
            if(!isValid){
                $(this).val('0');
            }
        });
    }
//点击显示弹出框
    function showMask(target,mask){
        target.on('click',function(){
            mask.removeClass('hide').addClass('show');
        });
    }
//选择贷款年限下拉列表内容
    function selectMenu(menu,year,wrapper,menuClassname){
        menu.on('click',function(ev){
            var liTarget = $(ev.target).closest('li').eq(0).attr('id');
            if(liTarget === menuClassname){
                return false;
            }else{
                $(this).find('li').removeClass('active');
                var text = $(ev.target).closest('li').eq(0).addClass('active').find('span').text();
                year.html(text.substring(0,text.length-1));
                wrapper.removeClass('show').addClass('hide');
            }
        });
    }
//点击遮罩层隐藏
    function maskHide(wrapper,maskClassname){
        wrapper.on('click',function(ev){
            var target = ev.target;
            var t = $(target).attr('class');
            if(t === maskClassname){
                ev.stopPropagation();
                $(this).removeClass('show').addClass('hide');
            }
        });
    }
//自定义年限输入框失焦事件
    function definedYear(input,yearCont){
        input.on('blur',function(){
            var yearlimitStr = $(this).val();
            var reg = /^[1-9]$|(^[1-2][0-9]$)|30/;
            var isValid = reg.test(yearlimitStr);
            var defaultYearlimit = 25;
            if(!isValid){
                yearCont.html(defaultYearlimit);
            }else{
                yearCont.html(yearlimitStr);
            }
        });
    }
//点击贷款利率
    function selectRate(target,wrapper,classname){
        target.on('click',function(){
            wrapper.removeClass('hide').addClass('show');
        });
        wrapper.on('click',function(ev){
            var target = ev.target;
            var t = $(target).attr('id');
            if(t === classname){
                ev.stopPropagation();
                $(this).removeClass('show').addClass('hide');
            }
        });
    }
//选择贷款利率下拉列表内容
    function selectRateMenu(menu,loanBaseRate,loanRateWrapper,ratePercent,rateBase,rateBaceDiscount,defualtRate,defualtDiscount ){
        menu.on('click',function(ev){
            var liTarget = $(ev.target).closest('li').eq(0).attr('id');
            $(this).find('li').removeClass('active');
            var text = $(ev.target).closest('li').eq(0).addClass('active').find('span').text();
            loanBaseRate.html(text);
            loanRateWrapper.removeClass('show').addClass('hide');
            //根据选项展示不同数值
            if(liTarget === rateBase){
                ratePercent.val(defualtRate);
            }else if(liTarget === rateBaceDiscount){
                var rate = defualtRate * defualtDiscount;
                ratePercent.val(rate);
            }
        });
    }
//自定义输入年利率
    function definedYearRate(target,defaultValue){
        target.on('blur',function(){
            var yearRateStr = $(this).val();
            var yearRate = parseFloat(yearRateStr);
            var reg = /^[0-9]{1,2}(\.\d{1,3})*$/;
            var isValid = reg.test(yearRateStr) && yearRate > 0 && yearRate < 100;
            if(!isValid){
                $(this).val(defaultValue);
            }
        });
    }
//点击计算按钮
    function count(target,amount,year,percent,defualtRate,url){
        target.on('click',function(){
            var money = amount.val();
            var period = year.text();
            var rate = percent.val();
            //如果年利率没有输入或者输入值为0的时候，默认为4.9
            if(rate === ''|| rate === '0'){
                rate = defualtRate;
                percent.val(rate);
            }
            var m = money*10000;
            var p = period*12;
            var r = rate/100;

            if(money === ''){
                amount.attr('placeholder','请填写贷款金额');
            }else if(money === '0'){
                amount.val('');
                amount.attr('placeholder','请填写贷款金额');
            }else{
                window.location.href = url;
            }
            //本地存储
            var array = [m,p,r];
            if(window.localStorage){
                localStorage.setItem('data',array);
            }else{
                Cookie.write('data',array);
            }
        });
    }
//点击组合贷款计算按钮
    function combindCount(target,Aamount,year,Apercent,Bamount,Bpercent,defualtRateA,defualtRateB,url){
        target.on('click',function(){
            var Amoney = Aamount.val();
            var period = year.text();
            var Arate = Apercent.val();
            var Bmoney = Bamount.val();
            var Brate = Bpercent.val();
            //如果年利率没有输入或者输入值为0的时候，默认为4.9
            if(Arate === ''|| Arate === '0'){
                Arate = defualtRateA;
                Apercent.val(Arate);
            }else if(Brate === ''|| Brate === '0'){
                Brate = defualtRateB;
                Bpercent.val(Brate);
            }
            console.log(Arate);
            console.log(Brate);
            if(Amoney === ''){
                Aamount.attr('placeholder','请填写贷款金额');
            }else if( Bmoney === ''){
                Bamount.attr('placeholder','请填写贷款金额');
            }else if(Amoney === '0'){
                Aamount.val('');
                Aamount.attr('placeholder','请填写贷款金额');
            }else if(Bmoney === '0'){
                Bamount.val('');
                Bamount.attr('placeholder','请填写贷款金额');
            }
            if(Amoney !== ''&& Bmoney !== ''&& Amoney !== '0'&& Bmoney !== '0'){
                window.location.href = url;
            }
            var am = parseInt(Amoney*10000);
            var p = parseInt(period*12);
            var ar = parseFloat(Arate/100);
            var bm = parseInt(Bmoney*10000);
            var br = parseFloat(Brate/100);
            var m = am + bm;
            var r = ar + br;
            //本地存储
            var array1 = [m,p,r];
            if(window.localStorage){
                localStorage.setItem('data',array1);
            }else{
                Cookie.write('data',array1);
            }
        });
    }
//解决ios下，弹出输入界面挡住input的问题
    function inputPosition(target,wrapper){
        target.on('click',function(){
            var target = this;
            setTimeout(function(){
                //scrollIntoView滚动浏览器窗口或者容器元素，以便在当前视窗的可见范围看见当前元素
                target.scrollIntoView(true);
            },100);
            wrapper.attr('position','static');
        });
    }

    return{
        init:function(){
            //Default Action
            $(".contBox").hide();
            $("ul.tabs li:first").addClass("active").show();
            $(".contBox:first").show();

            //On Click Event
            $("ul.tabs li").click(function() {
                $("ul.tabs li").removeClass("active");
                $(this).addClass("active");
                $(".contBox").hide();
                var activeTab = $(this).find("a").attr("href");
                $(activeTab).fadeIn();
                return false;
            });
        },
        business:function(){
            //贷款金额输入框失焦匹配
            /*必须是1到6位的正整数*/
            loanAmount(businessLoanAmount);
            //点击显示弹出框
            showMask(businessLoanPeriod,businessMaskWrapper);
            //选择贷款年限下拉列表内容
            selectMenu(yearMenu,yearCont,businessMaskWrapper,'definition');
            //自定义年限输入框失焦事件
            definedYear(businessInput,yearCont);
            //解决ios下，弹出输入界面挡住input的问题
            inputPosition(businessInput,maskWrapper);
            //点击遮罩层隐藏
            maskHide(businessMaskWrapper,'loan_mask');
            //点击商贷利率
            selectRate(businessLoanRate,businessLoanRateWrapper,'loan-rate-mask');
            //选择贷款利率下拉列表内容
            selectRateMenu(businessRateMenu,businessBaseRate,businessLoanRateWrapper,businessRatePercent,'rate-base','rate-base-discount',defualtRate,defualtDiscount);
            //解决ios下，弹出输入界面挡住input的问题
            inputPosition(businessBaseRate,maskWrapper);
            //自定义输入年利率
            definedYearRate(businessRatePercent,defualtRate);
            //点击计算按钮
            count(businessBtn,businessLoanAmount,yearCont,businessRatePercent,defualtRate,businessUrl);
        },
        accumulation:function(){
            /*公积金计算器*/
            //贷款金额输入框失焦匹配
            /*必须是1到6位的正整数*/
            loanAmount(accumulationLoanAmount);
            //点击显示弹出框
            showMask(accumulationLoanPeriod,accumulationMaskWrapper);
            //选择贷款年限下拉列表内容
            selectMenu(accumulationYearMenu,accumulationYearCont,accumulationMaskWrapper,'accumulation-definition');
            //自定义输入框失焦事件
            definedYear(accumulationLoanInput,accumulationYearCont);
            //点击遮罩层隐藏
            maskHide(accumulationMaskWrapper,'loan_mask');
            //点击公积金利率
            selectRate(accumulationLoanRate,accumulationLoanRateWrapper,'accumulation-loan-rate-mask');
            //选择下拉列表内容
            selectRateMenu(accumulationRateDropdownMenu,accumulationLoanRate,accumulationLoanRateWrapper,accumulationRatePercent,accumulationRateBase,accumulationRateBaseDiscount,accumulationDefualtRate,accumulationDefualtDiscount);
            //自定义输入年利率
            definedYearRate(accumulationRatePercent,accumulationDefualtRate);
            //点击计算按钮
            count(accumulationBtn,accumulationLoanAmount,accumulationYearCont,accumulationRatePercent,accumulationDefualtRate,accumulationUrl);

        },
        combind:function(){
            /*组合贷款计算器*/
            //点击显示弹出框
            showMask(combindLoanPeriod,combindMaskWrapper);
            //点击遮罩层隐藏
            maskHide(combindMaskWrapper,'loan_mask');
            //选择贷款年限下拉列表内容
            selectMenu(combindYearMenu,combindYearCont,combindMaskWrapper,'combind-definition');
            //自定义输入框失焦事件
            definedYear(combindLoanInput,combindYearCont);
            //公积金贷款金额输入框失焦匹配
            /*必须是1到6位的正整数*/
            loanAmount(combindAccumulationAmount);
            //点击公积金利率
            selectRate(combindAccumulationLoanRate,combindAccumulationLoanRateWrapper,'combind-accumulation-loan-rate-mask');
            //选择下拉列表内容
            selectRateMenu(combindAccumulationRateDropdownMenu,combindAccumulationLoanRate,combindAccumulationLoanRateWrapper,combindAtionRatePercent,combindAtionRateBase,combindAtionRateBaseDiscount,accumulationDefualtRate,accumulationDefualtDiscount);
            //自定义输入年利率
            definedYearRate(combindAtionRatePercent,accumulationDefualtRate);
            //商业贷款金额输入框失焦匹配
            /*必须是1到6位的正整数*/
            loanAmount(combindBusinessAmount);
            //点击公积金利率
            selectRate(combindBusinessLoanRate,combindBusinessLoanRateWrapper,'combind-business-loan-rate-mask');
            //选择下拉列表内容
            selectRateMenu(combindBusinessRateDropdownMenu,combindBusinessLoanRate,combindBusinessLoanRateWrapper,combindBusinessRatePercent,combindBusinessRateBase,combindBusinessRateBaseDiscount,defualtRate,defualtDiscount);
            //自定义输入年利率
            definedYearRate(combindBusinessRatePercent,defualtRate);
            //点击计算按钮
            /*target,Aamount,year,Apercent,Bamount,Bpercent,defualtRateA,defualtRateB,url*/
            combindCount(combindBtn,combindAccumulationAmount,combindYearCont,combindAtionRatePercent,combindBusinessAmount,combindBusinessRatePercent,accumulationDefualtRate,defualtRate,combindUrl);
        },
        count:function(){
            //从本地存储里获取数据
            var strStoreDate = window.localStorage?localStorage.getItem('data'):Cookie.read('data');
            //分割字符串
            var array = strStoreDate.split(',');
            console.log(array);
            //贷款金额
            var money = parseInt(array[0]);
            //还款月数
            var months = parseInt(array[1]);
            //年利率
            var rate = parseFloat(array[2]);
            //月利率
            var monthRate = parseFloat(rate / 12);

            //贷款金额
            $('.loan_money i').text(money);
            //还款月数
            $('.loan_month i').text(months);
            //每月月供额
            var a = parseFloat(1 + monthRate);
            var b = Math.pow(a,months);
            var monthAmount = parseInt((money * monthRate * b) / (b - 1));

            //总支付利息 等额本息
            var payment = months * monthAmount - money;
            var payRate = (payment).toFixed(2);
            $('#payments-rate').find('i').text(payRate);
            //总支付利息 等额本金
            var basis = (months * (money * monthRate - monthRate * (money/months)*(months -1)/2)+money/months);
            var basRate = basis.toFixed(2);
            $('#payments_rate_basis').find('i').text(basRate);
            //本息合计
            //等额本息
            var allTotal = (money + payment).toFixed(2);
            $('#loan-total-payment').find('i').text(allTotal);
            //等额本金
            var allTotal_basis = (money + basis).toFixed(2);
            $('#loan-total-basis').find('i').text(allTotal_basis);
            //首月月供
            var first_month = parseInt((money / months) + money * monthRate);
            $('.first_month_payment i').text(first_month);
            //每月月供
            $('#month-pay').text(monthAmount);
            //每月月供递减
            var monthly_decline = parseInt(money / months * monthRate);
            $('#monthly-decline').text(monthly_decline);
        }
    }
}();