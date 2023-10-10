import React from 'react';
import { useNavigate } from 'react-router-dom';
import cross from '../../assets/img/cross.png';
import nought from '../../assets/img/nought.png';
import backgroundImg from '../../assets/img/background.jpg';
import './Easy.css';

const Easy = () => {
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
      currentTurn: init ? 'You' : 'Mr. Robot Jnr',
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
        currentTurn: 'Mr. Robot Jnr',
      });
    }
  };

  const computerTakeTurn = async () => {
    // computers turn
    // computer makes a move by picking random empty spot
    // get all remaining empty spots
    await sleep(2000);
    let listOfIndexes = [];
    for (let x = 0; x < ticTacToe.entryArray.length; x++) {
      if (ticTacToe.entryArray[x] === '') {
        listOfIndexes.push(x);
      }
    }
    let randomIndex = Math.floor(Math.random() * listOfIndexes.length);
    randomIndex.toFixed(0);
    randomIndex = listOfIndexes[randomIndex];
    let enArray = [...ticTacToe.entryArray];
    enArray[randomIndex] = ticTacToe.computerSymbol;

    setTicTacToe({
      ...ticTacToe,
      count: ticTacToe.count + 1,
      entryArray: [...enArray],
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
            modalMessage: 'Mr. Robot Jnr Wins!',
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
            <div className="sub-header">Easy Mode</div>
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

export default Easy;
