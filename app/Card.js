export const Weights = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

export const Types = ["spades", "hearts", "diamonds", "clubs"];

export class Card {
  mapTextToSign = {
    hearts: "&hearts;",
    spades: "&spades;",
    diamonds: "&diams;",
    clubs: "&clubs;",
  };

  constructor(weight, type) {
    this.weight = weight;
    this.type = type;
  }
  card;

  render() {
    this.card = document.createElement("div");
    this.card.setAttribute("class", `card ${this.type}`);

    this.card.innerHTML = `
      <div class="number-in-card">${this.weight}</div>
      <div class="icon-in-card">${this.mapTextToSign[this.type]}</div>
    `;

    return this.card;
  }
}
