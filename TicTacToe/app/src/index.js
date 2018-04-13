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
      squares: Array(9).fill(null),
      stepNumber: 0,
      /*xIsNext: true,*/
    };
  }

  handleClick(i) {
    const squares = this.state.squares;

    //If there is already a winner, or the clicked square is already used, return
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = /*this.state.xIsNext ? 'X' : 'O'*/ 'X';
    this.setState({
      squares: squares,
      stepNumber: this.state.stepNumber + 1,
      /*xIsNext: !this.state.xIsNext,*/
    });

    aiTurn(squares);
  }

  aiTurn(squares) {
    //TODO implement MINIMAX algorithm

    if (calculateWinner(squares) || squares[i]) {
      return;
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

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' /*+ (this.state.xIsNext ? 'X' : 'O')*/;
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
