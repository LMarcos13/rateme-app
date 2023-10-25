let filePath = 'config-file.txt';
let data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
const config = JSON.parse(data);

const blockDuration = config.trialDuration * config.numTrial;
const windowContent = document.getElementsByClassName('window');
const container = document.getElementsByClassName('container');

const numBlock = 2*config.blockQuestions.length;
window.botAvatars = config.images;
window.blockDesign = Object();

const blocks = Array(2);

for (let i = 0; i < config.botNames.length; i++) {
    blocks[i] = randomizeBlocks(config.blockQuestions.length,config.botNames[i]);
}


window.blockTime = Array(numBlock);
window.restTime = Array(numBlock);

bodyStyle = document.getElementsByTagName('body');


window.onload = function () {
    var theButton = window.frames['contentWindow'].contentDocument.getElementsByClassName('theButton');
    theButton[0].onclick = initializeExperiment;
    windowContent[0].style.cursor = 'none';
}


function initializeExperiment() {
    for (let i = 0; i < numBlock; i++) {
        window.initTime = Date.now() / 1000;
        let restInitTime = 1000 * i * (config.restDuration + blockDuration);
        setTimeout(restingBlock, restInitTime.toString(), i);
        let initTime = 1000 * (blockDuration * i + config.restDuration * (i + 1));
        setTimeout(experimentalBlock, initTime.toString(), i);
    }
}


function restingBlock(index) {
    windowContent[0].src = '';
    let restTime = Date.now() / 1000;
    window.restTime[index] = restTime - window.initTime;
    console.log(window.restTime[index]);
}


function experimentalBlock(index) {

    if (index<6) {
        var currentBlock = blocks[0];
    } else {
        var currentBlock = blocks[1];
    }
    window.botNames = currentBlock.botNames;
    window.botNames.push(config.playerName);

    blockDesign.group = currentBlock.group[index];
    blockDesign.direction = currentBlock.direction[index];
    blockDesign.ratings = generateRatings(currentBlock.group[index]);
    blockDesign.trialDuration = config.trialDuration;
    blockDesign.question = currentBlock.questions[index];
    let blockTime = Date.now() / 1000;
    window.blockTime[index] = blockTime - window.initTime;
    console.log(window.blockTime[index]);

    //windowContent[0].src = 'instructionQuestionScreen.html';
    windowContent[0].src = 'instructionCircleScreen.html';

    setTimeout(() => {
        windowContent[0].src = 'ratingCircleScreen.html';
    }, 
    3000);
}


function randomizeBlocks(nBlock,botNames) {

    var tempBlock = Object();
    var questions = config.blockQuestions;
    var direction = Array(nBlock / 2).fill('clockWise');
    direction = direction.concat(Array(nBlock / 2).fill('counterClockWise'));
    var group = Array(nBlock / 2).fill('inclusion');
    group = group.concat(Array(nBlock / 2).fill('exclusion'));

    let currentIndex = questions.length,  randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [questions[currentIndex], questions[randomIndex]] = [questions[randomIndex], questions[currentIndex]];
        [direction[currentIndex], direction[randomIndex]] = [direction[randomIndex], direction[currentIndex]];
        [group[currentIndex], group[randomIndex]] = [group[randomIndex], group[currentIndex]];
    }
    
    tempBlock.questions =  questions;
    tempBlock.direction = direction;
    tempBlock.group = group;
    tempBlock.botNames = botNames;

    return tempBlock
}


function generateRatings(blockGroup) {

    var playersRates = {};
    for(var i = 0; i < 5; i++) {

        let rates = [];
        for(var j = 0; j < botNames.length; j++) {

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