import { Chess } from "chess.js";
import MCTS from "./MCTS";
import Node from "./Node";

const chess = new Chess();
const mcts = new MCTS();

let whiteTurn = true;

while (!chess.game_over()) {
  const root = new Node();
  root.state = chess;
  if (whiteTurn) console.log("white is deciding");
  else console.log("black is deciding");
  let res = mcts.predict(root, chess.game_over(), whiteTurn);
  let m = chess.move(res);
  self.postMessage({ type: "move", move: m });
  whiteTurn = !whiteTurn;
}
console.log(chess.pgn());
self.postMessage({
  type: "finished",
  is_draw: chess.in_draw() || chess.in_threefold_repetition(),
  turn: chess.turn(),
  is_checkmate: chess.in_checkmate() || chess.in_stalemate(),
});
