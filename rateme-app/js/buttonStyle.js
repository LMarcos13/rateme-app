const theButton = document.getElementsByClassName("theButton");

window.onload = function() {
    theButton[0].addEventListener("mouseover",mouseoverStyle);
	theButton[0].addEventListener("mouseout",mouseoutStyle)
    theButton[0].addEventListener("click",clickStyle);
}

function mouseoverStyle(event) {
    theButton[0].style.background= "radial-gradient(#a155b5, #5b213e)";
    theButton[0].style.cursor = "pointer";
}

function mouseoutStyle(event) {
    theButton[0].style.background= "radial-gradient(#572863, #5e002f)";
    theButton[0].style.cursor = "default";
}

function clickStyle(event) {
    theButton[0].style.cursor = "default";
    theButton[0].style.transform = "translateY(2px)";
}