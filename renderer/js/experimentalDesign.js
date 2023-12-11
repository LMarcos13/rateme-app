let filePath = 'config-file.txt';
let data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
const config = JSON.parse(data);

const blockDuration = config.trialDuration * config.numTrial;
const extendedBlockDuration = blockDuration + config.questionDuration + config.moodQuestionDuration;
const windowContent = document.getElementsByClassName('window');
const container = document.getElementsByClassName('container');

const numBlock = 2 * config.blockQuestions.length;
let moreExc = 1;

//window.botAvatars = config.avatars;
window.blockDesign = Object();

let outFolder = path.join('..', 'output', 'sub-' + config.ID, 'ses-1');
if (!fs.existsSync(outFolder)) {
    fs.mkdir(outFolder, { recursive: true }, (err) => {
        if (err) throw err;
    });
}

const blocks = Array(2);

for (let i = 0; i < config.botNames.length; i++) {
    blocks[i] = randomizeBlocks(config.blockQuestions.length,config.botNames[i]);
}

window.blockOnset = Array();
window.restOnset = Array();
window.moodOnset = Array();
window.moodValue = Array();
window.currentMood = Number;

bodyStyle = document.getElementsByTagName('body');


window.onload = function () {
    var theButton = window.frames['contentWindow'].contentDocument.getElementsByClassName('button-big');
    theButton[0].onclick = () => {
        //windowContent[0].style.visibility = "hidden";
        window.ready = true;

        window.blockDesign.question = "Empezando nueva partida . . .";
        windowContent[0].src = 'instructionQuestionScreen.html';

    }

    windowContent[0].style.cursor = 'none';
    var sessionDataButton = window.frames['contentWindow'].contentDocument.getElementsByClassName('button-small');
    sessionDataButton[0].onclick = createDataWindow;
}


function initializeExperiment() {

    //let sessionData = readSessionData();

    //if (checkSessionData(sessionData)) {

        for (let i = 0; i < numBlock; i++) {
            window.initTime = Date.now();
            if (i === 0) {
                //windowContent[0].style.visibility = "visible";
                var blockInitTime = 100;
            } else {
                var restInitTime = blockInitTime  + 1000 * extendedBlockDuration;
                setTimeout(restingBlock, restInitTime.toString(), i);
                var blockInitTime = 1000 * config.restDuration + restInitTime;
            }
            
            
            if (i === 0 | i === (numBlock / 2)) {
                let initInstructionCircle = blockInitTime;
                blockInitTime = blockInitTime + 1000 * config.presentationDuration;
                setTimeout(instructionCircle, initInstructionCircle.toString(), i);
            }
            
            setTimeout(experimentalBlock, blockInitTime.toString(), i);
        }

   /* } else {

        alert('Please, fill all Session Data before starting experiment!')

    }*/
    
}


function instructionCircle(index) {
    if (index < (numBlock / 2)) {
        window.botAvatars = config.avatars[0];
        window.botNames = blocks[0].botNames;
    } else {
        window.botAvatars = config.avatars[1];
        window.botNames = blocks[1].botNames;
    }
    window.botNames.push(config.playerName);
    windowContent[0].src = 'instructionCircleScreen.html';
}


function restingBlock(index) {

    if (!(index === 0 || index === ((numBlock / 2) - 1))) {
        window.moodValue.push(window.currentMood);
    }

    windowContent[0].src = 'restingScreen.html';
    let restTime = Date.now() / 1000;
    window.restOnset.push(1000 * restTime - window.initTime);
    console.log(window.restOnset[index] / 1000);

}


function experimentalBlock(index) {

    if (index < (numBlock / 2)) {
        var currentBlock = blocks[0];
    } else {
        var currentBlock = blocks[1];
        index = index - (numBlock / 2);
    }

    blockDesign.group = currentBlock.group[index];
    blockDesign.direction = currentBlock.direction[index];
    blockDesign.ratings = generateRatings(currentBlock.group[index]);
    blockDesign.trialDuration = config.trialDuration;
    blockDesign.question = currentBlock.questions[index];
    let blockTime = Date.now() / 1000;
    window.blockOnset.push(1000 * blockTime - window.initTime);
    console.log(window.blockOnset[index] / 1000); //Al enseñarlo está mal por el index, pero el dato se almacena bien

    windowContent[0].src = 'instructionQuestionScreen.html';

    setTimeout(() => {
        windowContent[0].src = 'ratingCircleScreen.html';
    }, 
    config.questionDuration * 1000);

    setTimeout(() => {
        let onsetTime = Date.now();
        window.moodOnset.push(onsetTime - window.initTime);
        windowContent[0].src = 'moodQuestionScreen.html';

        if (index === (numBlock / 2 - 1) || index === (numBlock - 1)) {
            setTimeout(() => {
                writeDesign();
            },
            config.moodQuestionDuration);
        }

    }, (config.questionDuration + blockDuration) * 1000);

}


function randomizeBlocks(nBlock,botNames) {

    var tempBlock = Object();
    var questions = config.blockQuestions;
    if (nBlock > 1) {

        if (nBlock % 2 === 0) {
            var direction = Array(nBlock / 2).fill('clockWise');
            direction = direction.concat(Array(nBlock / 2).fill('counterClockWise'));
            var group = Array(nBlock / 2).fill('inclusion');
            group = group.concat(Array(nBlock / 2).fill('exclusion'));
        } else {
            var direction = Array((nBlock + moreExc) / 2).fill('clockWise');
            direction = direction.concat(Array((nBlock - moreExc) / 2).fill('counterClockWise'));
            var group = Array((nBlock - moreExc) / 2).fill('inclusion');
            group = group.concat(Array((nBlock + moreExc) / 2).fill('exclusion'));
            moreExc = -1;
        }

        
    } else {
        var direction = ['clockWise'];
        var group = ['inclusion'];
    }
    

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


function writeDesign() {
    let outData = Object();

    window.moodValue.push(window.currentMood);
    outData.moodValue = window.moodValue;
    outData.blockOnset = window.blockOnset;
    outData.restOnset = window.restOnset;
    outData.moodOnset = window.moodOnset;
    outData.condition = blocks[0].group.concat(blocks[1].group);
    outData.time = window.initTime;

    let outName = 'sub-' + config.ID + '_ses-1_' + config.sessionName + '.json'
    fs.writeFileSync(path.join(outFolder,outName), JSON.stringify(outData, null, 2), 'utf8');

    if (window.moodValue.length === numBlock) {
        window.blockDesign.question = "Fin de la tarea, gracias por tu colaboración";
        windowContent[0].src = 'instructionQuestionScreen.html';
    } 

}


/*function readSessionData() {
    let sessionText = fs.readFileSync('session-data.txt', { encoding: 'utf8', flag: 'r' });
    let sessionData = JSON.parse(sessionText);
    return sessionData
}*/


function checkSessionData(sessionData) {
    let complete = true;
    if (!('gameOrder' in sessionData)) {
        complete = false;
    }
    if (!('participantID' in sessionData)) {
        complete = false;
    }
    if (!('gameName' in sessionData)) {
        complete = false;
    }
    return complete
}


function createDataWindow() {
    const sessionWindow = new BrowserWindow({
        title: 'sessionData',
        width: 1200,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: '../../preload.js'
        }
    });

    sessionWindow.webContents.openDevTools();
    sessionWindow.loadFile('../html/dataEntryWindow.html');
}
