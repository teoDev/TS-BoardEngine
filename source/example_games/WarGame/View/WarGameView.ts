import {Deck} from '../../../entities/Deck';
import {CardView} from "../../../view/CardView";
import { StandardDeck } from "./../../../entities/StandardDeck";
import {StandardCard} from "../../../entities/standardCard";
import {DeckView} from "../../../view/DeckView";
import { EmptySpaceView } from "./../../../view/EmptySpaceView";
import { StandardCardBoardView } from "./../../../view/StandardCardBoardView";
import { StandardCardView } from "./../../../view/StandardCardView";
import { StandardDeckView } from "./../../../view/StandardDeckView";
import {GameView} from "../../../view/GameView";
import {Card} from "../../../entities/card";
import { GameElementController } from "./../../../controller/GameElementController";
import {WarGame} from "../WarGame";
import { DeckController } from "./../../../controller/DeckController";

export class WarGameView extends GameView {
    public model: WarGame;

    public deckController: DeckController;
    public deckView: DeckView;

    public deck2Controller: DeckController;
    public deck2View: DeckView;

    public cardSpaceView_1: EmptySpaceView;
    public cardSpaceView_2: EmptySpaceView;

    public player1CollectSpaceController: GameElementController;
    public player2CollectSpaceController: GameElementController;

    private cardsViews: CardView[];


   constructor(model: WarGame, socket) {
       super(model );
       this.socket = socket;
       this.deckController =  new DeckController(this.model.deck_1);
       this.deck2Controller = new DeckController(this.model.deck_2);

       this.boardView = new StandardCardBoardView(this.model.board, 800, 600);
       this.deckView = new StandardDeckView(this.model.deck_1);
       this.deck2View = new StandardDeckView(this.model.deck_2);

       this.cardSpaceView_1 = new EmptySpaceView(this.model.cardSpot);
       this.cardSpaceView_2 = new EmptySpaceView(this.model.cardSpot_2);

       this.gameViewElements.push(this.deckView);
       this.gameViewElements.push(this.deck2View);
       this.gameViewElements.push(this.cardSpaceView_1);
       this.gameViewElements.push(this.cardSpaceView_2);

       this.cardsViews = [];
       const clickDeckCallback = ( deck, event) => {
           const deckModel: Deck  = deck as StandardDeck;
           socket.emit("getRandomCard$Request", this.model.player, deckModel.hash);

       };
       this.socket.on("getRandomCard$Response", (data: StandardCard) => {
                 const card: Card = data as StandardCard;
                 const cardView: StandardCardView = new StandardCardView(card);
                 this.cardsViews.push(cardView);
                 this.drawElement(cardView);
           });

       this.deckView.onClick(clickDeckCallback);
       this.deck2View.onClick(clickDeckCallback);

       this.socket.on("updateCardPosition$Request", (data) => {
           console.log("updatePosition");
           const card: Card = data as StandardCard;
           for (const cardView  of  this.cardsViews) {
                    if (cardView.model.hash === card.hash) {
                        const stCardView: CardView = cardView;
                        stCardView.model = card;
                        cardView.updatePosition();
                    }
                }
           });

   }

}
