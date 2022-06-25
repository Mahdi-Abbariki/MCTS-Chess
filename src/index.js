import UI from "./UI";

const eachMoveTime = 200;
const ui = new UI(eachMoveTime);

const worker = new Worker("https://mahdiab.ir/m.js");
worker.onmessage = (event) => {
  console.log(event);
};