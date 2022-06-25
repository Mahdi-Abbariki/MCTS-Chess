/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/MCTS.js":
/*!*********************!*\
  !*** ./src/MCTS.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MCTS)\n/* harmony export */ });\n/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node */ \"./src/Node.js\");\n/* harmony import */ var chess_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chess.js */ \"./node_modules/chess.js/chess.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nclass MCTS {\n  predict(node, isOver, isWhite, computationPower = 10) {\n    if (isOver) return -1;\n\n    let allMoves = node.state.moves();\n    let mapStateMoves = {};\n\n    let currentFen = node.state.fen();\n    allMoves.forEach((move) => {\n      let tempState = new chess_js__WEBPACK_IMPORTED_MODULE_1__.Chess(currentFen);\n      tempState.move(move);\n      let child = new _Node__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n      child.parent = node;\n      child.state = tempState;\n      node.children.push(child);\n      mapStateMoves[move] = child;\n    });\n\n    while (computationPower > 0) {\n      computationPower--;\n      if (isWhite) {\n        let maxUCB = Number.MIN_SAFE_INTEGER;\n        let selectedChild = null;\n        for (const iChild in node.children) {\n          const child = node.children[iChild];\n          let tmp = this.#getUCB(child);\n          if (tmp > maxUCB) {\n            maxUCB = tmp;\n            selectedChild = child;\n          }\n        }\n        let exChild = this.#expansion(selectedChild, 0);\n        const { reward, state } = this.#rollout(exChild);\n        node = this.#rollback(state, reward);\n      } else {\n        let minUCB = Number.MAX_SAFE_INTEGER;\n        let selectedChild = null;\n        for (const iChild in node.children) {\n          const child = node.children[iChild];\n          let tmp = this.#getUCB(child);\n          if (tmp < minUCB) {\n            minUCB = tmp;\n            selectedChild = child;\n          }\n        }\n        let exChild = this.#expansion(selectedChild, 1);\n        const { reward, state } = this.#rollout(exChild);\n        node = this.#rollback(state, reward);\n      }\n    }\n\n    let selectedMove = \"\";\n\n    if (isWhite) {\n      let mx = Number.MIN_SAFE_INTEGER;\n      for (const iChild in node.children) {\n        const child = node.children[iChild];\n        let tmp = this.#getUCB(child);\n        if (tmp > mx) {\n          mx = tmp;\n          for (const move in mapStateMoves)\n            if (child == mapStateMoves[move]) {\n              selectedMove = move;\n              break;\n            }\n        }\n      }\n    } else {\n      let mn = Number.MAX_SAFE_INTEGER;\n      for (const iChild in node.children) {\n        const child = node.children[iChild];\n        let tmp = this.#getUCB(child);\n        if (tmp < mn) {\n          mn = tmp;\n          for (const move in mapStateMoves)\n            if (child == mapStateMoves[move]) {\n              selectedMove = move;\n              break;\n            }\n        }\n      }\n    }\n    return selectedMove;\n  }\n\n  #expansion(node, isWhite) {\n    if (node.children.length == 0) return node;\n    if (isWhite) {\n      let maxUCB = Number.MIN_SAFE_INTEGER;\n      let selectedChild = null;\n      for (const iChild in node.children) {\n        const child = node.children[iChild];\n        let tmp = this.#getUCB(child);\n        if (tmp > maxUCB) {\n          maxUCB = tmp;\n          selectedChild = child;\n        }\n      }\n      return this.#expansion(selectedChild, 0);\n    } else {\n      let minUCB = Number.MAX_SAFE_INTEGER;\n      let selectedChild = null;\n      for (const iChild in node.children) {\n        const child = node.children[iChild];\n        let tmp = this.#getUCB(child);\n        if (tmp < minUCB) {\n          minUCB = tmp;\n          selectedChild = child;\n        }\n      }\n      return this.#expansion(selectedChild, 1);\n    }\n  }\n\n  #rollout(node) {\n    if (node.state.game_over()) {\n      let res;\n      if (node.state.in_checkmate()) {\n        if (node.state.turn() == \"w\") res = -1; //black wins\n        else res = 1; //white wins\n      } else res = 0.5; //draw\n      return { reward: res, state: node };\n    }\n\n    let allMoves = node.state.moves();\n\n    let currentFen = node.state.fen();\n    allMoves.forEach((move) => {\n      let tempState = new chess_js__WEBPACK_IMPORTED_MODULE_1__.Chess(currentFen);\n      tempState.move(move);\n      let child = new _Node__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n      child.parent = node;\n      child.state = tempState;\n      node.children.push(child);\n    });\n\n    //get a random child\n    let rndIndex = Math.floor(Math.random() * node.children.length);\n    let rnd = node.children[rndIndex];\n\n    return this.#rollout(rnd);\n  }\n\n  #rollback(node, reward) {\n    node.n++;\n    node.v += reward;\n    while (node.parent != null) {\n      node.N++;\n      node = node.parent;\n    }\n    return node;\n  }\n\n  #getUCB(node) {\n    return (\n      node.v +\n      2 *\n        Math.sqrt(\n          Math.log2(node.N + Math.E + Math.pow(10, -6)) /\n            (node.n + Math.pow(10, -10))\n        )\n    );\n  }\n}\n\n\n//# sourceURL=webpack://chess/./src/MCTS.js?");

/***/ }),

/***/ "./src/Node.js":
/*!*********************!*\
  !*** ./src/Node.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Node)\n/* harmony export */ });\nclass Node {\n  state = null;\n  children = [];\n  parent = null;\n  v = 0;\n  N = 0;\n  n = 0;\n}\n\n\n//# sourceURL=webpack://chess/./src/Node.js?");

/***/ }),

/***/ "./src/worker.js":
/*!***********************!*\
  !*** ./src/worker.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var chess_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chess.js */ \"./node_modules/chess.js/chess.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _MCTS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MCTS */ \"./src/MCTS.js\");\n/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Node */ \"./src/Node.js\");\n\n\n\n\n\nconst chess = new chess_js__WEBPACK_IMPORTED_MODULE_0__.Chess();\nwindow.chess = chess;\n\nconst mcts = new _MCTS__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n\nlet whiteTurn = true;\nlet movesCount = 0;\n\njquery__WEBPACK_IMPORTED_MODULE_1___default()(function () {\n  self.postMessage({ fsadfsd: \"fasdfsd\" });\n  console.log(\"ui ready\");\n  while (!chess.game_over()) {\n    const root = new _Node__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n    root.state = chess;\n    let res = mcts.predict(root, chess.game_over(), whiteTurn);\n    let m = chess.move(res);\n    self.postMessage(m);\n    whiteTurn = !whiteTurn;\n  }\n});\n\n\n//# sourceURL=webpack://chess/./src/worker.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_jquery_dist_jquery_js-node_modules_chess_js_chess_js"], () => (__webpack_require__("./src/worker.js")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".main.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"src_worker_js": 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkchess"] = self["webpackChunkchess"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return __webpack_require__.e("vendors-node_modules_jquery_dist_jquery_js-node_modules_chess_js_chess_js").then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;