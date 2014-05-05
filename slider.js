
var addEvent = function(event, element, fn) {
		if (element.addEventListener) {
			element.addEventListener(event, fn);
		}
		else {
			element.attachEvent('on' + event, fn);
		}
	};

function Slider(next, prev, onTop, container, textArea) {

	var nextButton = next,
		prevButton = prev,
		firstSlide = onTop,
		imageContainer = container,
		textArea = textArea,
		slideCounter = 0,
		images = new Array();
		

	
	var imageObject = function(element, text) {
		this.element = element;
		this.text = text;
	};

	var getImages = function(container) {
		var childNodes = container.childNodes,
			i = 0;

		for (i = 0; i < childNodes.length; i++) {
			if ((childNodes.item(i).tagName) === ("IMG")) {
				tempImageObject = new imageObject(childNodes.item(i), childNodes.item(i).getAttribute("alt"));
				images.push(tempImageObject);
			}
		}	
	};

	var moveAnimation = function(direction, next, prev) {

		var i = 100,
			x = 0;

		var move = setInterval(function() {
			if (i === 0) {
				prev.style.left = "100%";
				clearInterval(move);
			}

			if (direction === 1) {
				next.style.left = i + "%";
				prev.style.right = x + "%"; 
			} 
			else if (direction === 0) {
				next.style.right = i + "%";
				prev.style.left = x + "%"; 
			}

			i -= 5;
			x += 5;
		}, 30);
	};

	var nextImage = function() {
		var slideNumber = slideCounter % images.length,
			nextImage,
			prevImage;

		if (slideNumber === (images.length)-1) {
			nextImage = images[0];
			prevImage = images[slideNumber];
		}

		else {
			nextImage = images[slideNumber + 1];
			prevImage = images[slideNumber];
		}

		nextImage.element.style.left = "100%";
		prevImage.element.style.right= "0%";
		prevImage.element.style.left = "";

		moveAnimation(1, nextImage.element, prevImage.element);

		textArea.textContent = nextImage.text;

		slideCounter += 1;
	};
	
	var prevImage = function() {
		var slideNumber = slideCounter % images.length,
			nextImage,
			prevImage;

		if (slideNumber === 0) {
			nextImage = images[images.length - 1];
			prevImage = images[slideNumber];
		}

		else {
			nextImage = images[slideNumber - 1];
			prevImage = images[slideNumber];
		}

		nextImage.element.style.left = "";
		nextImage.element.style.right = "100%";
		prevImage.element.style.left= "0%";
		prevImage.element.style.right = "";

		moveAnimation(0, nextImage.element, prevImage.element);

		textArea.textContent = nextImage.text;

		if (((slideCounter  - 1) === 0) || (slideCounter <= 0)) {
			slideCounter = images.length;
		}

		else {
			slideCounter -= 1;
		}
	};

	var setEvents = function() {
		addEvent("click", nextButton, nextImage);
		addEvent("click", prevButton, prevImage);
	};

	getImages(imageContainer);
	images[firstSlide].element.className = images[firstSlide].element.className + " onTop";
	textArea.textContent = images[firstSlide].text;
	setEvents();
}