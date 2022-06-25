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
      tempState.move(move);
      let child = new Node();
      child.parent = node;
      child.state = tempState;
      node.children.push(child);
      mapStateMoves[move] = child;
    });

    while (computationPower > 0) {
      computationPower--;
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
        let exChild = this.#expansion(selectedChild, 1);
        const { reward, state } = this.#rollout(exChild);
        node = this.#rollback(state, reward);
      }
    }

    let selectedMove = "";

    if (isWhite) {
      let mx = Number.MIN_SAFE_INTEGER;
      for (const iChild in node.children) {
        const child = node.children[iChild];
        let tmp = this.#getUCB(child);
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
      if (node.state.in_checkmate()) {
        if (node.state.turn() == "w") res = -1; //black wins
        else res = 1; //white wins
      } else res = 0.5; //draw
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
    node.n++;
    node.v += reward;
    while (node.parent != null) {
      node.N++;
      node = node.parent;
    }
    return node;
  }

  #getUCB(node) {
    return (
      node.v +
      2 *
        Math.sqrt(
          Math.log2(node.N + Math.E + Math.pow(10, -6)) /
            (node.n + Math.pow(10, -10))
        )
    );
  }
}
