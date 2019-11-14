/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const canvas = document.querySelector('canvas');\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\nconst ctx = canvas.getContext('2d');\n\n\nconst mouse = {\n    x: undefined,\n    y: undefined\n}\n\nclass Ball {\n    constructor(x, y, dx, dy, radius, color) {\n        this.x = x;\n        this.y = y;\n        this.dx = dx;\n        this.dy = dy;\n        this.radius = radius;\n        this.color = color;\n    }\n    draw () {\n        ctx.beginPath();\n        ctx.fillStyle = this.color;\n        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n        ctx.closePath();\n        ctx.stroke();\n    }\n    update (balls) {\n        if (this.y + this.radius + this.dy > window.innerHeight || this.y - this.radius < 0) {\n            this.dy = -this.dy;\n        }\n        if (this.x + this.radius + this.dx > window.innerWidth || this.x - this.radius < 0) {\n            this.dx = -this.dx;\n        }\n        this.x += this.dx;\n        this.y += this.dy;\n        this.draw();\n        ctx.moveTo(this.x, this.y);\n        ctx.beginPath();\n        balls.forEach(ball => {\n            if (this !== ball) {\n                if (getDistance(this, ball) < 100) {\n                    ctx.lineTo(ball.x, ball.y);\n                }\n            }\n        });\n        ctx.closePath();\n        ctx.stroke();\n    }\n}\nlet balls = [];\nconst init = () => {\n    balls = [];\n    for (let index = 0; index < 30; index++) {\n        const radius = randomIntFromRange(1, 30);\n        const x = randomIntFromRange(radius, canvas.width - radius);\n        const y = randomIntFromRange(radius, canvas.height - radius);\n        const dx = randomIntFromRange(-3, 3);\n        const dy = randomIntFromRange(1, 3);\n        const color = 'black'\n        balls.push(new Ball(x, y, dx, dy, radius, color));\n    }\n}\n\ninit();\nconst ctxRatio = canvas.width / canvas.height;\nconst animate = () => {\n    requestAnimationFrame(animate);\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n\n    balls.forEach(ball => ball.update(balls));\n}\nanimate();\n\ndocument.addEventListener('mousemove', ({x, y}) => {\n    mouse.x = x;\n    mouse.y = y;\n})\n\n\nfunction randomIntFromRange (min, max) {\n    return Math.floor(Math.random() * (max - min) + min);\n}\nfunction randomIntWOZero (min, max) {\n    let random = Math.floor(Math.random() * (max - min) + min);\n    return random === 0 ? randomIntWOZero(min, max) : random;\n}\nfunction getDistance ({x: x1, y: y1}, {x: x2, y: y2}) {\n    let xDistance = x2 - x1;\n    let yDistance = y2 - y1;\n    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));\n}\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });