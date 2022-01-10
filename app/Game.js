import { Player } from "./Player.js";
import { Deck } from "./Deck.js";
import { Table } from "./Table.js";
import { Message } from "./Message.js";

class Game {
  constructor({
    player,
    playerPoints,
    dealerPoints,
    table,
    hitButton,
    standButton,
    messageBox,
    betButton,
    addMoney,
    removeMoney,
    divMessage,
    btnMessage,
  }) {
    this.btnMessage = btnMessage;
    this.divMessage = divMessage;
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.playerPoints = playerPoints;
    this.dealerPoints = dealerPoints;
    this.messageBox = messageBox;
    this.player = player;
    this.dealer = new Player("Krupier");
    this.table = table;
    this.deck = new Deck();
    this.deck.shuffle();
    this.betButton = betButton;
    this.addMoney = addMoney;
    this.removeMoney = removeMoney;
    this.hand = 0;
  }

  run() {
    this.hitButton.addEventListener("click", (event) => this.hitCard());
    this.standButton.addEventListener("click", (event) => this.dealerPlays());

    this.dealCards();
  }

  hitCard() {
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayersCard(card);
    this.playerPoints.innerHTML = this.player.calculatePoints();
    console.log(card);
  }

  bet() {
    const betMoney = document.getElementById("betMoney");
    wallet.betMoney(Math.floor(betMoney.textContent));
  }

  addMoneyBtn() {
    const betMoney = document.getElementById("betMoney");
    const money = Math.floor(betMoney.textContent) + 10;

    betMoney.textContent = `${money}`;
  }

  removeMoneyBtn() {
    const betMoney = document.getElementById("betMoney");
    const money = Math.floor(betMoney.textContent) - 10;

    betMoney.textContent = `${money}`;
    console.log(money);
  }

  dealCards() {
    for (let n = 0; n < 2; n++) {
      let card1 = this.deck.pickOne();
      this.player.hand.addCard(card1);
      this.table.showPlayersCard(card1);

      let card2 = this.deck.pickOne();
      this.dealer.hand.addCard(card2);
      this.table.showDealersCard(card2);
    }

    this.playerPoints.innerHTML = this.player.calculatePoints();
    this.dealerPoints.innerHTML = this.dealer.calculatePoints();
  }

  dealerPlays() {
    while (
      this.dealer.points <= this.player.points &&
      this.dealer.points <= 21 &&
      this.player.points <= 21
    ) {
      const card = this.deck.pickOne();
      this.dealer.hand.addCard(card);
      this.table.showDealersCard(card);

      this.dealerPoints.innerHTML = this.dealer.calculatePoints();
    }

    this.endTheGame();
  }

  endTheGame() {
    this.hitButton.removeEventListener("click", (event) => this.hitCard());
    this.standButton.removeEventListener("click", (event) =>
      this.dealerPlays()
    );

    document.getElementById("dealersCards").innerHTML = "";
    document.getElementById("playersCards").innerHTML = "";

    this.hitButton.style.display = "none";
    this.standButton.style.display = "none";

    if (this.player.points < 21 && this.player.points == this.dealer.points) {
      this.messageBox.setText("Remis").show();

      return;
    }

    if (this.player.points > 21) {
      this.messageBox.setText("Dealer Win").show();

      return;
    }

    if (this.dealer.points > 21) {
      this.messageBox.setText("Player Win").show();

      return;
    }

    if (this.player.points < this.dealer.points) {
      this.messageBox.setText("Dealer Win").show();

      return;
    }
  }
}

const table = new Table(
  document.getElementById("dealersCards"),
  document.getElementById("playersCards")
);
const messageBox = new Message(document.getElementById("message"));

const player = new Player("Przemek");
const game = new Game({
  hitButton: document.getElementById("hit"),
  standButton: document.getElementById("stand"),
  dealerPoints: document.getElementById("dealerPoints"),
  playerPoints: document.getElementById("playerPoints"),
  addMoney: document.getElementById("addMoney-btn"),
  removeMoney: document.getElementById("removeMoney-btn"),
  divMessage: document.getElementById("message"),
  btnMessage: document.getElementById("again"),
  player,
  table,
  messageBox,
});

game.run();
