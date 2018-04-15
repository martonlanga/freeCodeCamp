import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  let classes = 'square';
  if (props.index === 1 || props.index === 4 || props.index === 7) {
    classes += ' border-left border-right';
  }
  return (
    <button className={classes} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
     <Square
       value={this.props.squares[i]}
       onClick={() => this.props.onClick(i)}
       index={i}
     />
    );
  }

  render() {
    return (
      <div className='d-flex flex-column'>
        <div className='d-flex border-bottom'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='d-flex border-bottom'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='d-flex'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null) /*['X', null, 'X', 'O', 'X', 'O', null, 'O', null]*/,
      stepNumber: 0,
      /*xIsNext: true,*/
    };
  }

  async handleClick(i) {
    const squares = this.state.squares;
    let stepNumber = this.state.stepNumber + 1;

    let Os = squares.filter(s => s === 'O');
    let Xs = squares.filter(s => s === 'X');
    console.log(Os.length);
    console.log(Xs.length);
    //If there is already a winner, or the clicked square is already used, return
    if (calculateWinner(squares) || squares[i] || Os.length > Xs.length) {
      return;
    }

    squares[i] = /*this.state.xIsNext ? 'X' : 'O'*/ 'O';
    this.setState({
      squares: squares,
      stepNumber: stepNumber,
      /*xIsNext: !this.state.xIsNext,*/
    });

    await sleep(500);
    debugger;
    let aiIndex = aiTurn(stepNumber);
    squares[aiIndex] = 'X';

    this.setState({
      squares: squares,
      stepNumber: stepNumber,
      /*xIsNext: !this.state.xIsNext,*/
    });

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function aiTurn(stepNumber) {

      if (calculateWinner(squares) || stepNumber === 5) {
        return;
      }

      const hu = 'O';
      const ai = 'X';

      function emptySquares() {
        let arr = [];
        for (let s = 0; s < squares.length; s++) {
          if (squares[s] === null) {
            arr.push(s);
          }
        }
        return arr;
      }

      return (minimax(squares, ai)).index;

      function minimax(newSquares, player) {
        let available = emptySquares(newSquares);
        const winner = calculateWinner(newSquares);

        if (winner) {return winner === 'X' ?
          {score: 10} :
          {score: -10};
        } else if (available.length === 0) {
          return {
            score: 0
          };
        }

        let moves = [];

        for (let j = 0; j < available.length; j++) {

          let move = {};
          move.index = available[j];

          newSquares[available[j]] = player;

          if (player === ai) {
            let result = minimax(newSquares, hu);
            move.score = result.score;
          } else {
            let result = minimax(newSquares, ai);
            move.score = result.score;
          }

          newSquares[available[j]] = null;

          moves.push(move);
        }

        let bestMove;
        if (player === ai) {
          let bestScore = -10000;
          for (let j = 0; j < moves.length; j++) {
            if (moves[j].score > bestScore) {
              bestScore = moves[j].score;
              bestMove = j;
            }
          }
        } else {
          let bestScore = 10000;
          for (let j = 0; j < moves.length; j++) {
            if (moves[j].score < bestScore) {
              bestScore = moves[j].score;
              bestMove = j;
            }
          }
        }

        return moves[bestMove];
      }

    }
  }

  restart() {
    this.setState({
      squares: Array(9).fill(null),
      stepNumber: 0,
      /*xIsNext: true,*/
    });
  }

  render() {
    const squares = this.state.squares;
    const winner = calculateWinner(squares);

    let status = 'TIC TAC TOE';
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (this.state.stepNumber === 5) {
      status = 'Draw' /*+ (this.state.xIsNext ? 'X' : 'O')*/;
    }

    return (
      <div className='d-flex flex-column'>
        <div className='game-info'>
            {status}
        </div>

        <div className='game-board'>
          <Board
            squares={squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>

        <div className='align-self-center p-4'>
          <button
            className='btn'
            onClick={() => this.restart()}>
              Restart
          </button>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game/>, document.getElementById('root'));
