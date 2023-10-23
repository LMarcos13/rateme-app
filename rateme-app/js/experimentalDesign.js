let filePath = 'config-file.txt';
let data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
const config = JSON.parse(data);

const blockDuration = config.trialDuration * config.numTrial;
const windowContent = document.getElementsByClassName('window');

window.botNames = config.botNames;
botNames.push(config.playerName);
window.botAvatars = config.images;
window.blockDesign = Object();
const group = randomizeGroup(config.numBlock);
const direction = randomizeDirection(config.numBlock);


window.onload = function() {
    for (let i = 0; i < config.numBlock; i++) {
        let restInitTime = 1000 * i * (config.restDuration + blockDuration);
        setTimeout(restingBlock, restInitTime.toString());
        let initTime = 1000 * (blockDuration * i + config.restDuration * (i + 1));
        setTimeout(experimentalBlock, initTime.toString(), i);
    }
}


function restingBlock() {
    windowContent[0].src = '';
}


function experimentalBlock(index) {
    blockDesign.group = group[index];
    blockDesign.direction = direction[index];
    blockDesign.ratings = generateRatings(group[index]);
    blockDesign.trialDuration = config.trialDuration;
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
        for(var j = 0; j < (botNames.length-1); j++) {

            if(i!==j) {
                if(botNames[i]!==config.playerName) {
                    if(botNames[j]===config.playerName && blockGroup==="exclusion") {
                        rates[j] = Math.round(Math.random());
                    } else {
                        rates[j] = Math.round(2 * Math.random() + 2);
                    }
                }
            } else {
                rates[j] = -2;
            }

        }	
        playersRates[botNames[i]] = rates;

    }
    return playersRates

}