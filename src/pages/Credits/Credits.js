import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../../assets/img/background.jpg';
import './Credits.css';

const Credits = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="outer-container">
      <img src={backgroundImg} alt="background" className="backImg" />
      <div className="overlay" style={{ opacity: 0.7 }}></div>
      <div className="container">
        <div className="inner-container">
          <div className="header">
            <h1>Tic Tac Toe</h1>
          </div>

          <div className="menu-container">
            <div className="sub-header">Credits</div>
            <p className="credits-text">Created By: Ramteen Taheri</p>
          </div>

          <div className="button-container">
            <button className="backbtn" onClick={goBack}>
              &lt;-- Main Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
