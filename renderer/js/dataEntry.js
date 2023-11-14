const theButton = document.getElementsByClassName("button");
const textEntry = document.getElementsByTagName('input');


window.onload = function() {
    theButton[0].addEventListener("mouseover",mouseoverStyle);
    theButton[0].addEventListener("mouseout",mouseoutStyle)
    theButton[0].addEventListener("click",clickStyle);
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
    
    let outData  = Object();
    for (let i = 0; i < textEntry.length; i++) {
        outData[textEntry[i].id] = textEntry[i].value;
    }
    fs.writeFileSync('sessionData.json', JSON.stringify(outData, null, 2), 'utf8');
    window.close();
    
}