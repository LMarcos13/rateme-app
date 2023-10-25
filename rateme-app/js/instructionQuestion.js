const textField = document.getElementsByClassName('main-text-big');

window.onload = function() {
    textField[0].innerHTML = window.parent.blockDesign.question;
}