import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImg from '../../assets/img/background.jpg';
import circleImg from '../../assets/img/nought.png';
import crossImg from '../../assets/img/cross.png';
import './TwoPlayer.css';

const TwoPlayer = () => {
	const [playerOne, setPlayerOne] = React.useState({
		name: '',
		turn: true
	});

	const [playerTwo, setPlayerTwo] = React.useState({
		name: '',
		turn: false
	});

	const [stage, setStage] = React.useState({
		set: 1,
		error: false,
		errorMsg: '',
		grid: {
			rowOne: { colOne: '', colTwo: '', colThree: '' },
			rowTwo: { colOne: '', colTwo: '', colThree: '' },
			rowThree: { colOne: '', colTwo: '', colThree: '' }
		},
		winner: false,
		champion: '',
		draw: false
	});

	React.useEffect(() => {
		// check for end of game
		const win = checkWin();
		const gridFull = checkGridFull();
		if (gridFull && !win.isWin) {
			// declare a draw
			setStage({
				...stage,
				grid: {
					...stage.grid
				},
				draw: true,
				winner: false,
				champion: ''
			});
		}
		if (win.isWin && !stage.winner) {
			if (win.winner === crossImg) {
				setStage({
					...stage,
					grid: {
						...stage.grid
					},
					winner: true,
					champion: playerTwo.name
				});
			} else if (win.winner === circleImg) {
				setStage({
					...stage,
					grid: {
						...stage.grid
					},
					winner: true,
					champion: playerOne.name
				});
			}
		}
		// eslint-disable-next-line
	}, [playerOne.turn, playerTwo.turn]);

	const onPlayerOneChange = (e) => {
		e.preventDefault();
		setPlayerOne({
			...playerOne,
			name: e.target.value
		});
	};

	const onPlayerTwoChange = (e) => {
		e.preventDefault();
		setPlayerTwo({
			...playerTwo,
			name: e.target.value
		});
	};

	const onSubmitNames = (e) => {
		e.preventDefault();
		if (playerOne && playerTwo && playerOne.name.length > 0 && playerTwo.name.length > 0) {
			setStage({ ...stage, set: 2 });
		} else {
			setStage({ ...stage, error: true, errorMsg: 'Please enter both player names...' });
		}
	};

	const onErrorClose = (e) => {
		e.preventDefault();
		setStage({ ...stage, error: false, errorMsg: '' });
	};

	const resetGame = async () => {
		await setStage({
			...stage,
			error: false,
			errorMsg: '',
			grid: {
				rowOne: { colOne: '', colTwo: '', colThree: '' },
				rowTwo: { colOne: '', colTwo: '', colThree: '' },
				rowThree: { colOne: '', colTwo: '', colThree: '' }
			},
			winner: false,
			champion: '',
			draw: false
		});
		await setPlayerOne({
			...playerOne,
			turn: true
		});
		await setPlayerTwo({
			...playerTwo,
			turn: false
		});
	};

	const checkGridFull = () => {
		const grid = stage.grid;

		if (
			grid.rowOne.colOne !== '' &&
			grid.rowOne.colTwo !== '' &&
			grid.rowOne.colThree !== '' &&
			grid.rowTwo.colOne !== '' &&
			grid.rowTwo.colTwo !== '' &&
			grid.rowTwo.colThree !== '' &&
			grid.rowThree.colOne !== '' &&
			grid.rowThree.colTwo !== '' &&
			grid.rowThree.colThree !== ''
		) {
			return true;
		} else {
			return false;
		}
	};

	const checkWin = () => {
		let result = {
			isWin: false,
			winner: ''
		};
		// row 1 col 1, row 2 col 1, row 3 col 1
		if (
			stage.grid.rowOne.colOne === stage.grid.rowTwo.colOne &&
			stage.grid.rowOne.colOne === stage.grid.rowThree.colOne &&
			stage.grid.rowOne.colOne !== ''
		) {
			result.isWin = true;
			result.winner = stage.grid.rowOne.colOne;
		}
		// row 1 col 2, row 2 col 2, row 3 col 2
		if (
			stage.grid.rowOne.colTwo === stage.grid.rowTwo.colTwo &&
			stage.grid.rowOne.colTwo === stage.grid.rowThree.colTwo &&
			stage.grid.rowOne.colTwo !== ''
		) {
			result.isWin = true;
			result.winner = stage.grid.rowOne.colTwo;
		}
		// row 1 col 3, row 2 col 3, row 3 col 3
		if (
			stage.grid.rowOne.colThree === stage.grid.rowTwo.colThree &&
			stage.grid.rowOne.colThree === stage.grid.rowThree.colThree &&
			stage.grid.rowOne.colThree !== ''
		) {
			result.isWin = true;
			result.winner = stage.grid.rowOne.colThree;
		}
		//---
		// row 1 col 1, row 1 col 2, row 1 col 3
		if (
			stage.grid.rowOne.colOne === stage.grid.rowOne.colTwo &&
			stage.grid.rowOne.colOne === stage.grid.rowOne.colThree &&
			stage.grid.rowOne.colOne !== ''
		) {
			result.isWin = true;
			result.winner = stage.grid.rowOne.colOne;
		}
		// row 2 col 1, row 2 col 2, row 2 col 3
		if (
			stage.grid.rowTwo.colOne === stage.grid.rowTwo.colTwo &&
			stage.grid.rowTwo.colOne === stage.grid.rowTwo.colThree &&
			stage.grid.rowTwo.colOne !== ''
		) {
			result.isWin = true;
			result.winner = stage.grid.rowTwo.colOne;
		}
		// row 3 col 1, row 3 col 2, row 3 col 3
		if (
			stage.grid.rowThree.colOne === stage.grid.rowThree.colTwo &&
			stage.grid.rowThree.colOne === stage.grid.rowThree.colThree &&
			stage.grid.rowThree.colOne !== ''
		) {
			result.isWin = true;
			result.winner = stage.grid.rowThree.colOne;
		}
		//---
		// row 1 col 1, row 2 col 2, row 3 col 3
		if (
			stage.grid.rowOne.colOne === stage.grid.rowTwo.colTwo &&
			stage.grid.rowOne.colOne === stage.grid.rowThree.colThree &&
			stage.grid.rowOne.colOne !== ''
		) {
			result.isWin = true;
			result.winner = stage.grid.rowOne.colOne;
		}
		// row 3 col 1, row 2 col 2, row 1 col 3
		if (
			stage.grid.rowThree.colOne === stage.grid.rowTwo.colTwo &&
			stage.grid.rowThree.colOne === stage.grid.rowOne.colThree &&
			stage.grid.rowThree.colOne !== ''
		) {
			result.isWin = true;
			result.winner = stage.grid.rowThree.colOne;
		}

		return result;
	};

	const onColumnClick = async (row, column) => {
		// identify current turn
		let turn = playerOne.turn ? 'one' : 'two';

		// find and mark territory
		if (row === 0) {
			if (column === 0) {
				if (stage.grid.rowOne.colOne !== '') {
					return;
				}
				if (turn === 'one') {
					// mark circle
					await setStage({
						...stage,
						grid: { ...stage.grid, rowOne: { ...stage.grid.rowOne, colOne: circleImg } }
					});
				} else if (turn === 'two') {
					// mark cross
					await setStage({
						...stage,
						grid: { ...stage.grid, rowOne: { ...stage.grid.rowOne, colOne: crossImg } }
					});
				}
			}
			if (column === 1) {
				if (stage.grid.rowOne.colTwo !== '') {
					return;
				}
				if (turn === 'one') {
					// mark circle
					await setStage({
						...stage,
						grid: { ...stage.grid, rowOne: { ...stage.grid.rowOne, colTwo: circleImg } }
					});
				} else if (turn === 'two') {
					// mark cross
					await setStage({
						...stage,
						grid: { ...stage.grid, rowOne: { ...stage.grid.rowOne, colTwo: crossImg } }
					});
				}
			}
			if (column === 2) {
				if (stage.grid.rowOne.colThree !== '') {
					return;
				}
				if (turn === 'one') {
					// mark circle
					await setStage({
						...stage,
						grid: {
							...stage.grid,
							rowOne: { ...stage.grid.rowOne, colThree: circleImg }
						}
					});
				} else if (turn === 'two') {
					// mark cross
					await setStage({
						...stage,
						grid: {
							...stage.grid,
							rowOne: { ...stage.grid.rowOne, colThree: crossImg }
						}
					});
				}
			}
		}
		if (row === 1) {
			if (column === 0) {
				if (stage.grid.rowTwo.colOne !== '') {
					return;
				}
				if (turn === 'one') {
					// mark circle
					await setStage({
						...stage,
						grid: { ...stage.grid, rowTwo: { ...stage.grid.rowTwo, colOne: circleImg } }
					});
				} else if (turn === 'two') {
					// mark cross
					await setStage({
						...stage,
						grid: { ...stage.grid, rowTwo: { ...stage.grid.rowTwo, colOne: crossImg } }
					});
				}
			}
			if (column === 1) {
				if (stage.grid.rowTwo.colTwo !== '') {
					return;
				}
				if (turn === 'one') {
					// mark circle
					await setStage({
						...stage,
						grid: { ...stage.grid, rowTwo: { ...stage.grid.rowTwo, colTwo: circleImg } }
					});
				} else if (turn === 'two') {
					// mark cross
					await setStage({
						...stage,
						grid: { ...stage.grid, rowTwo: { ...stage.grid.rowTwo, colTwo: crossImg } }
					});
				}
			}
			if (column === 2) {
				if (stage.grid.rowTwo.colThree !== '') {
					return;
				}
				if (turn === 'one') {
					// mark circle
					await setStage({
						...stage,
						grid: { ...stage.grid, rowTwo: { ...stage.grid.rowTwo, colThree: circleImg } }
					});
				} else if (turn === 'two') {
					// mark cross
					await setStage({
						...stage,
						grid: { ...stage.grid, rowTwo: { ...stage.grid.rowTwo, colThree: crossImg } }
					});
				}
			}
		}
		if (row === 2) {
			if (column === 0) {
				if (stage.grid.rowThree.colOne !== '') {
					return;
				}
				if (turn === 'one') {
					// mark circle
					await setStage({
						...stage,
						grid: { ...stage.grid, rowThree: { ...stage.grid.rowThree, colOne: circleImg } }
					});
				} else if (turn === 'two') {
					// mark cross
					await setStage({
						...stage,
						grid: { ...stage.grid, rowThree: { ...stage.grid.rowThree, colOne: crossImg } }
					});
				}
			}
			if (column === 1) {
				if (stage.grid.rowThree.colTwo !== '') {
					return;
				}
				if (turn === 'one') {
					// mark circle
					await setStage({
						...stage,
						grid: { ...stage.grid, rowThree: { ...stage.grid.rowThree, colTwo: circleImg } }
					});
				} else if (turn === 'two') {
					// mark cross
					await setStage({
						...stage,
						grid: { ...stage.grid, rowThree: { ...stage.grid.rowThree, colTwo: crossImg } }
					});
				}
			}
			if (column === 2) {
				if (stage.grid.rowThree.colThree !== '') {
					return;
				}
				if (turn === 'one') {
					// mark circle
					await setStage({
						...stage,
						grid: { ...stage.grid, rowThree: { ...stage.grid.rowThree, colThree: circleImg } }
					});
				} else if (turn === 'two') {
					// mark cross
					await setStage({
						...stage,
						grid: { ...stage.grid, rowThree: { ...stage.grid.rowThree, colThree: crossImg } }
					});
				}
			}
		}

		// swap turns
		await setPlayerOne({
			...playerOne,
			turn: !playerOne.turn
		});
		await setPlayerTwo({
			...playerTwo,
			turn: !playerTwo.turn
		});
	};

	return (
		<div className="outer-container">
			<img src={backgroundImg} className="backImg" alt="background" />
			<div className="overlay" style={{ opacity: stage.error ? 1 : 0.7 }}></div>
			<div className="container">
				<div className="inner-container">
					<div className="header">
						<h1>Tic Tac Toe</h1>
					</div>
					{!stage.error && !stage.winner && !stage.draw && (
						<div className="menu-container">
							<h2 className="sub-header">Two Player Game</h2>
							{stage.set === 1 && (
								<div className="inner-menu-container">
									<input
										type="text"
										placeholder="Player 1: Enter your name"
										className="player-input"
										onChange={onPlayerOneChange}
									/>
									<input
										type="text"
										placeholder="Player 2: Enter your name"
										className="player-input"
										onChange={onPlayerTwoChange}
									/>
									<button className="submitbtn" onClick={onSubmitNames}>
										Next --<span>&gt;</span>
									</button>
								</div>
							)}
							{stage.set === 2 && (
								<>
									<div className="inner-menu-game">
										<div className="row">
											<div className="column" onClick={() => onColumnClick(0, 0)}>
												{stage.grid.rowOne.colOne !== '' && (
													<img src={stage.grid.rowOne.colOne} alt="Player Mark" />
												)}
											</div>
											<div className="column" onClick={() => onColumnClick(0, 1)}>
												{stage.grid.rowOne.colTwo !== '' && (
													<img src={stage.grid.rowOne.colTwo} alt="Player Mark" />
												)}
											</div>
											<div className="column" onClick={() => onColumnClick(0, 2)}>
												{stage.grid.rowOne.colThree !== '' && (
													<img src={stage.grid.rowOne.colThree} alt="Player Mark" />
												)}
											</div>
										</div>
										<div className="row">
											<div className="column" onClick={() => onColumnClick(1, 0)}>
												{stage.grid.rowTwo.colOne !== '' && (
													<img src={stage.grid.rowTwo.colOne} alt="Player Mark" />
												)}
											</div>
											<div className="column" onClick={() => onColumnClick(1, 1)}>
												{stage.grid.rowTwo.colTwo !== '' && (
													<img src={stage.grid.rowTwo.colTwo} alt="Player Mark" />
												)}
											</div>
											<div className="column" onClick={() => onColumnClick(1, 2)}>
												{stage.grid.rowTwo.colThree !== '' && (
													<img src={stage.grid.rowTwo.colThree} alt="Player Mark" />
												)}
											</div>
										</div>
										<div className="row">
											<div className="column" onClick={() => onColumnClick(2, 0)}>
												{stage.grid.rowThree.colOne !== '' && (
													<img src={stage.grid.rowThree.colOne} alt="Player Mark" />
												)}
											</div>
											<div className="column" onClick={() => onColumnClick(2, 1)}>
												{stage.grid.rowThree.colTwo !== '' && (
													<img src={stage.grid.rowThree.colTwo} alt="Player Mark" />
												)}
											</div>
											<div className="column" onClick={() => onColumnClick(2, 2)}>
												{stage.grid.rowThree.colThree !== '' && (
													<img src={stage.grid.rowThree.colThree} alt="Player Mark" />
												)}
											</div>
										</div>
									</div>
									<div className="scoreboard-container">
										<h1 className="scoreboard-heading">Players</h1>
										<h2 className="scoreboard-player">
											{playerOne.name} {playerOne.turn && <span>&lt;-- Current Turn</span>}
										</h2>
										<h2 className="scoreboard-player">
											{playerTwo.name} {playerTwo.turn && <span>&lt;-- Current Turn</span>}
										</h2>
									</div>
								</>
							)}
						</div>
					)}
					{stage.error && (
						<div className="menu-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
							<h2 className="sub-header">Error</h2>
							<p className="error-msg">{stage.errorMsg}</p>
							<button className="errorbtn" onClick={onErrorClose}>
								OK
							</button>
						</div>
					)}
					{stage.winner && (
						<div className="menu-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
							<h2 className="sub-header">Winner!!</h2>
							<p className="error-msg">{stage.champion} has won the game!</p>
							<button className="errorbtn" onClick={resetGame}>
								Play Again
							</button>
						</div>
					)}
					{stage.draw && (
						<div className="menu-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
							<h2 className="sub-header">Draw</h2>
							<p className="error-msg">
								{playerOne.name} and {playerTwo.name} has come up even! What a close match!
							</p>
							<button className="errorbtn" onClick={resetGame}>
								Play Again
							</button>
						</div>
					)}
					<div className="button-container">
						<Link to="/" className="backbtn">
							<span>&lt;</span>-- Main Menu
						</Link>
						{stage.set === 2 && !stage.winner && !stage.draw && (
							<button className="backbtn" onClick={resetGame}>
								Reset
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TwoPlayer;
