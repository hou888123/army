
$(function()
{
	$(window).resize(objSizeReset);
	objSizeReset();
	function objSizeReset() {
		convertSizeALL('.wrapper');
	}
	
	function convertSizeALL(className){
		
		var w = 1920, h = 1080;
	
		var iw = $(window).innerWidth(), ih=$(window).innerHeight();
		

		var pRatio = window.devicePixelRatio || 0, xRatio=iw/w, yRatio=ih/h, sRatio=1;
					
		sRatio = Math.min(xRatio, yRatio);
		
		$(className).css({width:Math.round(w*sRatio) ,height:Math.round(h*sRatio)});
		
		//文字縮放
		$('#threeh,.videoblack').css('font-size', $('.wrapper').width()/20);
		$('#blackopen div').css('font-size', $('.wrapper').width()/38);
		$('.endmain').css('font-size',  $('.wrapper').width()/43);
		$('.endtip').css('font-size',  $('.wrapper').width()/60);
		$('.fbhead thead').css('font-size',  $('.wrapper').width()/62);
		$('.fb tbody').css('font-size',  $('.wrapper').width()/63);
		$('.fabluetitle').css('font-size',  $('.wrapper').width()/46);
		$('.famaintitle').css('font-size',  $('.wrapper').width()/55);
		
		$('.fasmain').css('font-size',  $('.wrapper').width()/68);
		$('.text').css('font-size',  $('.wrapper').width()/47);
		$('.anleft,.anright').css('font-size',  $('.wrapper').width()/43);
		$('#end .title').css('font-size',  $('.wrapper').width()/35);
		$('.logo').css('width', $('.wrapper').width()/5.5);
		$('.rtbtn').css('width', $('.wrapper').width()/6);
		$('.rubtn,.house').css('width', $('.wrapper').width()/28);
		$('.menubtn').css('width', $('.wrapper').width()/18);
		$('.nbtn img').css('width', $('.wrapper').width()/35);
		//$('.ui-slider').css('width', $('.wrapper').width()/7);
		$('.ui-slider-track').css('height', $('.wrapper').height()/60);
		$('.ui-slider-track .ui-btn.ui-slider-handle').css('height', $('.wrapper').height()/40);
		$('.ui-slider-track .ui-btn.ui-slider-handle').css('top','-40%');
		$('.ui-slider-track .ui-btn.ui-slider-handle').css('width', $('.wrapper').width()/72);
	}

	$(window).on('load', function(){
		objSizeReset();
		 setTimeout(function(){
			window.scrollTo(0, 1);
		}, 100);
	});


});