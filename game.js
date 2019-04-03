
//Create list of cards

const cardsToshuffle = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-bicycle', 'fa fa-leaf', 'fa fa-bomb'];



// To Display cards 
 
window.addEventListener("load", setupCards());

function setupCards() {
	var listCard;
	var listFirst = document.getElementsByClassName('card');
	for (var mct = 0; mct < 2; mct++) {
		listCard = shuffle(cardsToshuffle);
		for (var cct = 0; cct < 8; cct++) {
			listFirst[cct + mct * 8].innerHTML = "<i class='" + listCard[cct] + "'></i>";
		}
	}
}





function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
var firstCard,matchCard;
var flag = false;
var startTime , timer=0;

var openCards = document.getElementsByClassName("card open show");
var cardArr;
cardArr = document.getElementsByTagName("li");
for (var ct = 0; ct < cardArr.length; ct++) {
	cardArr[ct].addEventListener("click", clickCard);
}
var rep = document.getElementsByClassName("fa fa-repeat");
rep[0].addEventListener("click", newGame);
var clbtn = document.getElementById("closebtn");

function popUpP() {
	if (event.target == document.getElementById("popup")) document.getElementById("popup").style.display = "none";
}

function popUpClose() {
	document.getElementById("popup").style.display = "none";
}

function newGame() {

	window.location.reload();
}

function clickCard() {
	if (!flag) {
		flag = true;
        startTime = new Date();
		timer = window.setInterval(startTimer, 10);
	}
	checkMatch(this);
}

function moveUp() {
	var MoveOut = parseInt(document.getElementsByClassName("moves")[0].innerHTML);
	if (MoveOut >= 0) document.getElementsByClassName("moves")[0].innerHTML = MoveOut + 1;
	if (MoveOut > 10) document.getElementsByClassName("fa fa-star")[0].style.display = 'none';
	if (MoveOut > 20) document.getElementsByClassName("fa fa-star")[1].style.display = 'none';
	
}

function checkMatch(mCard) {
    var temporary;
    matchCard = mCard;
	switch (openCards.length % 2) {
		case 1:
			if (firstCard.getElementsByTagName('i')[0].className == matchCard.getElementsByTagName('i')[0].className) {
				firstCard.className = 'card open show';
				matchCard.className = 'card open show';
				checkEndGame();
			} else {
                matchCard.className = 'card open show';
                temporary = setTimeout(Close,200);
                
			}
			break;
		case 0:
			matchCard.className = "card open show";
			firstCard = matchCard;
			break;
	}
}






// Create Timer function 
function startTimer() {
	var Timer = new Date();
	document.getElementById('timer').innerHTML = Math.abs(Timer.getMinutes() - startTime.getMinutes()) + " mins:" + Math.abs(Timer.getSeconds() - startTime.getSeconds()) +" secs";
}
// To close cards

function Close()
{
        firstCard.className = 'card';
		matchCard.className = 'card';
        moveUp();
}
// End Game Function

function checkEndGame() {
	var pop;
   
	if (openCards.length == 16) {
         window.clearInterval(timer);
		pop = "You Won in " + document.getElementById("timer").innerHTML + ", in " + document.getElementsByClassName("moves")[0].innerHTML + " moves. rating: "
		for (var st = 0; st < 3; st++) {
			if (document.getElementsByClassName('fa-star')[st].style.display != "none") pop += "<i class='fa fa-star'></i>"
		}
		pop += "<p> Play again? " + "<button id='yesbtn' onClick='javascript:newGame();'>Yes</button>";
		document.getElementById("popupmsg").innerHTML = pop;
		document.getElementById("popup").style.display = "block";
		document.getElementById("modcont").style.display = "block";
		
	}
}
