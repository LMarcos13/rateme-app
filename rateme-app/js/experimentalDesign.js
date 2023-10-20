const numBlock = 6;
const trialDuration = 5;
const numTrial = 5;
const playerName = 'Player';
const scores = {'Emma':2,'Marie':3,'Joost':2,'Elisabetta':3,'Greta':2};
const windowContent = document.getElementsByClassName('window');

window.botNames = ['Emma','Marie','Joost','Elisabetta','Greta'];
botNames.push(playerName);
window.botAvatars = ['belgium.png','france.png','netherlands.png','italy.png','germany.png','spain.png'];
window.blockDesign = Object();
const group = randomizeGroup(numBlock);
const direction = randomizeDirection(numBlock);


window.onload = function() {
    for (let i = 0; i < numBlock; i++) {
        let initTime = 1000 * numTrial * trialDuration * i;
        setTimeout(experimentalBlock, initTime.toString(), i);
    }
}


function experimentalBlock(index) {
    blockDesign.group = group[index];
    blockDesign.direction = direction[index];
    blockDesign.ratings = generateRatings(group[index]);
    blockDesign.trialDuration = trialDuration;
    windowContent[0].src = 'ratingTable.html';
}


function randomizeGroup(nBlock) {
    var group = Array(nBlock / 2).fill('inclusion');
    group.concat(Array(nBlock / 2).fill('exclusion'));

    let currentIndex = group.length,  randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [group[currentIndex], group[randomIndex]] = [group[randomIndex], group[currentIndex]];
    }
    
    return group
}


function randomizeDirection(nBlock){
    var direction = Array(nBlock / 2).fill('clockWise');
    direction.concat(Array(nBlock / 2).fill('counterClockWise'));

    let currentIndex = direction.length,  randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [direction[currentIndex], direction[randomIndex]] = [direction[randomIndex], direction[currentIndex]];
    }
    
    return direction
}


function generateRatings(blockGroup) {

    var playersRates = {};
    for(var i = 0; i < 6; i++) {

        let rates = [];
        for(var j = 0; j < botNames.length; j++) {

            if(i!==j) {
                if(botNames[i]!==playerName) {
                    if(botNames[j]===playerName && blockGroup==="exclusion") {
                        rates[j] = Math.round(Math.random());
                    } else {
                        rates[j] = Math.round(2 * Math.random() + 2);
                    }
                } else {
                    rates[j] = scores[botNames[j]];
                }
            } else {
                rates[j] = -2;
            }

        }	
        playersRates[botNames[i]] = rates;

    }
    return playersRates

}