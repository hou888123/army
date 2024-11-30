
$(function(){
	$(window).on('load', function() {
		$(".scrollBox").mCustomScrollbar({
			scrollButtons:{ /*scroll buttons*/
				enable: true, /*scroll buttons support: boolean*/
				scrollType: "continuous", /*scroll buttons scrolling type: "continuous", "pixels"*/
				scrollSpeed: "auto", /*scroll buttons continuous scrolling speed: integer, "auto"*/
				scrollAmount: 50 /*scroll buttons pixels scroll amount: integer (pixels)*/
			},
			setLeft: "0",
			theme:"minimal-dark"
		});
	});
});
