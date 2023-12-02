const textField = document.getElementsByClassName('main-text-big');

document.addEventListener("keydown", (event) => {
    if (event.key === 't') {
        console.log(window.parent.ready);
        if (window.parent.ready === true) {
            window.parent.ready = false;
            window.parent.initializeExperiment();
        }
    }
});

window.onload = function() {
    textField[0].innerHTML = window.parent.blockDesign.question;
}