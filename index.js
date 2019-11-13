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
        this.maxRadius = radius;
        this.delta = 0;
        this.prevRadius = radius;
    }
    draw () {
        ctx.moveTo(this.x, this.y)
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    }
    update () {

        if (this.radius > 5) {
            this.radius -= 1;
        }
        this.draw();
    }
}
let balls = [];
const init = () => {
    ctx.drawImage(image, 100, 100, 600, 700, 0, 0, 600, 700);
    ctx.fillStyle = `rgba(255,255,255,0.95)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    balls = [];
    for (let index = 0; index < 10; index++) {
        const radius = 100;
        const x = randomIntFromRange(0, canvas.width);
        const y = randomIntFromRange(0, canvas.height);
        balls.push(new Ball(x, y, radius));
    }
}

init();
const animate = () => {
    requestAnimationFrame(animate);
    ctx.drawImage(image, 100, 100, 600, 700, 0, 0, 600, 700);
    ctx.fillStyle = `rgba(255,255,255,0.95)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.beginPath();
    balls.forEach(ball => ball.update());
    ctx.clip();
    ctx.drawImage(image, 100, 100, 600, 700, 0, 0, 600, 700);
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
