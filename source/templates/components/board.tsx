
import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import {PubSub} from "../../utils/PubSub";


const {
  Grid,
  Row,
  Col,
} = ReactBootstrap;

const rowStyle = {
  height: "50%",
};

const colStyle = {
  height: "100%",
};

const boardStyle = {
    background: "#73AD21",
    border: "5px solid #551600",
   borderRadius: "25px",
   height: "75%",
};


const playerTileStyle = {
      border: "2px dashed #551600",
   borderRadius: "1px",
   height: "100%",
};

const cardStyle = {
      padding: "10%",
};





 class BoardTile extends React.Component<{playerID}, {}> {

   public state: {imgSrc, playerID };
   public containers = [];
   private c1  =  <Col xs={4} className="deck" style={cardStyle}/>;
   private c2  =  <Col xs={4} className="neutral"/>;
   private c3  =  <Col xs={4} className="cards" />;

   constructor(){
     super();
     this.state = {
       imgSrc : "",
       playerID: "",
     }
     this.containers = [this.c1, this.c2, this.c3];
   }
    public render() {
    return (
      <div id={"player_container_" + this.props.playerID}>
          <Row style={playerTileStyle}>
            {this.c1}
            {this.c2}
            {this.c3}
          </Row>
      </div>
    );
  }


   public componentWillMount() {
    this.state.playerID = this.props.playerID;
    PubSub.subscribe("drawCard", function(msg, data){
      if (msg.playerID === this.state.playerID ){
         this.setState({
        imgSrc : ".jpg",
      });
      }
    }.bind(this) );
   }
}


export class BoardView extends React.Component<{}, {}> {

   public player1Container =  <BoardTile playerID={1}/>;
   public player2Container =  <BoardTile playerID={2}/>;
   public player3Container =  <BoardTile playerID={3}/>;
   public player4Container =  <BoardTile playerID={4}/>;

   public constructor() {
     super();
   }

    public render() {
    return (
       <Grid style={boardStyle} >
          <Row style={rowStyle}>
            <Col xs={6} style={colStyle}>
              {this.player1Container}
            </Col>
            <Col xs={6} style={colStyle}>
              {this.player2Container}
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col xs={6} style={colStyle}>
              {this.player3Container}
            </Col>
           <Col xs={6} style={colStyle}>
              {this.player4Container}
            </Col>
          </Row>
        </Grid>
    );
  }
}

