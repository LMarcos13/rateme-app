const emojis = document.getElementsByClassName('emoji-container');
let selectedAnswer = Number;

let emojisShadow = Array(5);
emojisShadow[0] = "0px 0px 9px 9px #8B0000";
emojisShadow[1] = "0px 0px 9px 9px #9c0101";
emojisShadow[2] = "0px 0px 9px 9px #773400";
emojisShadow[3] = "0px 0px 9px 9px #9d6b00";
emojisShadow[4] = "0px 0px 9px 9px #009900";

window.onload = function() {

    document.addEventListener("keydown", changeAnswer);
}

function changeAnswer(e) {
    if (e.key === "n") {
        for (let i = 0; i < emojis.length; i++) {
            emojis[i].style.boxShadow = "";
            emojis[i].style.transform = "scale(1)";
        }

        selectedAnswer = selectedAnswer + 1;

        if (!(selectedAnswer < 5 && selectedAnswer >= 0)) {
            selectedAnswer = 0;
        }

        emojis[selectedAnswer].style.boxShadow = emojisShadow[selectedAnswer];
        emojis[selectedAnswer].style.transform = "scale(1.2)";
        window.parent.currentMood = selectedAnswer;
    }
}