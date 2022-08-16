import React, { useState, useEffect } from "react";
import blankImg from "../images/blank.png";
import rockIcon from "../images/rock-icon.png";
import scissorsIcon from "../images/scissors-icon.png";
import paperIcon from "../images/paper-icon.png";

export default function Playarea() {
  const startgame = 'Please choose your play from the "Player Icons"';
  const [playerImgSrc, setPlayerImgSrc] = useState(blankImg);
  const [cpuImgSrc, setcpuImgSrc] = useState(blankImg);
  const [msg, setMsg] = useState(startgame);
  const [nextGame, setNextGame] = useState(true);
  const cpuOptions = [rockIcon, scissorsIcon, paperIcon];
  const resetBtn = document.getElementById("resetBtn");

  function selectedMove(event) {
    //console.log(`../images/${event.target.alt}.png`);
    if (event.target.alt === "rock-icon") {
      setPlayerImgSrc(rockIcon);
    } else if (event.target.alt === "scissors-icon") {
      setPlayerImgSrc(scissorsIcon);
    } else if (event.target.alt === "paper-icon") {
      setPlayerImgSrc(paperIcon);
    }

    setcpuImgSrc(cpuOptions[Math.floor(Math.random() * cpuOptions.length)]);

    // result();
  }

  useEffect(() => {
    //console.log(playerImgSrc.includes("paper"));
    if (playerImgSrc !== blankImg) {
      getresult();
    }
  }, [cpuImgSrc, playerImgSrc]);

  function getresult() {
    if (cpuImgSrc === playerImgSrc) {
      setMsg("Draw");
    } else if (cpuImgSrc.includes("rock")) {
      if (playerImgSrc.includes("paper")) {
        setMsg("Player Won");
      } else if (playerImgSrc.includes("scissors")) {
        setMsg("CPU Won");
      }
    } else if (cpuImgSrc.includes("paper")) {
      if (playerImgSrc.includes("rock")) {
        setMsg("CPU Won");
      } else if (playerImgSrc.includes("scissors")) {
        setMsg("Player Won");
      }
    } else if (cpuImgSrc.includes("scissors")) {
      if (playerImgSrc.includes("rock")) {
        setMsg("Player Won");
      } else if (playerImgSrc.includes("paper")) {
        setMsg("CPU Won");
      }
    }

    endGame();

    // let icons = document.querySelectorAll(".icons-area");
    // icons.forEach((icon) => {
    //   console.log(icon);
    // });
  }

  function endGame() {
    setNextGame(false);
    resetBtn.classList = "visibleBtn";
  }

  function resetGame() {
    setMsg(startgame);
    setPlayerImgSrc(blankImg);
    setcpuImgSrc(blankImg);
    setNextGame(true);
    resetBtn.classList = "";
  }

  function noMove() {}

  return (
    <div className="playArea">
      <h3>{msg}</h3>
      <div className="flex ">
        <div className="row">
          <div className="flex-item playGround">
            <div className="playedMove">
              <h3>CPU Move</h3>
              <img id="cpuMove" src={cpuImgSrc} alt="..."></img>
            </div>
            <div className="playedMove">
              <h3>Player Move</h3>
              <img id="playerMove" src={playerImgSrc} alt="..."></img>
            </div>
          </div>
          <div className="flex-item playerIcons">
            <h3>Player Icons</h3>
            <div className="icons-area">
              <img
                src={rockIcon}
                alt="rock-icon"
                onClick={nextGame ? selectedMove : noMove}
              ></img>
              <img
                src={scissorsIcon}
                alt="scissors-icon"
                onClick={nextGame ? selectedMove : noMove}
              ></img>
              <img
                src={paperIcon}
                alt="paper-icon"
                onClick={nextGame ? selectedMove : noMove}
              ></img>
            </div>
          </div>
        </div>
      </div>
      <button type="button" id="resetBtn" onClick={resetGame}>
        Play Again
      </button>
    </div>
  );
}
