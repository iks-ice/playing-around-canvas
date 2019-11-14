const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');


const mouse = {
    x: undefined,
    y: undefined
}

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
        ctx.stroke();
    }
    update (balls) {
        if (this.y + this.radius + this.dy > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        if (this.x + this.radius + this.dx > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
        ctx.moveTo(this.x, this.y);
        ctx.beginPath();
        balls.forEach(ball => {
            if (this !== ball) {
                ctx.lineTo(ball.x, ball.y);
            }
        });
        ctx.closePath();
        ctx.stroke();
    }
}
let balls = [];
const init = () => {
    balls = [];
    for (let index = 0; index < 3; index++) {
        const radius = randomIntFromRange(1, 30);
        const x = randomIntFromRange(radius, canvas.width - radius);
        const y = randomIntFromRange(radius, canvas.height - radius);
        const dx = randomIntFromRange(-3, 3);
        const dy = randomIntFromRange(1, 3);
        const color = 'black'
        balls.push(new Ball(x, y, dx, dy, radius, color));
    }
}

init();
const ctxRatio = canvas.width / canvas.height;
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => ball.update(balls));
}
animate();

document.addEventListener('mousemove', ({x, y}) => {
    mouse.x = x;
    mouse.y = y;
})


function randomIntFromRange (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function randomIntWOZero (min, max) {
    let random = Math.floor(Math.random() * (max - min) + min);
    return random === 0 ? randomIntWOZero(min, max) : random;
}
function getDistance ({x: x1, y: y1}, {x: x2, y: y2}) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
