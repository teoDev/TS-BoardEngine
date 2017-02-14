
import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";

const {
  Grid,
  Row,
  Col,
  Image,
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
   padding: "2%,2%,2%,2%",
};


export interface BoardViewProps {
    text: string;
}

export interface BoardViewContext {
    text: string;
}

export class BoardView extends React.Component<BoardViewProps, BoardViewContext> {
    public render() {
    return (
       <Grid style={boardStyle} >
          <Row style={rowStyle}>
            <Col xs={6} style={colStyle}>
              <BoardTile/>
            </Col>
            <Col xs={6} style={colStyle}>
              <BoardTile/>
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col xs={6} style={colStyle}>
              <BoardTile/>
            </Col>
           <Col xs={6} style={colStyle}>
              <BoardTile/>
            </Col>
          </Row>
        </Grid>
    );
  }
}


// tslint:disable-next-line:max-classes-per-file
export class BoardTile extends React.Component<{}, {}> {
    public render() {
    return (
          <Row style={playerTileStyle}>
            <Col xs={4} className="deck">
                <DeckView/>
            </Col>
            <Col xs={4} className="neutral"/>
            <Col xs={4} className="cards" />
          </Row>
    );
  }
}


// tslint:disable-next-line:max-classes-per-file
export class DeckView extends React.Component<{}, {}> {
    public render() {
    return (
         <Image src="./././img/cardBack.png" responsive />
    );
  }
}


