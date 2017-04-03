import {Deck} from '../../entities/Deck';
import {Player} from '../../entities/Player';
import {Card} from '../../entities/card';

import { CardSpace } from "./../../entities/CardSpace";
import { CollectSpace } from "./../../entities/CollectSpace";
import { StandardCardBoard } from "./../../entities/standardCardBoard";
import { StandardDeck } from "./../../entities/StandardDeck";
import { Game } from "./../../entities/Game";

export class WarGame extends Game {

    public cardsINturn: Card[];
    public player_1: Player;
    public player_2: Player;
    public deck_1: Deck;
    public deck_2: Deck;
    public cardSpot: CardSpace;
    public cardSpot_2: CardSpace;

    public player1CollectSpace: CollectSpace;
    public player2CollectSpace: CollectSpace;


   constructor(players: Player[]) {
       super();
       this.cardsINturn = [] ;
       this.players = players;

       this.player_1 = this.players[0];
       this.player_2 = this.players[1];
       this.deck_1 = new StandardDeck();
       this.deck_1.setPosition(520, 140);

       this.cardSpot = new CardSpace();
       this.cardSpot.setPosition(500, 250);

       this.cardSpot_2 = new CardSpace();
       this.cardSpot_2.setPosition(600, 250);

       this.deck_2 = new StandardDeck();
       this.deck_2.setPosition(620, 400);

       this.board = new StandardCardBoard(100, 100);

       this.player1CollectSpace = new CollectSpace();
       this.player1CollectSpace.setPosition(300, 100);
       this.player2CollectSpace = new CollectSpace();
       this.player2CollectSpace.setPosition(800, 400);

       this.addGameElement(this.cardSpot);
       this.addGameElement(this.cardSpot_2);
       this.addGameElement(this.deck_1);
       this.addGameElement(this.deck_2);
       this.addGameElement(this.player1CollectSpace);
       this.addGameElement(this.player2CollectSpace);

   }

}
