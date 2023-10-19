const numBlock = 6;
const trialDuration = 5;
const windowContent = document.getElementsByClassName('window');

const group = randomizeGroup(numBlock);

for (let i = 0; i < numBlock; i++) {
    let initTime = trialDuration * i+1;
    var blockDesign = {};
    blockDesign.group = group[i]
    setTimeout(experimentalBlock, initTime);
}



function experimentalBlock(blockDesign) {
    
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

