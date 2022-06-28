import Node from "./Node";
import { Chess } from "chess.js";

export default class MCTS {
  predict(node, isOver, isWhite, computationPower = 6) {
    if (isOver) return -1;

    let allMoves = node.state.moves();
    let mapStateMoves = {};

    let currentFen = node.state.fen();
    allMoves.forEach((move) => {
      let tempState = new Chess(currentFen);
      let m = tempState.move(move);

      let child = new Node();
      child.state = tempState;
      child.parent = node;
      child.move = m;

      node.children.push(child);

      mapStateMoves[move] = child;
    });

    while (computationPower > 0) {
      if (isWhite) {
        let maxUCB = Number.MIN_SAFE_INTEGER;
        let selectedChild = null;
        for (const iChild in node.children) {
          const child = node.children[iChild];
          let tmp = this.#getUCB(child);
          if (tmp >= maxUCB) {
            maxUCB = tmp;
            selectedChild = child;
          }
        }
        let exChild = this.#expansion(selectedChild, 0);
        const { reward, state } = this.#rollout(exChild);
        node = this.#rollback(state, reward);
      } else {
        let minUCB = Number.MAX_SAFE_INTEGER;
        let selectedChild = null;
        for (const iChild in node.children) {
          const child = node.children[iChild];
          let tmp = this.#getUCB(child);
          if (tmp <= minUCB) {
            minUCB = tmp;
            selectedChild = child;
          }
        }
        // console.log(selectedChild);
        // console.log(selectedChild.state.ascii());
        let exChild = this.#expansion(selectedChild, 1);
        // console.log(exChild);
        // console.log(exChild.state.ascii());
        const { reward, state } = this.#rollout(exChild);
        // console.log(reward);
        // console.log(state);
        // console.log(state.state.ascii());
        node = this.#rollback(state, reward);
        // console.log(node);
        // console.log(node.state.ascii());
      }
      computationPower--;
    }

    let selectedMove = "";

    if (isWhite) {
      let mx = Number.MIN_SAFE_INTEGER;
      for (const iChild in node.children) {
        const child = node.children[iChild];
        let tmp = this.#getUCB(child);
        // console.log("v:", child.v, "w:ucb", tmp, "move:", child.move.to);
        if (tmp > mx) {
          mx = tmp;
          for (const move in mapStateMoves)
            if (child == mapStateMoves[move]) {
              selectedMove = move;
              break;
            }
        }
      }
    } else {
      let mn = Number.MAX_SAFE_INTEGER;
      for (const iChild in node.children) {
        const child = node.children[iChild];
        let tmp = this.#getUCB(child);
        // console.log("v:", child.v, "b:ucb", tmp, "move:", child.move.to);
        if (tmp < mn) {
          mn = tmp;
          for (const move in mapStateMoves)
            if (child == mapStateMoves[move]) {
              selectedMove = move;
              break;
            }
        }
      }
    }
    return selectedMove;
  }

  #expansion(node, isWhite) {
    if (node.children.length == 0) return node;
    if (isWhite) {
      let maxUCB = Number.MIN_SAFE_INTEGER;
      let selectedChild = null;
      for (const iChild in node.children) {
        const child = node.children[iChild];
        let tmp = this.#getUCB(child);
        if (tmp > maxUCB) {
          maxUCB = tmp;
          selectedChild = child;
        }
      }
      return this.#expansion(selectedChild, 0);
    } else {
      let minUCB = Number.MAX_SAFE_INTEGER;
      let selectedChild = null;
      for (const iChild in node.children) {
        const child = node.children[iChild];
        let tmp = this.#getUCB(child);
        if (tmp < minUCB) {
          minUCB = tmp;
          selectedChild = child;
        }
      }
      return this.#expansion(selectedChild, 1);
    }
  }

  #rollout(node) {
    if (node.state.game_over()) {
      let res;
      if (node.state.in_checkmate() || node.state.in_stalemate()) {
        if (node.state.turn() == "w") res = -1; //black wins
        else res = 1; //white wins
      } else if (node.state.in_draw()) res = 0.5; //draw
      else if (node.state.in_threefold_repetition()) res = 0; // no useful info
      return { reward: res, state: node };
    }

    let allMoves = node.state.moves();

    let currentFen = node.state.fen();
    allMoves.forEach((move) => {
      let tempState = new Chess(currentFen);
      let m = tempState.move(move);

      let child = new Node();
      child.parent = node;
      child.state = tempState;
      child.move = m;

      node.children.push(child);
    });

    //get a random child
    let rndIndex = Math.floor(Math.random() * node.children.length);
    let rnd = node.children[rndIndex];

    return this.#rollout(rnd);
  }

  #rollback(node, reward) {
    while (node.parent != null) {
      // player can check the opponent in this state so add value to it
      if (node.state.in_check()) {
        if (node.state.turn() == "w") reward -= 0.8;
        else reward += 0.8;
      }
      node.n++;
      node.v += reward;
      node = node.parent;
      node.N++;
    }
    return node;
  }

  #getUCB(node) {
    let res = node.v;
    let tmp;
    if (node.state.turn() == "b") {
      //it is white
      tmp =
        1.5 *
        Math.sqrt(
          Math.log(node.N + Math.E + Math.pow(10, -8)) /
            (node.n + Math.floor(Math.random() * (5 - 1) + 1)) //random int (1,5)
        );
    } else {
      // it is black
      tmp =
        -1.5 *
        Math.sqrt(
          Math.log(node.N + Math.E + Math.pow(10, -8)) /
            (node.n + Math.floor(Math.random() * (5 - 1) + 1)) //random int (1,5)
        );
    }
    res += tmp;
    res += this.#getPiecesValues(node.state) * 0.7; // more offensive
    res += this.#getControlledSquares(node.state) * 0.5;
    res += this.#doNotMoveOnCanBeCapturedSquares(node.state) * 0.6; // more defensive
    res += this.#avoidPromotion(node.state) * 0.15; // more defensive (promotions are always 3 or 4 types together so the number is higher than 20 or 40)
    return res;
  }

  #getPiecesValues(chessBoard) {
    let fen = chessBoard.fen().split(" ")[0];

    let whitePawn = (fen.match(/P/g) || []).length * this.#getPieceValue("p");
    let whiteKnight = (fen.match(/N/g) || []).length * this.#getPieceValue("n");
    let whiteBishop = (fen.match(/B/g) || []).length * this.#getPieceValue("b");
    let whiteRook = (fen.match(/R/g) || []).length * this.#getPieceValue("r");
    let whiteQueen = (fen.match(/Q/g) || []).length * this.#getPieceValue("q");
    let whiteKing = (fen.match(/K/g) || []).length * this.#getPieceValue("k");
    let sumW =
      whitePawn +
      whiteKnight +
      whiteBishop +
      whiteRook +
      whiteQueen +
      whiteKing;

    let blackPawn = (fen.match(/p/g) || []).length * this.#getPieceValue("p");
    let blackKnight = (fen.match(/n/g) || []).length * this.#getPieceValue("n");
    let blackBishop = (fen.match(/b/g) || []).length * this.#getPieceValue("b");
    let blackRook = (fen.match(/r/g) || []).length * this.#getPieceValue("r");
    let blackQueen = (fen.match(/q/g) || []).length * this.#getPieceValue("q");
    let blackKing = (fen.match(/K/g) || []).length * this.#getPieceValue("k");
    let sumB =
      blackQueen +
      blackRook +
      blackBishop +
      blackKnight +
      blackPawn +
      blackKing;

    return sumW - sumB;
  }

  #getControlledSquares(chessBoard) {
    let currentPlayer = chessBoard.turn();
    let initialFen = chessBoard.fen();
    let blackControlledSquares = 0,
      whiteControlledSquares = 0;
    chessBoard.undo();
    // after undo player changes
    if (currentPlayer == "w") {
      //black played the last move
      blackControlledSquares = chessBoard.moves().length;
      chessBoard.load(initialFen);
      whiteControlledSquares = chessBoard.moves().length;
    } else {
      //white played the last move
      whiteControlledSquares = chessBoard.moves().length;
      chessBoard.load(initialFen);
      blackControlledSquares = chessBoard.moves().length;
    }

    return whiteControlledSquares - blackControlledSquares;
  }

  //compute capture moves for opponent after current move for current piece and other pieces (p at b7 -> b6 A8 go free)
  #doNotMoveOnCanBeCapturedSquares(chessBoard) {
    let res = 0;
    let captureMoves = chessBoard
      .moves({ verbose: true })
      .filter((i) => i.flags == "c");

    captureMoves.forEach((capture) => {
      if (chessBoard.turn() == "w") {
        //it is black
        if (capture.color == "w")
          res += 1 * this.#getPieceValue(capture.captured); // punishment (positive value)
      } else {
        //it is white
        if (capture.color == "b")
          res += -1 * this.#getPieceValue(capture.captured); // punishment (negative value)
      }
    });
    // if (captureMoves.length > 0) console.log(captureMoves, res);
    return res;
  }

  #avoidPromotion(chessBoard) {
    let res = 0;
    let promotionMoves = chessBoard
      .moves({ verbose: true })
      .filter((i) => i.flags == "cp" || i.flags == "np");

    promotionMoves.forEach((p) => {
      if (p.color == "w") {
        //it is black turn
        res += 1 * this.#getPieceValue(p.promotion); // punishment
      } else {
        //it is white turn
        res += -1 * this.#getPieceValue(p.promotion); // punishment
      }
    });
    return res;
  }

  #getPieceValue(type) {
    switch (type) {
      case "P":
      case "p": {
        return 1;
      }

      case "B":
      case "b":
      case "N":
      case "n": {
        return 3;
      }
      case "R":
      case "r": {
        return 5;
      }
      case "Q":
      case "q": {
        return 9;
      }
      case "K":
      case "k": {
        //avoid being check
        return 30;
      }
    }
  }
}
