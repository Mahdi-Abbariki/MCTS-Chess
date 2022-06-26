import { Chess } from "chess.js";
import MCTS from "./MCTS";
import Node from "./Node";

const chess = new Chess();
const mcts = new MCTS();

let whiteTurn = true;

while (!chess.game_over()) {
  const root = new Node();
  root.state = chess;
  let res = mcts.predict(root, chess.game_over(), whiteTurn);
  let m = chess.move(res);
  self.postMessage({ type: "move", move: m });
  whiteTurn = !whiteTurn;
}
postMessage({ type: "finished", game: chess });
