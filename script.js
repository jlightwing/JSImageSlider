
var sliderDiv = document.getElementById("shadow"),
	arrowImage = document.getElementById("sliderArrow"),
	arrowDownImage = document.getElementById("sliderDownArrow"),
	sliderMenu = document.getElementById("sliderFooter"),
	prevButtonElement = document.getElementById("prevButton"),
	nextButtonElement = document.getElementById("nextButton"),
	slideCounter;

var images = new Array();
	images[0] = document.getElementById("image1");
	images[1] = document.getElementById("image2");
	images[2] = document.getElementById("image3");


images[1].style.left = "100%";
images[2].style.left = "100%";

slideCounter = 0;


function fade(elem, direction, speed) {
	switch (direction) {
		case 0:
			var op = 1;
			var timer = setInterval(function() {
				if (op > 0) {
					elem.style.opacity = op;
					op -= 0.1;
				}
				else {
					elem.style.opacity = 0;
					clearInterval(timer);
				}
			}, speed);
		break;

		case 1:
			var op = 0;
			var timer = setInterval(function() {
				if (op < 1) {
					elem.style.opacity = op;
					op += 0.1;
				}
				else {
					elem.style.opacity = 1;
					clearInterval(timer);
				}
			}, speed);
		break;
	}
}

function sliderOnHover() {
	sliderMenu.style.visibility = "visible";
	arrowImage.style.visibility = "visible";
	arrowDownImage.style.visibility = "visible";
	arrowImage.style.opacity = 1;
	fade(arrowImage, 0, 50);
	fade(sliderMenu, 1, 50);
	fade(arrowDownImage, 1, 50);
	arrowImage.style.visibility = "hidden";
}

function sliderOffHover() {
	arrowImage.style.opacity = 0;
	arrowImage.style.visibility = "visible";
	fade(sliderMenu, 0, 50);
	fade(arrowImage, 1, 50);
	fade(arrowDownImage, 0, 50);
	arrowDownImage.style.visibility = "hidden";
	sliderMenu.style.visibility = "hidden";
}

function nextButtonOnclick() {
	var slideNumber = slideCounter % images.length;

	if (slideNumber === (images.length)-1) {
		var nextImage = images[0];
		var prevImage = images[slideNumber];
	}

	else {
		var nextImage = images[slideNumber + 1];
		var prevImage = images[slideNumber];
	}

	nextImage.style.left = "100%";
	prevImage.style.right= "0%";
	prevImage.style.left = "";

	var i = 100,
		x = 0;

	var move = setInterval(function() {
		if (i === 0) {
			prevImage.style.left = "100%";
			clearInterval(move);
		}

		nextImage.style.left = i + "%";
		prevImage.style.right = x + "%"; 
		i -= 5;
		x += 5;
	}, 30);

	slideCounter += 1;
}

function prevButtonOnclick() {
	var slideNumber = slideCounter % images.length;

	if (slideNumber === 0) {
		var nextImage = images[images.length - 1];
		var prevImage = images[slideNumber];
	}

	else {
		var nextImage = images[slideNumber - 1];
		var prevImage = images[slideNumber];
	}

	nextImage.style.left = "";
	nextImage.style.right = "100%";
	prevImage.style.left= "0%";
	prevImage.style.right = "";

	var i = 100,
		x = 0;

	var move = setInterval(function() {
		if (i === 0) {
			prevImage.style.left = "100%";
			clearInterval(move);
		}

		nextImage.style.right = i + "%";
		prevImage.style.left = x + "%"; 
		i -= 5;
		x += 5;
	}, 30);

	if (((slideCounter  - 1) === 0) || (slideCounter <= 0)) {
		slideCounter = images.length;
	}

	else {
		slideCounter -= 1;
	}
}

arrowImage.addEventListener('click', sliderOnHover);
arrowDownImage.addEventListener('click', sliderOffHover);
nextButtonElement.addEventListener("click", nextButtonOnclick);
prevButtonElement.addEventListener("click", prevButtonOnclick);

arrowImage.addEventListener('mouseover', function(){
	arrowImage.style.opacity=0.5;
});

arrowImage.addEventListener('mouseout', function(){
	arrowImage.style.opacity=1;
});

arrowDownImage.addEventListener('mouseover', function(){
	arrowDownImage.style.opacity=0.5;
});

arrowDownImage.addEventListener('mouseout', function(){
	arrowDownImage.style.opacity=1;
});
