var maxTime = 30;


jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

function tick (pCurrentTime) {
	$("#timeText").text(pCurrentTime);
	var rotateValue;
	if (pCurrentTime > maxTime/2) {			
		rotateValue = 360*pCurrentTime/maxTime - 180;
		$("#leftHalfCircle").rotate(rotateValue);
		$("#rightHalfCircle").rotate(0);
	} else {
		$("#leftHalfCircle").rotate(0);
		rotateValue = 180*pCurrentTime/(maxTime/2) - 180;
		$("#rightHalfCircle").rotate(rotateValue);
	}
		
}