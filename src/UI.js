import $ from "jquery";

export default class UI {
  #transition;

  constructor(transition = 400) {
    this.#transition = transition;
  }

  move(move) {
    let from = move.from;
    let to = move.to;
    let className = this.#getClassPiece(move.piece);
    let colorClassName = this.#getPieceColor(move.color);

    let fromDiv = $("#" + from);
    let toDiv = $("#" + to);
    if (
      fromDiv.length <= 0 ||
      toDiv.length <= 0 ||
      fromDiv.children().length != 1
    )
      return;

    fromDiv.addClass("chess-board__cell--selected");
    fromDiv.html("");
    toDiv.html("");

    if (move.flags == "c") {
      let capturedClassName = this.#getClassPiece(move.captured);
      let capturedColorClassName = this.#getReversePieceColor(move.color);
      let iconColor = move.color == "w" ? "b" : "w";

      $("#capture-" + iconColor).append(
        this.#createIconElement(capturedClassName, capturedColorClassName)
      );
    }

    if (move.flags == "e") {
      let number = from.charAt(1);
      let alphabet = to.charAt(0);

      let capturedClassName = this.#getClassPiece("p");
      let capturedColorClassName = this.#getReversePieceColor(move.color);
      let icon = this.#createIconElement(
        capturedClassName,
        capturedColorClassName
      );

      $("#" + alphabet + number).html("");

      let iconColor = move.color == "w" ? "b" : "w";
      $("#capture-" + iconColor).append(icon);
    }

    if (move.promotion && move.promotion == "q")
      // promotion
      className = this.#getClassPiece("q");

    let icon = this.#createIconElement(className, colorClassName);
    toDiv.append(icon);

    fromDiv.removeClass("chess-board__cell--selected");
  }

  setResult(res) {
    if (res == "w") {
      $("#result").html("White Wins");
    } else if (res == "b") {
      $("#result").html("Black Wins");
    } else {
      $("#result").html("Draw !");
    }
  }

  #getClassPiece(type) {
    switch (type) {
      case "P":
      case "p": {
        return "la-chess-pawn";
      }

      case "B":
      case "b": {
        return "la-chess-bishop";
      }

      case "N":
      case "n": {
        return "la-chess-knight";
      }

      case "R":
      case "r": {
        return "la-chess-rook";
      }

      case "Q":
      case "q": {
        return "la-chess-queen";
      }

      case "K":
      case "k": {
        return "la-chess-king";
      }
    }
  }

  #getPieceColor(color) {
    switch (color) {
      case "w": {
        return "chess-mark--white whitePiece";
      }
      case "b": {
        return "chess-mark--black blackPiece";
      }
    }
  }

  #getReversePieceColor(color) {
    switch (color) {
      case "w": {
        return "chess-mark--black blackPiece";
      }
      case "b": {
        return "chess-mark--white whitePiece";
      }
    }
  }

  #createIconElement(className, color) {
    let res = className + " " + color;
    return "<i class='las " + res + "'></i>";
  }
}
