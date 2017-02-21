import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import {PubSub} from "../../utils/PubSub";


const {
  Image,
} = ReactBootstrap;

export class DeckView extends React.Component<{playerID}, {}> {
    public render() {
    return (
         <Image src="./././img/cardBack.png" responsive onClick={this.handleClick.bind(this)} />
    );
  }

    private handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
    PubSub.publish("drawCard", {playerID: this.props.playerID});
  }
}

