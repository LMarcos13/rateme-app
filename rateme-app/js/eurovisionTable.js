const ratingStars =  document.getElementsByClassName('rateContainer');
const starClassActive = "rating__star fas fa-star";
const starClassUnactive = "rating__star far fa-star";

const subtext = document.getElementsByClassName("subtext");	

const nameFields = document.getElementsByClassName('name');
const avatarFields = document.getElementsByClassName("avatarField");

window.onload = function() {
    for (let i = 0; i < nameFields.length; i++) {
        nameFields[i].innerHTML = window.parent.botNames[i];
        avatarFields[i].src = '../images/'+window.parent.botAvatars[i];
        if (window.parent.blockDesign.direction==='clockWise') {
            var index = 4 - i;
        } else {
            var index = i;
        }
        if (i < 5) {
            let initTime = 1000 * index * window.parent.blockDesign.trialDuration;
        setTimeout(showResults, initTime.toString(), avatarFields[i], nameFields[i]);
        }
    }
}


function showResults(botAvatar,botName) {
    resetButtons();
    botAvatar.style.transform = "scale(1.05)";
    botAvatar.style.boxShadow = "0px 0px 7px 7px #a9a9a9";
    
    let ratingPlayer = window.parent.blockDesign.ratings[botName.innerHTML];

    for(var j = 0; j < ratingPlayer.length; j++) {
        resetStars(ratingStars[j]);
        if(ratingPlayer[j]>-1) {
            changeStars(ratingStars[j],ratingPlayer[j]);
        } else if(ratingPlayer[j]<-1) {
            ratingStars[j].style.visibility = "hidden";
        }
    }
    
    subtext[0].innerHTML = "Estás viendo las puntuaciones de <b>" + botName.innerHTML + "</b>";
}

function resetButtons() {
    for (var i = 0; i < avatarFields.length; i++) {
        avatarFields[i].style.transform = "scale(1)";
        avatarFields[i].style.boxShadow= "0 5px #2c2c2c";
    }
}

function changeStars(starBox,rate) {
    
    let stars = starBox.querySelectorAll(".rating__star");
    let star = stars[rate];
    let starsLength = stars.length;
    
    if (star.className.indexOf(starClassUnactive) !== -1) {
        for (rate; rate>= 0; --rate) stars[rate].className = starClassActive;
    } else {
        for (rate; rate < starsLength; ++rate) stars[rate].className = starClassUnactive;
    }
        
}

function resetStars(starBox) {
    if(starBox.style.visibility==="hidden"){
        starBox.style.visibility = "visible";
    }
    let stars = starBox.querySelectorAll(".rating__star");
    let starsLength = stars.length;
    for (i = 0; i < starsLength; ++i) stars[i].className = starClassUnactive;
}
