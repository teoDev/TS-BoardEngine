import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import {PubSub} from "../../utils/PubSub";


const {
  Image,
} = ReactBootstrap;

export class CardView extends React.Component<{img}, {}> {
    public render() {
    let imgSrc = "";
    if (this.props.img !== "") {
      imgSrc = this.props.img;
    }
    return (
         <Image src={imgSrc} responsive onClick={this.handleClick} />
    );
  }

    private handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
    PubSub.publish("drawCard", {playerID: "Bbbb"});
  }
}

