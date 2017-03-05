import {Deck} from '../../entities/Deck';
import {Player} from '../../entities/Player';
import {Card} from '../../entities/card';

import { CardSpace } from "./../../entities/CardSpace";
import { CollectSpace } from "./../../entities/CollectSpace";
import { StandardCardBoard } from "./../../entities/standardCardBoard";
import { StandardDeck } from "./../../entities/StandardDeck";
import { Game } from "./../../entities/Game";

export class WarGame extends Game {

    private cardsINturn: Card[];
    private deck_1: Deck;
    private deck_2: Deck;
    private cardSpot: CardSpace;
    private cardSpot_2: CardSpace;

    private player1CollectSpace: CollectSpace;
    private player2CollectSpace: CollectSpace;


   constructor(players: Player[]) {
       super();
       this.cardsINturn = [] ;
       this.players = players;

       this.deck_1 = new StandardDeck();
       this.deck_1.setPosition(520, 140);
       this.deck_1.assignToPlayer(this.players[0]);

       this.cardSpot = new CardSpace();
       this.cardSpot.setPosition(500, 250);
       this.deck_1.assignCardSpace(this.cardSpot);

       this.cardSpot_2 = new CardSpace();
       this.cardSpot_2.setPosition(600, 250);

       this.deck_2 = new StandardDeck();
       this.deck_2.setPosition(620, 400);
       this.deck_2.assignCardSpace(this.cardSpot_2);
       this.deck_2.assignToPlayer(this.players[1]);

       this.board = new StandardCardBoard(100, 100);

       this.player1CollectSpace = new CollectSpace();
       this.player1CollectSpace.assignToPlayer(this.players[0]);
       this.player1CollectSpace.setPosition(300, 100);
       this.player2CollectSpace = new CollectSpace();
       this.player2CollectSpace.assignToPlayer(this.players[1]);
       this.player2CollectSpace.setPosition(800, 400);

       this.addGameElement(this.cardSpot);
       this.addGameElement(this.cardSpot_2);
       this.addGameElement(this.deck_1);
       this.addGameElement(this.deck_2);
       this.addGameElement(this.player1CollectSpace);
       this.addGameElement(this.player2CollectSpace);



       const that = this;
       const collectCardsForWinner = function (winCard: Card){
                for (const cardToCollect of that.cardsINturn) {
                        const collectSpace = winCard.player.getGameElement(CollectSpace)[0];
                        cardToCollect.setPosition( collectSpace.posX + 100,  collectSpace.posY);
                        cardToCollect.img.rotation = Math.floor(Math.random() * 360) + 1;
                        cardToCollect.updateView();
                        that.cardsINturn = [];
                }
        };

       const clickDeckCallback = function(){
           // run on server
           // acion -> reaction
           const deck: Deck = this;
           const player: Player = deck.player;
           if (that.playerTurn === player ) {
                const card: Card = deck.getRandomCard();
                that.drawElement(card);
                that.cardsINturn.push(card);
                if (deck.cards.length === 0) {
                     that.removeElement(deck);
                }
                if (that.cardsINturn.length % 2 === 0){

                   const winningCards = that.compareCards();
                   if (winningCards.length === 1){
                       setTimeout(collectCardsForWinner, 1200, winningCards[0]);

                    }
                }
                that.playerTurn = that.getNextPlayer();
           }
       };


       this.deck_1.onClick(clickDeckCallback.bind(this.deck_1));
       this.deck_2.onClick(clickDeckCallback.bind(this.deck_2));



   }

   public initGame(){
       console.log("emit:");
       const gameElementsToSend = this.getGameElements();
      //  for (const gameElement of gameElementsToSend) {
           //  this.socket.emit("addGameElement", {gamElement: gameElement});
      // }; 
       const temp = gameElementsToSend.shift().cloneForSerialization();
       console.log(temp);
       this.socket.emit("addGameElement", {gameElement: temp});

   }

   // returns cards with higher value
   private compareCards(): Card[] {
        const card1: Card = this.cardsINturn[this.cardsINturn.length - 1];
        const card2: Card = this.cardsINturn[this.cardsINturn.length - 2];
        if (card1.getValue() === card2.getValue()) {
             return [card1, card2];
        }else if (card1.getValue() > card2.getValue()) {
            return [card1];
        }else if (card1.getValue() < card2.getValue()) {
            return [card2];
        }
   }
}
