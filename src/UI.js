import $ from "jquery";

export default class UI {
  #transition;

  constructor(transition = 400) {
    this.#transition = transition;
  }

  move(from, to, changePawnToKnight = false) {
    let fromDiv = $("#" + from);
    let toDiv = $("#" + to);
    if (
      fromDiv.length <= 0 ||
      toDiv.length <= 0 ||
      fromDiv.children().length != 1
    )
      return;

    if (toDiv.children().length == 1) {
      let captured = toDiv.children().first();
      let iconColor = this.#getPieceColor(captured);

      captured.fadeOut(this.#transition, () => {
        $("#capture-" + iconColor).append(captured);
        captured.fadeIn();
      });
    }

    let icon = fromDiv.children().first();
    icon.fadeOut(this.#transition, () => {
      if (changePawnToKnight) {
        icon.removeClass("la-chess-pawn");
        icon.addClass("la-chess-knight");
      }
      toDiv.append(icon);
      icon.fadeIn();
    });
  }

  #getPieceColor(icon) {
    if (icon.hasClass("whitePiece")) return "white";
    else if (icon.hasClass("blackPiece")) return "black";
    return false;
  }
}
