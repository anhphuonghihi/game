import React from "react";
import button from "../asset/button.png";
import classNames from "classnames/bind";
import styles from "../styles/_Game.module.scss";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const Game = () => {

  const navigator = useNavigate();
  const onNav = () => {
    navigator("/topic");
  };
  return (
    <div className={cx("background")}>
      <button onClick={onNav}>
        <img src={button} alt="" />
      </button>
    </div>
  );
};

export default Game;
