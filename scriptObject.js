/*
IE7 compatible with only the slider, but with the opacity features of the menu it only
works with IE9 onwards. Need to make a workaround to use a solid menu that just is hidden or not
*/

/*
	Opacity fix:
	.transparent {
	zoom: 1;
	filter: alpha(opacity=50);
	opacity: 0.5;
	}

	Background opacity fix for menu footer:
	div {
  	background: rgb(200, 54, 54); 
   	background: rgba(200, 54, 54, 0.5); 
	}

*/

var setOpacity = function(element, value) {
	element.style.opacity = value;
	element.style.filter = 'alpha(opacity=' + value*100 + ')';
	};

var addEvent = function(event, element, fn) {
		if (element.addEventListener) {
			element.addEventListener(event, fn);
		}
		else {
			element.attachEvent('on' + event, fn);
		}
	};

var arrowUpImage = document.getElementById("sliderArrow"),
	arrowDownImage = document.getElementById("sliderDownArrow"),
	sliderMenu = document.getElementById("sliderFooter"),
	prevButtonElement = document.getElementById("prevButton"),
	nextButtonElement = document.getElementById("nextButton"),
	imageContainer = document.getElementById("toSlide"),
	textArea = document.getElementById("sliderImageSpan");

function fade(elem, direction, speed) {
	switch (direction) {
		case 0:
			elem.style.visibility="visible";
			var op = 1;
			var timer = setInterval(function() {
				if (op > 0) {
					setOpacity(elem, op);
					op -= 0.1;
				}
				else {
					elem.style.visibility = "hidden";
					setOpacity(elem, 0);
					clearInterval(timer);
				}
			}, speed);
		break;

		case 1:
			elem.style.visibility="visible";
			var op = 0;
			var timer = setInterval(function() {
				if (op < 1) {
					setOpacity(elem, op);
					op += 0.1;
				}
				else {
					setOpacity(elem, 1);
					clearInterval(timer);
				}
			}, speed);
		break;
	}
}

function sliderOnHover() {
	fade(arrowUpImage, 0, 50);
	fade(sliderMenu, 1, 50);
	fade(arrowDownImage, 1, 50);
	arrowUpImage.style.visibility = "hidden";
}

function sliderOffHover() {
	fade(sliderMenu, 0, 50);
	fade(arrowUpImage, 1, 50);
	fade(arrowDownImage, 0, 50);
	arrowDownImage.style.visibility = "hidden";
}


var slider = new Slider(nextButtonElement, prevButtonElement, 0, imageContainer, textArea);

addEvent('click', arrowUpImage, sliderOnHover);

addEvent('click', arrowDownImage, sliderOffHover);


addEvent('mouseover', arrowUpImage, function(){
	setOpacity(arrowUpImage, 0.5);
});

addEvent('mouseout', arrowUpImage, function(){
	setOpacity(arrowUpImage, 1);
});

addEvent('mouseover', arrowDownImage, function(){
	setOpacity(arrowDownImage, 0.5);
});

addEvent('mouseout', arrowDownImage, function(){
	setOpacity(arrowDownImage, 1);
});
