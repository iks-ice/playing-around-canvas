const dat = require('dat-gui');
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const gui = new dat.GUI();
const wave = {
    y: canvas.height / 2,
    length: 0.01,
    amplitude: 100,
    phase: 0.5
};
const waveFolder = gui.addFolder('wave');
waveFolder.add(wave, 'y', 0, canvas.height);
waveFolder.add(wave, 'length', -0.1, 0.1);
waveFolder.add(wave, 'amplitude', -canvas.height / 2, canvas.height / 2);
waveFolder.add(wave, 'phase', 0, 100);

const strokeColor = {
    h: 100,
    s: 50,
    l: 50
};
const strokeColorFolder = gui.addFolder('strokeColor');
strokeColorFolder.add(strokeColor, 'h', 0, 255);
strokeColorFolder.add(strokeColor, 's', 0, 100);
strokeColorFolder.add(strokeColor, 'l', 0, 100);
const bgColorFolder = gui.addFolder('bgColor');
const bgColor = {
    r: 100,
    g: 50,
    b: 50,
    a: 0.01
};
bgColorFolder.add(bgColor, 'r', 0, 255);
bgColorFolder.add(bgColor, 'g', 0, 255);
bgColorFolder.add(bgColor, 'b', 0, 255);
bgColorFolder.add(bgColor, 'a', 0, 1);

waveFolder.open();
strokeColorFolder.open();
bgColorFolder.open();

let ttl = 0;
const animate = () => {
    requestAnimationFrame(animate);
    ctx.save();
    ctx.fillStyle = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for (let x = 0; x < canvas.width; x++) {

        ctx.lineTo(x, wave.y + Math.sin(-x * wave.length + wave.phase) * wave.amplitude * Math.sin(wave.phase));
    }
    ctx.strokeStyle = `hsl(${strokeColor.h * Math.abs(Math.sin(wave.phase))}, ${strokeColor.s}%, ${strokeColor.l}%)`;
    ctx.stroke();
    wave.phase += 0.01;
}
animate();








function randomIntFromRange (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getDistance ({x: x1, y: y1}, {x: x2, y: y2}) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
