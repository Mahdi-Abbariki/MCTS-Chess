/*  

import UI from "./UI";
import $ from "jquery";

const eachMoveTime = 0;
const ui = new UI(eachMoveTime);

$(function () {
  console.log("ui ready");
  const worker = new Worker(new URL("./worker.js", import.meta.url));
  worker.onmessage = ({ data }) => {
    if (data.type == "move") {
      ui.move(
        data.move.from,
        data.move.to,
        data.move.promotion && data.move.promotion == "q",
        data.move.flags == "e"
      );
    } else if (data.type == "finished") {
      let g = data.game;
      let res;

      if (data.is_checkmate) {
        if (data.turn == "w") res = "b"; //black wins
        else res = "w"; //white wins
      } else if (g.is_draw) res = "d"; //draw

      ui.setResult(res);
      worker.terminate();
    }
  };
});

/*
*/

import { Chess } from "chess.js";
import MCTS from "./MCTS";
import Node from "./Node";
import UI from "./UI";
const chess = new Chess();
const mcts = new MCTS();

const eachMoveTime = 0;
const ui = new UI(eachMoveTime);

function log(e) {
  console.log(e);
}

let s1 = new Node();
s1.state = chess;
let m1 = mcts.predict(s1, chess.game_over(), true);
let um = s1.state.move(m1);
log(um);
ui.move(um.from, um.to);

let s2 = new Node();
s2.state = s1.state;
let m2 = mcts.predict(s2, chess.game_over(), false);
um = s2.state.move(m2);
log(um);
ui.move(um.from, um.to);

s1 = new Node();
s1.state = s2.state;
m1 = mcts.predict(s1, chess.game_over(), true);
um = s1.state.move(m1);
log(um);
ui.move(um.from, um.to);

s2 = new Node();
s2.state = s1.state;
m2 = mcts.predict(s2, chess.game_over(), false);
um = s2.state.move(m2);
log(um);
ui.move(um.from, um.to);

console.log(s1);

// s1 = new Node();
// s1.state = s2.state;
// m1 = mcts.predict(s1, chess.game_over(), true);
// um = s1.state.move(m1);
// log(um);
// ui.move(um.from,um.to);

// s2 = new Node();
// s2.state = s1.state;
// m2 = mcts.predict(s2, chess.game_over(), false);
// um = s2.state.move(m2);
// log(um);
// ui.move(um.from, um.to);

