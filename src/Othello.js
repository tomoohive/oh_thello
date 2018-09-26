import React, { Component } from "react";
import {
  BrowserRouter,
  Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import { BLACK, WHITE, EMPTY, INITIAL_BOARD, COL, COLXCOL } from "./Modules.js";
import "./Othello.css";

function Square(props) {
  let markerAvailable = `square ${props.isAvailable ? 'available-square' : 'non-available-square'}`;

  return (
    <div className={markerAvailable} onClick={props.onClick}>
      {props.value}
    </div>
  );
}

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        isAvailable={this.props.availablePutOn.indexOf(i) > -1}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
        <div className="board-row">
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
        </div>
        <div className="board-row">
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
        </div>
        <div className="board-row">
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
        </div>
        <div className="board-row">
          {this.renderSquare(40)}
          {this.renderSquare(41)}
          {this.renderSquare(42)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
          {this.renderSquare(45)}
          {this.renderSquare(46)}
          {this.renderSquare(47)}
        </div>
        <div className="board-row">
          {this.renderSquare(48)}
          {this.renderSquare(49)}
          {this.renderSquare(50)}
          {this.renderSquare(51)}
          {this.renderSquare(52)}
          {this.renderSquare(53)}
          {this.renderSquare(54)}
          {this.renderSquare(55)}
        </div>
        <div className="board-row">
          {this.renderSquare(56)}
          {this.renderSquare(57)}
          {this.renderSquare(58)}
          {this.renderSquare(59)}
          {this.renderSquare(60)}
          {this.renderSquare(61)}
          {this.renderSquare(62)}
          {this.renderSquare(63)}
        </div>
      </div>
    );
  }
}

class Othello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: INITIAL_BOARD,
          xNumbers: 2,
          oNumbers: 2,
          xIsBack: true
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  calculationWinner(xNumbers, oNumbers) {
    if (xNumbers + oNumbers < 64) {
      return null;
    } else if (xNumbers + oNumbers == 64) {
      if (xNumbers > oNumbers) {
        return "BLACK";
      } else {
        return "WHITE";
      }
    } else {
      return "No Winner";
    }
  }

  flipSquares(squares, position, xIsNext) {
    let modifiedBoard = null;
    // Calculate row and col of the starting position
    let [startX, startY] = [position % 8, (position - (position % 8)) / 8];

    if (squares[position] !== null) {
      return null;
    }

    // Iterate all directions, these numbers are the offsets in the array to reach next sqaure
    [1, 7, 8, 9, -1, -7, -8, -9].forEach(offset => {
      let flippedSquares = modifiedBoard
        ? modifiedBoard.slice()
        : squares.slice();
      let atLeastOneMarkIsFlipped = false;
      let [lastXpos, lastYPos] = [startX, startY];

      for (let y = position + offset; y < 64; y = y + offset) {
        // Calculate the row and col of the current square
        let [xPos, yPos] = [y % 8, (y - (y % 8)) / 8];

        // Fix when board is breaking into a new row or col
        if (Math.abs(lastXpos - xPos) > 1 || Math.abs(lastYPos - yPos) > 1) {
          break;
        }

        // Next square was occupied with the opposite color
        if (flippedSquares[y] === (!xIsNext ? BLACK : WHITE)) {
          flippedSquares[y] = xIsNext ? BLACK : WHITE;
          atLeastOneMarkIsFlipped = true;
          [lastXpos, lastYPos] = [xPos, yPos];
          continue;
        }
        // Next aquare was occupied with the same color
        else if (
          flippedSquares[y] === (xIsNext ? BLACK : WHITE) &&
          atLeastOneMarkIsFlipped
        ) {
          flippedSquares[position] = xIsNext ? BLACK : WHITE;
          modifiedBoard = flippedSquares.slice();
        }
        break;
      }
    });

    return modifiedBoard;
  }

  searchAvailable(color, squares) {
    return squares
      .map((value, index) => {
        return this.flipSquares(squares, index, color) ? index : null;
      })
      .filter(item => {
        return item !== null;
      });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    if (
      this.calculationWinner(current.xNumbers, current.oNumbers) ||
      squares[i]
    ) {
      return;
    }

    const changedSquares = this.flipSquares(squares, i, this.state.xIsNext);
    console.log(changedSquares);

    if (changedSquares === null) {
      return;
    }

    const xNumbers = changedSquares.reduce((sum, present) => {
      return present === BLACK ? sum + 1 : sum;
    }, 0);
    const oNumbers = changedSquares.reduce((sum, present) => {
      return present === WHITE ? sum + 1 : sum;
    }, 0);

    let canTurnColor =
      this.searchAvailable(!this.state.xIsNext, changedSquares).length > 0
        ? !this.state.xIsNext
        : this.state.xIsNext;

    this.setState({
      history: history.concat([
        {
          squares: changedSquares,
          xNumbers: xNumbers,
          oNumbers: oNumbers,
          xIsBack: canTurnColor
        }
      ]),
      stepNumber: history.length,
      xIsNext: canTurnColor,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: this.state.history[step].xIsBack
    });
  }

  restartGame(){
    this.jumpTo(0);
    this.setState({
      history: this.state.history.slice(0,1)
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    let winner = this.calculationWinner(current.xNumbers, current.oNumbers);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let availablePutOn = this.searchAvailable(current.xIsBack, current.squares);
    let availablePutOnComp = this.searchAvailable(!current.xIsBack, current.squares);

    if((availablePutOn.length === 0) && (availablePutOnComp.length === 0)){
      if(current.xNumbers === 0){
        winner = 'WHITE';
      } else if(current.oNumbers === 0){
        winner = 'BLACK';
      }
    }

    let status;
    let scores;
    if (winner) {
      status = "Winner: " + winner;
      scores =
        "BLACK: " + current.xNumbers + ", " + "WHITE: " + current.oNumbers;
    } else {
      status = "Next player: " + (this.state.xIsNext ? BLACK : WHITE);
      scores =
        "BLACK: " + current.xNumbers + ", " + "WHITE: " + current.oNumbers;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} availablePutOn={availablePutOn} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{scores}</div>
          <div onClick={() => this.restartGame()}>Restart</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

export default withRouter(Othello);
