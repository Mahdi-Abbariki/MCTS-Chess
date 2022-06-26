import UI from "./UI";
import $ from "jquery";

const eachMoveTime = 200;
const ui = new UI(eachMoveTime);

$(function () {
  console.log("ui ready");
  const worker = new Worker(new URL("./worker.js", import.meta.url));
  worker.onmessage = ({ data }) => {
    ui.move(data.from, data.to);
  };
});
/*
import { Chess } from "chess.js";
const chess = new Chess();
chess.load("4k3/4P3/4K3/8/8/8/8/8 b - - 0 78");
console.log(
  chess.ascii(),
  chess.game_over(),
  chess.in_checkmate(),
  chess.turn(),
  chess.in_stalemate(),
  chess.pgn({ max_width: 5, newline_char: "<br />" }),
  chess.board(),
  chess.header(),
);


import { Chess } from "chess.js";
import MCTS from "./MCTS";
import Node from "./Node";
 import UI from "./UI";
const chess = new Chess();
const mcts = new MCTS();

const eachMoveTime = 200;
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
ui.move(um.from,um.to);


s1 = new Node();
s1.state = s2.state;
m1 = mcts.predict(s1, chess.game_over(), true);
um = s1.state.move(m1);
log(um);
ui.move(um.from,um.to);

s2 = new Node();
s2.state = s1.state;
m2 = mcts.predict(s2, chess.game_over(), false);
um = s2.state.move(m2);
log(um);
ui.move(um.from,um.to);

s1 = new Node();
s1.state = s2.state;
m1 = mcts.predict(s1, chess.game_over(), true);
um = s1.state.move(m1);
log(um);
ui.move(um.from,um.to);


s2 = new Node();
s2.state = s1.state;
m2 = mcts.predict(s2, chess.game_over(), false);
um = s2.state.move(m2);
log(um);
ui.move(um.from, um.to);

*/
