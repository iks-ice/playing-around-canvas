const canvas = document.querySelector('canvas');
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

const mouse = {
    x: undefined,
    y: undefined
}
const maxRadius = 50;
const colors = [
    '#A7C8F2',
    '#048ABF',
    '#027368',
    '#F25116',
    '#0D0D0D',
];
class Circle {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
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
        if (this.x + this.radius > width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 &&
            mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 &&
            mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        }
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }
}
let circles = [];
const init = () => {
    circles = [];
    for (let i = 0; i < 800; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        const radius = Math.random() * 3 + 1;
        const x = Math.random() * (width - 2 * radius) + radius;
        const y = Math.random() * (height - 2 * radius) + radius;
        const dx = (Math.random() - 0.5) * 3;
        const dy = (Math.random() - 0.5) * 3;
        circles.push(new Circle(x, y, dx, dy, radius, color));
    }
}
init();


const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height)
    circles.forEach(circle => {
        circle.updaate();
    });
}
animate();
window.addEventListener('mousemove', ({x, y}) => {
    mouse.x = x;
    mouse.y = y;
});
window.addEventListener('resize', () => {
    canvas.width = width;
    canvas.height = height;
    init();
})