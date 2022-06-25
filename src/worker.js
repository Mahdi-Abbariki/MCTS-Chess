import { Chess } from "chess.js";
import $ from "jquery";
import MCTS from "./MCTS";
import Node from "./Node";

const chess = new Chess();
window.chess = chess;

const mcts = new MCTS();

let whiteTurn = true;
let movesCount = 0;

$(function () {
  self.postMessage({ fsadfsd: "fasdfsd" });
  console.log("ui ready");
  while (!chess.game_over()) {
    const root = new Node();
    root.state = chess;
    let res = mcts.predict(root, chess.game_over(), whiteTurn);
    let m = chess.move(res);
    self.postMessage(m);
    whiteTurn = !whiteTurn;
  }
});
