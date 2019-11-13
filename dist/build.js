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

eval("const canvas = document.querySelector('canvas');\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\nconst ctx = canvas.getContext('2d');\nconst image = document.createElement('img');\nimage.src = 'https://media.krasota.ru/filer_public/0f/b4/0fb43bd0-a89a-41d2-9c90-4dad6bfff6bb/14_res750.jpg';\n\nconst mouse = {\n    x: undefined,\n    y: undefined\n}\n\nclass Ball {\n    constructor(x, y, radius) {\n        this.x = x;\n        this.y = y;\n        this.radius = radius;\n        this.maxRadius = radius;\n        this.delta = 0;\n        this.prevRadius = radius;\n    }\n    draw () {\n        ctx.moveTo(this.x, this.y)\n        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n    }\n    update () {\n\n        if (this.radius > 5) {\n            this.radius -= 1;\n        }\n        this.draw();\n    }\n}\nlet balls = [];\nconst init = () => {\n    ctx.drawImage(image, 100, 100, 600, 700, 0, 0, 600, 700);\n    ctx.fillStyle = `rgba(255,255,255,0.95)`;\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    balls = [];\n    for (let index = 0; index < 10; index++) {\n        const radius = 100;\n        const x = randomIntFromRange(0, canvas.width);\n        const y = randomIntFromRange(0, canvas.height);\n        balls.push(new Ball(x, y, radius));\n    }\n}\n\ninit();\nconst animate = () => {\n    requestAnimationFrame(animate);\n    ctx.drawImage(image, 100, 100, 600, 700, 0, 0, 600, 700);\n    ctx.fillStyle = `rgba(255,255,255,0.95)`;\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    ctx.save();\n    ctx.beginPath();\n    balls.forEach(ball => ball.update());\n    ctx.clip();\n    ctx.drawImage(image, 100, 100, 600, 700, 0, 0, 600, 700);\n    ctx.restore();\n}\nanimate();\n\ndocument.addEventListener('mousemove', ({x, y}) => {\n    mouse.x = x;\n    mouse.y = y;\n})\n\n\nfunction randomIntFromRange (min, max) {\n    return Math.floor(Math.random() * (max - min) + min);\n}\nfunction getDistance ({x: x1, y: y1}, {x: x2, y: y2}) {\n    let xDistance = x2 - x1;\n    let yDistance = y2 - y1;\n    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));\n}\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });