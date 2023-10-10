import React from 'react';
import { useNavigate } from 'react-router-dom';
import cross from '../../assets/img/cross.png';
import nought from '../../assets/img/nought.png';
import backgroundImg from '../../assets/img/background.jpg';
import './Hard.css';

const Hard = () => {
  const navigate = useNavigate();
  const [ticTacToe, setTicTacToe] = React.useState({
    winner: 0, // 0 - none, 1 - player 2 - computer
    playerSymbol: null,
    computerSymbol: null,
    entryArray: ['', '', '', '', '', '', '', '', ''],
    winningCombos: [
      [0, 1, 2],
      [0, 3, 6],
      [3, 4, 5],
      [6, 7, 8],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
    currentTurn: '',
    count: 0,
    endgame: false,
    modalTitle: '',
    modalMessage: '',
  });

  const goBack = () => {
    initialise();
    navigate('/');
  };

  const initialise = async () => {
    // initialise game
    const init = Math.round(Math.random()) === 1;

    // initialise array and random roll to see who goes first
    setTicTacToe({
      ...ticTacToe,
      entryArray: ['', '', '', '', '', '', '', '', ''],
      winner: 0,
      endgame: false,
      playerSymbol: init ? nought : cross,
      computerSymbol: init ? cross : nought,
      count: 0,
      errorMsg: '',
      currentTurn: init ? 'You' : 'Mr. Robot',
      modalTitle: '',
      modalMessage: '',
    });
  };

  const playerTakeTurn = async (index) => {
    // player takes turn
    if (ticTacToe.endgame || ticTacToe.currentTurn !== 'You') {
      // do nothing
      return;
    } else if (!ticTacToe.endgame) {
      let entry = [...ticTacToe.entryArray];
      // player marks index in entry array
      entry[index] = ticTacToe.playerSymbol;
      checkWin(entry);
      setTicTacToe({
        ...ticTacToe,
        entryArray: [...entry],
        count: ticTacToe.count + 1,
        currentTurn: 'Mr. Robot',
      });
    }
  };

  const isWin = (board) => {
    let result = { found: false, symbol: '', winner: '' };
    for (let x = 0; x < ticTacToe.winningCombos.length; x++) {
      if (
        board[ticTacToe.winningCombos[x][0]] === board[ticTacToe.winningCombos[x][1]] &&
        board[ticTacToe.winningCombos[x][1]] === board[ticTacToe.winningCombos[x][2]] &&
        board[ticTacToe.winningCombos[x][0]] !== ''
      ) {
        result.found = true;
        result.symbol = board[ticTacToe.winningCombos[x][0]];
        if (result.symbol === ticTacToe.computerSymbol) {
          result.winner = 2;
        } else {
          result.winner = 1;
        }
        break;
      }
    }
    return result;
  };

  const getEmptyCells = (board) => {
    let emptyIndexes = [];
    // loop through all empty cells
    for (let x = 0; x < board.length; x++) {
      //get available moves
      if (board[x] === '') {
        emptyIndexes.push(x);
      }
    }
    return emptyIndexes;
  };

  const minimax = (board, player, depth = 0) => {
    // calculate best move

    // get board
    let child = [...board];

    // check for empty spots
    let availableSpots = getEmptyCells(child);

    // check for terminal state
    let temp = isWin(child);

    // set scorebase
    const scoreBase = 10;

    if (temp.winner === 2) {
      //computer wins
      return { score: scoreBase - depth };
    } else if (temp.winner === 1) {
      // human wins
      return { score: -scoreBase - depth };
    } else if (availableSpots.length === 0) {
      // draw
      return { score: 0 };
    }

    // collect scores from each empty spot
    let moves = [];
    for (let x = 0; x < availableSpots.length; x++) {
      let move = {};
      move.index = availableSpots[x];
      if (player === 'Mr. Robot') {
        // setting empty spot on the board to current player
        child[move.index] = ticTacToe.computerSymbol;
        let result = minimax(child, 'You', depth + 1);
        move.score = result.score;
      } else {
        child[move.index] = ticTacToe.playerSymbol;
        //console.log('next human move:', availableSpots[x], child);
        let result = minimax(child, 'Mr. Robot', depth + 1);
        move.score = result.score;
      }
      child[move.index] = ''; // reset after testing a move
      moves.push(move);
    }
    let bestMove; //minimax always calculates the best move

    //choose the highest score when AI is playing and lowest score when human is playing
    if (player === 'Mr. Robot') {
      let bestScore = -Infinity; //set to really low when AI playing
      for (let x = 0; x < moves.length; x++) {
        //looping through the moves array
        if (moves[x].score > bestScore) {
          bestScore = moves[x].score;
          bestMove = x;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let x = 0; x < moves.length; x++) {
        if (moves[x].score < bestScore) {
          //look for lowest score
          bestScore = moves[x].score;
          bestMove = x;
        }
      }
    }

    return moves[bestMove];
  };

  const computerTakeTurn = async () => {
    // computers turn
    // computer makes a move by picking random empty spot
    // get all remaining empty spots
    await sleep(2000);

    // get best move
    let bestMove = minimax(ticTacToe.entryArray, 'Mr. Robot');

    // make the move
    let entry = [...ticTacToe.entryArray];
    entry[bestMove.index] = ticTacToe.computerSymbol;

    setTicTacToe({
      ...ticTacToe,
      entryArray: [...entry],
      count: ticTacToe.count + 1,
      currentTurn: 'You',
    });
  };

  const checkWin = async () => {
    // check for a win
    if (ticTacToe.modalTitle !== '' || ticTacToe.modalMessage !== '') {
      return;
    }
    if (ticTacToe.count === 9) {
      setTicTacToe({
        ...ticTacToe,
        endgame: true,
        winner: 3,
        modalTitle: 'Draw!',
        modalMessage: 'You are evenly matched...',
      });
      return;
    }
    for (let x = 0; x < ticTacToe.winningCombos.length; x++) {
      if (
        ticTacToe.entryArray[ticTacToe.winningCombos[x][0]] ===
          ticTacToe.entryArray[ticTacToe.winningCombos[x][1]] &&
        ticTacToe.entryArray[ticTacToe.winningCombos[x][1]] ===
          ticTacToe.entryArray[ticTacToe.winningCombos[x][2]] &&
        ticTacToe.entryArray[ticTacToe.winningCombos[x][0]] !== ''
      ) {
        // Announce Winner
        if (ticTacToe.currentTurn === 'You') {
          // announce computer wins
          setTicTacToe({
            ...ticTacToe,
            endgame: true,
            winner: 2,
            modalTitle: 'Winner!',
            modalMessage: 'Mr. Robot Wins!',
          });
        } else {
          // announce player wins
          setTicTacToe({
            ...ticTacToe,
            endgame: true,
            winner: 1,
            modalTitle: 'Winner!',
            modalMessage: 'You Win!',
          });
        }
        break;
      }
    }
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  React.useEffect(() => {
    // upon loading
    initialise();
    return () => {
      initialise();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    // each time turn changes
    if (ticTacToe.currentTurn !== 'You' && ticTacToe.currentTurn !== '') {
      computerTakeTurn();
    }
    checkWin();
    // check for draw
  }, [ticTacToe.currentTurn, ticTacToe.endgame]);

  return (
    <div className="outer-container">
      <img src={backgroundImg} alt="background" className="backImg" />
      <div className="overlay" style={{ opacity: ticTacToe.error ? 1 : 0.7 }}></div>
      {ticTacToe.endgame && (
        <div className="outer-modal-container">
          <div className="modal-overlay"></div>
          <div className="modal">
            <div className="modal-title-container">
              <h2 className="modal-title">{ticTacToe.modalTitle}</h2>
            </div>
            <div className="modal-message-container">{ticTacToe.modalMessage}</div>
            <div className="modal-button-container">
              <button className="modal-reset-btn" onClick={initialise}>
                Reset Game
              </button>
              <button className="modal-menu-btn" onClick={goBack}>
                Main Menu
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="inner-container">
          <div className="header">
            <h1>Tic Tac Toe</h1>
          </div>

          <div className="menu-container">
            <div className="sub-header">Hard Mode</div>
            <div className="grid">
              <div className="box" onClick={() => playerTakeTurn(0)}>
                {ticTacToe.entryArray[0] !== '' && (
                  <img src={ticTacToe.entryArray[0]} alt="grid box" />
                )}
              </div>
              <div className="box" onClick={() => playerTakeTurn(1)}>
                {ticTacToe.entryArray[1] !== '' && (
                  <img src={ticTacToe.entryArray[1]} alt="grid box" />
                )}
              </div>
              <div className="box" onClick={() => playerTakeTurn(2)}>
                {ticTacToe.entryArray[2] !== '' && (
                  <img src={ticTacToe.entryArray[2]} alt="grid box" />
                )}
              </div>
              <div className="box" onClick={() => playerTakeTurn(3)}>
                {ticTacToe.entryArray[3] !== '' && (
                  <img src={ticTacToe.entryArray[3]} alt="grid box" />
                )}
              </div>
              <div className="box" onClick={() => playerTakeTurn(4)}>
                {ticTacToe.entryArray[4] !== '' && (
                  <img src={ticTacToe.entryArray[4]} alt="grid box" />
                )}
              </div>
              <div className="box" onClick={() => playerTakeTurn(5)}>
                {ticTacToe.entryArray[5] !== '' && (
                  <img src={ticTacToe.entryArray[5]} alt="grid box" />
                )}
              </div>
              <div className="box" onClick={() => playerTakeTurn(6)}>
                {ticTacToe.entryArray[6] !== '' && (
                  <img src={ticTacToe.entryArray[6]} alt="grid box" />
                )}
              </div>
              <div className="box" onClick={() => playerTakeTurn(7)}>
                {ticTacToe.entryArray[7] !== '' && (
                  <img src={ticTacToe.entryArray[7]} alt="grid box" />
                )}
              </div>
              <div className="box" onClick={() => playerTakeTurn(8)}>
                {ticTacToe.entryArray[8] !== '' && (
                  <img src={ticTacToe.entryArray[8]} alt="grid box" />
                )}
              </div>
            </div>
            <div className="playerWins">
              <div className="currentTurn">
                <span>
                  Current Turn: <span id="turn">{ticTacToe.currentTurn}</span>
                </span>
              </div>
            </div>
          </div>

          {!ticTacToe.endgame && (
            <div className="button-container">
              <button className="backbtn" onClick={goBack}>
                &lt;-- Main Menu
              </button>
              {ticTacToe.winner !== 3 && (
                <button className="backbtn" onClick={initialise}>
                  Reset
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hard;
