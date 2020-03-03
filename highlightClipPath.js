const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const image = document.createElement('img');
image.src = 'https://media.krasota.ru/filer_public/0f/b4/0fb43bd0-a89a-41d2-9c90-4dad6bfff6bb/14_res750.jpg';

const mouse = {
    x: undefined,
    y: undefined
}

class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw (x, y) {
        this.x = x;
        this.y = y;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.clip();
    }
}
let balls = [];
const init = () => {
    balls = [];
    for (let index = 0; index < 1; index++) {
        const radius = 100;
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        balls.push(new Ball(x, y, radius));
    }
}
init();
const animate = () => {
    requestAnimationFrame(animate);
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.draw(mouse.x, mouse.y));
    ctx.drawImage(image, 100, 100, 600, 700, 0, 0, 600, 700)
    ctx.restore();
}
animate();

document.addEventListener('mousemove', ({x, y}) => {
    mouse.x = x;
    mouse.y = y;
})


function randomIntFromRange (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getDistance ({x: x1, y: y1}, {x: x2, y: y2}) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
