"use strict";

let userClicks,
  userClickCard1,
  userClickCard2,
  elementID1,
  elementID2,
  end_count,
  tries,
  is_inplay;

const init = () => {
  document.getElementById("mem-game-container").innerHTML = "";
  document.getElementById(
    "mem-game-info"
  ).innerHTML = `Tries: <span id="game-tries">0</span>`;
  userClicks = 0;
  userClickCard1 = 0;
  userClickCard2 = 0;
  elementID1 = 0;
  elementID2 = 0;
  end_count = 0;
  tries = 0;
  is_inplay = true;
};

const setGame = () => {
  init();
  const initArr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  const gameArr = [];

  for (let i = 0; i < 17; i++) {
    const rndNum = Math.floor(Math.random() * initArr.length);
    gameArr[i] = initArr.splice(rndNum, 1);
  }

  let cardGrid = "";
  let cols = 0;

  for (let i = 0; i < 16; i++) {
    if (cols === 0) cardGrid += "<ul>";
    cols++;
    cardGrid += `<li><div class="mem-slot card--${
      i + 1
    }" onclick="cardSelection(${i + 1},${gameArr[i]});return false;"><img id="${
      i + 1
    }" class="shadow" src="./images/cardback.png" alt="peg" /></div></li>`;
    if (cols === 4) {
      cardGrid += "</ul>";
      cols = 0;
    }
  }

  document.getElementById("mem-game-container").innerHTML = cardGrid;
};

const cardSelection = (elementID, cardID) => {
  // check if card is already matched
  const matched = document
    .querySelector(`.card--${elementID}`)
    .classList.contains("matched");

  if (is_inplay && !matched) {
    userClicks++;
    if (userClicks === 1) {
      userClickCard1 = cardID;
      elementID1 = elementID;
      cardAnimation(elementID, cardID);
    } else if (userClicks === 2) {
      is_inplay = false;
      userClickCard2 = cardID;
      elementID2 = elementID;
      cardAnimation(elementID, cardID);
    }
  }
};

const compare = () => {
  userClicks = 0;
  tries++;

  if (userClickCard1 === userClickCard2) {
    // disable cards
    document.querySelector(`.card--${elementID1}`).classList.add("matched");
    document.querySelector(`.card--${elementID2}`).classList.add("matched");

    if (end_count === 7) {
      completed();
      return;
    } else {
      end_count++;
      is_inplay = true;
    }
  } else {
    setTimeout("resetNonMatchingCards()", 1500);
  }

  document.getElementById("game-tries").innerHTML = tries;
};

const cardAnimation = (id, cardID) => {
  document.getElementById(id).src = "./images/cardani.gif";

  setTimeout(`showCardFrontSide(${id},${cardID})`, 200);
  if (userClicks === 2) {
    compare();
  }
};

const showCardFrontSide = (id, cardID) => {
  document.getElementById(id).src = `./images/card${cardID}.png`;
};

const resetNonMatchingCards = () => {
  document.getElementById(elementID1).src = "./images/cardback.png";
  document.getElementById(elementID2).src = "./images/cardback.png";
  is_inplay = true;
};

const completed = () => {
  let msg = `Completed in ${tries} tries.<br /><br />`;

  if (tries <= 10) {
    msg +=
      "Start playing the lotto because that perfomance was next to impossible!";
  } else if (tries >= 11 && tries <= 17) {
    msg += "An incredible performance. You are a true master of memory!";
  } else if (tries >= 18 && tries < 24) {
    msg += "Quite the decent performance!";
  } else {
    msg += `Meh.. I'm sure you can do better.`;
  }

  document.getElementById(
    "mem-game-info"
  ).innerHTML = `${msg} <span class="restart" onclick="setGame();return false;">again?</span>`;
};

setGame();
