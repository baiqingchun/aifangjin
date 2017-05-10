
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