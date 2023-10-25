const ratingStars =  document.getElementsByClassName('rating');
const nameFields = document.getElementsByClassName('name');
const avatarFields = document.getElementsByClassName("avatarField");

window.onload = function() {
    for (let i = 0; i < nameFields.length; i++) {
        nameFields[i].innerHTML = window.parent.botNames[i];
        avatarFields[i].src = '../images/'+window.parent.botAvatars[i];
        ratingStars[i].style.visibility = 'hidden';
    }
}