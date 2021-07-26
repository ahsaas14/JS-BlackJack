//Challenge 1 **
//LOGIC
//AgeInDays = (CurrentYear - Birthyear) * 365(total no. of days in ayear)

function ageInDays() {
    let birthyear = prompt("What year you were Born?");
    let ageInDayss = (2018 - birthyear) * 365;

    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDayss + ' days Old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);

    // console.log(ageInDayss);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

//Challenge 2

function generateCat() {
    let image = document.getElementById('img');
    let div = document.getElementById('Cat-Show');

    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";

    div.appendChild(image);
}//not working

//Challenge 3 

function rpsGame(yourChoice) {

    // console.log(yourChoice);
    //console.log(yourChoice.src);

    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());//rock=0, paper =1, scissors=2
    console.log('computerChoice', botChoice);
    results = decideWinner(humanChoice, botChoice);//[0,1] human lost| bot won
    console.log(results)

    message = finalMessage(results); //{message: 'you won', 'color':'green'}
    console.log(message);

    rpsFrontend(yourChoice.id, botChoice, message);

}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number]
}

function decideWinner(yourChoice, computerChoice) {

    var rpsDatabase = {

        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'scissors': 0, 'rock': 1, 'paper': 0.5 },
        'scissors': { 'scissors': 0.5, 'rock': 0, 'paper': 1 },
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];

    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];

}

function finalMessage([yourScore, computerScore]) {

    if (yourScore === 0) {
        return { 'message': 'You Lost!', 'color': 'red' };
    }
    else if (yourScore === 0.5) {

        return { 'message': 'Tied', 'color': 'yellow' };
    }
    else {
        return { 'message': 'You Won', 'color': 'green' };
    }

}

function rpsFrontend(humanImageChoice, botImageChoice, finalMessage) {

    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' style = 'box-shadow: 0px 10px 50px rgb(0, 0, 0);'>"

    messageDiv.innerHTML = "<h1 style ='color:" + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>"

    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' style = 'box-shadow: 0px 10px 50px red;'>"

    document.getElementById('flex-boxrps-div').appendChild(humanDiv);

    document.getElementById('flex-boxrps-div').appendChild(messageDiv);

    document.getElementById('flex-boxrps-div').appendChild(botDiv);


}


//Challenge 5

let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },

    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },

    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11] },
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');

document.querySelector('#blacjack-hit-button').addEventListener('click', blackjackHit);


document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function blackjackHit() {
    alert('hit me');
}

function blackjackHit() {
    let card = randomCard();
    console.log(card);

    showCard(card, YOU);

updateScore(card,YOU);

showScore(YOU);

console.log(YOU['score']);


}


function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex]
}





function showCard(card, activePlayer) {
    if(activePlayer['score']<=21){
    let cardImage = document.createElement('img')
    cardImage.style.height = '150px';
    cardImage.style.width = '150px';
    // cardImage.style.alignItems='center';
    cardImage.src = `static/images/${card}.png`;
    



    document.querySelector(activePlayer['div']).appendChild(cardImage);

    hitSound.play();
    }

}

function blackjackDeal() {

    computerWinner();

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');


    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    // console.log(yourImages);
    // yourImages.remove();

    for (i = 0; i < yourImages.length; i++) {

        yourImages[i].remove();

    }

    for (i = 0; i < yourImages.length; i++) {

        dealerImages[i].remove();

    }

    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;

    
    document.querySelector('#your-blackjack-result').style.color='#fffffff';
    document.querySelector('#dealer-blackjack-result').style.color='#ffffff';

}

function updateScore(card,activePlayer){
    if(card=='A'){
        //If adding 11 keeps me below 21, add 11. Otherwise, add 1
        if(activePlayer['score']+ blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score']+= blackjackGame['cardsMap'][card][1];

        }else{
            activePlayer['score']+=blackjackGame['cardsMap'][card][0];
        }

    }else{
        activePlayer['score'] +=blackjackGame['cardsMap'][card];
    }

}

function showScore(activePlayer){
    

    if(activePlayer['score']>21){
    
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';

    } else{
    document.querySelector(activePlayer['scoreSpan']).textContent= activePlayer['score'];
    }


}

function dealerLogic(){
    let card=randomCard();
    showCard(card,DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
   // computerWinner();
}

// Compute Winner and Return Who Just Won

function computerWinner(){
    let winner;
    if(YOU['score']<=21){
        // CONDITION: Higher score then dealer or when dealer Busts 
        //But you are 21 or under
        if(YOU['score']>DEALER['score'] || (DEALER['score']>21)){
            console.log('You Won');
            winner =YOU;

        }else if(YOU['score']< DEALER['score']){
            console.log('You Lost');
            winner =DEALER;


        }else if(YOU['score']=== DEALER['score']){
            console.log('You Drew');
        }


    }else if(YOU['score']>21 && DEALER['score']<=21){
        console.log('You Lost');
        winner=DEALER;

    }else if(YOU['score']>21 && DEALER['score']>21){
        console.log('You Drew');


    }

    console.log('Winner is', winner);
    return winner;
}




