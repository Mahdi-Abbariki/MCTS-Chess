import { Chess } from "chess.js";

const chess = new Chess();
chess.move("exf4");
chess.move("e4");
chess.move("f6");
chess.move("f4");

console.log(chess.moves(),chess.moves({ verbose: true }),chess.ascii(),chess.pgn());