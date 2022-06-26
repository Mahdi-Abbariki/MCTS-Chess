import Node from "./Node";
import { Chess } from "chess.js";
import { nodeName } from "jquery";

export default class MCTS {
  predict(node, isOver, isWhite, computationPower = 10) {
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
          if (tmp > maxUCB) {
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
          if (tmp < minUCB) {
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
        console.log("v:", child.v, "w:ucb", tmp);
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
        console.log("v:", child.v, "b:ucb", tmp);
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
        if (node.state.turn() == "w") res = -50; //black wins
        else res = 50; //white wins
      } else if (node.state.in_draw()) res = 25; //draw
      else if (node.state.in_threefold_repetition()) res = 0; // no useful info
      return { reward: res, state: node };
    }

    let allMoves = node.state.moves();

    let currentFen = node.state.fen();
    allMoves.forEach((move) => {
      let tempState = new Chess(currentFen);
      tempState.move(move);
      let child = new Node();
      child.parent = node;
      child.state = tempState;
      node.children.push(child);
    });

    //get a random child
    let rndIndex = Math.floor(Math.random() * node.children.length);
    let rnd = node.children[rndIndex];

    return this.#rollout(rnd);
  }

  #rollback(node, reward) {
    while (node.parent != null) {
      node.n++;
      node.v += reward;
      if (node.state.in_check()) node.v += 30; // opponent is checked in this state so add value to it
      node = node.parent;
      node.N++;
    }
    return node;
  }

  #getUCB(node) {
    let res = node.v;
    if (node.state.turn() == "b") {
      //it is white
      res +=
        2 *
        Math.sqrt(
          Math.log(node.N + Math.E + Math.pow(10, -8)) /
            (node.n + Math.floor(Math.random() * (7 - 3) + 3)) //random int (2,4)
        );
    } else {
      // it is black
      res +=
        -2 *
        Math.sqrt(
          Math.log(node.N + Math.E + Math.pow(10, -8)) /
            (node.n + Math.floor(Math.random() * (7 - 3) + 3)) //random int (2,4)
        );
    }
    res += this.#getPiecesValues(node.state);
    return res;
  }

  #getPiecesValues(chessBoard) {
    let fen = chessBoard.fen().split(" ")[0];

    let whitePawn = (fen.match(/P/g) || []).length;
    let whiteKnight = (fen.match(/N/g) || []).length * 3;
    let whiteBishop = (fen.match(/B/g) || []).length * 3;
    let whiteRook = (fen.match(/R/g) || []).length * 5;
    let whiteQueen = (fen.match(/Q/g) || []).length * 9;
    let whiteKing = (fen.match(/K/g) || []).length * 35;
    let sumW =
      whitePawn +
      whiteKnight +
      whiteBishop +
      whiteRook +
      whiteQueen +
      whiteKing;

    let blackPawn = (fen.match(/p/g) || []).length;
    let blackKnight = (fen.match(/n/g) || []).length * 3;
    let blackBishop = (fen.match(/b/g) || []).length * 3;
    let blackRook = (fen.match(/r/g) || []).length * 5;
    let blackQueen = (fen.match(/q/g) || []).length * 9;
    let blackKing = (fen.match(/K/g) || []).length * 35;
    let sumB =
      blackQueen +
      blackRook +
      blackBishop +
      blackKnight +
      blackPawn +
      blackKing;

    return sumW - sumB;
  }

  getControlledSquers() {
    
  }
}
