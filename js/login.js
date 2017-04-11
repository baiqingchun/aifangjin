$(function() {
	//手机号验证
	var tel = $('#tel').val();
	function tel() {
		var mobileRegExp = /^1[3-9]\d{9}$/;

		if(tel.length <1){
			$('#tel').siblings('p').text('手机号不能为空');
			return false;
		}else if(mobileRegExp.test(tel) == true){
			$('#tel').siblings('p').text('ok');
			return true;
		}else{
			$('#tel').siblings('p').text('输入格式不正确');
			return false;
		}
	}
	$('#tel').on('blur', tel);
	
	//过去校验码
	var url_captha = 'http://www.cgigc.com.cn/cgigc-backend/api/account/verifyCode?';
	$('#checkImg').on('click',function(){
		var timestamp = new Date().getTime();
		$(this).attr('src',url_captha+timestamp);
	})
	$('#checkImg').trigger('click');
	
	//校验码验证
	var checkCode = $('#checkCode').val();
	
	function checkCode(){

		if(!checkCode){
			$('#checkCode').siblings('p').text('校验码不能为空');					
			return false;
			
		}else{
			$.ajax({
				type:"post",
				url:"",
				async:true,
				data:{checkCode:checkCode},
				success:function(data){
					if(data.success){
						$('#checkCode').siblings('p').text('验证成功');					
					}
				},
				error:function(){
					$('#checkCode').siblings('p').text('验证码输入错误');			
				}
			});
		}
		
	}
	$('#checkCode').on('blur',checkCode);
	//获取验证码
	$('#getCaptcha').on('click',function(){
		//获取验证码
	})
	
	var captcha = $('#captcha').val();
	
	function getCaptcha(){

		if(!captcha){
			$('#captcha').siblings('p').text('验证码不能为空');
			return false;
			
		}else{
			$.ajax({
				type:"post",
				url:"",
				async:true,
				data:{captcha:captcha},
				success:function(data){
					if(data.success){
						$('#captcha').siblings('p').text('验证成功');					
					}
				},
				error:function(){
					$('#captcha').siblings('p').text('验证码输入错误');			
				}
			});
		}
	}
	$('#captcha').on('blur',getCaptcha);
	//验证密码
	//不能用相同字符作为密码
	function findStr(str,n){//第一个参数是字符串，第二个是要对比的字符
		var tmp = 0;//声明一个变量，初始值为0
		//循环这个字符串，让这个字符串中的每一个字符和n进行比较，如果比较正确，就让n加1，最后把这个变量tmp返回出去，如果
		//这个tmp变量长度和字符串的长度相等，说明输入的都是同一个字符，这样是不合法的
		for(var i=0;i<str.length;i++){
			if(str.charAt(i) == n){
				tmp++;
			}
		}
		return tmp; 
	}
	//检测密码
	var password = $('#password').val();	
	
	function checkPassword(){

		//用变量m来接受返回值
		var m = findStr(password,password.charAt(0));
		//匹配非数字,除了数字都能匹配上
		var re_n = /[^\d]/g;
		//匹配非字母,除了字母都能匹配上
		var re_t = /[^a-zA-Z]/g;
		if(password == ''){
			$('#password').siblings('p').text('密码不能为空');
			return false;
		}else if(password.length<6 || password.length>16){
			$('#password').siblings('p').text('长度应为6-16个字符');
			return false;
			
		}else if( m == password.length){//如果返回的累计值和输入的值数字相等，那么就是不合法的
			$('#password').siblings('p').text('不能用相同字符');
			return false;
			
		}else if(!re_n.test(password)){//只有全是数字才能匹配上
			$('#password').siblings('p').text('不能全为数字');
			return false;
			
		}else if(!re_t.test(password)){//只有全是字母才能匹配上
			$('#password').siblings('p').text('不能全为字母');
			return false;
			
		}else{
			$('#password').siblings('p').text('ok');
			return true;
		}
	}
	$('#password').on('blur',checkPassword);
	//同意服务协议
	function serviceAgreement(){
		if($('$check').hasClass('checked')){
			$('$check').removeClass('checked');
			return true;
		}else{
			$('$check').addClass('checked');
			return false;
		}
	}
	$('input[type="checkbox"]').on('click',serviceAgreement);
	//立即注册
	$('#register').on('click',function(){
		if(tel&&checkCode&&getCaptcha&&checkPassword&&serviceAgreement){
			$.ajax({
				type:"post",
				url:"",
				async:true,
				data:{tel:tel,checkCode:checkCode,captcha:captcha,password:password},
				success:function(data){
					alert('注册成功');
				}
			});
		}else{
			alert('注册失败');
		}
	})
})