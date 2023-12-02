const theButton = document.getElementsByClassName("button");


window.onload = function() {
    for (let i = 0; i < theButton.length; i++) {
        theButton[i].addEventListener("mouseover",mouseoverStyle);
        theButton[i].addEventListener("mouseout",mouseoutStyle)
        theButton[i].addEventListener("click",clickStyle);
    }
    
}

function mouseoverStyle(event) {
    event.currentTarget.style.background= "radial-gradient(#a155b5, #5b213e)";
    event.currentTarget.style.cursor = "pointer";
}

function mouseoutStyle(event) {
    event.currentTarget.style.background= "radial-gradient(#572863, #5e002f)";
    event.currentTarget.style.cursor = "default";
}

function clickStyle(event) {
    event.currentTarget.style.cursor = "default";
    event.currentTarget.style.transform = "translateY(2px)";

    /*if (event.currentTarget.className.includes("button-small")) {
        //window.open('../html/dataEntryWindow.html',"top=500,left=200,frame=false,nodeIntegration=no,nodeIntegrationInSubFrames=true");
        createMainWindow();
    }*/
}
