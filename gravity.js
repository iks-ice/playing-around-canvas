const canvas = document.querySelector('canvas');
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = window.innerWidth;;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const mouse = {
    x: undefined,
    y: undefined
}
const maxRadius = 50;
const gravity = 1;
const friction = 0.5;
const colors = [
    '#A7C8F2',
    '#048ABF',
    '#027368',
    '#F25116',
    '#0D0D0D',
];
class Ball {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }
    draw () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    updaate () {
        if (this.y + this.radius + this.dy > window.innerHeight) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }
        if (this.x + this.radius + this.dx > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}
let balls = [];
const init = () => {
    balls = [];
    for (let index = 0; index < 400; index++) {
        const radius = randomInteger(1, 30);
        const x = randomInteger(radius, canvas.width - radius);
        const y = randomInteger(radius, canvas.height - radius);
        const dx = randomInteger(-3, 3);
        const dy = randomInteger(1, 3);
        const color = colors[Math.floor(Math.random() * colors.length)];
        balls.push(new Ball(x, y, dx, dy, radius, color));
    }
}
init();


const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    balls.forEach(ball => ball.updaate());

}
animate();
window.addEventListener('mousemove', ({x, y}) => {
    mouse.x = x;
    mouse.y = y;
});
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
window.addEventListener('click', init);

function randomInteger (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}