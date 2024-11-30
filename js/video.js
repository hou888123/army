$(document).ready(function(){
	//INITIALIZE
	var video = $('.myvideo');
	
	//remove default control when JS loaded
	video[0].removeAttribute("controls");
	$('.control').show().css({'bottom':0});
	
	$("#myvideo").on('loadstart', function() {
		$('.loading').show();
	});
	
	//$('.caption').fadeIn(500);

	//before everything get started
	video.on('loadedmetadata', function() {
		//$('.caption').animate({'top':-45},300);
		
		//set video properties
		$('.current').text(timeFormat(0));
		$('.duration').text(timeFormat(video[0].duration));
		updateVolume(0, 0.7);
			
		//start to get video buffering data 
		setTimeout(startBuffer, 150);
			
		//bind video events
		$('.videoContainer')
		.hover(function() {
			$('.control').stop().animate({'bottom':0}, 500);
			//$('.caption').stop().animate({'top':0}, 500);
		}, function() {
			if(!volumeDrag && !timeDrag){
				$('.control').stop().animate({'bottom':0}, 500);
				//$('.caption').stop().animate({'top':-45}, 500);
			}
		});

		//video[0].play();
		console.log('loadedmetadata video[0].paused='+video[0].paused);
		/*var btnPlay = document.getElementById("playBtn");
		//狀態為正在播放
		if(video[0].paused){
			btnPlay.style.display = "block";
			
			btnPlay.addEventListener("click", function(){
				btnPlay.style.display = "none";
				video[0].play();
				//alert('loadedmetadata:  '+name.substr(1));
				btnPlay.removeEventListener("click", arguments.callee);
			});
		} else {
			btnPlay.style.display = "none";
		}*/
		
	});
	
	//display video buffering bar
	var startBuffer = function() {
		var currentBuffer = video[0].buffered.end(0);
		var maxduration = video[0].duration;
		var perc = 100 * currentBuffer / maxduration;
		$('.bufferBar').css('width',perc+'%');
			
		if(currentBuffer < maxduration) {
			setTimeout(startBuffer, 500);
		}
	};	
	
	//display current video play time
	video.on('timeupdate', function() {
		var currentPos = video[0].currentTime;
		var maxduration = video[0].duration;
		var perc = 100 * currentPos / maxduration;
		$('.timeBar').css('width',perc+'%');	
		$('.current').text(timeFormat(currentPos));	
	});
	
	//CONTROLS EVENTS
	//video screen and play button clicked
	//$('.btnPlay').addClass('paused');
	$('.btnPlay img').attr("src","images/control_04.png");

	//video.on('click', function() { playpause(); } );
	$('.btnPlay').on('click', function() { playpause(); } );
	var playpause = function() {
		if(video[0].paused || video[0].ended) {
			//$('.btnPlay').addClass('paused');
			$('.btnPlay img').attr("src","images/control_04.png");
			video[0].play();
		}
		else {
			//$('.btnPlay').removeClass('paused');
			$('.btnPlay img').attr("src","images/control_01.png");
			video[0].pause();
		}
		
		readed = false;
		
	};
	
	
	
	//stop button clicked
	$('.btnStop').on('click', function() {
		//$('.btnPlay').removeClass('paused');
		$('.btnPlay img').attr("src","images/control_01.png");
		updatebar($('.progress').offset().left);
		video[0].pause();
	});
	
	
	
	
	//sound button clicked
	$('.sound').click(function() {
		video[0].muted = !video[0].muted;
		//$(this).toggleClass('muted');
		
		if(video[0].muted) {
			$('.sound img').attr("src","images/control_03.png");
			$('.volumeBar').css('width',0);
		}
		else{
			
			if(video[0].volume > 0.5){
				$('.sound img').attr("src","images/control_09.png");
			}else if(video[0].volume == 0){
				$('.sound img').attr("src","images/control_03.png");
			}else{
				$('.sound img').attr("src","images/control_06.png");
			}
			//$('.sound').removeClass('muted').addClass('sound2');
			$('.volumeBar').css('width', video[0].volume*100+'%');
		}
	});
	
	//VIDEO EVENTS
	//video canplay event
	video.on('canplay', function() {
		$('.loading').hide();
	});
	
	//video canplaythrough event
	//solve Chrome cache issue
	var completeloaded = false;
	video.on('canplaythrough', function() {
		completeloaded = true;
	});
	
	//video ended event
	video.on('ended', function() {
		//$('.btnPlay').removeClass('paused');
		$('.btnPlay img').attr("src","images/control_01.png");
		video[0].pause();
	});

	//video seeking event
	video.on('seeking', function() {
		//if video fully loaded, ignore loading screen
		if(!completeloaded) { 
			$('.loading').show();
		}	
	});
	
	//video seeked event
	video.on('seeked', function() {
		$('.loading').hide();
	});
	
	//video waiting for more data event
	video.on('waiting', function() {
		$('.loading').show();
	});
	
	//VIDEO PROGRESS BAR
	//when video timebar clicked
	var timeDrag = false;	/* check for drag event */
	$('.progress').on('mousedown', function(e) {
		timeDrag = true;
		updatebar(e.pageX);
	});
	$(document).on('mouseup', function(e) {
		if(timeDrag) {
			timeDrag = false;
			updatebar(e.pageX);
		}
	});
	$(document).on('mousemove', function(e) {
		if(timeDrag) {
			updatebar(e.pageX);
		}
	});
	var updatebar = function(x) {
		var progress = $('.progress');
		
		//calculate drag position
		//and update video currenttime
		//as well as progress bar
		var maxduration = video[0].duration;
		var position = x - progress.offset().left;
		var percentage = 100 * position / progress.width();
		if(percentage > 100) {
			percentage = 100;
		}
		if(percentage < 0) {
			percentage = 0;
		}
		$('.timeBar').css('width',percentage+'%');	
		video[0].currentTime = maxduration * percentage / 100;
	};

	//VOLUME BAR
	//volume bar event
	var volumeDrag = false;
	$('.volume').on('mousedown', function(e) {
		volumeDrag = true;
		video[0].muted = false;
		//$('.sound').removeClass('muted');
		$('.sound img').attr("src","images/control_06.png");
		updateVolume(e.pageX);
	});
	$(document).on('mouseup', function(e) {
		if(volumeDrag) {
			volumeDrag = false;
			updateVolume(e.pageX);
		}
	});
	$(document).on('mousemove', function(e) {
		if(volumeDrag) {
			updateVolume(e.pageX);
		}
	});
	var updateVolume = function(x, vol) {
		var volume = $('.volume');
		var percentage;
		//if only volume have specificed
		//then direct update volume
		if(vol) {
			percentage = vol * 100;
		}
		else {
			var position = x - volume.offset().left;
			percentage = 100 * position / volume.width();
		}
		
		if(percentage > 100) {
			percentage = 100;
		}
		if(percentage < 0) {
			percentage = 0;
		}
		
		//update volume bar and video volume
		$('.volumeBar').css('width',percentage+'%');	
		video[0].volume = percentage / 100;
		
		//change sound icon based on volume
		if(video[0].volume == 0){
			//$('.sound').removeClass('sound2').addClass('muted');
			$('.sound img').attr("src","images/control_03.png");
		}
		else if(video[0].volume > 0.5){
			//$('.sound').removeClass('muted').addClass('sound2');
			$('.sound img').attr("src","images/control_09.png");
		}
		else{
			$('.sound img').attr("src","images/control_06.png");
			//$('.sound').removeClass('muted').removeClass('sound2');
		}
		
	};

	//Time format converter - 00:00
	var timeFormat = function(seconds){
		var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
		var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
		return m+":"+s;
	};
});