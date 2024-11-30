var mac=0;
var ios=0;
var animationend='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationEnd animationEnd';//偵測動畫結束
var opentime=8;//開頭秒數
var sen=0;//現在第幾句
var nowev=0;//事件
var now=0;//第0句開始
var timer;//打字效果
var endmain;//結局內容
var menubg=0;//右方選單展開
var anend;//動畫結束延遲事件
var notenote=0;
var mannote=0;
var volslider=0;
var isiOS;
//答案選擇紀錄
var an01=true,an03=true,an04=true,an05x1=true,an05x2=true,an05x3=true,an06=true,an07=true,an08=true,an10=true,an11=true,an12=true,an13=true,an14=true,an15=true,an16=true;
var an08have=0;

//圖片預加載
var images = new Array()
	function preload() {
		for (i = 0; i < preload.arguments.length; i++) {
			images[i] = new Image()
			images[i].src = preload.arguments[i]
		}
	}
	preload(
		"images/b-01.png",
		"images/b-02.png",
		"images/b-03.png",
		"images/b-04.png",
		"images/open_bg.png",
		"images/take-1-1.png",
		"images/take-1-2.png",
		"images/take-1-3.png",
		"images/take-2.png",
		"images/take-3-1.png",
		"images/take-3-2.png",
		"images/take-4.png",
		"images/take-5-1.png",
		"images/take-5-2.png",
		"images/take-6.png",
		"images/take-7.png",
		"images/take-9.png",
		"images/take-10-1.png",
		"images/take-10-2.png",
		"images/take-15-2.png",
		"images/take-16-1.png",
		"images/take-16-2.png"
	)
	
$(document).ready( function() {
	var u = navigator.userAgent;
	isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios設備
	if(isiOS){
		$('.music').remove();
		$('.home').css('top','40%');
	}
	document.getElementById("mybgm").muted = false;
	playaudio();
	if(navigator.userAgent.indexOf("Chrome") > -1){
		document.getElementById("mybgm").muted = false;
		document.getElementById("mybgm").play();
		playaudio();
		setTimeout(function() {
			document.getElementById("mybgm").muted = false;
			document.getElementById("mybgm").play();
			playaudio();
		},2000);
	}else if(navigator.userAgent.indexOf("Safari") > -1){
		if(isMobile()){
			document.addEventListener('touchstart', function(){
				if(ios==0){
					$('#mybgm').get(0).play();
					ios=1;
				}
			}, false);
		}else{
			mac=1;
		}
	}else{
		$('#mybgm').get(0).play();
	}
	$('body').click(function() {
		if(mac==1){
			$('#mybgm').get(0).play();
			mac=0;
		}else{
			
		}
	});
	
	//開頭黑底白字8秒後結束自動執行
	var open = setTimeout(function(){
		$('#open,#mov,#ev').show();
		$('#blackopen').fadeOut(1000);
		
		$('.opentitle').addClass('animated bounceInUp delay-06s')
		$('.startbtn').addClass('animated zoomIn delay-1x3s faster')
		playaudio();
	},opentime*1000);
	
	//開頭黑底白字跳過鈕
	$('.opskip').click(function(){
		playaudio();
		$('#open').show();
		$('#blackopen').fadeOut(1000);
		clearTimeout(open);
		
		$('.opentitle').addClass('animated bounceInUp delay-06s')
		$('.startbtn').addClass('animated zoomIn delay-1x3s faster')
	});
	
	//開始遊戲按鈕滑鼠移入
	$('.startbtn').mouseover(function() {
		$('.startbtn img').attr('src','images/startbtn1.png');
	}).mouseout(function() {
		$('.startbtn img').attr('src','images/startbtn.png');
	});
	
	//video-loading
	$('.myvideo').on("loadstart", function() {
		$('.videoblack').fadeIn('fast').css('display','flex');
	}).on("canplaythrough", function() {
		$('.videoblack').fadeOut('fast');
	});
	
	//開始遊戲按鈕
	$('.startbtn').click(function() {
		$('#audio').remove();
		$('#myaudio').attr('src','sounds/start.mp3');
		$('#myaudio').get(0).play();
		$('.logo,.menubtn').fadeIn(500);
		$('#ev,#mov').show();
		$('#open').fadeOut(1000);
		$('.myvideo').attr('id','d1-1');
		$('.myvideo').get(0).play();
		$('#mybgm').get(0).pause();
		$('#mybgm').attr('src','sounds/allbgm.mp3');
		$('#mybgm').get(0).play();
	});
	
	//Enter鍵 下幾句
	$("body").keydown(function (event) {
        if (event.which == 13 && $('.nbtn').is(":visible")){
			nbtn();
		}
	});
	
	//滑鼠點案右下黃倒三角 幾句
	$('.nbtn').on("click",function() {
		nbtn();
	});
	
	//選單展開按鈕
	$('.menubtn').click(function(){
		$('#myaudio').attr('src','sounds/menu_1.mp3');
		$('#myaudio').get(0).play();
		if(menubg==0){
			$('.menubg').animate({right:'0'},200);
			 $('.home').animate({right: '.95%'},200);
			 $('.note').animate({right: '.7%'},200);
			 $('.man').animate({right: '.5%'},200);
			 $('.music').animate({right: '.4%'},200);
			menubg=1;
		}else if(menubg==1){
			$('.menubg').animate({right:'-21%'},200);
			$('.home,.note,.music,.man').animate({right: '-7.5%'},200);
			$('.ui-slider').hide();
			$('.music').attr('src','images/music.png');
			volslider=0;
			menubg=0;
		}
	});
	//滑鼠移過選單鈕
	$('.menubtn').mouseover(function() {
			$(this).css({'transform':'scale(1.1)'});
	}).mouseout(function() {
		$(this).css({'transform':'scale(1)'});
	});
	//滑鼠移過回首頁鈕
	$('.music').mouseover(function() {
			$(this).attr('src','images/music_c.png');
	}).mouseout(function() {
		if(volslider==0)
		$(this).attr('src','images/music.png');
	});
	
	$('.music').click(function(){
		$('#myaudio').attr('src','sounds/menu_2.mp3');
		$('#myaudio').get(0).play();
		if(volslider==0){
			$('.ui-slider').show();
			volslider=1;
		}else{
			$('.ui-slider').hide();
			volslider=0;
		}
	});
	
	//滑鼠移過回首頁鈕
	$('.home').mouseover(function() {
			$(this).attr('src','images/home_c.png');
	}).mouseout(function() {
			$(this).attr('src','images/home.png');
	});
	//滑鼠移過操作說明鈕
	$('.note').mouseover(function() {
		$(this).attr('src','images/note_c.png');
	}).mouseout(function() {
		if(notenote==0)
		$(this).attr('src','images/note.png');
	});
	//滑鼠移過操作說明鈕
	$('.man').mouseover(function() {
		$(this).attr('src','images/man_c.png');
	}).mouseout(function() {
		if(mannote==0)
		$(this).attr('src','images/man.png');
	});
	//腳色介紹
	$('.man').click(function(){
		$('#myaudio').attr('src','sounds/menu_2.mp3');
		$('#myaudio').get(0).play();
		mannote=1;
		$('.mannote,.noteclose').show();
		$('.ui-slider').hide();
		$('.music').attr('src','images/music.png');
			volslider=0;
	});
	//操作說明
	$('.note').click(function(){
		$('#myaudio').attr('src','sounds/menu_2.mp3');
		$('#myaudio').get(0).play();
		notenote=1;
		$('.notenote,.noteclose').show();
		$('.ui-slider').hide();
		$('.music').attr('src','images/music.png');
			volslider=0;
	});
	 //滑鼠移過noteclose
		$('.noteclose').mouseover(function() {
			$(this).css({'transform':'scale(1.1)'});
		}).mouseout(function() {
			$(this).css({'transform':'scale(1)'});
		});
		
	//noteclose按鈕
	$('.noteclose').click(function(){
		notenote=0;
		mannote=0;
		$('.notenote,.noteclose,.mannote').hide();
		$('.note').attr('src','images/note.png');
		$('.man').attr('src','images/man.png');
	});
	 $('#slider-2').bind('change',function () {
		$("#mybgm,#myaudio,.myvideo").prop("volume", $('#slider-2').val()/100);
	 })
	//回首頁鈕(回到初始畫面)
	$('.home').click(function(){
		$('#myaudio').attr('src','sounds/menu_2.mp3');
		$('#myaudio').get(0).play();
		$('.menubg').animate({right:'-21%'},200);
		$('.home,.note,.music,.man').animate({right: '-7.5%'},200);
		menubg=0;
		$('.title').attr('src','images/title.png');	
		$('#mybgm').get(0).pause();
		$('#mybgm').attr('src','sounds/open.mp3');
		$('#mybgm').get(0).play();
		an01=true,an03=true,an04=true,an05x1=true,an05x2=true,an05x3=true,an06=true,an07=true,an08=true,an10=true,an11=true,an12=true,an13=true,an14=true,an15=true,an16=true;
		an08have=0;
		$('.anleft').removeClass('anright anleft03 anleft07 anleft15 anleft16');
		now=0;
		nowev=0;
		$(".qq span").html('');
		clearInterval(timer);
		clearTimeout(anend);
		clearTimeout(endmain);
		$('.myvideo').get(0).pause();
		$('.myvideo').attr('src','videos/d1-1.mp4').attr('id','d1-1');
		$('.myvideo').get(0).load();
		$('.fb tbody').empty();
		$('#mov,#ev,#open,.endmain,.endtip,.troll,.endfin').show();
		$('.anleft,.nbtn,.text,.logo,.menubtn,#end,.fb,.backend,.fbhead,.tan4fa,.tanfa,.armyfa,.gov34fa,.tan5fa,.sin21fa,.sinsong241fa,.notenote,.noteclose,.ui-slider').hide();
		volslider=0;
		$('.music').attr('src','images/music.png');
		$('#ev').css({'background':'url("images/take-1-1.png")',
			'background-size':'cover',
			'background-repeat':'no-repeat',
			'background-position': 'center center'});
	
		$('.opskip').click();
		
		//物件回復初始位置大小
		
		$('.desk').hide().removeClass('animated bounceInUp bounceOutDown');
		$('.a-21').hide().removeClass('animated bounceInLeft delay-05s bounceOutLeft');
		$('.comp').hide().removeClass('animated bounceIn delay-09s delay-1x2s fast bounceOut');
		$('.b-01').hide().removeClass('animated bounceInLeft bounceOutLeft');
		$('.b-03').hide().removeClass('animated bounceInRight bounceOutRight');
		
		$('.b-01 img').attr('src','images/b-01.png');
		$('.b-03 img').attr('src','images/b-03.png');
		
		$('.c-01').hide().removeClass('animated bounceInRight bounceOutRight');
		$('.d-01').hide().removeClass('animated bounceInRight delay-03s bounceOutRight');
		
		$('.e-01').hide().removeClass('animated bounceInLeft delay-03s bounceOutLeft');
		$('.pp').hide().removeClass('animated bounceInUp delay-06s bounceOutLeft');
		
		$('.e-02').hide().removeClass('animated bounceInRight bounceOutRight');
		$('.a-02').hide().removeClass('animated bounceInLeft bounceOutRight');
		
		$('.e-02 img').attr('src','images/e-02.png');
		$('.e-02').css('right','8.5%');
		$('.a-02 img').attr('src','images/a-02.png');
		
		$('.a-06').hide().removeClass('animated bounceInLeft delay-03s bounceOutLeft');
		$('.a-06 img').attr('src','images/a-06.png');
		$('.e-07').hide().removeClass('animated bounceInRight delay-03s bounceOutRight');
		$('.e-07 img').attr('src','images/e-07.png');
		$('.e-07').css('right','20.6%');
		
		$('.a-10').hide().removeClass('animated bounceInLeft delay-03s bounceOutLeft');
		$('.a-10 img').attr('src','images/a-10.png');
		
		$('.tab').hide(1400).removeClass('animated bounceInUp delay-03s bounceOutDown delay-06s');
		$('.a-15').hide(1100).removeClass('animated bounceInUp delay-06s bounceOutDown delay-03s');
		$('.e-10').hide(800).removeClass('animated bounceInUp delay-09s bounceOutDown');
		$('.a-15 img').attr('src','images/a-15.png');
		$('.e-10 img').attr('src','images/e-10.png');
		
		$('.a-14').hide().removeClass('animated bounceInLeft delay-03s bounceOutLeft');
		$('.a-14').attr('src','images/a-14.png');
		
		$('.f-01').hide().removeClass('animated bounceInRight delay-06s bounceOutRight');
		$('.f-01 img').attr('src','images/f-01.png');
		$('.desk9').hide(800).removeClass('animated bounceInUp delay-03s bounceOutDown');
		$('.comp9').hide().removeClass('animated bounceIn delay-09s fast bounceOut');
		
		$('.desk').hide(800).removeClass('animated bounceInUp delay-03s bounceOutDown');
		$('.a-21').hide().removeClass('animated bounceInLeft delay-06s bounceOutLeft');
		$('.a-21 img').attr('src','images/a-21.png');
		
		$('.a-24').hide().removeClass('animated bounceInLeft delay-06s bounceOutLeft');
		$('.a-24 img').attr('src','images/a-24.png');
		
		$('.a-28').hide().removeClass('animated bounceInLeft delay-06s bounceOutLeft');
		$('.a-28 img').attr('src','images/a-28.png');
		
		$('.e-24').hide().removeClass('animated bounceInUp bounceOutDown');
		$('.a-31').hide().removeClass('animated bounceInRight delay-03s bounceOutRight');
		
		$('.e-24 img').attr('src','images/e-24.png');
		$('.a-31 img').attr('src','images/a-31.png');
		
		$('.table10').hide().removeClass('animated bounceInUp delay-03s');
		$('.f-04').hide().removeClass('animated bounceInLeft delay-06s');
		$('.e-17').hide().removeClass('animated bounceInRight delay-09s');
		$('.f-04 img').attr('src','images/f-04.png');
		$('.e-17 img').attr('src','images/e-17.png');
		
		$('.f-06').hide().removeClass('animated bounceInRight delay-03s bounceOutRight');
		$('.e-20').hide().removeClass('animated bounceInRight delay-06s bounceOutRight');
		$('.f-06 img').attr('src','images/f-06.png');
		$('.e-20 img').attr('src','images/e-20.png');
		
		$('.a-29e-22').hide(800).removeClass('animated bounceInUp delay-03s bounceOutDown');
	});
	
	
	//動畫結束事件
	$('.myvideo').on('ended',function(){
		
		if(nowev==0 && this.id=='d1-1'){
			
			nowev=1;
			sen='1-1';
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.desk').show().removeClass('animated bounceOutDown').addClass('animated bounceInUp');
			$('.a-21').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-05s');
			$('.comp').show().removeClass('animated bounceOut').addClass('animated bounceIn delay-1x2s fast');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1500);
			
		}else if(nowev==1 && !an01 && this.id=='d2-1'){
			nowev=2;
			sen='2-1';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.c-01').show().removeClass('animated bounceOutRight').addClass('animated bounceInRight');
			$('.d-01').show().removeClass('animated bounceOutRight').addClass('animated bounceInRight delay-03s');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1000);
		}else if(nowev==2 && this.id=='d4'){
			nowev=3;
			sen='3-1';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.e-01').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-03s');
			$('.pp').show().removeClass('animated bounceOutDown').addClass('animated bounceInUp delay-06s');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1000);
		}else if(nowev==3 && an03 && this.id=='d2-2'){
			nowev=4;
			sen='4-1';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.a-06').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-03s');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1000);
		}else if(nowev==3 && !an03 && this.id=='d5-1'){
			nowev=5;
			sen='5-1';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.e-07').show().removeClass('animated bounceOutRight').addClass('animated bounceInRight delay-03s');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1000);
		}else if(nowev==5 && an05x3 && this.id=='d5-2'){
			nowev=8;
			sen='8-1';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.a-14').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-03s');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1000);
		}else if(nowev==5 && !an05x3 && this.id=='d5-2'){
			nowev=6;
			sen='6-1';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.a-10').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-03s');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1000);
		}else if(nowev==6 && !an06 && this.id=='d3'){
			nowev=7;
			sen='7-1';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.tab').show().removeClass('animated bounceOutDown delay-06s').addClass('animated bounceInUp delay-03s');
			$('.a-15').show().removeClass('animated bounceOutDown delay-03s').addClass('animated bounceInUp delay-06s');
			$('.e-10').show().removeClass('animated bounceOutDown').addClass('animated bounceInUp delay-09s');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1000);
		}else if(nowev==8 && !an08 && this.id=='d3'){
			nowev=7;
			sen='7-1';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.tab').show().removeClass('animated bounceOutDown delay-06s').addClass('animated bounceInUp delay-03s');
			$('.a-15').show().removeClass('animated bounceOutDown delay-03s').addClass('animated bounceInUp delay-06s');
			$('.e-10').show().removeClass('animated bounceOutDown').addClass('animated bounceInUp delay-09s');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1000);
		}else if(nowev==8 && an08 && this.id=='d1-3'){
			nowev=15;
			sen='15-1';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.b-01').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-03s');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1000);
		}else if(nowev==9 && this.id=='d6'){
			nowev=10;
			sen='10-1';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.table10').show().addClass('animated bounceInUp delay-03s');
			$('.f-04').show().addClass('animated bounceInLeft delay-06s');
			$('.e-17').show().addClass('animated bounceInRight delay-09s');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1000);
			
		}else if(nowev==11 && !an11 && this.id=='d4'){
			nowev=3;
			sen='3-1';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.e-01').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-03s');
			$('.pp').show().removeClass('animated bounceOutDown').addClass('animated bounceInUp delay-06s');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1000);
		}else if(nowev==11 && an11 && this.id=='d2-2'){
			nowev=12;
			sen='12-1';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.a-06').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-03s');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1000);
		}else if(nowev==13 && !an13 && this.id=='d1-3'){
			nowev=15;
			sen='15-1';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.b-01').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-03s');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1000);
		}else if(nowev==14 && !an14 && this.id=='d1-3'){
			nowev=15;
			sen='15-1';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			
			$('.b-01').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-03s');
			
			anend = setTimeout(function(){
				$('.text').fadeIn(800);
				dotype(now);
			},1000);
		}else if(nowev==15 && this.id=='d1-4'){
			
			nowev=15;
			sen='15-3';
			$('#ev').show();
			$('#mov').css('z-index','2');
			$('#ev').css('z-index','1');
			$('#mov').fadeOut(700);
			$(".qq span").html('');
			$('.f-06').show().removeClass('animated bounceOutRight').addClass('animated bounceInRight delay-03s');
			$('.e-20').show().removeClass('animated bounceOutRight').addClass('animated bounceInRight delay-06s');
			anend = setTimeout(function(){
				dotype(now);
			},1000);
		}
	});
	
	//選擇按鈕事件
	$('#ev .aa').click(function(){
		$('.anleft').hide();
		$('#myaudio').attr('src','sounds/aa.mp3');
		$('#myaudio').get(0).play();
		switch(this.id) {
			 case 'f01':
				an01=false;
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d2-1.mp4').attr('id','d2-1');
				$('.b-01 img').attr('src','images/b-01.png');
				$('.b-03').fadeOut().removeClass('animated bounceInRight').addClass('animated bounceOutRight');
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				setTimeout(function(){
					
					$('#ev').css({'background':'url("images/take-2.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				},1000);
				
				$('.fb tbody').append('<tr><td width="25.1%">發現廠商開的發票異常是否向上回報</td><td width="22.1%"></td><td width="23%">未即時向長官回報</td><td>浮報價額違反<span class="tan4">《貪污治罪條例》第4條</span></td></tr>');
				break;
				
			 case 't01':
				$('.b-01 img').attr('src','images/b-01.png');
				$('.b-03').fadeOut().removeClass('animated bounceInRight').addClass('animated bounceOutRight');
				$('#ev').css({'background':'url("images/take-1-1.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				
				nowev=11;
				sen='11-1';
				
				$(".qq span").html('');
				
				$('.desk').show().removeClass('animated bounceOutDown').addClass('animated bounceInUp delay-03s');
				$('.a-21').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-06s');
				$('.comp').show().removeClass('animated bounceOut').addClass('animated bounceIn delay-09s fast');
				
				anend = setTimeout(function(){
					
					$('#myaudio').attr('src','sounds/knock.mp3');
					$('#myaudio').get(0).play();
					setTimeout(function(){
						$('.text').fadeIn(800);
						dotype(now);
					},1200);
				},1200);
				$('.fb tbody').append('<tr><td width="25.1%">發現廠商開的發票異常是否向上回報</td><td width="22.1%">即時向長官回報</td><td width="23%"></td><td>浮報價額違反<span class="tan4">《貪污治罪條例》第4條</span></td></tr>');
				break;
				
			case 'f03':
				$('.anleft').removeClass('anleft03');
				an03=false;
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d5-1.mp4').attr('id','d5-1');
				$('.e-02').fadeOut().removeClass('animated bounceInRight').addClass('animated bounceOutRight');
				$('.a-02').fadeOut().removeClass('animated bounceInLeft').addClass('animated bounceOutRight');
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/beach.mp3');
				$('#mybgm').get(0).play();
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-5-1.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				},1000);
				$('.fb tbody').append('<tr><td>能否接受廠商提供的旅遊招待</td><td></td><td>認為與同袍或長官一同前往，應無大礙</td><td>收受不正利益違反<span class="tan">《貪污治罪條例》</span>、<span class="army">《國軍人員廉政倫理須知》</span></td></tr>');
				break;
				
			case 't03':
				$('.anleft').removeClass('anleft03');
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d2-2.mp4').attr('id','d2-2');
				$('.e-02').fadeOut().removeClass('animated bounceInRight').addClass('animated bounceOutRight');
				$('.a-02').fadeOut().removeClass('animated bounceInLeft').addClass('animated bounceOutRight');
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/allbgm.mp3');
				$('#mybgm').get(0).play();
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-4.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				},1000);
				$('.fb tbody').append('<tr><td>能否接受廠商提供的旅遊招待</td><td>不接受旅遊招待</td><td></td><td>收受不正利益違反<span class="tan">《貪污治罪條例》</span>、<span class="army">《國軍人員廉政倫理須知》</span></td></tr>');
				break;
				
			case 'f04':
				an04=false;
				$('.anleft').removeClass('anright');
				$('.a-06').fadeOut().removeClass('animated bounceInLeft delay-03s').addClass('animated bounceOutLeft');
				
				$('#ev').css({'background':'url("images/take-1-1.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				
				nowev=14;
				sen='14-1';
				
				$(".qq span").html('');
				
				$('.desk').show().removeClass('animated bounceOutDown').addClass('animated bounceInUp delay-03s');
				$('.a-28').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-06s');
				$('.comp').show().removeClass('animated bounceOut').addClass('animated bounceIn delay-09s fast');
				
				anend = setTimeout(function(){
					$('#myaudio').attr('src','sounds/knock.mp3');
					$('#myaudio').get(0).play();
					setTimeout(function(){
						$('.text').fadeIn(800);
						dotype(now);
					},1200);
				},1200);
				
				$('.fb tbody').append('<tr><td>能否接受廠商提供的禮物</td><td></td><td>認為收受由長官轉贈廠商之禮物，應無大礙</td><td>收受不正利益違反<span class="tan">《貪污治罪條例》</span>、<span class="army">《國軍人員廉政倫理須知》</span></td></tr>');
				
				break;
				
			case 't04':
				$('.anleft').removeClass('anright');
				$('.a-06').fadeOut().removeClass('animated bounceInLeft delay-03s').addClass('animated bounceOutLeft');
				
				$('#ev').css({'background':'url("images/take-1-1.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				
				nowev=13;
				sen='13-1';
				
				$(".qq span").html('');
				
				$('.desk').show().removeClass('animated bounceOutDown').addClass('animated bounceInUp delay-03s');
				$('.a-24').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-06s');
				$('.comp').show().removeClass('animated bounceOut').addClass('animated bounceIn delay-09s fast');
				
				anend = setTimeout(function(){
					$('#myaudio').attr('src','sounds/knock.mp3');
					$('#myaudio').get(0).play();
					setTimeout(function(){
						$('.text').fadeIn(800);
						dotype(now);
					},1200);
				},1200);
				
				$('.fb tbody').append('<tr><td>能否接受廠商提供的禮物</td><td>不接受禮物</td><td></td><td>收受不正利益違反<span class="tan">《貪污治罪條例》</span>、<span class="army">《國軍人員廉政倫理須知》</span></td></tr>');
				
				break;
				
			case 't05-1':
				sen='5-5';
				dotype();
				$('.e-07 img').attr('src','images/e-09.png');
				break;
				
			case 'f05-1':
				an05x1=false;
				sen='5-5';
				dotype();
				$('.e-07 img').attr('src','images/e-09.png');
				break;
				
			case 'f05-2':
				sen='5-7';
				an05x2=false;
				$('.fb tbody').append('<tr><td>廠商詢問標案機密</td><td></td><td>提供投標廠商相關資訊</td><td>洩漏廠商相關資料違反<span class="gov34">《政府採購法》第34條</span></td></tr>');
				ending(0);
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/end.mp3');
				$('#mybgm').get(0).play();
				break;
				
			case 't05-2':
			
				if(an05x1){
					sen='5-7';
					dotype();
					$('.e-07 img').attr('src','images/e-08.png');
					$('.fb tbody').append('<tr><td>廠商詢問標案機密</td><td>不正面回應</td><td></td><td>洩漏廠商相關資料違反<span class="gov34">《政府採購法》第34條</span></td></tr>');
				}else{
					$('.fb tbody').append('<tr><td>廠商詢問標案機密</td><td></td><td>提供投標廠商相關資訊</td><td>洩漏廠商相關資料違反<span class="gov34">《政府採購法》第34條</span></td></tr>');
					ending(0);
					$('#mybgm').get(0).pause();
					$('#mybgm').attr('src','sounds/end.mp3');
					$('#mybgm').get(0).play();
				}
				
				break;
				
			case 't05-3':
			
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d5-2.mp4').attr('id','d5-2');
				
				$('.e-07').fadeOut().removeClass('animated bounceInRight delay-03s').addClass('animated bounceOutRight');
				
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/beach.mp3');
				$('#mybgm').get(0).play();
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-6.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				},1000);
				
				$('.fb tbody').append('<tr><td>能否接受廠商提供的飲宴招待</td><td>不接受飲宴招待</td><td></td><td>收受不正利益違反<span class="tan">《貪污治罪條例》</span>、<span class="army">《國軍人員廉政倫理須知》</span></td></tr>');
				
				break;
				
			case 'f05-3':
				an05x3=false;
				
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d5-2.mp4').attr('id','d5-2');
				
				$('.e-07').fadeOut().removeClass('animated bounceInRight delay-03s').addClass('animated bounceOutRight');
				
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/beach.mp3');
				$('#mybgm').get(0).play();
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-6.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				},1000);
				$('.fb tbody').append('<tr><td>能否接受廠商提供的飲宴招待</td><td></td><td>未明確拒絕</td><td>收受不正利益違反<span class="tan">《貪污治罪條例》</span>、<span class="army">《國軍人員廉政倫理須知》</span></td></tr>');
				break;
				
			case 't06':
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/allbgm.mp3');
				$('#mybgm').get(0).play();
				$('.anleft').removeClass('anright');
				$('.a-10').fadeOut().removeClass('animated bounceInLeft delay-03s').addClass('animated bounceOutLeft');
				$('#ev').css({'background':'url("images/take-9.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				
				nowev=9;
				sen='9-1';
				
				$(".qq span").html('');
				
				$('.desk9').show().removeClass('animated bounceOutDown').addClass('animated bounceInUp delay-03s');
				$('.f-01').show().removeClass('animated bounceOutRight').addClass('animated bounceInRight delay-06s');
				$('.comp9').show().removeClass('animated bounceOut').addClass('animated bounceIn delay-09s fast');
				
				anend = setTimeout(function(){
					$('#myaudio').attr('src','sounds/knock.mp3');
					$('#myaudio').get(0).play();
					setTimeout(function(){
						$('.text').fadeIn(800);
						dotype(now);
					},1200);
				},1200);
				
				$('.fb tbody').append('<tr><td>長官指示到特定廠商負責的港口進行船舶服務</td><td>向更高層長官回報</td><td></td><td>為他人圖取不法利益違反<span class="tan5">《貪污治罪條例》第5條</span>，但假如長官依法有權限因突發狀況調整船舶服務作業，則屬便民；根據<span class="sin21">《刑法》第21條</span>規定，應堅持依法行政，拒絕上級違法的命令</td></tr>');
				break;
				
			case 'f06':
				$('.anleft').removeClass('anright');
				an06=false;
				
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d3.mp4').attr('id','d3');
				
				$('.a-10').fadeOut().removeClass('animated bounceInLeft delay-03s').addClass('animated bounceOutLeft');
				
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/france.mp3');
				$('#mybgm').get(0).play();
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-7.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				},1000);
				$('.fb tbody').append('<tr><td>長官指示到特定廠商負責的港口進行船舶服務</td><td></td><td>聽從長官的指示</td><td>為他人圖取不法利益違反<span class="tan5">《貪污治罪條例》第5條</span>，但假如長官依法有權限因突發狀況調整船舶服務作業，則屬便民；根據<span class="sin21">《刑法》第21條</span>規定，應堅持依法行政，拒絕上級違法的命令</td></tr>');
				break;
				
			case 'f07':
				an07=false;
				$('.anleft').removeClass('anleft07');
				$('.tab').fadeOut(1400).removeClass('animated bounceInUp delay-03s').addClass('animated bounceOutDown delay-06s');
				$('.a-15').fadeOut(1100).removeClass('animated bounceInUp delay-06s').addClass('animated bounceOutDown delay-03s');
				$('.e-10').fadeOut(800).removeClass('animated bounceInUp delay-09s').addClass('animated bounceOutDown');
				ending(0);
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/end.mp3');
				$('#mybgm').get(0).play();
				$('.fb tbody').append('<tr><td>發現長官涉嫌貪污</td><td></td><td>選擇置身事外</td><td>根據<span class="sinsong241">《刑事訴訟法》第241條</span>規定，應為告發</td></tr>');
				break;
				
			case 't07':
				$('.anleft').removeClass('anleft07');
				$('.tab').fadeOut(1400).removeClass('animated bounceInUp delay-03s').addClass('animated bounceOutDown delay-06s');
				$('.a-15').fadeOut(1100).removeClass('animated bounceInUp delay-06s').addClass('animated bounceOutDown delay-03s');
				$('.e-10').fadeOut(800).removeClass('animated bounceInUp delay-09s').addClass('animated bounceOutDown');
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/end.mp3');
				$('#mybgm').get(0).play();
				ending(1);
				$('.fb tbody').append('<tr><td>發現長官涉嫌貪污</td><td>揭弊</td><td></td><td>根據<span class="sinsong241">《刑事訴訟法》第241條</span>規定，應為告發</td></tr>');
				break;
				
			case 't08':
				an08have=1;
				$('.anleft').removeClass('anright');
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d1-3.mp4').attr('id','d1-3');
				
				$('.a-14').fadeOut().removeClass('animated bounceInLeft delay-03s').addClass('animated bounceOutLeft');
				
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/allbgm.mp3');
				$('#mybgm').get(0).play();
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-1-2.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				},1000);
				
				now=0;
				$('.fb tbody').append('<tr><td>長官指示到特定廠商負責的港口進行船舶服務</td><td>向更高層長官回報</td><td></td><td>為他人圖取不法利益違反<span class="tan5">《貪污治罪條例》第5條</span>，但假如長官依法有權限因突發狀況調整船舶服務作業，則屬便民；根據<span class="sin21">《刑法》第21條</span>規定，應堅持依法行政，拒絕上級違法的命令</td></tr>');
				break;
				
			case 'f08':
				$('.anleft').removeClass('anright');
				an08=false;
				an08have=1;
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d3.mp4').attr('id','d3');
				
				$('.a-14').fadeOut().removeClass('animated bounceInLeft delay-03s').addClass('animated bounceOutLeft');
				
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/france.mp3');
				$('#mybgm').get(0).play();
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-7.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				},1000);
				$('.fb tbody').append('<tr><td>長官指示到特定廠商負責的港口進行船舶服務</td><td></td><td>聽從長官的指示</td><td>為他人圖取不法利益違反<span class="tan5">《貪污治罪條例》第5條</span>，但假如長官依法有權限因突發狀況調整船舶服務作業，則屬便民；根據<span class="sin21">《刑法》第21條</span>規定，應堅持依法行政，拒絕上級違法的命令</td></tr>');
				break;
			case 'f10':
				$('.anleft').removeClass('anright');
				an10=false;
				$('.fb tbody').append('<tr><td>發現長官涉嫌貪污</td><td></td><td>選擇置身事外</td><td>根據<span class="sinsong241">《刑事訴訟法》第241條</span>規定，應為告發</td></tr>');
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/end.mp3');
				$('#mybgm').get(0).play();
				ending(0);
				break;
				
			case 't10':
				$('.anleft').removeClass('anright');
				$('.fb tbody').append('<tr><td>發現長官涉嫌貪污</td><td>揭弊</td><td></td><td>根據<span class="sinsong241">《刑事訴訟法》第241條</span>規定，應為告發</td></tr>');
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/end.mp3');
				$('#mybgm').get(0).play();
				ending(1);
				break;
			case 'f11':
				an11=false;
				$('.anleft').removeClass('anright');
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d4.mp4').attr('id','d4');
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/party.mp3');
				$('#mybgm').get(0).play();
				now=0;
				
				$('.desk').fadeOut(800).removeClass('animated bounceInUp delay-03s').addClass('animated bounceOutDown');
				$('.a-21').fadeOut().removeClass('animated bounceInLeft delay-06s').addClass('animated bounceOutLeft');
				$('.comp').fadeOut().removeClass('animated bounceIn delay-09s fast').addClass('animated bounceOut');
				
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-3-1.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				},1000);
				
				break;
			case 't11':
				$('.anleft').removeClass('anright');
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d2-2.mp4').attr('id','d2-2');
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				now=0;
				
				$('.desk').fadeOut(800).removeClass('animated bounceInUp delay-03s').addClass('animated bounceOutDown');
				$('.a-21').fadeOut().removeClass('animated bounceInLeft delay-06s').addClass('animated bounceOutLeft');
				$('.comp').fadeOut().removeClass('animated bounceIn delay-09s fast').addClass('animated bounceOut');
				
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-4.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				},1000);
				break;
			
			case 't12':
				$('.anleft').removeClass('anright');
				$('.a-06').fadeOut().removeClass('animated bounceInLeft delay-03s').addClass('animated bounceOutLeft');
				
				$('#ev').css({'background':'url("images/take-1-1.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				
				nowev=13;
				sen='13-1';
				
				$(".qq span").html('');
				
				$('.desk').show().removeClass('animated bounceOutDown').addClass('animated bounceInUp delay-03s');
				$('.a-24').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-06s');
				$('.comp').show().removeClass('animated bounceOut').addClass('animated bounceIn delay-09s fast');
				
				anend = setTimeout(function(){
					$('#myaudio').attr('src','sounds/knock.mp3');
					$('#myaudio').get(0).play();
					setTimeout(function(){
						$('.text').fadeIn(800);
						dotype(now);
					},1200);
				},1200);
				$('.fb tbody').append('<tr><td>能否接受廠商提供的禮物</td><td>不接受禮物</td><td></td><td>收受不正利益違反<span class="tan">《貪污治罪條例》</span>、<span class="army">《國軍人員廉政倫理須知》</span></td></tr>');
				break;
				
			case 'f12':
				an12=false;
				$('.anleft').removeClass('anright');
				$('.a-06').fadeOut().removeClass('animated bounceInLeft delay-03s').addClass('animated bounceOutLeft');
				$('#ev').css({'background':'url("images/take-1-1.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				
				nowev=14;
				sen='14-1';
				
				$(".qq span").html('');
				
				$('.desk').show().removeClass('animated bounceOutDown').addClass('animated bounceInUp delay-03s');
				$('.a-28').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft delay-06s');
				$('.comp').show().removeClass('animated bounceOut').addClass('animated bounceIn delay-09s fast');
				
				anend = setTimeout(function(){
					$('#myaudio').attr('src','sounds/knock.mp3');
					$('#myaudio').get(0).play();
					setTimeout(function(){
						$('.text').fadeIn(800);
						dotype(now);
					},1200);
				},1200);
				
				$('.fb tbody').append('<tr><td>能否接受廠商提供的禮物</td><td></td><td>認為收受由長官轉贈廠商之禮物，應無大礙</td><td>收受不正利益違反<span class="tan">《貪污治罪條例》</span>、<span class="army">《國軍人員廉政倫理須知》</span></td></tr>');
				
				break;
				
			case 't13':
				$('.anleft').removeClass('anright');
				$('.desk').fadeOut().removeClass('animated bounceInUp delay-03s').addClass('animated bounceOutDown');
				$('.a-24').fadeOut().removeClass('animated bounceInLeft delay-06s').addClass('animated bounceOutLeft');
				$('.comp').fadeOut().removeClass('animated bounceIn delay-09s fast').addClass('animated bounceOut');
				
				$('#ev').css({'background':'url("images/take-16-1.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				
				nowev=16;
				sen='16-1';
				
				$(".qq span").html('');
				
				$('.a-29e-22').show().removeClass('animated bounceOutDown').addClass('animated bounceInUp delay-03s');
				
				setTimeout(function(){
					$('.text').fadeIn(800);
					dotype(now);
				},900);
				$('.fb tbody').append('<tr><td>長官指示到特定廠商負責的港口進行船舶服務</td><td>向更高層長官回報</td><td></td><td>為他人圖取不法利益違反<span class="tan5">《貪污治罪條例》第5條</span>，但假如長官依法有權限因突發狀況調整船舶服務作業，則屬便民；根據<span class="sin21">《刑法》第21條</span>規定，應堅持依法行政，拒絕上級違法的命令</td></tr>');
				break;
				
			case 'f13':
				an13=false;
				$('.anleft').removeClass('anright');
				$('.desk').fadeOut().removeClass('animated bounceInUp delay-03s').addClass('animated bounceOutDown');
				$('.a-24').fadeOut().removeClass('animated bounceInLeft delay-06s').addClass('animated bounceOutLeft');
				$('.comp').fadeOut().removeClass('animated bounceIn delay-09s fast').addClass('animated bounceOut');
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d1-3.mp4').attr('id','d1-3');
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-1-2.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				},1000);
				
				now=0;
				$('.fb tbody').append('<tr><td>長官指示到特定廠商負責的港口進行船舶服務</td><td></td><td>聽從長官的指示</td><td>為他人圖取不法利益違反<span class="tan5">《貪污治罪條例》第5條</span>，但假如長官依法有權限因突發狀況調整船舶服務作業，則屬便民；根據<span class="sin21">《刑法》第21條</span>規定，應堅持依法行政，拒絕上級違法的命令</td></tr>');
				break;
				
			case 't14':
				$('.anleft').removeClass('anright');
				$('.desk').fadeOut().removeClass('animated bounceInUp delay-03s').addClass('animated bounceOutDown');
				$('.a-28').fadeOut().removeClass('animated bounceInLeft delay-06s').addClass('animated bounceOutLeft');
				$('.comp').fadeOut().removeClass('animated bounceIn delay-09s fast').addClass('animated bounceOut');
				
				$('#ev').css({'background':'url("images/take-9.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				
				nowev=9;
				sen='9-1';
				
				$(".qq span").html('');
				
				$('.desk9').show().removeClass('animated bounceOutDown').addClass('animated bounceInUp delay-03s');
				$('.f-01').show().removeClass('animated bounceOutRight').addClass('animated bounceInRight delay-06s');
				$('.comp9').show().removeClass('animated bounceOut').addClass('animated bounceIn delay-09s fast');
				
				anend = setTimeout(function(){
					$('#myaudio').attr('src','sounds/knock.mp3');
					$('#myaudio').get(0).play();
					setTimeout(function(){
						$('.text').fadeIn(800);
						dotype(now);
					},1200);
				},1200);
				$('.fb tbody').append('<tr><td>長官指示到特定廠商負責的港口進行船舶服務</td><td>向更高層長官回報</td><td></td><td>為他人圖取不法利益違反<span class="tan5">《貪污治罪條例》第5條</span>，但假如長官依法有權限因突發狀況調整船舶服務作業，則屬便民；根據<span class="sin21">《刑法》第21條</span>規定，應堅持依法行政，拒絕上級違法的命令</td></tr>');
				break;
				
			case 'f14':
				an14=false;
				$('.anleft').removeClass('anright');
				$('.desk').fadeOut().removeClass('animated bounceInUp delay-03s').addClass('animated bounceOutDown');
				$('.a-28').fadeOut().removeClass('animated bounceInLeft delay-06s').addClass('animated bounceOutLeft');
				$('.comp').fadeOut().removeClass('animated bounceIn delay-09s fast').addClass('animated bounceOut');
				
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d1-3.mp4').attr('id','d1-3');
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-1-2.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				},1000);
				
				now=0;
				$('.fb tbody').append('<tr><td>長官指示到特定廠商負責的港口進行船舶服務</td><td></td><td>聽從長官的指示</td><td>為他人圖取不法利益違反<span class="tan5">《貪污治罪條例》第5條</span>，但假如長官依法有權限因突發狀況調整船舶服務作業，則屬便民；根據<span class="sin21">《刑法》第21條</span>規定，應堅持依法行政，拒絕上級違法的命令</td></tr>');
				break;
				
			case 'f15':
				an15=false;
				$('.anleft').removeClass('anleft15');
				$('.f-06').fadeOut().removeClass('animated bounceInRight delay-03s').addClass('animated bounceOutRight');
				$('.e-20').fadeOut().removeClass('animated bounceInRight delay-06s').addClass('animated bounceOutRight');
				$('.fb tbody').append('<tr><td>發現長官涉嫌貪污</td><td></td><td>選擇置身事外</td><td>根據<span class="sinsong241">《刑事訴訟法》第241條</span>規定，應為告發</td></tr>');
				if(!an14 || (an08 && an08have==1)){
					ending(0);
				}else if(!an13){
					ending(2);
				}
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/end.mp3');
				$('#mybgm').get(0).play();
				break;
				
			case 't15':
				$('.anleft').removeClass('anleft15');
				$('.f-06').fadeOut().removeClass('animated bounceInRight delay-03s').addClass('animated bounceOutRight');
				$('.e-20').fadeOut().removeClass('animated bounceInRight delay-06s').addClass('animated bounceOutRight');
				$('.fb tbody').append('<tr><td>發現長官涉嫌貪污</td><td>揭弊</td><td></td><td>根據<span class="sinsong241">《刑事訴訟法》第241條</span>規定，應為告發</td></tr>');
				if(!an14 || (an08 && an08have==1)){
					ending(1);
				}else if(!an13){
					ending(3);
				}
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/end.mp3');
				$('#mybgm').get(0).play();
				break;
				
			case 't16':
				$('.anleft').removeClass('anleft16');
				$('.e-24').fadeOut().removeClass('animated bounceInUp').addClass('animated bounceOutDown');
				$('.a-31').fadeOut().removeClass('animated bounceInRight delay-03s').addClass('animated bounceOutRight');
				$('.fb tbody').append('<tr><td>發現長官涉嫌貪污</td><td>揭弊</td><td></td><td>為他人圖取不法利益違反<span class="tan5">《貪污治罪條例》第5條</span></td></tr>');
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/end.mp3');
				$('#mybgm').get(0).play();
				ending(4);
				break;
				
			case 'f16':
				an16=false;
				$('.anleft').removeClass('anleft16');
				$('.e-24').fadeOut().removeClass('animated bounceInUp').addClass('animated bounceOutDown');
				$('.a-31').fadeOut().removeClass('animated bounceInRight delay-03s').addClass('animated bounceOutRight');
				$('.fb tbody').append('<tr><td>發現長官涉嫌貪污</td><td></td><td>同流合污</td><td>為他人圖取不法利益違反<span class="tan5">《貪污治罪條例》第5條</span></td></tr>');
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/end.mp3');
				$('#mybgm').get(0).play();
				ending(0);
				break;	
				
			 default:
				console.log('switch default');
				break;
		}
	});
	
	//按LOGO跳過影片
	$('.logo').click(function(){
		var vid = document.getElementsByClassName("myvideo")[0];
		vid.currentTime = vid.duration;
	});
	
	//滑鼠移過看結局鈕
	$('.troll,.endfin').mouseover(function() {
			$('.troll').removeClass('animated zoomIn fast delay-4x8s').css({'transform':'scale(1.1)'});
			$('.endfin').removeClass('animated rotateInDownLeft delay-5s.addClass').css({'transform':'scale(1.1)'});
	  }).mouseout(function() {
			$('.troll,.endfin').css({'transform':'scale(1)'});
	  });
	  
	  //點擊看結局鈕
	  $('.troll,.endfin').click(function(){
		  $('.endmain,.troll,.endfin,.endtip').hide();
		  $('.title').attr('src','images/title_2.png');
		  $('.fb,.backend,.fbhead').show();
		  $('#myaudio').attr('src','sounds/menu_2.mp3');
		  $('#myaudio').get(0).play();
	  });
	  
	  //滑鼠移過回到結局鈕
	  $('.backend').mouseover(function() {
			$(this).attr('src','images/back_2.png');
		}).mouseout(function() {
			$(this).attr('src','images/back_1.png');
		});
		 //點擊回到結局鈕
		$('.backend').click(function(){
		  $('.endmain').removeClass('animated fadeInUp slower delay-2s');
		  $('.endtip').removeClass('animated fadeInLeft delay-6s');
		  $('.endmain,.troll,.endfin,.endtip').show();
		  $('.title').attr('src','images/title.png');
		  $('.fb,.backend,.fbhead').hide();
		   $('#myaudio').attr('src','sounds/menu_1.mp3');
		  $('#myaudio').get(0).play();
	  });
	  
		//按tan4法條
		$(document).on('click', ".tan4", function() {
			$('.tan4fa').show();
		});
		//按tan4法條
		$(document).on('click', ".tan", function() {
			$('.tanfa').show();
		});
		//按army法條
		$(document).on('click', ".army", function() {
			$('.armyfa').show();
		});
		//按gov34法條
		$(document).on('click', ".gov34", function() {
			$('.gov34fa').show();
		});
		//按tan5法條
		$(document).on('click', ".tan5", function() {
			$('.tan5fa').show();
		});
		//按sin21法條
		$(document).on('click', ".sin21", function() {
			$('.sin21fa').show();
		});
		
		//按sinsong241法條
		$(document).on('click', ".sinsong241", function() {
			$('.sinsong241fa').show();
		});
		 //滑鼠移過法條close
		$('.faclose').mouseover(function() {
			$(this).css({'transform':'scale(1.1)'});
		}).mouseout(function() {
			$(this).css({'transform':'scale(1)'});
		});
		
		//fa條close
		$('.faclose').on('click',function() {
			$('.tan4fa,.tanfa,.armyfa,.gov34fa,.tan5fa,.sin21fa,.sinsong241fa').hide();
		});
});

//打字效果
function dotype(){
	//打字效果start
	$.fn.autotype = function() {
		var $text = $(this);
		var str= eval('text'+nowev)[now];
			//eval('str'+nowev) = text1[now1];
		
		//console.log('$text:', $text);
		
		//console.log('str:', str);
		var index = 0;
		//$text.html()和$(this).html('')有区别
	
			timer = setInterval(function() {
			//substr(index, 1) 方法在字符串中抽取从index下标开始的一个的字符
				
					current = str.substr(index, 1);

					if (current == '<') {
						//indexOf() 方法返回">"在字符串中首次出现的位置。
						index = str.indexOf('>', index) + 1;
					} else {
						index++;
					}

					//console.log(["0到index下标下的字符",str.substring(0, index)],["符号",index & 1 ? '_': '']);
					//substring() 方法用于提取字符串中介于两个指定下标之间的字符
					$text.html(str.substring(0, index) + (index & 1 ? '' : ''));
					index > $text.html().length + 10 && (index = 0);
					if(index >= str.length){
						clearInterval(timer);
						
							if(now<eval('text'+nowev).length){
								$('.nbtn').show();
								switch(sen) {
									 case '5-4':
										$('.aa:nth-child(1)').text('我覺得今年應該還是有很多家廠商會來吧。').attr('id','t05-1');
										$('.aa:nth-child(2)').text('我是知道藍泰洋公司已經領標了。').attr('id','f05-1');
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										break;
										
									 case '5-6':
										$('.aa:nth-child(1)').text('副指揮官還在呢，之後有機會再找時間跟您好好聊一聊。').attr('id','f05-2');
										$('.aa:nth-child(2)').text('執行長不要開玩笑了，剛您說的話我就當沒聽到。').attr('id','t05-2');
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										break;
										
									 default:
										console.log('switch default');
										break;
								}
							}else{
								switch(sen) {
									 case '1-5':
										$('.aa:nth-child(1)').text('好吧！我會幫你們公司請款。').attr('id','f01');
										$('.aa:nth-child(2)').text('是嗎？我會向主管回報一下。').attr('id','t01')
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										now=0;
										break;
										
									 case '2-1':
										$('.nbtn').show();
										break;
										
									 case '3-8':
										$('.anleft').addClass('anleft03');
										$('.aa:nth-child(1)').text('好，沒問題。').attr('id','f03');
										$('.aa:nth-child(2)').text('謝謝長官，但我另有計畫了。').attr('id','t03')
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										now=0;
										break;
										
									case '4-5':
										$('.anleft').addClass('anright');
										$('.aa:nth-child(1)').text('(長官這麼堅持，收下應該沒關係吧！)').attr('id','f04');
										$('.aa:nth-child(2)').text('謝謝長官，我真的不能收。').attr('id','t04')
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										now=0;
										break;
										
									case '5-11':
										$('.aa:nth-child(1)').text('謝謝執行長的邀請，但時間不早了，我得先回艦艇上做準備。').attr('id','t05-3');
										$('.aa:nth-child(2)').text('我先請示一下副指揮官的意思。').attr('id','f05-3')
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										now=0;
										break;
									
									case '6-8':
										$('.anleft').addClass('anright');
										$('.aa:nth-child(1)').text('(原定的服務流程做了變動，我應該要跟指揮官報告一下。)').attr('id','t06');
										$('.aa:nth-child(2)').text('(長官想到的折衷辦法很好，就按照長官的指示去做。)').attr('id','f06')
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										now=0;
										break;
										
									case '7-9':
										$('.anleft').addClass('anleft07');
										$('.aa:nth-child(1)').text('(長官這話的意思是……？ 算了，今天長官跟喬治執行長的對話我就當沒聽到。)').attr('id','f07');
										$('.aa:nth-child(2)').text('(副指揮官居然圖利廠商，我必須向廉政單位回報。)').attr('id','t07')
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										now=0;
										break;
									
									case '8-9':
										$('.anleft').addClass('anright');
										$('.aa:nth-child(1)').text('真的很謝謝長官的好意，祝你和執行長用餐愉快，我先回艦上了。').attr('id','t08');
										$('.aa:nth-child(2)').text('既然長官你都這樣說了，我再拒絕就顯得太不識抬舉了。').attr('id','f08')
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										now=0;
										break;
										
									 case '9-4':
										$('.nbtn').show();
										break;
										
									 case '10-3':
										$('.anleft').addClass('anright');
										$('.nbtn').hide();
										now=0;
										$('#ev').css({'background':'url("images/take-10-2.png")',
										'background-size':'cover',
										'background-repeat':'no-repeat',
										'background-position': 'center center'});
										
										$('.table10').fadeOut().removeClass('animated bounceInUp delay-03s');
										$('.f-04').fadeOut().removeClass('animated bounceInLeft delay-06s');
										$('.e-17').fadeOut().removeClass('animated bounceInRight delay-09s');
										
										$('.aa:nth-child(1)').text('(真沒想到軍中長官跟承包商有勾結。  算了，今天他們的對話我最好當沒聽到，免得丟了飯碗。)').attr('id','f10');
										$('.aa:nth-child(2)').text('(我必須將軍中長官跟承包商勾結的事向廉政單位回報！)').attr('id','t10')
										$('.anleft').fadeIn(1000);
										break;
										
									case '11-4':
										$('.anleft').addClass('anright');
										$('.aa:nth-child(1)').text('是的，長官。').attr('id','f11');
										$('.aa:nth-child(2)').text('謝謝長官，但我怕到時說錯話，還是不去了。').attr('id','t11')
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										now=0;
										break;
										
									case '12-4':
										$('.anleft').addClass('anright');
										$('.aa:nth-child(1)').text('這麼好的東西我不能收。(真好的伴手禮，早知道就跟著去……)').attr('id','t12');
										$('.aa:nth-child(2)').text('謝謝長官。').attr('id','f12')
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										now=0;
										break;
										
									case '13-12':
										$('.anleft').addClass('anright');
										$('.aa:nth-child(1)').text('是的，長官。但是否需要進一步了解海霸天公司的發票問題呢？').attr('id','t13');
										$('.aa:nth-child(2)').text('(既然長官們已經討論出新的計畫，就按照長官的指示去做吧。)').attr('id','f13')
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										now=0;
										break;
										
									case '14-6':
										$('.anleft').addClass('anright');
										$('.aa:nth-child(1)').text('(表定流程做了變動，應該要跟約翰指揮官報告一下。)').attr('id','t14');
										$('.aa:nth-child(2)').text('(副指揮官的考量很有道理，就按照長官的指示去做吧。)').attr('id','f14')
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										now=0;
										break;
										
									case '15-4':
										$('.anleft').addClass('anleft15');
										$('.aa:nth-child(1)').text('(難怪大部分的船舶服務要留到黑鷹港才進行……算了，我做好自己的工作就好。)').attr('id','f15');
										$('.aa:nth-child(2)').text('(指揮官這樣圖利廠商也太誇張，我必須要向廉政單位回報！)').attr('id','t15')
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										now=0;
										break;
										
									case '16-6':
										$('.anleft').addClass('anleft16');
										$('.aa:nth-child(1)').text('(我必須要把長官洩密及圖利廠商的事向廉政單位回報。但…要是被長官發現怎麼辦？)').attr('id','t16');
										$('.aa:nth-child(2)').text('謝謝執行長，我能力所及的範圍，我就儘量配合。').attr('id','f16')
										$('.anleft').fadeIn(1000);
										$('.nbtn').hide();
										now=0;
										break;	
									 default:
										console.log('switch default');
										break;
								}
							}
					}
			}, 100);
	};
	$(".qq span").autotype();
	now++;
}

//下一句按鈕事件
function nbtn(){
		$('#myaudio').attr('src','sounds/nbtn.mp3');
		$('#myaudio').get(0).play();
		$('.nbtn').hide();
		
		switch(sen) {
			 case '1-1':
				
				sen='1-2';
				dotype();
				$('#ev').css({'background':'url("images/take-1-2.png")',
				'background-size':'cover',
				'background-repeat':'no-repeat',
				'background-position': 'center center'});
				
				$('.desk').fadeOut(800).removeClass('animated bounceInUp').addClass('animated bounceOutDown');
				$('.a-21').fadeOut().removeClass('animated bounceInLeft delay-05s').addClass('animated bounceOutLeft');
				$('.comp').fadeOut().removeClass('animated bounceIn delay-1x2s fast').addClass('animated bounceOut');
				$('.b-01').show().removeClass('animated bounceOutLeft').addClass('animated bounceInLeft');
				
				break;
				
			 case '1-2':
				sen='1-3';
				dotype();
				$('.b-01 img').attr('src','images/b-02.png');
				
				break;
				
			 case '1-3':
				sen='1-4';
				$('.b-01').fadeOut().removeClass('animated bounceInLeft').addClass('animated bounceOutLeft');
				$('#threeh').fadeIn().css('display','flex');
				
				setTimeout(function(){
					$('#threeh').fadeOut();
					dotype();
					$('#ev').css({'background':'url("images/take-1-3.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
					$('.b-03').show().removeClass('animated bounceOutRight').addClass('animated bounceInRight');
				},3000);
				break;
				
			 case '1-4':
				sen='1-5';
				dotype();
				$('.b-03 img').attr('src','images/b-04.png');
				
				break;
				
			 case '2-1':
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d4.mp4').attr('id','d4');
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/party.mp3');
				$('#mybgm').get(0).play();
				
				now=0;
				$('.c-01').fadeOut().removeClass('animated bounceInRight').addClass('animated bounceOutRight');
				$('.d-01').fadeOut().removeClass('animated bounceInRight delay-03s').addClass('animated bounceOutRight');
				
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-3-1.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				},1000);
				
				break;
				
			 case '3-1':
				sen='3-2';
				
				$('.e-01').fadeOut().removeClass('animated bounceInLeft delay-03s').addClass('animated bounceOutLeft');
				$('.pp').fadeOut(800).removeClass('animated bounceInUp delay-06s').addClass('animated bounceOutDown');
				
				$('#ev').css({'background':'url("images/take-3-2.png")',
				'background-size':'cover',
				'background-repeat':'no-repeat',
				'background-position': 'center center'});
				setTimeout(function(){
					$('.e-02').show().removeClass('animated bounceOutRight').addClass('animated bounceInRight');
					dotype();
				},600);
				break;
				
			 case '3-2':
				sen='3-3';
				dotype();
				$('.e-02 img').attr('src','images/e-03.png');
				break;
				
			 case '3-3':
				sen='3-4';
				dotype();
				$('.e-02 img').attr('src','images/e-04.png');
				break;
				
			 case '3-4':
				sen='3-5';
				dotype();
				$('.e-02').css('right','.1%');
				$('.e-02 img').attr('src','images/e-05.png');
				$('.a-02').show().removeClass('animated bounceOutRight').addClass('animated bounceInLeft');
				break;
				
			case '3-5':
				sen='3-6';
				dotype();
				$('.e-02 img').attr('src','images/e-06.png');
				$('.a-02 img').attr('src','images/a-03.png');
				break;
				
			case '3-6':
				sen='3-7';
				dotype();
				$('.e-02 img').attr('src','images/e-05.png');
				$('.a-02 img').attr('src','images/a-04.png');
				break;
				
			case '3-7':
				sen='3-8';
				dotype();
				$('.e-02 img').attr('src','images/e-06.png');
				$('.a-02 img').attr('src','images/a-05.png');
				break;
				
			case '4-1':
				sen='4-2';
				dotype();
				$('.a-06 img').attr('src','images/a-07.png');
				break;
				
			case '4-2':
				sen='4-3';
				dotype();
				$('.a-06 img').attr('src','images/a-08.png');
				break;
				
			case '4-3':
				sen='4-4';
				dotype();
				$('.a-06 img').attr('src','images/a-09.png');
				break;
				
			case '4-4':
				sen='4-5';
				dotype();
				break;
				
			case '5-1':
				sen='5-2';
				dotype();
				
				$('#ev').css({'background':'url("images/take-5-2.png")',
				'background-size':'cover',
				'background-repeat':'no-repeat',
				'background-position': 'center center'});
				$('.e-07').css('right','0');
				$('.e-07 img').attr('src','images/e-08.png');
				
				break;
				
			case '5-2':
				sen='5-3';
				dotype();
				
				$('.e-07 img').attr('src','images/e-09.png');
				break;
				
			case '5-3':
				sen='5-4';
				dotype();
				
				$('.e-07 img').attr('src','images/e-08.png');
				break;
				
			case '5-5':
				sen='5-6';
				dotype();
				
				$('.e-07 img').attr('src','images/e-07.png');
				break;
				
			case '5-7':
				sen='5-8';
				dotype();
				
				$('.e-07 img').attr('src','images/e-09.png');
				break;
				
			case '5-8':
				sen='5-9';
				dotype();
				
				$('.e-07 img').attr('src','images/e-08.png');
				break;
				
			case '5-9':
				sen='5-10';
				dotype();
				
				$('.e-07 img').attr('src','images/e-07.png');
				break;
				
			case '5-10':
				sen='5-11';
				dotype();
				break;
				
			case '6-1':
				sen='6-2';
				dotype();
				$('.a-10 img').attr('src','images/a-11.png');
				
				break;
				
			case '6-2':
				sen='6-3';
				dotype();
				$('.a-10 img').attr('src','images/a-12.png');
				
				break;
				
			case '6-3':
				sen='6-4';
				dotype();
				$('.a-10 img').attr('src','images/a-13.png');
				
				break;
				
			case '6-4':
				sen='6-5';
				dotype();
				$('.a-10 img').attr('src','images/a-10.png');
				
				break;
			
			case '6-5':
				sen='6-6';
				dotype();
				$('.a-10 img').attr('src','images/a-12.png');
				
				break;
			
			case '6-6':
				sen='6-7';
				dotype();
				$('.a-10 img').attr('src','images/a-13.png');
				
				break;
				
			case '6-7':
				sen='6-8';
				dotype();
				$('.a-10 img').attr('src','images/a-14.png');
				
				break;
				
			case '7-1':
				sen='7-2';
				dotype();
				$('.e-10 img').attr('src','images/e-11.png');
				
				break;
				
			case '7-2':
				sen='7-3';
				dotype();
				$('.a-15 img').attr('src','images/a-16.png');
				$('.e-10 img').attr('src','images/e-12.png');
				
				break;
			
			case '7-3':
				sen='7-4';
				dotype();
				$('.e-10 img').attr('src','images/e-13.png');
				
				break;
			
			case '7-4':
				sen='7-5';
				dotype();
				$('.a-15 img').attr('src','images/a-17.png');
				$('.e-10 img').attr('src','images/e-14.png');
				
				break;
				
			case '7-5':
				sen='7-6';
				dotype();
				$('.a-15 img').attr('src','images/a-18.png');
				$('.e-10 img').attr('src','images/e-12.png');
				
				break;
			
			case '7-6':
				sen='7-7';
				dotype();
				$('.a-15 img').attr('src','images/a-16.png');
				$('.e-10 img').attr('src','images/e-14.png');
				
				break;
			
			case '7-7':
				sen='7-8';
				dotype();
				$('.a-15 img').attr('src','images/a-19.png');
				$('.e-10 img').attr('src','images/e-15.png');
				
				break;
			
			case '7-8':
				sen='7-9';
				dotype();
				$('.a-15 img').attr('src','images/a-20.png');
				$('.e-10 img').attr('src','images/e-16.png');
				
				break;
				
			case '8-1':
				sen='8-2';
				dotype();
				$('.a-14 img').attr('src','images/a-12.png');
				
				break;
				
			case '8-2':
				sen='8-3';
				dotype();
				$('.a-14 img').attr('src','images/a-10.png');
				
				break;
				
			case '8-3':
				sen='8-4';
				dotype();
				$('.a-14 img').attr('src','images/a-13.png');
				
				break;
				
			case '8-4':
				sen='8-5';
				dotype();
				$('.a-14 img').attr('src','images/a-12.png');
				
				break;
				
			case '8-5':
				sen='8-6';
				dotype();
				$('.a-14 img').attr('src','images/a-14.png');
				
				break;
				
			case '8-6':
				sen='8-7';
				dotype();
				$('.a-14 img').attr('src','images/a-13.png');
				
				break;
				
			case '8-7':
				sen='8-8';
				dotype();
				$('.a-14 img').attr('src','images/a-14.png');
				
				break;
				
			case '8-8':
				sen='8-9';
				dotype();
				$('.a-14 img').attr('src','images/a-12.png');
				
				break;
				
			case '9-1':
				sen='9-2';
				dotype();
				$('.f-01 img').attr('src','images/f-02.png');
				
				break;
				
			case '9-2':
				sen='9-3';
				dotype();
				$('.f-01 img').attr('src','images/f-03.png');
				
				break;
				
			case '9-3':
				sen='9-4';
				dotype();
				$('.f-01 img').attr('src','images/f-01.png');
				
				break;
				
			case '9-4':
			
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d6.mp4').attr('id','d6');
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				$('#mybgm').get(0).pause();
				$('#mybgm').attr('src','sounds/pub.mp3');
				$('#mybgm').get(0).play();
				now=0;
				
				$('.f-01').fadeOut().removeClass('animated bounceInRight delay-06s').addClass('animated bounceOutRight');
				$('.desk9').fadeOut(800).removeClass('animated bounceInUp delay-03s').addClass('animated bounceOutDown');
				$('.comp9').fadeOut().removeClass('animated bounceIn delay-09s fast').addClass('animated bounceOut');
				
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-10-1.png")',
					'background-size':'cover',
					'background-repeat':'no-repeat',
					'background-position': 'center center'});
				},1000);
				
				break;
				
			case '10-1':
				sen='10-2';
				dotype();
				$('.f-04 img').attr('src','images/f-05.png');
				$('.e-17 img').attr('src','images/e-18.png');
				break;
				
			case '10-2':
				sen='10-3';
				dotype();
				$('.f-04 img').attr('src','images/f-04.png');
				$('.e-17 img').attr('src','images/e-19.png');
				break;
				
			case '11-1':
				sen='11-2';
				dotype();
				$('.a-21 img').attr('src','images/a-22.png');
				
				break;
			case '11-2':
				sen='11-3';
				dotype();
				$('.a-21 img').attr('src','images/a-21.png');
				
				break;
			case '11-3':
				sen='11-4';
				dotype();
				$('.a-21 img').attr('src','images/a-23.png');
				
				break;
			
			case '12-1':
				sen='12-2';
				dotype();
				$('.a-06 img').attr('src','images/a-07.png');
				break;
				
			case '12-2':
				sen='12-3';
				dotype();
				$('.a-06 img').attr('src','images/a-08.png');
				break;
				
			case '12-3':
				sen='12-4';
				dotype();
				$('.a-06 img').attr('src','images/a-09.png');
				break;
				
			case '13-1':
				sen='13-2';
				dotype();
				$('.a-24 img').attr('src','images/a-23.png');
				break;
				
			case '13-2':
				sen='13-3';
				dotype();
				$('.a-24 img').attr('src','images/a-22.png');
				break;
				
			case '13-3':
				sen='13-4';
				dotype();
				$('.a-24 img').attr('src','images/a-23.png');
				break;
				
			case '13-4':
				sen='13-5';
				dotype();
				$('.a-24 img').attr('src','images/a-25.png');
				break;
				
			case '13-5':
				sen='13-6';
				dotype();
				$('.a-24 img').attr('src','images/a-22.png');
				break;
				
			case '13-6':
				sen='13-7';
				dotype();
				$('.a-24 img').attr('src','images/a-21.png');
				break;
				
			case '13-7':
				sen='13-8';
				dotype();
				$('.a-24 img').attr('src','images/a-26.png');
				break;
				
			case '13-8':
				sen='13-9';
				dotype();
				$('.a-24 img').attr('src','images/a-25.png');
				break;
				
			case '13-9':
				sen='13-10';
				dotype();
				$('.a-24 img').attr('src','images/a-27.png');
				break;
				
			case '13-10':
				sen='13-11';
				dotype();
				$('.a-24 img').attr('src','images/a-21.png');
				break;
				
			case '13-11':
				sen='13-12';
				dotype();
				$('.a-24 img').attr('src','images/a-22.png');
				break;
				
			case '14-1':
				sen='14-2';
				dotype();
				$('.a-28 img').attr('src','images/a-21.png');
				break;
				
			case '14-2':
				sen='14-3';
				dotype();
				$('.a-28 img').attr('src','images/a-22.png');
				break;
				
			case '14-3':
				sen='14-4';
				dotype();
				$('.a-28 img').attr('src','images/a-26.png');
				break;
				
			case '14-4':
				sen='14-5';
				dotype();
				$('.a-28 img').attr('src','images/a-28.png');
				break;
				
			case '14-5':
				sen='14-6';
				dotype();
				$('.a-28 img').attr('src','images/a-23.png');
				break;
				
			case '15-1':
				sen='15-2';
				dotype();
				$('.b-01 img').attr('src','images/b-02.png');
				break;
				
			case '15-2':
				
				$('.b-01').fadeOut().removeClass('animated bounceInLeft delay-03s').addClass('animated bounceOutLeft');
				$('#mov').css('z-index','1');
				$('#ev').css('z-index','2');
				$('#mov').show();
				$('.myvideo').attr('src','videos/d1-4.mp4').attr('id','d1-4');
				$('#ev').fadeOut(1000);
				$('.myvideo').get(0).play();
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-15-2.png")',
						'background-size':'cover',
						'background-repeat':'no-repeat',
						'background-position': 'center center'});
				},800);
				
				break;
				
			case '15-3':
				sen='15-4';
				
				$('.f-06 img').attr('src','images/f-07.png');
				$('.e-20 img').attr('src','images/e-21.png');
				dotype();
				
				break;
				
			case '16-1':
				sen='16-2';
				dotype();
				$('.a-29e-22 img').attr('src','images/a-30e-23.png');
				break;
			case '16-2':
				sen='16-3';
				$('.a-29e-22 img').fadeOut(800).removeClass('animated bounceInUp delay-03s').addClass('animated bounceOutDown');
				
				setTimeout(function(){
					$('#ev').css({'background':'url("images/take-16-2.png")',
						'background-size':'cover',
						'background-repeat':'no-repeat',
						'background-position': 'center center'});
						setTimeout(function(){
							$('.e-24').show().removeClass('animated bounceOutDown').addClass('animated bounceInUp');
							$('.a-31').show().removeClass('animated bounceOutRight').addClass('animated bounceInRight delay-03s');
							dotype();
						},300);
				},300);
				break;
			case '16-3':
				sen='16-4';
				dotype();
				$('.e-24 img').attr('src','images/e-25.png');
				$('.a-31 img').attr('src','images/a-32.png');
				break;
			case '16-4':
				sen='16-5';
				dotype();
				$('.e-24 img').attr('src','images/e-26.png');
				$('.a-31 img').attr('src','images/a-33.png');
				break;
			case '16-5':
				sen='16-6';
				dotype();
				$('.e-24 img').attr('src','images/e-27.png');
				$('.a-31 img').attr('src','images/a-34.png');
				break;
				
			 default:
				console.log('switch default');
				break;
		} 
}
function isMobile() {

  try{ document.createEvent("TouchEvent"); return true; }

  catch(e){ return false;}

}
function playaudio(){
	document.getElementById("mybgm").muted = false;
	$('#mybgm').get(0).play();
	document.getElementById("mybgm").play();
}
function ending(x){
	$('.endmain').html(end[x]);
	$('#end').show();
	$('#ev').fadeOut();
	$('.title').addClass('animated fadeInUp slow delay-1x3s');
	$('.endmain').addClass('animated fadeInUp slower delay-2s');
	$('.troll').addClass('animated zoomIn fast delay-4x8s');
	$('.endfin').addClass('animated rotateInDownLeft delay-5s');
	$('.endtip').addClass('animated fadeInLeft delay-6s');
}
