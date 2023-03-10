
var width = 300;
var height = 200;
var finger = [
	[0.5, 1.0, 0.5],
	[1.0, 1.0, 1.0],
	[0.5, 1.0, 0.5]
];
var waterModel;
var waterCanvas;
var imgURL="";
var count =0

$( document ).ready(function() {
    var imgIndex=Math.floor(Math.random() * 15);
	(imgIndex>9 ) ? imgURL = `images/ixchel_${imgIndex}.jpg`: imgURL = `images/ixchel_0${imgIndex}.jpg`
	
    init();
    moveFinger();
    checkKeyPressed();
    onTouchRipple();
	waterModel.setInterpolation(true);

	window.addEventListener("resize", (event) => {
		handleResize()
	});
});

var mDown=true;
function moveFinger(){
	$( document ).mousedown(function() {
		if(!mDown){
			mDown=true;
		}
	});
	$(document).mouseup(function() {
		if(mDown){
			mDown=false;
		}
	});
  	$( document).mousemove(function( e ){
  		// alert("x:"+ e.pageX +  ",y:" + e.pageY);
  			var mX= e.pageX * width/ $(window).width();
  			var mY= e.pageY * height/ $(window).height();
  			waterModel.touchWater(mX, mY, 1.5, finger);
  			$('#customCursor').css('left',e.pageX -0);
			$('#customCursor').css('top',e.pageY - 50);
  			// $( "p.fakeAlert" ).text("x:"+ mX +  ",y:" + mY);  			
  	});
}
function init(){
	let windowWidth = window.innerWidth
	let windowHeight = window.innerHeight
	let ratio = 820/1024
	/* rule to reduce the resolution for bigger screens */
	if(windowWidth> 1200){
		width = Math.ceil($(window).width()/2.5);
	}else if(windowWidth> 800){
		width = Math.ceil($(window).width()/2);
	}
	else{
		width = Math.ceil($(window).width()/1);
	}
	
	
	width = Math.trunc(width)
	height = width/ratio
	/* deprecated calculation, keep for reference */
	// height = Math.ceil($(window).height()/2);
	height = Math.trunc(height);
	if(windowWidth<800){
	 waterModel = new WaterModel(width, height, {
			resolution:(width/50),
			interpolate:false,
			damping:0.98,
			clipping:5,
			evolveThreshold:0.015,
			maxFps:60,
			showStats:false
		});
	}else{
		waterModel = new WaterModel(width, height, {
			resolution:(width/38),
			interpolate:false,
			damping:0.98,
			clipping:5,
			evolveThreshold:0.015,
			maxFps:60,
			showStats:false
		});
	}
	 waterCanvas = new WaterCanvas(width-20, height-20,
		"waterHolder", waterModel, {
			backgroundImageUrl:imgURL,
			lightRefraction:79.0,
			lightReflection:0.001,
			maxFps:30,
			showStats:false
		});
	waterModel.touchWater(width*Math.random(), height*Math.random(), 1.5, finger);

	/* rules for ratio */
	let waterHolder = document.querySelector('#waterHolder')
	if(windowWidth > windowHeight){
		waterHolder.style.width = '120%'
		waterHolder.style.height = `${waterHolder.offsetWidth/ratio}px`
	}else{
		waterHolder.style.height = '120%'
		waterHolder.style.width = `${waterHolder.offsetHeight*ratio}px`
	}
}


function handleResize(){
	let windowWidth = window.innerWidth
	let windowHeight = window.innerHeight
	let ratio = 820/1024
	let waterHolder = document.querySelector('#waterHolder')
	if(windowWidth > windowHeight){
		waterHolder.style.width = '120%'
		waterHolder.style.height = `${waterHolder.offsetWidth/ratio}px`
	}else{
		waterHolder.style.height = '120%'
		waterHolder.style.width = `${waterHolder.offsetHeight*ratio}px`
	}
}
function checkKeyPressed(){
	$(document).on('keypress', function(e) {
    	// var tag = e.target.tagName.toLowerCase();
    	// alert("key was pressed");
    	location.reload();		
    	// if ( e.which === 119 && tag != 'input' && tag != 'textarea') {	
    	// }
	});
}


// on touch functions

function onTouchRipple(){
  document.addEventListener("touchstart", 
    function (e){
      var touchY = e.touches[0].clientY;
      var touchX = e.touches[0].clientX;
      // alert("touched!");
      }
    );
  document.addEventListener("touchmove", 
    function (e){
      var touchY = e.touches[0].clientY;
      var touchX = e.touches[0].clientX;
      		var mX= touchX * width/ $(window).width();
  			var mY= touchY * height/ $(window).height();
  			waterModel.touchWater(mX, mY, 1.5, finger);
        $('#customCursor').css('left',touchX -0);
      $('#customCursor').css('top',touchY - 30);

      }
    );
  document.addEventListener("touchend", 
    function (e){
      var touchY = e.changedTouches[0].clientY ;
      var touchX = e.changedTouches[0].clientX ;

      }
    );
}




// https://code.almeros.com/water-ripple-canvas-and-javascript/#.Ukpfe2QY2ok















