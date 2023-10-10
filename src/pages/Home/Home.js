import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImg from '../../assets/img/background.jpg';
import './Home.css';

const Home = () => {
  return (
    <div className="outer-container">
      <img src={backgroundImg} className="backImg" alt="background" />
      <div className="overlay"></div>
      <div className="container">
        <div className="inner-container">
          <div className="header">
            <h1>Tic Tac Toe</h1>
          </div>
          <div className="menu-container">
            <h2 className="sub-header">Main Menu</h2>
            <ul className="menu-list">
              <li className="menu-list-item">
                <Link to="/two-player">Two Player [offline]</Link>
              </li>
              <li className="menu-list-item">
                <Link to="/single-easy">Single Player vs Dumb AI [easy]</Link>
              </li>
              <li className="menu-list-item">
                <Link to="/single-hard">Single Player vs Super AI [hard]</Link>
              </li>
              <li className="menu-list-item">
                <Link to="/credits">Credits</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
